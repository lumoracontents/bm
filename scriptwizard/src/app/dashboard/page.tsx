import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";
import { WorkspacePage } from "@/components/workspace-page";

export const metadata: Metadata = {
  title: "수강생 대시보드",
  description: "ScriptWizard 구매 권한, 강의 진행률, 자료, 과제, 게시판을 확인하는 수강생 대시보드입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <WorkspacePage
      eyebrow="수강생 홈"
      title="구매한 콘텐츠와 진행 상태를 한곳에서 확인합니다"
      description="결제 성공 후 생성되는 구매 권한을 기준으로 강의실, PDF 자료실, 과제 제출, 게시판 접근을 제어합니다."
      icon={LayoutDashboard}
      items={["내 구매 상품", "최근 강의 이어보기", "제출 대기 과제", "공지와 게시판 업데이트"]}
    />
  );
}
