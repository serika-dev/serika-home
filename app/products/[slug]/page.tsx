import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Wordmark } from '../../components/Wordmark';
import { Footer } from '../../components/Footer';
import { products, getProduct, productAge } from '../../data/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const url = `https://serika.dev/products/${product.slug}`;
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description[0],
    keywords: [product.name, ...product.keywords, 'Serika', 'anime', 'open source'],
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | Serika`,
      description: product.description[0],
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Serika`,
      description: product.description[0],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: product.name,
    url: product.url ? `https://${product.url}` : undefined,
    applicationCategory: 'Multimedia',
    operatingSystem: 'Web',
    description: product.description[0],
    publisher: { '@type': 'Organization', name: 'The Serika Company' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <div className="glow" aria-hidden="true" />
      <Script
        id={`ld-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-10 mx-auto max-w-3xl px-5 py-20 sm:py-24">
        <Link
          href="/#products"
          className="mono inline-flex items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All products
        </Link>

        <div className="mt-8">
          <div className="flex items-center gap-3">
            {product.badge && (
              <span className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
                {product.badge === 'soon'
                  ? 'Launching soon'
                  : product.badge === 'dev'
                    ? 'In development'
                    : 'Early release'}
              </span>
            )}
            <span className="mono inline-flex items-center rounded-md border border-[var(--border-strong)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--text)]">
              {productAge(product) === 'all' ? 'All ages' : `${productAge(product)}+`}
            </span>
          </div>
          <h1 className="mt-3">
            <Wordmark
              main={product.wordmark.main}
              sub={product.wordmark.sub}
              className="text-4xl sm:text-5xl"
            />
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)]">{product.tagline}</p>

          {product.url && (
            <a
              href={`https://${product.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Visit {product.url} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="mt-12 space-y-5 border-t border-[var(--border)] pt-10 leading-relaxed text-[var(--muted)]">
          {product.description.map((para, i) => (
            <p key={i} className={i === 0 ? 'text-[var(--text)]' : undefined}>
              {para}
            </p>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5">
          <p className="text-sm font-semibold text-[var(--text)]">
            {productAge(product) === 'all'
              ? 'Age requirement — All ages'
              : `Age requirement — ${productAge(product)}+`}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {productAge(product) === 'all'
              ? 'This product is suitable for all ages.'
              : productAge(product) === 18
                ? 'This product is strictly for users aged 18 or over. Attempting to bypass age or access restrictions — or helping others do so — will result in the suspension of all your accounts across every Serika service.'
                : 'This product is for users aged 16 or over. Some sections may require you to be 18 or over. Attempting to bypass age or access restrictions — or helping others do so — will result in the suspension of all your accounts across every Serika service.'}
          </p>
        </div>

        {product.links && product.links.length > 0 && (
          <div className="mt-14">
            <h2 className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
              Links
            </h2>
            <div className="mt-4 flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {product.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                >
                  <span className="text-sm font-medium">{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
