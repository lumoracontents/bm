import { NextResponse } from "next/server";
import { z } from "zod";
import { products, consulting } from "@/lib/site";

const confirmPaymentSchema = z.object({
  orderId: z.string().min(1),
  paymentKey: z.string().min(1),
  amount: z.number().int().positive(),
  itemSlug: z.enum(["ebook", "course", "all-in-one", "consulting"]),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = confirmPaymentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "결제 확인 요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const item =
    parsed.data.itemSlug === "consulting"
      ? { price: consulting.price, name: consulting.name }
      : products.find((product) => product.slug === parsed.data.itemSlug);

  if (!item || item.price !== parsed.data.amount) {
    return NextResponse.json(
      { ok: false, message: "상품 금액이 일치하지 않습니다." },
      { status: 400 },
    );
  }

  if (!process.env.TOSS_SECRET_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "stub",
      message: "TOSS_SECRET_KEY 설정 전이므로 결제 확인 스텁 응답을 반환합니다.",
      entitlement: {
        itemSlug: parsed.data.itemSlug,
        status: "pending-provider-confirmation",
      },
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "ready",
    message: "Toss Payments 승인 호출과 Supabase 권한 생성을 연결할 준비가 된 엔드포인트입니다.",
  });
}
