import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-950">ScriptWizard</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            유튜브 영상 하나를 블로그, 스레드, 인스타 카드뉴스, 유튜브 쇼츠 대본으로
            확장하는 AI 콘텐츠 자동화 클래스입니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-slate-600 md:items-end">
          <Link className="font-medium transition hover:text-slate-950" href="/faq">
            FAQ
          </Link>
          <Link className="font-medium transition hover:text-slate-950" href="/blog">
            콘텐츠 전략 블로그
          </Link>
          <a
            className="inline-flex items-center gap-2 font-medium transition hover:text-slate-950"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            <Mail size={15} aria-hidden="true" />
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
