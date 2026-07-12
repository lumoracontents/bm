import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { embedText } from "../src/lib/embeddings";

const KNOWLEDGE_DIR = path.join(process.cwd(), "content", "knowledge");
const CHUNK_TARGET_LENGTH = 500;
const CHUNK_OVERLAP_LENGTH = 80;
const EMBEDDING_DIMENSIONS = 384;

type KnowledgeChunkRow = {
  source: string;
  title: string;
  content: string;
  embedding: number[];
  metadata: {
    chunk_index: number;
    chunk_count: number;
    file_name: string;
    seeded_at: string;
  };
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  }

  return value;
}

function normalizeMarkdown(markdown: string): string {
  return markdown.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function extractTitle(markdown: string, source: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading || path.basename(source, ".md");
}

function splitLongParagraph(paragraph: string): string[] {
  const chunks: string[] = [];
  let remaining = paragraph.trim();

  while (remaining.length > CHUNK_TARGET_LENGTH) {
    const searchFrom = Math.max(0, CHUNK_TARGET_LENGTH - 120);
    const candidate = remaining.slice(searchFrom, CHUNK_TARGET_LENGTH + 1);
    const boundaryInCandidate = Math.max(
      candidate.lastIndexOf("."),
      candidate.lastIndexOf("?"),
      candidate.lastIndexOf("!"),
      candidate.lastIndexOf(" ")
    );
    const cutIndex =
      boundaryInCandidate > 0 ? searchFrom + boundaryInCandidate + 1 : CHUNK_TARGET_LENGTH;

    chunks.push(remaining.slice(0, cutIndex).trim());
    remaining = remaining.slice(cutIndex).trim();
  }

  if (remaining) {
    chunks.push(remaining);
  }

  return chunks;
}

function withOverlap(rawChunks: string[]): string[] {
  return rawChunks.map((chunk, index) => {
    if (index === 0) {
      return chunk;
    }

    const overlap = rawChunks[index - 1].slice(-CHUNK_OVERLAP_LENGTH).trim();
    return overlap ? `${overlap}\n\n${chunk}` : chunk;
  });
}

function chunkMarkdown(markdown: string): string[] {
  const paragraphs = normalizeMarkdown(markdown)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const rawChunks: string[] = [];
  let current = "";

  for (const paragraph of paragraphs) {
    if (paragraph.length > CHUNK_TARGET_LENGTH) {
      if (current) {
        rawChunks.push(current);
        current = "";
      }

      rawChunks.push(...splitLongParagraph(paragraph));
      continue;
    }

    const next = current ? `${current}\n\n${paragraph}` : paragraph;

    if (next.length > CHUNK_TARGET_LENGTH && current) {
      rawChunks.push(current);
      current = paragraph;
    } else {
      current = next;
    }
  }

  if (current) {
    rawChunks.push(current);
  }

  return withOverlap(rawChunks);
}

async function readKnowledgeFiles() {
  const entries = await readdir(KNOWLEDGE_DIR, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  return Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(KNOWLEDGE_DIR, fileName);
      const content = await readFile(filePath, "utf8");
      const source = path.relative(process.cwd(), filePath).split(path.sep).join("/");

      return {
        fileName,
        source,
        title: extractTitle(content, source),
        content,
      };
    })
  );
}

async function main() {
  loadEnvConfig(process.cwd());

  const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const files = await readKnowledgeFiles();
  let totalChunks = 0;
  let insertedChunks = 0;

  console.log(`[embed:knowledge] 파일 ${files.length}개를 읽었습니다.`);

  for (const file of files) {
    const chunks = chunkMarkdown(file.content);
    totalChunks += chunks.length;

    const { error: deleteError } = await supabase
      .from("knowledge_chunks")
      .delete()
      .eq("source", file.source)
      .eq("title", file.title);

    if (deleteError) {
      throw new Error(
        `기존 청크 삭제 실패 (${file.source} / ${file.title}): ${deleteError.message}`
      );
    }

    const seededAt = new Date().toISOString();
    const rows: KnowledgeChunkRow[] = [];

    for (const [index, chunk] of chunks.entries()) {
      let embedding: number[];

      try {
        embedding = await embedText(chunk);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(
          `임베딩 실패 (${file.source}, chunk ${index + 1}/${chunks.length}): ${message}`
        );
      }

      if (embedding.length !== EMBEDDING_DIMENSIONS) {
        throw new Error(
          `임베딩 차원 오류 (${file.source}, chunk ${index + 1}/${chunks.length}): ` +
            `${embedding.length}차원 생성, ${EMBEDDING_DIMENSIONS}차원 필요`
        );
      }

      rows.push({
        source: file.source,
        title: file.title,
        content: chunk,
        embedding,
        metadata: {
          chunk_index: index,
          chunk_count: chunks.length,
          file_name: file.fileName,
          seeded_at: seededAt,
        },
      });
    }

    const { error: insertError } = await supabase.from("knowledge_chunks").insert(rows);

    if (insertError) {
      throw new Error(`청크 insert 실패 (${file.source} / ${file.title}): ${insertError.message}`);
    }

    insertedChunks += rows.length;
    console.log(`[embed:knowledge] ${file.source}: ${rows.length}개 청크 insert 완료`);
  }

  console.log(`[embed:knowledge] 총 파일 수: ${files.length}`);
  console.log(`[embed:knowledge] 총 청크 수: ${totalChunks}`);
  console.log(`[embed:knowledge] 성공 insert 수: ${insertedChunks}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error("[embed:knowledge] 실패");
  console.error(message);
  process.exitCode = 1;
});
