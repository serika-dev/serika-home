import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Circle,
  ShieldAlert,
} from 'lucide-react';
import { Wordmark } from '../../components/Wordmark';
import { Footer } from '../../components/Footer';
import { Reveal } from '../../components/home/Reveal';
import { ProductHero } from '../../components/home/ProductHero';
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
    title: `${product.name}, ${product.tagline}`,
    description: product.description[0],
    keywords: [product.name, ...product.keywords, 'Serika', 'open source'],
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

const badgeText = {
  soon: 'Launching soon',
  beta: 'Early release',
  dev: 'In development',
} as const;

function SectionLabel({
  children,
  extra,
}: {
  children: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-[var(--border)] pt-8">
      <h2 className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
        {children}
      </h2>
      {extra}
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const age = productAge(product);
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const [lede, ...rest] = product.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: product.name,
    url: product.url ? `https://${product.url}` : undefined,
    applicationCategory: 'Multimedia',
    operatingSystem: product.platforms?.join(', ') ?? 'Web',
    description: product.description[0],
    publisher: { '@type': 'Organization', name: 'The Serika Company' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <Script
        id={`ld-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-10">
        <ProductHero
          product={product}
          badgeLabel={
            product.badge
              ? badgeText[product.badge as keyof typeof badgeText]
              : null
          }
          age={age}
        />

        <div className="mx-auto max-w-6xl px-5 pb-28">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              <Reveal>
                <div className="border-t border-[var(--border)] pt-10">
                  <p className="max-w-3xl text-xl leading-relaxed text-[var(--text)]">
                    {lede}
                  </p>
                  {rest.length > 0 && (
                    <div className="mt-5 max-w-3xl space-y-4 text-[17px] leading-[1.75] text-[var(--muted)]">
                      {rest.map((para) => (
                        <p key={para.slice(0, 24)}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>

              {product.highlights && product.highlights.length > 0 && (
                <Reveal delay={0.05}>
                  <SectionLabel>At a glance</SectionLabel>
                  <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
                    {product.highlights.map((h) => (
                      <div
                        key={h.k}
                        className="bg-[var(--panel)] px-5 py-5 sm:px-6"
                      >
                        <dt className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--faint)]">
                          {h.k}
                        </dt>
                        <dd className="mt-2 text-[15px] leading-snug text-[var(--text)]">
                          {h.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}

              {product.features && product.features.length > 0 && (
                <Reveal delay={0.06}>
                  <SectionLabel>What it actually does</SectionLabel>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {product.features.map((f) => (
                      <li key={f.title} className="tile h-full p-5 sm:p-6">
                        <p className="display text-base font-bold tracking-[-0.02em] text-[var(--text)]">
                          {f.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                          {f.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {product.platforms && (
                <Reveal delay={0.06}>
                  <SectionLabel>Runs on</SectionLabel>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {product.platforms.map((pl) => (
                      <li
                        key={pl}
                        className="rounded-lg border border-[var(--border-strong)] px-3 py-2 text-sm font-medium text-[var(--text)]"
                      >
                        {pl}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {product.roadmap && (
                <Reveal delay={0.06}>
                  <SectionLabel
                    extra={
                      <p className="mono text-xs text-[var(--text)]">
                        {product.roadmap.filter((m) => m.done).length} of{' '}
                        {product.roadmap.length} shipped
                      </p>
                    }
                  >
                    Roadmap
                  </SectionLabel>
                  <ol className="mt-4">
                    {product.roadmap.map((m, i) => (
                      <li
                        key={m.name}
                        className="grid grid-cols-[auto_1fr_auto] items-start gap-3 border-b border-[var(--border)] py-4 last:border-b-0"
                      >
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center">
                          {m.done ? (
                            <Check
                              aria-hidden="true"
                              className="h-4 w-4 text-[var(--ok)]"
                            />
                          ) : (
                            <Circle
                              aria-hidden="true"
                              className="h-3.5 w-3.5 text-[var(--faint)]"
                            />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-baseline gap-x-2">
                            <span className="mono text-[0.65rem] text-[var(--faint)]">
                              M{i + 1}
                            </span>
                            <span className="text-sm font-medium text-[var(--text)]">
                              {m.name}
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-[var(--muted)]">
                            {m.note}
                          </span>
                        </span>
                        <span
                          className="mono mt-0.5 shrink-0 text-[0.65rem] uppercase tracking-[0.16em]"
                          style={{
                            color: m.done ? 'var(--ok)' : 'var(--faint)',
                          }}
                        >
                          {m.done ? 'done' : 'planned'}
                        </span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              )}

              <Reveal delay={0.08}>
                <div className="tile mt-12 p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <ShieldAlert
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-bright)]"
                    />
                    <div>
                      <p className="display text-base font-bold text-[var(--text)]">
                        {age === 'all'
                          ? 'Suitable for all ages'
                          : `Minimum age: ${age}+`}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                        {age === 'all'
                          ? 'This product is suitable for all ages.'
                          : age === 18
                            ? 'This product is strictly for users aged 18 or over. Attempting to bypass age or access restrictions, or helping others do so, will result in the suspension of all your accounts across every Serika service.'
                            : 'This product is for users aged 16 or over. Some sections may require you to be 18 or over. Attempting to bypass age or access restrictions, or helping others do so, will result in the suspension of all your accounts across every Serika service.'}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.12}>
              <aside className="lg:sticky lg:top-24 lg:self-start">
                {product.links && product.links.length > 0 && (
                  <>
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
                          className="group flex items-center justify-between gap-3 py-3 text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                        >
                          <span className="text-sm font-medium">
                            {link.label}
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 text-[var(--faint)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[var(--accent-bright)] group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </>
                )}

                <h2 className="mono mt-10 text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
                  Elsewhere at Serika
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {others.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="tile group px-4 py-3.5 transition-[border-color] hover:border-[var(--accent-line)]"
                    >
                      <Wordmark
                        main={p.wordmark.main}
                        sub={p.wordmark.sub}
                        className="text-base"
                      />
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                        {p.tagline}
                      </p>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/#flagship"
                  className="mono mt-8 inline-flex items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> All products
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
