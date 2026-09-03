'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Avatar3D } from './Avatar3D';
import { Reveal } from './Reveal';
import { useTileMotion, useMagnetic } from './useTileMotion';
import { usePrefersReducedMotion } from './useReducedMotion';

/** Two designed lines, so the walk never has to chase a wrapped last word. */
const HEADLINE: string[][] = [
  ['Somewhere', 'to'],
  ['actually', 'be.'],
];
const WORDS = HEADLINE.flat();

/** How wide the shove reaches, as a fraction of the headline's width. */
const REACH = 0.48;

/** Everything below is published by social.serika.dev. Nothing is estimated. */
const specs = [
  {
    k: '80',
    unit: 'players in a room',
    d: 'Area-of-interest filtering and LOD pose updates keep the bandwidth budget flat as the room fills.',
  },
  {
    k: 'OpenXR',
    unit: 'Quest and SteamVR',
    d: 'Smooth locomotion, snap turning and hand tracking, not a screen bolted to a headset.',
  },
  {
    k: 'Crossplay',
    unit: 'desktop and VR',
    d: 'WASD and mouse on any screen, full motion in a headset. Same worlds, same friends.',
  },
  {
    k: 'Godot',
    unit: 'SDK for worlds',
    d: 'CSG, particles and custom lighting. The editor plugin validates and uploads your scene.',
  },
];

const platforms = ['Windows', 'macOS', 'Linux', 'Android', 'Meta Quest'];

/** Falloff curve. Squared so the shove is soft at the edges and firm up close. */
function shove(center: number, at: number) {
  const f = Math.max(0, 1 - Math.abs(center - at) / REACH);
  return { push: Math.sign(center - at) * f * f, lift: f * f };
}

function PushedWord({
  text,
  center,
  at,
  ready,
  reduced,
  strength,
  minX,
}: {
  text: string;
  center: number;
  at: MotionValue<number>;
  ready: boolean;
  reduced: boolean;
  strength: number;
  /** Furthest this word may travel left before it would leave the frame. */
  minX: number;
}) {
  const x = useTransform(at, (a: number) =>
    Math.max(minX, shove(center, a).push * strength),
  );
  const y = useTransform(at, (a: number) => -shove(center, a).lift * 42);
  const rotate = useTransform(
    at,
    (a: number) => shove(center, a).push * 11,
  );

  return (
    <motion.span
      className="inline-block will-change-transform"
      style={ready && !reduced ? { x, y, rotate } : undefined}
    >
      {text}
      &nbsp;
    </motion.span>
  );
}

/**
 * Act 3, and the signature move. An avatar walks out of the depth and
 * physically shoulders the headline apart, then the page it was hiding is
 * Serika Social. The push is the advert: the product is a place with people in
 * it, so a person arrives and takes up room.
 */
