import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Layers3,
  MessageSquareText,
  MonitorPlay,
  PenLine,
  Sparkles,
  Video,
} from "lucide-react";
import { PriceCard } from "@/components/price-card";
import { SectionHeading } from "@/components/section-heading";
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
  resources,
  siteConfig,
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

const channelIcons = [
  { label: "블로그 글", icon: FileText },
  { label: "스레드", icon: MessageSquareText },
  { label: "카드뉴스", icon: Layers3 },
  { label: "쇼츠 대본", icon: Video },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[82svh] items-center overflow-hidden bg-slate-950">
          <Image
            src="/images/scriptwizard-hero.png"
            alt="유튜브 영상이 블로그, 스레드, 인스타 카드뉴스, 쇼츠 대본으로 바뀌는 대시보드"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/64" />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
            <div className="max-w-5xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-2 text-sm font-semibold text-brand-50 ring-1 ring-white/20">
                <Sparkles size={16} aria-hidden="true" />
                1인 창작자를 위한 AI 콘텐츠 자동화 클래스
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                {siteConfig.mainCopy}
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-100 md:text-xl">
                영상 하나를 만들고 끝내지 마세요. 블로그, 스레드, 인스타 카드뉴스,
                유튜브 쇼츠 대본까지 한 번의 흐름으로 재가공하는 실전 시스템을 배웁니다.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
                >
                  패키지 보기
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  href="/consulting"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/35 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  1:1 컨설팅 안내
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {channelIcons.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <span className="grid size-10 place-items-center rounded-md bg-brand-50 text-brand-700">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="font-semibold text-slate-900">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="recommend" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="이런 분께 추천합니다"
              title="영상을 여러 채널의 매출 자산으로 바꾸고 싶은 분"
              description="ScriptWizard는 단순 요약 강의가 아니라, 이미 만든 영상을 반복 가능한 콘텐츠 생산 시스템으로 바꾸는 수업입니다."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {audience.map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                    <p className="leading-7 text-slate-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="수강 후 만들 수 있는 결과물"
              title="영상 한 편에서 네 가지 발행물을 만듭니다"
              align="center"
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {outcomes.map((outcome) => (
                <article key={outcome.title} className="rounded-lg border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">{outcome.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{outcome.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculum" className="bg-slate-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="mb-3 text-sm font-semibold text-brand-300">커리큘럼</p>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                자동화보다 먼저 콘텐츠 구조를 배웁니다
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                어떤 AI 도구를 쓰더라도 결과물이 안정적으로 나오도록 원본 영상 해석,
                프롬프트, 채널별 재구성 기준을 함께 다룹니다.
              </p>
            </div>
            <ol className="grid gap-3">
              {curriculum.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-lg border border-white/12 bg-white/6 p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-brand-300 text-sm font-semibold text-brand-900">
                    {index + 1}
                  </span>
                  <span className="leading-7 text-slate-100">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="제공 자료"
              title="수강 후 바로 쓰는 템플릿과 체크리스트"
              description="강의 내용을 실제 발행물로 옮길 수 있도록 반복 사용 가능한 자료를 함께 제공합니다."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {resources.map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <BookOpen className="mb-4 size-6 text-brand-700" aria-hidden="true" />
                  <p className="font-semibold leading-6 text-slate-950">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="상품 가격표"
              title="필요한 깊이에 맞춰 선택하세요"
              description="처음 시작하는 분부터 전체 시스템을 가져가고 싶은 분까지 선택할 수 있도록 구성했습니다."
              align="center"
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {products.map((product) => (
                <PriceCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="mb-3 text-sm font-semibold text-brand-700">1:1 줌 컨설팅 안내</p>
              <h2 className="text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                내 채널에 맞는 자동화 흐름을 바로 설계합니다
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{consulting.summary}</p>
              <p className="mt-6 text-3xl font-semibold text-slate-950">
                {formatPrice(consulting.price)}
              </p>
              <Link
                href="/consulting"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                컨설팅 신청하기
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {consulting.includes.map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <MonitorPlay className="mb-4 size-6 text-brand-700" aria-hidden="true" />
                  <p className="font-semibold text-slate-950">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <SectionHeading eyebrow="FAQ" title="구매 전 자주 묻는 질문" align="center" />
            <div className="mt-10 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950">
                    {faq.question}
                    <PenLine className="size-5 shrink-0 text-brand-700" aria-hidden="true" />
                  </summary>
                  <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-800 py-16 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-3xl font-semibold leading-tight">
                영상 하나를 네 개 채널의 콘텐츠로 바꾸세요
              </h2>
              <p className="mt-3 text-brand-50">
                올인원 패키지로 전자책, 영상강의, 템플릿, 과제 흐름을 한 번에 시작합니다.
              </p>
            </div>
            <Link
              href="/products/all-in-one"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              올인원 패키지 보기
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
