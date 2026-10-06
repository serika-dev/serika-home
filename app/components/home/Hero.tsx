'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from './useReducedMotion';
import { useMagnetic } from './useTileMotion';

const headline = [
  [{ t: 'Open', a: false }, { t: 'software,', a: false }],
  [{ t: 'built', a: false }, { t: 'out', a: false }, { t: 'of', a: false }],
  [{ t: 'curiosity.', a: true }],
];

/**
 * Act 1. Five planes travelling at different rates: two drifting glow fields,
 * a panning hairline grid, the outlined SERIKA backdrop, and the copy. Depth
 * comes from differential movement, not from a drop shadow.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const magnet = useMagnetic(0.28);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Depth reads from lag: the further a plane is, the more it trails the
  // scroll. The copy is the foreground, so it leads slightly instead.
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '52%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '36%']);
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const copyFade = useTransform(scrollYProgress, [0.15, 0.9], [1, 0]);

  let word = 0;

  return (
    <section
      ref={ref}
      /* Exactly one viewport, so the opening screen is a single composed frame
         with nothing peeking below it. */
      className="relative isolate flex h-[100svh] min-h-[34rem] items-center overflow-hidden pt-20 pb-12"
    >
      {/* Plane 1: two glow fields on different periods, so the ambience never
          settles into a loop the eye can lock onto. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-30"
        style={reduced ? undefined : { y: glowY }}
      >
        <div className="drift-a absolute inset-0 bg-[radial-gradient(65rem_45rem_at_12%_-15%,rgba(139,92,246,0.30),transparent_62%)]" />
        <div className="drift-b absolute inset-0 bg-[radial-gradient(45rem_34rem_at_88%_110%,rgba(91,33,182,0.26),transparent_60%)]" />
      </motion.div>

      {/* Plane 2: technical grid, panning by exactly one cell. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 overflow-hidden [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]"
        style={reduced ? undefined : { y: gridY }}
      >
        <div className="hairgrid grid-pan absolute -inset-24" />
      </motion.div>

      {/* Plane 3: the wordmark as architecture. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[42%] -z-10 select-none"
        style={reduced ? undefined : { y: markY, scale: markScale }}
      >
        <div className="display stroke whitespace-nowrap text-center text-[26vw] font-bold leading-none tracking-[-0.04em]">
          SERIKA
        </div>
      </motion.div>

      {/* Plane 4: the copy, moving fastest and receding as it goes. */}
      <motion.div
        className="relative mx-auto w-full max-w-6xl px-5"
        style={
          reduced ? undefined : { y: copyY, scale: copyScale, opacity: copyFade }
        }
      >
        <h1 className="display max-w-5xl text-[clamp(2.9rem,10.5vw,8rem)] font-bold leading-[0.93] tracking-[-0.045em] text-[var(--text)]">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.06em]">
              {line.map((w) => {
                const i = word;
                word += 1;
                return (
                  <motion.span
                    key={w.t}
                    className={`inline-block ${
                      w.a ? 'text-[var(--accent-bright)]' : ''
                    }`}
                    initial={reduced ? undefined : { y: '108%' }}
                    animate={reduced ? undefined : { y: '0%' }}
                    transition={{
                      duration: 0.9,
                      delay: 0.08 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {w.t}
                    {' '}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-9 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          The internet is at its best when people are free to create, learn and
          share. We build open source software anyone can use, learn from, or
          build upon, from anime streaming and image boards to chat, social VR
          and developer tools.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="#flagship"
            {...magnet}
            className="magnetic group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-white"
          >
            See what we&rsquo;ve built
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            About Serika
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
