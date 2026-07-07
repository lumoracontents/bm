import Link from "next/link";
import { ArrowRight, LockKeyhole, type LucideIcon } from "lucide-react";

type WorkspacePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
  children?: React.ReactNode;
};

export function WorkspacePage({
  eyebrow,
  title,
  description,
  icon: Icon,
  items,
  children,
}: WorkspacePageProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
            ScriptWizard
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white"
          >
            구매 권한 연결
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 grid size-12 place-items-center rounded-md bg-brand-50 text-brand-700">
              <Icon size={24} aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-brand-700">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <LockKeyhole size={16} aria-hidden="true" />
              로그인 후 활성화
            </div>
            Supabase Auth와 구매 권한이 연결되면 이 영역은 실제 수강생 전용 화면으로
            전환됩니다.
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-medium text-slate-900">{item}</p>
            </div>
          ))}
        </div>

        {children ? <div className="mt-8">{children}</div> : null}
      </section>
    </main>
  );
}
