import type { Metadata } from "next";
import { MessageSquareText } from "lucide-react";
import { WorkspacePage } from "@/components/workspace-page";

export const metadata: Metadata = {
  title: "수강생 게시판",
  description: "ScriptWizard 공지, 질문, 콘텐츠 피드백 글을 올리는 수강생 게시판입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BoardPage() {
  return (
    <WorkspacePage
      eyebrow="수강생 게시판"
      title="공지와 질문, 콘텐츠 피드백을 한곳에 모읍니다"
      description="운영자는 콘텐츠와 공지를 올리고, 수강생은 질문과 과제 관련 글을 남길 수 있는 게시판으로 확장합니다."
      icon={MessageSquareText}
      items={["공지사항", "강의 질문", "과제 피드백", "콘텐츠 발행 사례 공유"]}
    />
  );
}
