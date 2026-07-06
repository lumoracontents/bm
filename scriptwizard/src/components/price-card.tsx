import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice, type Product } from "@/lib/site";
import { cn } from "@/lib/utils";

type PriceCardProps = {
  product: Product;
};

export function PriceCard({ product }: PriceCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm",
        product.highlighted
          ? "border-brand-500 shadow-brand-900/10"
          : "border-slate-200",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-brand-700">{product.eyebrow}</p>
        {product.highlighted ? (
          <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
            추천
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-2xl font-semibold text-slate-950">{product.name}</h3>
      <p className="mt-2 min-h-14 text-sm leading-6 text-slate-600">{product.summary}</p>
      <p className="mt-6 text-3xl font-semibold text-slate-950">{formatPrice(product.price)}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-700">
        {product.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          "mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition",
          product.highlighted
            ? "bg-brand-700 text-white hover:bg-brand-800"
            : "border border-slate-300 text-slate-900 hover:bg-slate-50",
        )}
      >
        {product.cta}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
