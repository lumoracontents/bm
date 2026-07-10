import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, Gauge, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { YouTubeTranscriptDownloader } from "@/components/youtube-transcript-downloader";
import { formatPrice, siteConfig, transcriptPlans, youtubeTranscriptTool } from "@/lib/site";

export const metadata: Metadata = {
  title: youtubeTranscriptTool.name,
  description: youtubeTranscriptTool.description,
  alternates: {
    canonical: `/tools/${youtubeTranscriptTool.slug}`,
  },
  openGraph: {
    title: `${youtubeTranscriptTool.name} | ScriptWizard`,
    description: youtubeTranscriptTool.description,
    url: `/tools/${youtubeTranscriptTool.slug}`,
    images: ["/images/scriptwizard-hero.png"],
  },
};

const workflow = [
  "유튜브 영상 링크를 입력합니다.",
  "영상 ID와 다운로드 파일명을 자동으로 정리합니다.",
  "스크립트 TXT 파일을 내려받아 원본 자료로 저장합니다.",
  "ScriptWizard 강의 흐름에 맞춰 블로그, 스레드, 카드뉴스, 쇼츠 대본으로 재가공합니다.",
];

export default function YouTubeTranscriptToolPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: youtubeTranscriptTool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: youtubeTranscriptTool.description,
    offers: transcriptPlans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price,
      priceCurrency: "KRW",
      url: `${siteConfig.url}/tools/${youtubeTranscriptTool.slug}`,
    })),
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-slate-50">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold text-brand-700">{youtubeTranscriptTool.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              {youtubeTranscriptTool.name}
            </h1>
            <p className="mt-5 text-xl leading-8 text-slate-700">
              {youtubeTranscriptTool.summary}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-brand-700">무료</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  월 {youtubeTranscriptTool.freeQuota}개
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-brand-700">유료 확장</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">10배~100배</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-brand-700">파일 형식</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">TXT</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#downloader"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                지금 테스트
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="#plans"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                요금제 보기
              </Link>
            </div>
          </div>

          <div id="downloader">
            <YouTubeTranscriptDownloader />
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-700">사용 흐름</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                스크립트 확보부터 콘텐츠 재가공까지 이어집니다
              </h2>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {workflow.map((step, index) => (
                <li key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <span className="grid size-8 place-items-center rounded-md bg-brand-100 text-sm font-semibold text-brand-900">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-slate-700 sm:text-base">{step}</p>
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
                무료 10개에서 유료 100·500·1,000개로 확장합니다
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-4">
              {transcriptPlans.map((plan) => (
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
                    <span className="text-sm font-semibold">월 {plan.monthlyQuota}개</span>
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
                <span className="text-sm font-semibold">사업모델 확장 지점</span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight">
                스크립트 다운로드를 시작점으로 유료 자동화 도구를 붙입니다
              </h2>
              <p className="mt-3 text-sm leading-6 text-brand-50 sm:text-base">
                원본 스크립트 확보, 요약, 재가공, 예약 발행으로 이어지는 구독형 기능으로 확장할 수 있습니다.
              </p>
            </div>
            <Link
              href="/#pricing"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              강의 상품과 연결
              <Download size={17} aria-hidden="true" />
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
