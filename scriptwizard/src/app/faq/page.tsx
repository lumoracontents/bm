import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "ScriptWizard AI 콘텐츠 자동화 클래스 구매 전 자주 묻는 질문입니다.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="구매 전 확인할 질문"
            description="전자책, 영상강의, 올인원 패키지, 1:1 줌 컨설팅을 선택하기 전에 많이 묻는 내용을 정리했습니다."
            align="center"
          />
          <div className="mt-10 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {faqs.map((faq) => (
              <details key={faq.question} className="p-6">
                <summary className="cursor-pointer list-none font-semibold text-slate-950">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/#pricing"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              상품 가격표 보기
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
