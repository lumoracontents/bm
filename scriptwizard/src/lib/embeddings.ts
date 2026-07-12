import { pipeline, env } from "@xenova/transformers";

// Transformers.js 환경 설정
env.allowLocalModels = true;
env.allowRemoteModels = true;

let embeddingPipeline: any = null;

// 싱글톤 임베딩 파이프라인
async function getEmbeddingPipeline() {
  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline(
      "feature-extraction",
      "Supabase/gte-small"
    );
  }
  return embeddingPipeline;
}

// L2 정규화
function normalizeVector(vector: number[]): number[] {
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return norm === 0 ? vector : vector.map((val) => val / norm);
}

/**
 * 텍스트를 384차원 벡터로 임베딩
 * gte-small 모델 사용 (무료, 로컬 실행)
 */
export async function embedText(text: string): Promise<number[]> {
  try {
    const pipe = await getEmbeddingPipeline();
    const result = await pipe(text, {
      pooling: "mean",
      normalize: true,
    });

    // 결과는 배열 형태의 벡터
    const embedding = Array.from(result.data) as number[];

    if (embedding.length !== 384) {
      console.warn(`임베딩 차원 경고: ${embedding.length} (384 예상)`);
    }

    // 추가 정규화 (혹시 모르니)
    return normalizeVector(embedding);
  } catch (error) {
    console.error("임베딩 생성 실패:", error);
    throw new Error(
      "텍스트 임베딩 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}
