-- RAG 챗봇용 지식베이스 스키마
-- 벡터 확장 활성화
create extension if not exists vector;

-- 지식 청크 테이블 (멱등성: 존재 시 drop)
drop table if exists public.knowledge_chunks;
create table public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  title text not null,
  content text not null,
  embedding vector(384),
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- HNSW 인덱스 (소규모 지식셋에 적합, 학습 데이터 불필요)
create index if not exists knowledge_chunks_embedding_idx
  on public.knowledge_chunks using hnsw (embedding vector_cosine_ops);

-- RLS 활성화
alter table public.knowledge_chunks enable row level security;

-- 공개 RPC 함수 (security definer 권한)
drop function if exists public.match_knowledge(vector, int, float);
create function public.match_knowledge(
  query_embedding vector(384),
  match_count int default 5,
  match_threshold float default 0.3
) returns table (
  id uuid,
  source text,
  title text,
  content text,
  similarity float
) language plpgsql security definer as $$
begin
  return query
  select
    k.id,
    k.source,
    k.title,
    k.content,
    (1 - (k.embedding <=> query_embedding))::float as similarity
  from public.knowledge_chunks k
  where k.embedding is not null
    and (1 - (k.embedding <=> query_embedding)) > match_threshold
  order by k.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RLS 정책: anon 사용자가 RPC 호출 가능하도록 grant
grant execute on function public.match_knowledge(vector, int, float) to anon;

-- 정책: SELECT 불가(직접 테이블 접근 차단), RPC 호출만 허용
create policy "anon_readonly_via_rpc" on public.knowledge_chunks
  for select using (false);
