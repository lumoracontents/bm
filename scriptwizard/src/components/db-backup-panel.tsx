"use client";

import { useState } from "react";
import { DatabaseBackup, Download, Loader2, ShieldCheck } from "lucide-react";

function getFilename(disposition: string | null) {
  const match = /filename="([^"]+)"/.exec(disposition ?? "");
  return match?.[1] ?? `scriptwizard-db-backup-${new Date().toISOString()}.json`;
}

export function DbBackupPanel() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("백업 토큰을 입력한 뒤 JSON 백업 파일을 내려받을 수 있습니다.");

  async function handleBackup() {
    setStatus("loading");
    setMessage("백업 파일을 생성하는 중입니다.");

    try {
      const response = await fetch("/api/admin/db-backup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-admin-backup-token": token } : {}),
        },
        body: JSON.stringify({ token: token || undefined }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message ?? "DB 백업을 생성하지 못했습니다.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = getFilename(response.headers.get("Content-Disposition"));
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);

      setStatus("success");
      setMessage("DB 백업 파일 다운로드를 시작했습니다.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "DB 백업 중 오류가 발생했습니다.");
    }
  }

  return (
    <section className="rounded-lg border border-brand-100 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-brand-700">
            <DatabaseBackup size={20} aria-hidden="true" />
            <h2 className="text-xl font-semibold text-slate-950">DB 백업</h2>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Supabase public 스키마의 운영 데이터를 JSON 파일로 내려받습니다. 백업 파일에는 주문,
            권한, 과제, 게시글 등 개인정보가 포함될 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 text-sm font-medium text-brand-800">
          <ShieldCheck size={16} aria-hidden="true" />
          서버 인증 필요
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">백업 토큰</span>
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            type="password"
            autoComplete="off"
            placeholder="ADMIN_BACKUP_TOKEN"
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <button
          type="button"
          onClick={handleBackup}
          disabled={status === "loading"}
          className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-900 px-4 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" size={16} aria-hidden="true" />
          ) : (
            <Download size={16} aria-hidden="true" />
          )}
          백업 다운로드
        </button>
      </div>

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
