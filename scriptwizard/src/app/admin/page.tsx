import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, DatabaseBackup } from "lucide-react";
import { WorkspacePage } from "@/components/workspace-page";

export const metadata: Metadata = {
  title: "관리자",
  description: "ScriptWizard 상품, 강의, 자료, 게시글, 과제를 관리하는 관리자 화면입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <WorkspacePage
      eyebrow="관리자"
      title="상품, 강의, 자료, 과제를 운영하는 관리자 화면입니다."
      description="관리자 권한이 있는 계정만 접근하게 하고, 상품 구성과 콘텐츠 업로드, 과제 확인 흐름을 연결합니다."
      icon={ClipboardCheck}
      items={["상품과 가격 관리", "강의 모듈 관리", "PDF와 템플릿 관리", "과제 제출 확인"]}
    >
      <section className="rounded-lg border border-brand-100 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-brand-700">
              <DatabaseBackup size={20} aria-hidden="true" />
              <h2 className="text-xl font-semibold text-slate-950">DB 백업</h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              주요 운영 데이터를 JSON 파일로 내려받는 백업 페이지로 이동합니다.
            </p>
          </div>

          <Link
            href="/admin/backups"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-900 px-4 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            백업 페이지
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </WorkspacePage>
  );
}
