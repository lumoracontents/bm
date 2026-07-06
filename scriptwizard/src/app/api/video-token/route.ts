import { NextResponse } from "next/server";
import { z } from "zod";

const videoTokenSchema = z.object({
  lessonId: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = videoTokenSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "영상 토큰 요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  if (!process.env.CLOUDFLARE_STREAM_SIGNING_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "stub",
      lessonId: parsed.data.lessonId,
      message: "Cloudflare Stream 서명 키 설정 전이므로 토큰 발급 스텁 응답을 반환합니다.",
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "ready",
    lessonId: parsed.data.lessonId,
    message: "구매 권한 확인 후 Cloudflare Stream signed token을 발급할 준비가 된 엔드포인트입니다.",
  });
}
