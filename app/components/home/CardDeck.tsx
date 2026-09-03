'use client';

import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Wordmark } from '../Wordmark';
import { StatusDot, type Status } from '../StatusIndicator';
import { useStatuses } from '../useStatuses';
import { bySlugs, buildingSlugs, type Product } from '../../data/products';
import { usePrefersReducedMotion } from './useReducedMotion';
import { useTileMotion } from './useTileMotion';
import { Reveal } from './Reveal';

const badgeText: Record<string, string> = {
  dev: 'In development',
  beta: 'Early release',
  soon: 'Launching soon',
};

/** Depth between adjacent cards in the resting stack, in pixels. */
const GAP_Z = 300;
/** How far a card travels past the camera on its way out. */
const EXIT_Z = 520;

function Card({
  product,
  status,
  index,
  count,
  progress,
}: {
  product: Product;
  status?: Status;
  index: number;
  count: number;
  progress: MotionValue<number>;
  }) {
  const step = 1 / count;
  const last = index === count - 1;
  // The point at which this card is front and centre, and the point at which
  // it has flown past. Nudged apart so no two stops in a range collide.
  const at = Math.min(0.98, index * step + 0.02);
  const out = last ? 1 : Math.min(0.99, (index + 1) * step + 0.02);

  const z = useTransform(
    progress,
    [0, at, out, 1],
    [-index * GAP_Z, 0, last ? 0 : EXIT_Z, last ? 0 : EXIT_Z],
  );
  const y = useTransform(
    progress,
    [0, at, out, 1],
    [index * 26, 0, last ? 0 : -40, last ? 0 : -40],
  );
  const rotateX = useTransform(
    progress,
    [0, at, out, 1],
    [index * 4, 0, last ? 0 : -9, last ? 0 : -9],
  );
  // The outgoing card is fully gone well before the next reaches full, so two
  // cards' worth of text never sit legible on top of each other.
  const opacity = useTransform(
    progress,
    [
      0,
      at,
      Math.max(at + 0.01, out - 0.17),
      Math.max(at + 0.02, out - 0.05),
    ],
    [index === 0 ? 1 : 0.34, 1, 1, last ? 1 : 0],
  );

  return (
    <motion.div
      style={{ z, y, rotateX, opacity, zIndex: count - index }}
      /* Centred with flex, not a translate utility: framer writes the inline
         transform and would overwrite a Tailwind -translate-y-1/2. */
      className="absolute inset-0 flex items-center justify-center px-5"
    >
      <div className="w-full max-w-2xl">
        <DeckCard product={product} status={status} />
      </div>
    </motion.div>
  );
}

function DeckCard({
  product,
  status,
}: {
  product: Product;
  status?: Status;
}) {
  const tile = useTileMotion();

  return (
    <Link
      href={`/products/${product.slug}`}
      {...tile}
      className="tile tilt group block p-8 transition-[border-color] hover:border-[var(--accent-line)] sm:p-10"
    >
      <div className="z1 flex items-start justify-between gap-4">
        <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--faint)]">
          {product.badge ? badgeText[product.badge] : 'Also building'}
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--accent-bright)]" />
      </div>

      <div className="z2 mt-10 flex items-center gap-3">
        <Wordmark
          main={product.wordmark.main}
          sub={product.wordmark.sub}
          className="text-3xl sm:text-4xl"
        />
        {status && <StatusDot status={status} />}
      </div>

      <p className="z1 mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">
        {product.tagline}
      </p>

      {product.url && (
        <p className="z1 mono mt-8 text-xs text-[var(--faint)]">{product.url}</p>
      )}
    </Link>
  );
}

/**
 * Act 4. Three projects, so lateral panning has nothing to say. They stack in
 * depth instead and advance toward the camera one at a time, which is the only
 * act on the page that moves in Z.
 */
export function CardDeck() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const building = useMemo(() => bySlugs(buildingSlugs), []);
  const statuses = useStatuses(building);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (reduced) {
    return (
      <section
        id="building"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28"
      >
        <h2 className="display text-[clamp(2rem,5.2vw,3.75rem)] font-bold tracking-[-0.035em]">
          Still <span className="text-[var(--accent-bright)]">being built.</span>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {building.map((p) => (
            <DeckCard
              key={p.slug}
              product={p}
              status={statuses[p.slug] as Status | undefined}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="building"
      className="relative h-[128vh] scroll-mt-20 md:h-[150vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <div
          aria-hidden="true"
          className="drift-b absolute inset-0 bg-[radial-gradient(42rem_30rem_at_30%_70%,rgba(139,92,246,0.13),transparent_64%)]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5">
          <Reveal>
            <h2 className="display max-w-2xl text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-none tracking-[-0.035em]">
              Still{' '}
              <span className="text-[var(--accent-bright)]">being built.</span>
            </h2>
          </Reveal>
        </div>

        {/* The stage. One vanishing point shared by every card in the deck. */}
        <div className="scene-deep relative mt-10 h-[22rem] w-full">
          <div className="preserve-3d relative h-full w-full">
            {building.map((p, i) => (
              <Card
                key={p.slug}
                product={p}
                status={statuses[p.slug] as Status | undefined}
                index={i}
                count={building.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
