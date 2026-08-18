'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';
import { Wordmark } from './Wordmark';
import { StatusDot, type Status } from './StatusIndicator';
import { useStatuses } from './useStatuses';
import {
  bySlugs,
  topProductSlugs,
  developmentSlugs,
  experimentSlugs,
  jynxSlugs,
  type Product,
} from '../data/products';

const badgeText: Record<NonNullable<Product['badge']>, string> = {
  soon: 'Launching soon',
  beta: 'Early release',
  dev: 'In development',
};

function Meta({ product, status }: { product: Product; status?: Status }) {
  if (status) return <StatusDot status={status} />;
  if (product.badge)
    return (
      <span className="text-xs font-medium text-[var(--faint)]">
        {badgeText[product.badge]}
      </span>
    );
  return null;
}

function SectionHead({
  n,
  title,
  blurb,
}: {
  n: string;
  title: string;
  blurb: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-3">
        <span className="mono text-xs text-[var(--faint)]">{n}</span>
        <h2 className="display text-2xl font-bold tracking-tight text-[var(--text)]">
          {title}
        </h2>
      </div>
      <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">{blurb}</p>
    </div>
  );
}

/** Featured, numbered rows for the flagship lineup. */
function RankRow({
  product,
  rank,
  status,
}: {
  product: Product;
  rank: number;
  status?: Status;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group -mx-4 flex items-center gap-5 rounded-2xl px-4 py-5 transition-colors hover:bg-[var(--panel)] sm:gap-7 sm:px-6"
    >
      <span className="display w-8 shrink-0 text-2xl font-bold tabular-nums text-[var(--faint)] transition-colors group-hover:text-[var(--accent)] sm:w-12 sm:text-4xl">
        {rank}
      </span>
      <div className="min-w-0 flex-grow">
        <div className="flex items-center gap-2.5">
          <Wordmark
            main={product.wordmark.main}
            sub={product.wordmark.sub}
            className="text-xl sm:text-2xl"
          />
          <Meta product={product} status={status} />
        </div>
        <p className="mt-1 truncate text-sm text-[var(--muted)]">{product.tagline}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--text)]" />
    </Link>
  );
}

/** Compact rows for secondary groups. */
function Row({ product, status }: { product: Product; status?: Status }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors hover:bg-[var(--panel)]"
    >
      <div className="min-w-0 flex-grow">
        <div className="flex items-center gap-2.5">
          <Wordmark
            main={product.wordmark.main}
            sub={product.wordmark.sub}
            className="text-lg"
          />
          <Meta product={product} status={status} />
        </div>
        <p className="mt-0.5 truncate text-sm text-[var(--muted)]">{product.tagline}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--text)]" />
    </Link>
  );
}

export function HomeProducts() {
  const top = useMemo(() => bySlugs(topProductSlugs), []);
  const dev = useMemo(() => bySlugs(developmentSlugs), []);
  const experiments = useMemo(() => bySlugs(experimentSlugs), []);
  const jynx = useMemo(() => bySlugs(jynxSlugs), []);

  const all = useMemo(
    () => [...top, ...dev, ...experiments, ...jynx],
    [top, dev, experiments, jynx],
  );
  const statuses = useStatuses(all);

  // Downtime drops a flagship product down the list automatically.
  const rankedTop = useMemo(
    () =>
      [...top].sort((a, b) => {
        const av = statuses[a.slug] === 'downtime' ? 1 : 0;
        const bv = statuses[b.slug] === 'downtime' ? 1 : 0;
        return av - bv;
      }),
    [top, statuses],
  );

  return (
    <div id="products" className="scroll-mt-24 space-y-20">
      {/* Flagship: full width, numbered lineup. */}
      <section>
        <SectionHead
          n="01"
          title="Flagship lineup"
          blurb="The products we put the most into. Anything down drops down the list automatically."
        />
        <div className="-mx-4">
          {rankedTop.map((product, i) => (
            <RankRow
              key={product.slug}
              product={product}
              rank={i + 1}
              status={statuses[product.slug] as Status | undefined}
            />
          ))}
        </div>
      </section>

      {/* Secondary groups, side by side to keep the page compact. */}
      <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
        <section>
          <SectionHead
            n="02"
            title="Also building"
            blurb="Part of the ecosystem, on the back burner for now."
          />
          <div className="-mx-4">
            {dev.map((product) => (
              <Row
                key={product.slug}
                product={product}
                status={statuses[product.slug] as Status | undefined}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHead
            n="03"
            title="Experiments"
            blurb="Early builds and learning projects, shared in the open."
          />
          <div className="-mx-4">
            {experiments.map((product) => (
              <Row key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </div>

      <section>
        <SectionHead
          n="04"
          title="Made by Jynx"
          blurb="Projects built by Jynx within the Serika ecosystem."
        />
        <div className="-mx-4 grid gap-x-12 sm:grid-cols-2">
          {jynx.map((product) => (
            <Row
              key={product.slug}
              product={product}
              status={statuses[product.slug] as Status | undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
