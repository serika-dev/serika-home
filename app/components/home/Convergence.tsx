'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Wordmark } from '../Wordmark';
import { products } from '../../data/products';
import { usePrefersReducedMotion } from './useReducedMotion';
import { useMagnetic } from './useTileMotion';

/**
 * Scatter, as fractions of the viewport. Fixed rather than random so the
 * composition is art directed and identical on every load.
 */
const scatter: { x: number; y: number; r: number; s: number }[] = [
  { x: -0.34, y: -0.32, r: -7, s: 1.05 },
  { x: 0.31, y: -0.36, r: 6, s: 0.9 },
  { x: -0.4, y: 0.02, r: 3, s: 0.8 },
  { x: 0.38, y: -0.04, r: -5, s: 1.0 },
  { x: -0.26, y: 0.3, r: 8, s: 0.85 },
  { x: 0.24, y: 0.33, r: -4, s: 0.95 },
  { x: -0.05, y: -0.42, r: 2, s: 0.75 },
  { x: 0.06, y: 0.42, r: -2, s: 0.8 },
  { x: -0.44, y: -0.16, r: 5, s: 0.7 },
  { x: 0.43, y: 0.18, r: -6, s: 0.72 },
  { x: 0.0, y: -0.16, r: 0, s: 0.68 },
];

function Fragment({
  progress,
  index,
  main,
  sub,
  vw,
  vh,
  spot,
}: {
  progress: MotionValue<number>;
  index: number;
  main: string;
  sub?: string;
  vw: number;
  vh: number;
  spot: (typeof scatter)[number];
}) {
  // Each fragment starts its run slightly after the one before it.
  const start = index * 0.018;
  const end = 0.6;

  // A wordmark is roughly 200px wide, so the field is inset from both edges and
  // capped on wide screens.
  const xAmp = Math.min(vw, 1280) * 0.78;
  const x = useTransform(progress, [start, end], [spot.x * xAmp, 0]);
  const y = useTransform(progress, [start, end], [spot.y * vh * 0.78 + 8, 0]);
  const rotate = useTransform(progress, [start, end], [spot.r, 0]);
  const scale = useTransform(progress, [start, end], [spot.s, 0.3]);
  const opacity = useTransform(progress, [0, 0.08, 0.44, end], [0, 1, 1, 0]);

  // Depth. Marks start scattered through the room and rush toward the camera
  // as they collapse, so the convergence happens in three dimensions.
  const z = useTransform(
    progress,
    [start, end],
    [-420 - Math.abs(spot.x) * 380, 190],
  );
  const rotateY = useTransform(progress, [start, end], [spot.x * -34, 0]);
  const rotateX = useTransform(progress, [start, end], [spot.y * 26, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
      style={{ x, y, z, rotate, rotateX, rotateY, scale, opacity }}
    >
      <Wordmark
        main={main}
        sub={sub}
        className="text-[clamp(1.4rem,4vw,3rem)]"
      />
    </motion.div>
  );
}

/**
 * Act 7, the peak. Every product wordmark flies inward through depth and
 * collapses, and the company name resolves out of them. It gets the most
 * scroll room on the page, and act 6 sits motionless in front of it on purpose.
 */
export function Convergence() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const magnet = useMagnetic(0.3);

  useEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // The glow swells as the marks collapse into it, then holds.
  const glowSwell = useTransform(
    scrollYProgress,
    [0, 0.42, 0.62, 1],
    [0.25, 0.6, 1, 1],
  );
  const glowScale = useTransform(scrollYProgress, [0, 0.62], [0.6, 1]);

  const logoOpacity = useTransform(scrollYProgress, [0.48, 0.66], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0.48, 0.66], [0.82, 1]);
  const logoBlur = useTransform(
    scrollYProgress,
    [0.48, 0.66],
    ['blur(14px)', 'blur(0px)'],
  );
  const ctaOpacity = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.68, 0.82], [26, 0]);

  const cta = (
    <>
      <p className="mt-8 max-w-md text-center text-base leading-relaxed text-[var(--muted)]">
        Seven products, one company, all of it readable. Come build, break or
        just watch.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
        <a
          href="https://accounts.serika.dev"
          target="_blank"
          rel="noopener noreferrer"
          {...magnet}
          className="magnetic group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-white"
        >
          Join us
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </a>
        <a
          href="https://github.com/serika-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          Read the source
        </a>
      </div>
    </>
  );

  if (reduced) {
    return (
      <section
        id="company"
        className="mx-auto flex max-w-6xl scroll-mt-20 flex-col items-center px-5 py-32"
      >
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
          {products.map((p) => (
            <Wordmark
              key={p.slug}
              main={p.wordmark.main}
              sub={p.wordmark.sub}
              className="text-xl text-[var(--muted)]"
            />
          ))}
        </div>
        <h2 className="display mt-12 text-center text-[clamp(2rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.04em]">
          The Serika <span className="text-[var(--accent-bright)]">Company</span>
        </h2>
        {cta}
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="company"
      /* The peak. Deliberately the longest act on the page. */
      className="relative h-[290vh] scroll-mt-20 md:h-[300vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(45rem_35rem_at_50%_50%,rgba(139,92,246,0.20),transparent_65%)]"
          style={{ opacity: glowSwell, scale: glowScale }}
        />

        {/* The seven, converging. Decorative: every name is real markup above.
            One shared vanishing point for the whole field. */}
        {vp.w > 0 && (
          <div
            aria-hidden="true"
            className="scene preserve-3d absolute inset-0"
          >
            {products.map((p, i) => (
              <Fragment
                key={p.slug}
                progress={scrollYProgress}
                index={i}
                main={p.wordmark.main}
                sub={p.wordmark.sub}
                vw={vp.w}
                vh={vp.h}
                spot={scatter[i % scatter.length]}
              />
            ))}
          </div>
        )}

        <div className="relative flex flex-col items-center px-5">
          <motion.h2
            style={{ opacity: logoOpacity, scale: logoScale, filter: logoBlur }}
            className="display text-center text-[clamp(2rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.04em]"
          >
            The Serika{' '}
            <span className="text-[var(--accent-bright)]">Company</span>
          </motion.h2>

          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="flex flex-col items-center"
          >
            {cta}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
