"use client";

import { useMemo, useState } from "react";
import { Download, Link as LinkIcon, Loader2 } from "lucide-react";

function extractVideoId(url: string) {
  const trimmed = url.trim();

  if (!trimmed) {
    return null;
  }

  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function buildTranscriptFile(url: string, videoId: string) {
  const generatedAt = new Date().toISOString();

  return [
    "ScriptWizard YouTube Transcript Export",
    "",
    `Video URL: ${url}`,
    `Video ID: ${videoId}`,
    `Generated At: ${generatedAt}`,
    "",
    "사용량 모델",
    "- Free: 월 10개",
    "- Starter: 월 100개",
    "- Creator: 월 500개",
    "- Pro: 월 1,000개",
    "",
    "Transcript",
    "00:00 영상의 핵심 메시지를 확인하고 재가공 가능한 문장 단위로 나눕니다.",
    "00:15 블로그 글, 스레드, 인스타 카드뉴스, 쇼츠 대본으로 바꿀 포인트를 표시합니다.",
    "00:30 원본 스크립트를 기반으로 멀티채널 콘텐츠 제작 워크플로를 시작합니다.",
    "",
    "Note",
    "현재 실습 버전은 URL 분석과 TXT 다운로드 흐름을 보여주는 데모입니다.",
    "운영 버전에서는 YouTube 자막 API 또는 승인된 transcript provider를 연결합니다.",
  ].join("\n");
}

export function YouTubeTranscriptDownloader() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("유튜브 링크를 입력하면 스크립트 TXT 파일을 내려받을 수 있습니다.");
  const videoId = useMemo(() => extractVideoId(url), [url]);

  function downloadTranscript() {
    setStatus("loading");

    window.setTimeout(() => {
      if (!videoId) {
        setStatus("error");
        setMessage("유효한 유튜브 영상 링크를 입력해 주세요.");
        return;
      }

      const content = buildTranscriptFile(url.trim(), videoId);
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = downloadUrl;
      anchor.download = `scriptwizard-transcript-${videoId}.txt`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setStatus("success");
      setMessage("스크립트 TXT 파일 다운로드를 시작했습니다.");
    }, 350);
  }

  return (
    <section className="rounded-lg border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-100 text-brand-800">
          <LinkIcon size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">유튜브 스크립트 다운로드</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            링크를 넣고 버튼을 누르면 스크립트 파일이 내려받아지는 기능 흐름을 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">유튜브 링크</span>
          <input
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setStatus("idle");
              setMessage("유튜브 링크를 입력하면 스크립트 TXT 파일을 내려받을 수 있습니다.");
            }}
            type="url"
            inputMode="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <button
          type="button"
          onClick={downloadTranscript}
          disabled={status === "loading"}
          className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" size={17} aria-hidden="true" />
          ) : (
            <Download size={17} aria-hidden="true" />
          )}
          스크립트 다운로드
        </button>
      </div>

      {videoId ? (
        <p className="mt-3 text-sm text-brand-700">감지된 영상 ID: {videoId}</p>
      ) : null}
      <p
        className={`mt-3 text-sm leading-6 ${
          status === "error"
            ? "text-red-700"
            : status === "success"
              ? "text-brand-700"
              : "text-slate-500"
        }`}
        aria-live="polite"
      >
        {message}
      </p>
    </section>
  );
}
