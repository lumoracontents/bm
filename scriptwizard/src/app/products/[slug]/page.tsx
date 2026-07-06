import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatPrice, getProduct, products, siteConfig } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ScriptWizard`,
      description: product.description,
      url: `/products/${product.slug}`,
      images: ["/images/scriptwizard-hero.png"],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-slate-50">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold text-brand-700">{product.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-xl leading-8 text-slate-700">{product.summary}</p>
            <p className="mt-8 text-4xl font-semibold text-slate-950">
              {formatPrice(product.price)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                구매하고 시작하기
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                다른 상품 비교
              </Link>
            </div>
          </div>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">포함 내용</h2>
            <p className="mt-3 leading-7 text-slate-600">{product.description}</p>
            <ul className="mt-6 space-y-4">
              {product.includes.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2 font-semibold text-slate-950">
                <ShieldCheck size={18} aria-hidden="true" />
                추천 대상
              </div>
              <p className="mt-3 leading-7 text-slate-600">{product.bestFor}</p>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
