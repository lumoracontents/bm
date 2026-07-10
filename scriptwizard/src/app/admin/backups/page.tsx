import type { Metadata } from "next";
import { DatabaseBackup } from "lucide-react";
import { DbBackupPanel } from "@/components/db-backup-panel";
import { WorkspacePage } from "@/components/workspace-page";

export const metadata: Metadata = {
  title: "DB 백업",
  description: "ScriptWizard 관리자 DB 백업 페이지입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminBackupsPage() {
  return (
    <WorkspacePage
      eyebrow="관리자 / 백업"
      title="DB 백업 파일을 다운로드합니다."
      description="주요 운영 데이터를 JSON 파일로 내려받고, 비밀번호와 API 키 같은 환경 비밀값은 백업하지 않습니다."
      icon={DatabaseBackup}
      items={["JSON 백업 파일 생성", "주요 public 테이블 포함", "비밀번호·API 키 제외", "관리자 토큰 확인"]}
    >
      <DbBackupPanel />
    </WorkspacePage>
  );
}
