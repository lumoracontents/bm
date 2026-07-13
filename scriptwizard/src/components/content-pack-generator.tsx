"use client";

import { useMemo, useState } from "react";
import { FileText, Layers3, Loader2, MessageSquareText, Sparkles, Video } from "lucide-react";

type Output = {
  title: string;
  icon: typeof FileText;
  body: string[];
};

const defaultScript =
  "영상에서 반복해서 강조한 핵심 메시지를 원본으로 삼아, 검색형 글과 SNS용 짧은 문장, 카드뉴스 흐름, 쇼츠 대본으로 재가공합니다.";

function summarizeInput(videoUrl: string, videoTitle: string, script: string) {
  const sourceTitle = videoTitle.trim() || "유튜브 영상 핵심 메시지";
  const sourceUrl = videoUrl.trim();
  const scriptSeed = script.trim() || defaultScript;
  const shortSeed = scriptSeed.length > 110 ? `${scriptSeed.slice(0, 110)}...` : scriptSeed;

  return { sourceTitle, sourceUrl, shortSeed };
}

function isLikelyYouTubeUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) {
    return true;
  }

  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(trimmed);
}

function buildOutputs(videoUrl: string, videoTitle: string, script: string): Output[] {
  const { sourceTitle, sourceUrl, shortSeed } = summarizeInput(videoUrl, videoTitle, script);
  const urlLine = sourceUrl ? `원본 링크: ${sourceUrl}` : "원본 링크: 입력 전 샘플";

  return [
    {
      title: "블로그 글 초안",
      icon: FileText,
      body: [
        `제목: ${sourceTitle} — 블로그 콘텐츠 초안`,
        `도입: 이 글은 영상의 핵심 메시지인 “${shortSeed}”를 검색 독자가 이해하기 쉬운 구조로 풀어냅니다.`,
        "본문 구성: 1) 문제 상황 2) 핵심 인사이트 3) 적용 단계 4) 체크리스트 5) 다음 행동 제안",
        "CTA: 원본 영상을 여러 채널 콘텐츠로 확장하고 싶다면 ScriptWizard 워크플로를 적용해 보세요.",
        urlLine,
      ],
    },
    {
      title: "스레드/X 게시글",
      icon: MessageSquareText,
      body: [
        `1/ ${sourceTitle} — 이 영상은 그냥 요약하면 아깝습니다.`,
        `2/ 핵심은 “${shortSeed}”입니다. 이 문장을 콘텐츠 기둥으로 잡습니다.`,
        "3/ 블로그는 검색 의도 중심, 스레드는 짧은 깨달음 중심, 카드뉴스는 단계 중심으로 나눕니다.",
        "4/ 쇼츠는 한 문장 훅 → 문제 → 해결 → CTA 순서로 다시 씁니다.",
        "5/ 같은 원본을 4개 채널에 맞춰 바꾸면 제작 시간보다 발행 효율이 먼저 올라갑니다.",
      ],
    },
    {
      title: "인스타 카드뉴스 문구",
      icon: Layers3,
      body: [
        `1장: ${sourceTitle}`,
        "2장: 긴 영상을 그대로 올리면 대부분 끝까지 보지 않습니다.",
        `3장: 먼저 핵심 문장 하나를 뽑습니다 — “${shortSeed}”`,
        "4장: 그 문장을 문제, 이유, 방법, 예시, 행동으로 쪼갭니다.",
        "5장: 각 장은 한 메시지만 담고, 마지막 장은 저장/공유 CTA로 마무리합니다.",
      ],
    },
    {
      title: "유튜브 쇼츠 대본",
      icon: Video,
      body: [
        `훅: ${sourceTitle}, 그냥 요약하면 조회수가 아니라 메모장에만 남습니다.`,
        `전개: 이 영상의 핵심은 “${shortSeed}”입니다.`,
        "반전: 중요한 건 새 콘텐츠를 또 만드는 게 아니라, 원본 하나를 채널별 언어로 바꾸는 겁니다.",
        "마무리: 블로그, 스레드, 카드뉴스, 쇼츠로 나누면 영상 한 편이 4개의 발행 자산이 됩니다.",
        "CTA: 더 자세한 변환 흐름은 ScriptWizard에서 확인하세요.",
      ],
    },
  ];
}

export function ContentPackGenerator() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [script, setScript] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("입력하지 않아도 예시 샘플을 볼 수 있습니다.");
  const outputs = useMemo(() => buildOutputs(videoUrl, videoTitle, script), [script, videoTitle, videoUrl]);
  const hasInput = Boolean(videoUrl.trim() || videoTitle.trim() || script.trim());

  function generateSamples() {
    if (!isLikelyYouTubeUrl(videoUrl)) {
      setSubmitted(false);
      setMessage("유튜브 링크는 youtube.com 또는 youtu.be 주소로 입력해 주세요. 제목이나 스크립트만으로도 생성할 수 있습니다.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setMessage("입력값을 반영해 4종 콘텐츠 샘플을 생성했습니다.");
    }, 280);
  }

  return (
    <section className="rounded-lg border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-100 text-brand-800">
          <Sparkles size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">샘플 콘텐츠 패키지 생성</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            지금은 실제 AI API 없이 입력값을 바탕으로 결과물 구조를 미리 보여주는 MVP입니다.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">유튜브 영상 링크</span>
          <input
            value={videoUrl}
            onChange={(event) => {
              setVideoUrl(event.target.value);
              setMessage("입력값을 반영해 샘플을 생성합니다.");
            }}
            type="text"
            inputMode="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">영상 제목</span>
          <input
            value={videoTitle}
            onChange={(event) => {
              setVideoTitle(event.target.value);
              setMessage("입력값을 반영해 샘플을 생성합니다.");
            }}
            type="text"
            placeholder="예: 유튜브 영상 하나로 콘텐츠 10개 만드는 법"
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">스크립트 일부</span>
          <textarea
            value={script}
            onChange={(event) => {
              setScript(event.target.value);
              setMessage("입력값을 반영해 샘플을 생성합니다.");
            }}
            rows={5}
            placeholder="영상에서 강조한 핵심 문장이나 스크립트 일부를 붙여넣으세요."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={generateSamples}
          disabled={loading}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={17} aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
          4종 콘텐츠 샘플 생성
        </button>
        <p className="text-sm leading-6 text-slate-500" aria-live="polite">
          {hasInput ? message : "입력하지 않아도 예시 샘플을 볼 수 있습니다."}
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {(submitted ? outputs : outputs.slice(0, 1)).map(({ title, icon: Icon, body }) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-slate-950">
              <span className="grid size-8 place-items-center rounded-md bg-white text-brand-700 ring-1 ring-slate-200">
                <Icon size={17} aria-hidden="true" />
              </span>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <ul className="mt-4 space-y-2 break-words text-sm leading-6 text-slate-700 [overflow-wrap:anywhere]">
              {body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
