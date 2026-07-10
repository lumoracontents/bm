import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  Layers3,
  MessageSquareText,
  MonitorPlay,
  Video,
} from "lucide-react";
import { PriceCard } from "@/components/price-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  audience,
  consulting,
  curriculum,
  faqs,
  formatPrice,
  outcomes,
  products,
  remixAuditService,
  siteConfig,
  youtubeTranscriptTool,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.contactEmail,
    },
    {
      "@type": "Course",
      name: "AI 콘텐츠 자동화 실전 강의",
      description: siteConfig.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        sameAs: siteConfig.url,
      },
      offers: products.map((product) => ({
        "@type": "Offer",
        name: product.name,
        price: product.price,
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/products/${product.slug}`,
      })),
    },
    {
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
    },
    {
      "@type": "SoftwareApplication",
      name: youtubeTranscriptTool.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: youtubeTranscriptTool.description,
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "KRW",
        url: `${siteConfig.url}/tools/${youtubeTranscriptTool.slug}`,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

const quickOutcomes = [
  { label: "블로그", icon: FileText },
  { label: "스레드", icon: MessageSquareText },
  { label: "카드뉴스", icon: Layers3 },
  { label: "쇼츠 대본", icon: Video },
];

export default function Home() {
  const featuredProduct = products.find((product) => product.slug === "all-in-one") ?? products[2];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[72svh] items-center overflow-hidden bg-slate-950">
          <Image
            src="/images/scriptwizard-hero.png"
            alt="유튜브 영상을 여러 콘텐츠로 재가공하는 ScriptWizard 화면"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/68" />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
            <div className="max-w-5xl">
              <p className="mb-4 inline-flex items-center rounded-md bg-white/12 px-3 py-2 text-xs font-semibold text-brand-50 ring-1 ring-white/20 sm:text-sm">
                유튜브 1편으로 4개 채널 콘텐츠 만들기
              </p>
              <h1 className="text-[2rem] font-semibold leading-tight text-white sm:text-5xl">
                <span className="sm:hidden">
                  <span className="block">유튜브 영상 하나를</span>
                  <span className="block">멀티채널 콘텐츠로</span>
                  <span className="block">바꾸는 AI 클래스</span>
                </span>
                <span className="hidden sm:inline">{siteConfig.mainCopy}</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg sm:leading-8">
                블로그 글, 스레드, 인스타 카드뉴스, 쇼츠 대본까지 한 번에 재가공하는
                실전 워크플로를 배웁니다.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
                >
                  가격 보기
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  href="/products/all-in-one"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/35 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  올인원 패키지
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 sm:grid-cols-4 lg:px-8">
            {quickOutcomes.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex min-h-16 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-700">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-slate-900 sm:text-base">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="recommend" className="bg-slate-50 py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-700">추천 대상</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                이미 만든 영상을 더 오래 쓰고 싶은 분
              </h2>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {audience.slice(0, 4).map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <p className="text-sm leading-6 text-slate-700 sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-700">수강 후 결과물</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                영상 한 편을 네 가지 발행물로 바꿉니다
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map((outcome) => (
                <article key={outcome.title} className="rounded-lg border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold text-slate-950">{outcome.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{outcome.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-brand-50 py-14 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold text-brand-700">{remixAuditService.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                강의 전, 내 영상이 돈 되는 콘텐츠 자산인지 먼저 진단합니다
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                {remixAuditService.summary}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/services/${remixAuditService.slug}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
                >
                  서비스 보기
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <span className="inline-flex h-12 items-center rounded-md border border-brand-200 bg-white px-4 text-sm font-semibold text-brand-800">
                  {formatPrice(remixAuditService.price)} · {remixAuditService.turnaround}
                </span>
              </div>
            </div>

            <article className="rounded-lg border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-100 text-brand-800">
                  <ClipboardList size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-950">
                    {remixAuditService.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {remixAuditService.description}
                  </p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {remixAuditService.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-brand-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-100 text-brand-800">
                    <Download size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-700">
                      {youtubeTranscriptTool.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                      {youtubeTranscriptTool.name}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {youtubeTranscriptTool.summary}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-brand-800">
                      무료 월 {youtubeTranscriptTool.freeQuota}개 · 유료 100/500/1,000개 다운로드
                    </p>
                  </div>
                </div>
                <Link
                  href={`/tools/${youtubeTranscriptTool.slug}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-brand-200 px-5 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
                >
                  도구 보기
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section id="curriculum" className="bg-slate-950 py-14 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold text-brand-300">커리큘럼</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                도구보다 먼저 재가공 구조를 잡습니다
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                원본 영상 분석, 프롬프트 구조, 채널별 문장 변환까지 필요한 순서대로
                실습합니다.
              </p>
            </div>
            <ol className="grid gap-3">
              {curriculum.map((item, index) => (
                <li key={item} className="flex gap-3 rounded-lg border border-white/12 bg-white/6 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-brand-300 text-sm font-semibold text-brand-900">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-100 sm:text-base">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pricing" className="bg-slate-50 py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-brand-700">상품 가격표</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                먼저 적용하고, 필요하면 깊게 배웁니다
              </h2>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {products.map((product) => (
                <PriceCard key={product.slug} product={product} />
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <MonitorPlay className="mt-1 size-5 shrink-0 text-brand-700" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{consulting.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{consulting.summary}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="text-2xl font-semibold text-slate-950">
                  {formatPrice(consulting.price)}
                </p>
                <Link
                  href="/consulting"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  상담 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-brand-700">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">구매 전 자주 묻는 질문</h2>
            </div>
            <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200">
              {faqs.slice(0, 3).map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold text-slate-950">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-800 py-12 text-white sm:py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold leading-tight">가장 빠른 시작은 올인원 패키지입니다</h2>
              <p className="mt-3 text-sm leading-6 text-brand-50 sm:text-base">
                전자책, 영상강의, 템플릿, 과제 흐름을 한 번에 가져갑니다.
              </p>
            </div>
            <Link
              href={`/products/${featuredProduct.slug}`}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              올인원 보기
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
