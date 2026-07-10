import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Clock3, FileText, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatPrice, remixAuditService, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: remixAuditService.name,
  description: remixAuditService.description,
  alternates: {
    canonical: `/services/${remixAuditService.slug}`,
  },
  openGraph: {
    title: `${remixAuditService.name} | ScriptWizard`,
    description: remixAuditService.description,
    url: `/services/${remixAuditService.slug}`,
    images: ["/images/scriptwizard-hero.png"],
  },
};

const processSteps = [
  "유튜브 영상 링크와 채널 목표를 제출합니다.",
  "핵심 메시지, 타깃, 검색 의도, 재가공 가능성을 진단합니다.",
  "블로그, 스레드, 카드뉴스, 쇼츠 대본 구성안을 정리합니다.",
  "7일 안에 발행할 수 있는 실행 순서와 우선순위를 제공합니다.",
];

export default function RemixAuditServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: remixAuditService.name,
    description: remixAuditService.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      price: remixAuditService.price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/services/${remixAuditService.slug}`,
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-slate-50">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold text-brand-700">{remixAuditService.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              {remixAuditService.name}
            </h1>
            <p className="mt-5 text-xl leading-8 text-slate-700">{remixAuditService.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-white px-4 py-3 text-3xl font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200">
                {formatPrice(remixAuditService.price)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
                <Clock3 size={16} aria-hidden="true" />
                {remixAuditService.turnaround}
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                진단 신청하기
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                서비스 비교
              </Link>
            </div>
          </div>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-slate-950">
              <ClipboardList size={22} aria-hidden="true" />
              <h2 className="text-2xl font-semibold">제공 결과물</h2>
            </div>
            <p className="mt-3 leading-7 text-slate-600">{remixAuditService.description}</p>
            <ul className="mt-6 space-y-4">
              {remixAuditService.includes.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2 font-semibold text-slate-950">
                <ShieldCheck size={18} aria-hidden="true" />
                추천 대상
              </div>
              <p className="mt-3 leading-7 text-slate-600">{remixAuditService.bestFor}</p>
            </div>
          </article>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-700">진행 방식</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                영상 하나를 바로 실행 가능한 콘텐츠 계획으로 바꿉니다
              </h2>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {processSteps.map((step, index) => (
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

        <section className="bg-brand-800 py-12 text-white sm:py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-brand-100">
                <FileText size={18} aria-hidden="true" />
                <span className="text-sm font-semibold">신규 비즈니스 모델</span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight">
                강의 구매 전환을 돕는 저가 진단 서비스입니다
              </h2>
              <p className="mt-3 text-sm leading-6 text-brand-50 sm:text-base">
                진단 리포트로 신뢰를 만든 뒤, 올인원 패키지와 1:1 컨설팅으로 자연스럽게 확장합니다.
              </p>
            </div>
            <Link
              href="/#pricing"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              기존 상품 보기
              <ArrowRight size={17} aria-hidden="true" />
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
