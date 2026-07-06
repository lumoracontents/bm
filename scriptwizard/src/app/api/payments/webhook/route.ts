import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const signature = request.headers.get("tosspayments-webhook-signature");
  const event = await request.json().catch(() => null);

  if (!event) {
    return NextResponse.json(
      { ok: false, message: "웹훅 본문이 비어 있습니다." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: process.env.TOSS_WEBHOOK_SECRET ? "ready" : "stub",
    receivedSignature: Boolean(signature),
    message:
      "운영 단계에서는 서명 검증, 주문 멱등성 확인, Supabase entitlements 갱신을 이곳에서 처리합니다.",
  });
}
