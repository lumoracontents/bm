import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";

const navItems = [
  { href: "/#recommend", label: "추천 대상" },
  { href: "/#curriculum", label: "커리큘럼" },
  { href: "/#pricing", label: "가격" },
  { href: "/consulting", label: "컨설팅" },
  { href: "/blog", label: "블로그" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <span className="grid size-8 place-items-center rounded-md bg-slate-950 text-white">
            <BookOpenCheck size={18} aria-hidden="true" />
          </span>
          <span>ScriptWizard</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden h-10 items-center justify-center rounded-md px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 md:flex"
          >
            로그인
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand-700 px-4 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            수강 신청
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
