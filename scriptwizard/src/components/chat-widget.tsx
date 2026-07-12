"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
  sources?: string[];
};

const GREETING: Message = {
  role: "bot",
  content:
    "안녕하세요! ScriptWizard 안내 도우미예요. 콘텐츠 자동화, 요금, 이용 방법 등 무엇이든 물어보세요 🙂",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "요청에 실패했어요.");
      }
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.answer, sources: data.sources },
      ]);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "오류가 발생했어요.";
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `⚠️ ${detail}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        type="button"
        aria-label={open ? "챗봇 닫기" : "챗봇 열기"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#183028] text-white shadow-lg transition hover:scale-105 hover:bg-[#0f1f1a] focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* 챗 패널 */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-[#183028] px-4 py-3 text-white">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">ScriptWizard 도우미</span>
              <span className="text-[11px] text-emerald-200">
                내 지식 기반 RAG 챗봇
              </span>
            </div>
            <button
              type="button"
              aria-label="닫기"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-[#183028] text-white"
                      : "bg-white text-slate-800 shadow-sm"
                  }`}
                >
                  {m.content}
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2 border-t border-black/5 pt-1.5 text-[11px] text-slate-400">
                      출처: {m.sources.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-3 py-2 text-sm text-slate-400 shadow-sm">
                  답변 찾는 중…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-2.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 점을 입력하세요"
              aria-label="메시지 입력"
              className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-[#183028] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0f1f1a] disabled:opacity-40"
            >
              전송
            </button>
          </form>
        </div>
      )}
    </>
  );
}
