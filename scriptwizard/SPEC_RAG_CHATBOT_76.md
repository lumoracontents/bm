# SPEC — RAG 챗봇 (강의 76과 챌린지)

목표: ScriptWizard 사이트에 "내 지식(상품/서비스 데이터)"을 벡터화해 저장하고,
유사도 검색 RPC + RAG 챗봇을 연결해, 사이트 우하단 챗 위젯에서 대화로 확인 가능하게 만든다.

## 스택 전제 (반드시 준수)
- Next.js 16 App Router, React 19, TypeScript, Node 22 런타임.
- Supabase: `@supabase/ssr` / `@supabase/supabase-js` 이미 설치됨.
- 서버 클라이언트 헬퍼: `src/lib/supabase/server.ts` 의 `createSupabaseServerClient()` 존재.
- 환경변수(.env.local 이미 존재): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- **AI 키는 env로만 읽는다. 하드코딩 절대 금지.** `OPENAI_API_KEY` (임베딩+생성 공용). 없을 때도 빌드/타입은 통과해야 함.

## 1) DB 스키마 (supabase/ 마이그레이션 파일로 추가)
`supabase/migrations/0010_rag_knowledge.sql` 신규 작성:
- `create extension if not exists vector;`
- 테이블 `public.knowledge_chunks`:
  - `id uuid primary key default uuid_generate_v4()`
  - `source text not null`      -- 예: 'product', 'service', 'lesson', 'faq'
  - `title text`
  - `content text not null`
  - `embedding vector(1536)`     -- OpenAI text-embedding-3-small 차원
  - `metadata jsonb default '{}'::jsonb`
  - `created_at timestamptz default now()`
- IVFFlat 인덱스: `create index on knowledge_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);`
- RLS: 활성화하고 `select`는 anon 허용(공개 지식), `insert/update/delete`는 service_role만.

## 2) 유사도 검색 RPC 함수 (같은 마이그레이션 파일)
```sql
create or replace function public.match_knowledge(
  query_embedding vector(1536),
  match_count int default 5,
  similarity_threshold float default 0.3
) returns table (id uuid, source text, title text, content text, similarity float)
language sql stable as $$
  select kc.id, kc.source, kc.title, kc.content,
         1 - (kc.embedding <=> query_embedding) as similarity
  from public.knowledge_chunks kc
  where kc.embedding is not null
    and 1 - (kc.embedding <=> query_embedding) > similarity_threshold
  order by kc.embedding <=> query_embedding
  limit match_count;
$$;
```

## 3) 지식 소스 (콘텐츠 팩)
`content/knowledge/` 폴더에 ScriptWizard 서비스 지식을 한국어 마크다운으로 6~10개 파일 작성.
컨셉: "유튜브 영상 1개를 블로그·스레드·인스타·쇼츠로 자동 변환해 파는 1인 지식창업 자동화 강의/도구."
포함: 서비스 소개, 핵심 기능, 대상 고객/문제, 가격·환불·수강 방식, 자주 묻는 질문(FAQ), 사용 흐름, 차별점.
자연스럽고 사실적인 내용으로 채운다(과장/허위 금지, 확정 안 된 수치는 쓰지 않음).

## 4) 임베딩 시드 스크립트
`scripts/embed-knowledge.ts` (tsx로 실행):
- `content/knowledge/*.md` 읽어 청킹(약 500~800 토큰, overlap 80).
- OpenAI `text-embedding-3-small` 로 임베딩.
- `SUPABASE_SERVICE_ROLE_KEY` 사용하는 admin 클라이언트로 `knowledge_chunks` upsert(재실행 시 source+title 기준 갱신).
- 실행 로그: 파일수/청크수/토큰추정/성공수 출력.
- package.json 에 `"embed:knowledge": "tsx scripts/embed-knowledge.ts"` 추가. tsx 없으면 devDependency 추가.

## 5) 챗 API 라우트
`src/app/api/chat/route.ts` (runtime = 'nodejs'):
- POST { messages: [{role, content}] }.
- 마지막 user 메시지를 임베딩 → `match_knowledge` RPC 호출(anon 서버 클라이언트) → 상위 청크 컨텍스트 구성.
- `OPENAI_API_KEY` 있으면 gpt-4o-mini 로 컨텍스트 기반 한국어 답변 생성(시스템 프롬프트: "너는 ScriptWizard 안내 도우미. 제공된 지식만 근거로, 모르면 모른다고. 구매 유도는 자연스럽게."). 스트리밍 아니어도 됨.
- `OPENAI_API_KEY` 없으면 검색된 청크를 요약 형태로 반환(retrieval-only 폴백)해서 위젯이 키 없이도 동작 확인 가능.
- 답변에 참고 출처(title) 배열 포함.

## 6) 챗 위젯 (우하단)
`src/components/chat-widget.tsx` (client component):
- 우하단 플로팅 버튼 → 클릭 시 채팅 패널 열림. 모바일 우선 반응형.
- `/api/chat` 호출, 대화 유지, 로딩/에러 상태 표시, 사이트 톤에 맞는 심플한 디자인.
- `src/app/layout.tsx` body 안 `{children}` 뒤에 `<ChatWidget />` 삽입(전 페이지 노출).

## 검증 (반드시 실행하고 로그 남길 것)
1. `npm run build` 통과 (타입/빌드 에러 0).
2. `npm run lint` 통과.
3. 마이그레이션 SQL 문법 자체 점검(가능하면).
4. 변경 파일 목록과 각 검증 로그를 보고에 포함.

## 금지
- 시크릿 하드코딩/커밋 금지. `.env.local` 수정 금지(이미 구성됨).
- 기존 결제(Toss)/영상(Cloudflare)/관리자 로직 변경 금지.
- production 배포·git push 금지(오너 승인 후 별도 진행).

## 보고 형식
- 생성/수정 파일 목록
- build/lint 결과(성공/실패 + 핵심 로그)
- 시드 스크립트 실행에 필요한 것(=OPENAI_API_KEY) 명시
- 남은 수동 단계(마이그레이션 적용 방법, 시드 실행, 배포)
