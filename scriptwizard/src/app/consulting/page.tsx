import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, Video } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { consulting, formatPrice } from "@/lib/site";

export const metadata: Metadata = {
  title: "1:1 줌 컨설팅",
  description: "내 채널과 콘텐츠 상황에 맞춰 AI 콘텐츠 자동화 흐름을 함께 설계하는 1:1 줌 컨설팅입니다.",
  alternates: {
    canonical: "/consulting",
  },
};

const steps = [
  { title: "사전 질문지", body: "채널 현황, 주제, 보유 영상, 목표 채널을 먼저 정리합니다.", icon: ClipboardList },
  { title: "60분 줌 세션", body: "원본 영상 재가공 흐름과 AI 프롬프트 구조를 함께 설계합니다.", icon: Video },
  { title: "실행 우선순위", body: "바로 적용할 콘텐츠 루틴과 다음 액션을 정리합니다.", icon: CalendarCheck },
];

export default function ConsultingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-brand-700">1:1 줌 컨설팅</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                내 콘텐츠에 맞는 재가공 자동화 흐름을 설계합니다
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{consulting.summary}</p>
              <p className="mt-8 text-4xl font-semibold text-slate-950">
                {formatPrice(consulting.price)}
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                컨설팅 신청하기
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4">
              {steps.map(({ title, body, icon: Icon }) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                  <Icon className="mb-4 size-7 text-brand-700" aria-hidden="true" />
                  <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              title="컨설팅에서 확인하는 것"
              description="강의를 구매하기 전에도 신청할 수 있고, 올인원 패키지 수강 후 개인 상황에 맞춘 적용 전략이 필요할 때도 적합합니다."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {consulting.includes.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-5">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <p className="leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
