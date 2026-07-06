import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts, siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-white py-16 lg:py-24">
        <article className="mx-auto max-w-3xl px-5 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            블로그로 돌아가기
          </Link>
          <p className="mt-10 text-sm font-semibold text-brand-700">{post.category}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-600">{post.excerpt}</p>
          <div className="mt-10 space-y-6 leading-8 text-slate-700">
            <p>
              이 글은 ScriptWizard의 콘텐츠 전략 글감을 담는 초기 페이지입니다. 실제 운영
              단계에서는 원본 영상 예시, 변환 전후 비교, 프롬프트, 발행 체크리스트를
              포함해 검색과 AI 답변 모두가 이해하기 쉬운 형식으로 확장합니다.
            </p>
            <p>
              핵심은 AI에게 단순 요약을 맡기는 것이 아니라, 타깃 독자가 원하는 답변 구조와
              채널별 문법을 먼저 정한 뒤 콘텐츠를 재가공하는 것입니다.
            </p>
          </div>
        </article>
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
