import type { Metadata } from "next";
import { FolderDown } from "lucide-react";
import { WorkspacePage } from "@/components/workspace-page";
import { resources } from "@/lib/site";

export const metadata: Metadata = {
  title: "자료실",
  description: "ScriptWizard 전자책 PDF와 템플릿 자료를 확인하는 수강생 자료실입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResourcesPage() {
  return (
    <WorkspacePage
      eyebrow="자료실"
      title="PDF와 템플릿은 구매 권한 확인 후 다운로드됩니다"
      description="Supabase Storage 정책과 signed URL을 연결해 전자책, 템플릿, 체크리스트 자료를 안전하게 제공합니다."
      icon={FolderDown}
      items={resources}
    />
  );
}
