import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gauge, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { ContentPackGenerator } from "@/components/content-pack-generator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contentPackPlans, contentPackTool, formatPrice, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: contentPackTool.name,
  description: contentPackTool.description,
  alternates: {
    canonical: `/tools/${contentPackTool.slug}`,
  },
  openGraph: {
    title: `${contentPackTool.name} | ScriptWizard`,
    description: contentPackTool.description,
    url: `/tools/${contentPackTool.slug}`,
    images: ["/images/scriptwizard-hero.png"],
  },
};

const outputs = ["블로그 글 초안", "스레드/X 게시글", "인스타 카드뉴스 문구", "유튜브 쇼츠 대본"];

const workflow = [
  "유튜브 링크, 제목, 스크립트 일부 중 준비된 원본을 입력합니다.",
  "MVP 샘플 생성기가 원본 메시지를 4가지 채널 문법으로 나눕니다.",
  "블로그는 검색형 구조, 스레드는 짧은 연재, 카드뉴스는 슬라이드, 쇼츠는 훅 중심 대본으로 확인합니다.",
  "운영 버전에서는 실제 AI API와 저장/사용량 과금 흐름으로 확장합니다.",
];

export default function ContentPackToolPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: contentPackTool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: contentPackTool.description,
    offers: contentPackPlans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price,
      priceCurrency: "KRW",
      url: `${siteConfig.url}/tools/${contentPackTool.slug}`,
    })),
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-slate-50">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold text-brand-700">{contentPackTool.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              {contentPackTool.name}
            </h1>
            <p className="mt-5 text-xl leading-8 text-slate-700">{contentPackTool.summary}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-brand-700">무료 체험</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">월 {contentPackTool.freeQuota}회</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-brand-700">결과물</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">4종</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-brand-700">현재 단계</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">MVP</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#generator"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                샘플 생성하기
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="#plans"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                무료/유료 모델 보기
              </Link>
            </div>
          </div>

          <div id="generator">
            <ContentPackGenerator />
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-700">한 번에 생성되는 결과물</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                유튜브 원본 하나를 네 가지 발행 초안으로 나눕니다
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {outputs.map((output) => (
                <article key={output} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <span className="grid size-10 place-items-center rounded-md bg-brand-100 text-brand-800">
                    <Layers3 size={19} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{output}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    원본 메시지를 채널별 문법에 맞게 바꿔 바로 수정 가능한 샘플로 보여줍니다.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-14 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold text-brand-300">MVP 사용 흐름</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                지금은 샘플, 다음 단계는 실제 AI 생성 자동화입니다
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                API 연동 전에도 사용자가 어떤 가치를 느끼는지 검증할 수 있도록, 입력값 기반 샘플 결과를 먼저 제공합니다.
              </p>
            </div>
            <ol className="grid gap-3">
              {workflow.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-lg border border-white/12 bg-white/6 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-brand-300 text-sm font-semibold text-brand-900">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-100 sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="plans" className="bg-slate-50 py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-brand-700">사용량 기반 비즈니스 모델</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                무료 3회에서 월 500회 생성까지 확장합니다
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-4">
              {contentPackPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`flex h-full flex-col rounded-lg border bg-white p-5 shadow-sm ${
                    plan.highlighted ? "border-brand-500 shadow-brand-900/10" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-slate-950">{plan.name}</h3>
                    {plan.highlighted ? (
                      <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                        추천
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-slate-950">
                    {plan.price === 0 ? "무료" : formatPrice(plan.price)}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-brand-700">
                    <Gauge size={17} aria-hidden="true" />
                    <span className="text-sm font-semibold">월 {plan.monthlyQuota}회 생성</span>
                  </div>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{plan.summary}</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-700">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-800 py-12 text-white sm:py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-brand-100">
                <ShieldCheck size={18} aria-hidden="true" />
                <span className="text-sm font-semibold">강의 상품과 연결되는 서비스 MVP</span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight">
                콘텐츠 자동화 강의를 실제 도구 경험으로 확장합니다
              </h2>
              <p className="mt-3 text-sm leading-6 text-brand-50 sm:text-base">
                샘플 생성 → 템플릿 학습 → 유료 생성 한도 확장으로 자연스럽게 이어지는 ScriptWizard 서비스 흐름입니다.
              </p>
            </div>
            <Link
              href="/#pricing"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              강의 상품 보기
              <Sparkles size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
