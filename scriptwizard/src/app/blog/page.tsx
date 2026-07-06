import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: "콘텐츠 전략 블로그",
  description: "유튜브 영상 재가공, 블로그 변환, 스레드, 카드뉴스, 쇼츠 대본 자동화 전략을 다룹니다.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="콘텐츠 전략 블로그"
            title="검색과 AI 답변에 걸리는 콘텐츠 자산을 쌓습니다"
            description="AEO와 GEO를 고려해 질문형 주제, 명확한 답변, 실제 적용 예시 중심의 글을 축적하는 구조입니다."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="mb-5 grid size-11 place-items-center rounded-md bg-white text-brand-700">
                  <FileText size={22} aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-brand-700">{post.category}</p>
                <h2 className="mt-3 text-xl font-semibold leading-7 text-slate-950">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
                >
                  글 읽기
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
