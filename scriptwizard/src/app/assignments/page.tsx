import type { Metadata } from "next";
import { UploadCloud } from "lucide-react";
import { WorkspacePage } from "@/components/workspace-page";

export const metadata: Metadata = {
  title: "과제 제출",
  description: "ScriptWizard 수강생이 콘텐츠 재가공 과제를 제출하는 공간입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AssignmentsPage() {
  return (
    <WorkspacePage
      eyebrow="과제 제출"
      title="만든 결과물을 제출하고 피드백 흐름을 남깁니다"
      description="블로그 초안, 카드뉴스 구성표, 쇼츠 대본 등을 제출하고 관리자가 확인할 수 있는 구조로 확장합니다."
      icon={UploadCloud}
      items={["블로그 글 초안 제출", "카드뉴스 구성표 제출", "쇼츠 대본 제출", "피드백 상태 확인"]}
    />
  );
}
