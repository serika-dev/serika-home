'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Wordmark } from '../Wordmark';
import { StatusDot, type Status } from '../StatusIndicator';
import { useStatuses } from '../useStatuses';
import { useMagnetic } from './useTileMotion';
import { usePrefersReducedMotion } from './useReducedMotion';
import type { Product } from '../../data/products';

/**
 * Product masthead. The product's own wordmark is the headline, echoed as an
 * outlined giant behind it the way SERIKA sits behind the homepage hero.
 */
export function ProductHero({
  product,
  badgeLabel,
  age,
}: {
  product: Product;
  badgeLabel: string | null;
  age: 'all' | 16 | 18;
}) {
  const reduced = usePrefersReducedMotion();
  const magnet = useMagnetic(0.26);
  // useStatuses keys its effect on this array's identity, so it has to be
  // stable. A fresh literal here re-runs the fetch on every render forever.
  const targets = useMemo(() => [product], [product]);
  const statuses = useStatuses(targets);
  const status = statuses[product.slug] as Status | undefined;

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const full = `${product.wordmark.main}${product.wordmark.sub ?? ''}`;

  return (
    <header className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-16">
      <div aria-hidden="true" className="absolute inset-0 -z-30">
        <div className="drift-a absolute inset-0 bg-[radial-gradient(58rem_38rem_at_12%_-20%,rgba(139,92,246,0.26),transparent_62%)]" />
        <div className="drift-b absolute inset-0 bg-[radial-gradient(38rem_26rem_at_90%_30%,rgba(91,33,182,0.20),transparent_62%)]" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 overflow-hidden [mask-image:radial-gradient(70%_70%_at_40%_30%,#000,transparent)]"
      >
        <div className="hairgrid grid-pan absolute -inset-24" />
      </div>

      {/* The product's own name as architecture behind it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none"
      >
        <div className="display stroke whitespace-nowrap text-center text-[22vw] font-bold leading-none tracking-[-0.04em]">
          {full}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          {...rise(0)}
          className="flex flex-wrap items-center gap-3"
        >
          {badgeLabel && (
            <span className="mono text-xs uppercase tracking-[0.2em] text-[var(--accent-bright)]">
              {badgeLabel}
            </span>
          )}
          <span className="mono inline-flex items-center rounded-md border border-[var(--border-strong)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--text)]">
            {age === 'all' ? 'All ages' : `${age}+`}
          </span>
          {product.statusCheck && (
            <span className="flex items-center gap-2">
              <StatusDot status={status ?? 'checking'} />
              <span className="mono text-xs text-[var(--faint)]">
                {status === 'operational'
                  ? 'operational'
                  : status === 'downtime'
                    ? 'downtime'
                    : 'checking'}
              </span>
            </span>
          )}
        </motion.div>

        <h1 className="mt-5">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={reduced ? undefined : { y: '108%' }}
              animate={reduced ? undefined : { y: '0%' }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Wordmark
                main={product.wordmark.main}
                sub={product.wordmark.sub}
                className="text-[clamp(2.6rem,8vw,5.5rem)] leading-none tracking-[-0.04em]"
              />
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...rise(0.42)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
        >
          {product.tagline}
        </motion.p>

        {product.url && (
          <motion.div {...rise(0.56)} className="mt-9">
            <a
              href={`https://${product.url}`}
              target="_blank"
              rel="noopener noreferrer"
              {...magnet}
              className="magnetic group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-white"
            >
              Visit {product.url}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        )}
      </div>
    </header>
  );
}
