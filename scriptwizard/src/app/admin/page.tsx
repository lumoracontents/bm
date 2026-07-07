import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { DbBackupPanel } from "@/components/db-backup-panel";
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
      items={[
        "상품과 가격 관리",
        "강의 모듈 관리",
        "PDF와 템플릿 관리",
        "과제 제출 확인",
        "DB 백업",
      ]}
    >
      <DbBackupPanel />
    </WorkspacePage>
  );
}
