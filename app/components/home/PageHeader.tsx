'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from './useReducedMotion';

/**
 * The masthead every non-home page opens with. Shares the homepage's plane
 * language: a drifting glow, a panning hairline grid, and a headline that
 * rises out of a mask on load.
 */
export function PageHeader({
  kicker,
  title,
  accent,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  /** Trailing fragment of the title, rendered in the brand purple. */
  accent?: string;
  lead?: string;
  children?: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <header className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <div className="drift-a absolute inset-0 bg-[radial-gradient(58rem_38rem_at_10%_-20%,rgba(139,92,246,0.26),transparent_62%)]" />
        <div className="drift-b absolute inset-0 bg-[radial-gradient(40rem_28rem_at_92%_20%,rgba(91,33,182,0.20),transparent_62%)]" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(70%_70%_at_40%_30%,#000,transparent)]"
      >
        <div className="hairgrid grid-pan absolute -inset-24" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        {kicker && (
          <motion.p
            {...rise(0)}
            className="mono text-xs uppercase tracking-[0.25em] text-[var(--accent-bright)]"
          >
            {kicker}
          </motion.p>
        )}

        <h1 className="display mt-5 max-w-4xl text-[clamp(2.4rem,7vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--text)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={reduced ? undefined : { y: '108%' }}
              animate={reduced ? undefined : { y: '0%' }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
              {accent && (
                <span className="text-[var(--accent-bright)]"> {accent}</span>
              )}
            </motion.span>
          </span>
        </h1>

        {lead && (
          <motion.p
            {...rise(0.42)}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
          >
            {lead}
          </motion.p>
        )}

        {children && (
          <motion.div {...rise(0.56)} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>
    </header>
  );
}
