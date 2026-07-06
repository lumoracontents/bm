import type { Metadata } from "next";
import { PlaySquare } from "lucide-react";
import { WorkspacePage } from "@/components/workspace-page";

export const metadata: Metadata = {
  title: "강의실",
  description: "ScriptWizard 영상 강의를 시청하는 수강생 전용 강의실입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LearnPage() {
  return (
    <WorkspacePage
      eyebrow="강의실"
      title="영상 강의는 구매 권한이 있는 수강생에게만 공개됩니다"
      description="Cloudflare Stream signed URL을 발급해 강의 영상 접근을 제어하는 구조로 연결합니다."
      icon={PlaySquare}
      items={["모듈 1. 원본 영상 분석", "모듈 2. 블로그 변환", "모듈 3. SNS 콘텐츠 분해", "모듈 4. 쇼츠 대본 제작"]}
    />
  );
}
