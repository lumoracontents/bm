import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Chunk = {
  id: string;
  source: string;
  title: string;
  content: string;
};

type ScoredChunk = Chunk & { score: number };

const MATCH_COUNT = Number(process.env.RAG_MATCH_COUNT ?? "3");

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return null;
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// 질문에서 검색어(2자 이상 토큰) 추출
function terms(message: string): string[] {
  return Array.from(
    new Set(
      message
        .toLowerCase()
        .split(/[^0-9a-z가-힣]+/i)
        .filter((t) => t.length >= 2)
    )
  );
}

// DB에 저장된 지식(임베딩된 것과 동일한 청크)을 키워드로 검색해 상위 청크 반환.
// 서버리스에서 무거운 런타임 임베딩 모델을 돌리지 않아 항상 안정적으로 동작한다.
function rank(message: string, chunks: Chunk[]): ScoredChunk[] {
  const ts = terms(message);
  const scored = chunks.map((c) => {
    const title = c.title.toLowerCase();
    const content = c.content.toLowerCase();
    let score = 0;
    for (const t of ts) {
      if (title.includes(t)) score += 3;
      if (content.includes(t)) score += 1;
    }
    return { ...c, score };
  });
  const hits = scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);
  // 매칭이 없으면 개요/가격/자주묻는질문 위주로 일반 안내
  const pool = hits.length > 0 ? hits : scored;
  // 제목 기준 중복 제거
  const seen = new Set<string>();
  const deduped: ScoredChunk[] = [];
  for (const c of pool) {
    if (seen.has(c.title)) continue;
    seen.add(c.title);
    deduped.push(c);
    if (deduped.length >= MATCH_COUNT) break;
  }
  return deduped;
}

// OPENAI_API_KEY가 있으면 gpt-4o-mini로 컨텍스트 기반 답변 생성(선택)
async function generateWithOpenAI(
  message: string,
  chunks: ScoredChunk[]
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const context = chunks
    .map((c, i) => `[${i + 1}] ${c.title}\n${c.content}`)
    .join("\n\n");
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "너는 ScriptWizard 안내 도우미다. 아래 제공된 지식만 근거로 한국어로 답하고, 지식에 없는 내용은 모른다고 말하라. 구매 유도는 자연스럽게 한다.",
          },
          {
            role: "user",
            content: `질문: ${message}\n\n참고 지식:\n${context}`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const answer = data?.choices?.[0]?.message?.content;
    return typeof answer === "string" ? answer.trim() : null;
  } catch {
    return null;
  }
}

// 키가 없을 때(기본 무료 경로): 검색된 청크로 규칙 기반 한국어 답변 구성
function buildFallbackAnswer(message: string, chunks: ScoredChunk[]): string {
  if (chunks.length === 0) {
    return "아직 관련 정보를 찾지 못했어요. 콘텐츠 자동화, 요금, 이용 방법 등 ScriptWizard에 대해 물어봐 주세요.";
  }
  const body = chunks
    .map((c) => `• ${c.title}\n${c.content.trim()}`)
    .join("\n\n");
  return `"${message}"에 대해 저장된 지식에서 찾은 내용이에요.\n\n${body}\n\n더 궁금한 점이 있으면 편하게 물어봐 주세요!`;
}

export async function POST(request: Request) {
  let message = "";
  try {
    const body = await request.json();
    message = typeof body?.message === "string" ? body.message.trim() : "";
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json(
      { error: "메시지를 입력해 주세요." },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "지식베이스 연결이 설정되지 않았습니다." },
      { status: 503 }
    );
  }

  try {
    // 임베딩된 지식이 저장된 테이블에서 청크를 읽어 키워드 랭킹으로 검색
    const { data, error } = await supabase
      .from("knowledge_chunks")
      .select("id, source, title, content")
      .limit(200);

    if (error) {
      return NextResponse.json(
        { error: `검색 중 오류: ${error.message}` },
        { status: 500 }
      );
    }

    const chunks = rank(message, (data ?? []) as Chunk[]);
    const openaiAnswer = await generateWithOpenAI(message, chunks);
    const answer = openaiAnswer ?? buildFallbackAnswer(message, chunks);
    const sources = Array.from(new Set(chunks.map((c) => c.title)));

    return NextResponse.json({ answer, sources });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json(
      { error: `답변 생성 실패: ${detail}` },
      { status: 500 }
    );
  }
}