export function SocialAct() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const tile = useTileMotion();
  const magnet = useMagnetic(0.26);

  const [centers, setCenters] = useState<number[]>([]);
  const [lefts, setLefts] = useState<number[]>([]);
  const [width, setWidth] = useState(0);

  const measure = useCallback(() => {
    const line = lineRef.current;
    if (!line) return;
    const w = line.offsetWidth || 1;
    const originLeft = line.getBoundingClientRect().left;
    setWidth(w);
    setCenters(
      wordRefs.current.map((el) =>
        el ? (el.offsetLeft + el.offsetWidth / 2) / w : 0,
      ),
    );
    // Distance from the viewport's left gutter to each word's resting edge.
    setLefts(
      wordRefs.current.map((el) => (el ? originLeft + el.offsetLeft : 0)),
    );
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    measure();
    // Word positions shift as the display font loads, and a stale centre makes
    // the avatar shove the wrong word.
    const ro = new ResizeObserver(measure);
    ro.observe(line);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // Driven by the act crossing the viewport rather than by pinning it. A pin
  // would have to buy its scrub range in page height, and this move already
  // costs a viewport; traversal gives roughly two viewports of range for free.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // The walk: off the left edge, across, and out the right. It runs only while
  // the act is actually on screen, which is the middle of that range.
  const atFrac = useTransform(scrollYProgress, [0.18, 0.82], [-0.25, 1.25]);
  const atPx = useTransform(atFrac, (f: number) => f * width);
  const turn = useTransform(scrollYProgress, [0.18, 0.5, 0.82], [34, 44, 28]);
  const bob = useTransform(scrollYProgress, (p: number) => Math.sin(p * 46) * 7);
  const avatarFade = useTransform(
    scrollYProgress,
    [0.16, 0.26, 0.74, 0.84],
    [0, 1, 1, 0],
  );

  const ready = centers.length === WORDS.length && width > 0;
  // A firm shove is safe now that each word clamps at the frame edge.
  const strength = Math.min(120, Math.max(52, width * 0.13));

  let word = 0;

  return (
    <section id="social" className="scroll-mt-20">
      {/* Phase one: the shove. */}
      <div
        ref={ref}
        className="scene relative flex h-[88vh] min-h-[27rem] items-center overflow-hidden md:h-[96vh]"
      >
        <div className="flex w-full items-center">
          <div
            aria-hidden="true"
            className="drift-a absolute inset-0 bg-[radial-gradient(46rem_32rem_at_50%_60%,rgba(139,92,246,0.16),transparent_65%)]"
          />

          <div className="relative mx-auto w-full max-w-6xl px-5">
            <motion.h2
              ref={lineRef}
              className="display relative z-10 w-fit text-[clamp(2rem,9.5vw,5.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[var(--text)]"
            >
              {HEADLINE.map((line) => (
                <span key={line.join('-')} className="block whitespace-nowrap">
                  {line.map((w) => {
                    const i = word;
                    word += 1;
                    return (
                      <span
                        key={`${w}-${i}`}
                        ref={(el) => {
                          wordRefs.current[i] = el;
                        }}
                        className="inline-block"
                      >
                        <PushedWord
                          text={w}
                          center={centers[i] ?? 0}
                          minX={-Math.max(0, (lefts[i] ?? 0) - 12)}
                          at={atFrac}
                          ready={ready}
                          reduced={reduced}
                          strength={strength}
                        />
                      </span>
                    );
                  })}
                </span>
              ))}
            </motion.h2>

            {/* The figure, walking through the line it is shoving apart. */}
            {!reduced && width > 0 && (
              <motion.div
                aria-hidden="true"
                /* Offsets live on the inner element: framer writes the inline
                   transform here and would overwrite a Tailwind translate. */
                className="preserve-3d pointer-events-none absolute left-0 top-1/2 z-20"
                style={{ x: atPx, opacity: avatarFade }}
              >
                <div className="preserve-3d -translate-x-1/2 -translate-y-[58%]">
                  <Avatar3D turn={turn} bob={bob} />
                </div>
              </motion.div>
            )}

            <motion.p
              className="relative z-10 mt-8 max-w-lg text-lg leading-relaxed text-[var(--muted)]"
            >
              Serika Social is an adults-only social VR platform. Pick an avatar,
              join a world, and talk to whoever is in it with spatial voice.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Phase two: what it actually is. Kept short so this act cannot out-span
          the peak: the pin already spends 155/190vh on the walk. */}
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--border)] pt-8">
            <div>
              <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-bold tracking-[-0.035em]">
                Serika<span className="text-[var(--accent-bright)]">Social</span>
              </h3>
              <p className="mono mt-2 text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
                Early access, 18+, free and open source
              </p>
            </div>
            <a
              href="https://social.serika.dev"
              target="_blank"
              rel="noopener noreferrer"
              {...magnet}
              className="magnetic group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-white"
            >
              Download the client
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {specs.map((s, i) => (
            <Reveal key={s.k} delay={0.05 + i * 0.06}>
              <div {...tile} className="tile tilt h-full p-5">
                <p className="z2 display text-3xl font-bold leading-none tracking-[-0.03em] text-[var(--accent-bright)]">
                  {s.k}
                </p>
                <p className="z1 mono mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--faint)]">
                  {s.unit}
                </p>
                <p className="z1 mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--faint)]">
              Runs on
            </p>
            {platforms.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-[var(--border-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)]"
              >
                {p}
              </span>
            ))}
            <p className="basis-full text-sm leading-relaxed text-[var(--muted)] sm:basis-auto sm:ml-2">
              Installers register the <span className="mono">serikasocial://</span>{' '}
              deep link and update themselves. Quest builds are sideloaded.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
