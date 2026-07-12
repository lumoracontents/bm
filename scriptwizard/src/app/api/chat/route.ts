import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { embedText } from "@/lib/embeddings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MatchRow = {
  id: string;
  source: string;
  title: string;
  content: string;
  similarity: number;
};

const MATCH_COUNT = Number(process.env.RAG_MATCH_COUNT ?? "5");
const MATCH_THRESHOLD = Number(process.env.RAG_MATCH_THRESHOLD ?? "0.3");

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

// OPENAI_API_KEY가 있으면 gpt-4o-mini로 컨텍스트 기반 답변 생성
async function generateWithOpenAI(
  message: string,
  chunks: MatchRow[]
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
function buildFallbackAnswer(message: string, chunks: MatchRow[]): string {
  if (chunks.length === 0) {
    return "아직 관련 정보를 찾지 못했어요. 콘텐츠 자동화, 요금, 이용 방법 등 ScriptWizard에 대해 물어봐 주세요.";
  }
  const top = chunks.slice(0, 3);
  const body = top
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
    const queryEmbedding = await embedText(message);

    const { data, error } = await supabase.rpc("match_knowledge", {
      query_embedding: queryEmbedding,
      match_count: MATCH_COUNT,
      match_threshold: MATCH_THRESHOLD,
    });

    if (error) {
      return NextResponse.json(
        { error: `검색 중 오류: ${error.message}` },
        { status: 500 }
      );
    }

    const chunks = (data ?? []) as MatchRow[];
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
