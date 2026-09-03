'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowUpRight, Headset } from 'lucide-react';
import { Wordmark } from '../Wordmark';
import { StatusDot, type Status } from '../StatusIndicator';
import { useStatuses } from '../useStatuses';
import { bySlugs, topProductSlugs } from '../../data/products';
import { CountUp } from './CountUp';
import { useTileMotion } from './useTileMotion';
import { useBooruStats } from './useBooruStats';
import { Reveal } from './Reveal';

const badgeText = {
  soon: 'Launching soon',
  beta: 'Early release',
  dev: 'In development',
} as const;

/**
 * Act 2. Four tiles, each carrying a different widget rather than the same
 * card four times: an indexed count, a revenue split, a live host readout, and
 * a depth-layered VR badge. Content sits on its own Z planes inside each tile,
 * so leaning one separates its contents rather than sliding a flat image.
 */
export function Flagship() {
  const top = useMemo(() => bySlugs(topProductSlugs), []);
  const statuses = useStatuses(top);
  const tile = useTileMotion();
  const stats = useBooruStats();

  // Composition of the index. Rendered only when the live figures arrive.
  const ratedTotal = stats
    ? stats.safe + stats.questionable + stats.explicit
    : 0;
  const rating =
    stats && ratedTotal > 0
      ? [
          { k: 'Safe', v: stats.safe, c: 'var(--ok)' },
          { k: 'Questionable', v: stats.questionable, c: 'var(--accent)' },
          { k: 'Explicit', v: stats.explicit, c: 'var(--down)' },
        ]
      : null;

  const [booru, moe, chat, social] = top;

  return (
    <section
      id="flagship"
      className="scene relative mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:py-24"
    >
      <Reveal>
        <h2 className="display max-w-3xl text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.03] tracking-[-0.035em]">
          The four we put
          <br />
          the <span className="text-[var(--accent-bright)]">most</span> into.
        </h2>
      </Reveal>

      {/* Booru holds the top-left 2x2, Moe and Social stack in the right
          column, and Chat runs the full width underneath. */}
      <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3">
        {/* Booru: the big tile, carrying the only large real number we own. */}
        <Reveal className="md:col-span-2 md:row-span-2" delay={0.05}>
          <Link
            href={`/products/${booru.slug}`}
            {...tile}
            className="tile tilt group flex h-full min-h-[26rem] flex-col p-7 transition-[border-color] hover:border-[var(--accent-line)] md:p-9"
          >
            <div className="z2 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Wordmark
                  main={booru.wordmark.main}
                  sub={booru.wordmark.sub}
                  className="text-2xl sm:text-3xl"
                />
                <StatusDot
                  status={(statuses[booru.slug] ?? 'checking') as Status}
                />
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--accent-bright)]" />
            </div>

            <p className="z1 mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)]">
              A fast, modern image board. Tag driven search, built to stay out
              of your way.
            </p>

            {/* More live figures rather than filler: the tile is tall, and an
                empty middle is worse than another real number. */}
            <dl className="z2 mt-6 grid grid-cols-3 gap-3 sm:mt-8 sm:gap-6">
              {[
                { l: 'Distinct tags', v: stats?.tags ?? null },
                { l: 'Registered users', v: stats?.users ?? null },
                {
                  l: 'Made by people',
                  v: null,
                  text:
                    stats && stats.images > 0
                      ? `${(100 - (stats.aiGenerated / stats.images) * 100).toFixed(1)}%`
                      : null,
                },
              ].map((f) => (
                <div key={f.l}>
                  <dt className="display text-base font-bold leading-none tracking-[-0.02em] text-[var(--text)] sm:text-2xl">
                    {f.text ?? (f.v === null ? (
                      <span className="text-[var(--faint)]">&mdash;&mdash;</span>
                    ) : (
                      <CountUp to={f.v} />
                    ))}
                  </dt>
                  <dd className="mono mt-2 text-[0.6rem] uppercase tracking-[0.16em] text-[var(--faint)]">
                    {f.l}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Real composition of the index, straight from the live stats.
                The previous chart here was generated from a sine wave: it had
                the shape of data while representing none. */}
            <div className="z1 mt-auto pt-10">
              {rating ? (
                <>
                  <div
                    aria-hidden="true"
                    className="flex h-3 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]"
                  >
                    {rating.map((r) => (
                      <span
                        key={r.k}
                        className="h-full"
                        style={{
                          width: `${(r.v / ratedTotal) * 100}%`,
                          backgroundColor: r.c,
                        }}
                      />
                    ))}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {rating.map((r) => (
                      <li
                        key={r.k}
                        className="mono flex items-center gap-2 text-xs text-[var(--muted)]"
                      >
                        <span
                          className="h-2 w-2 rounded-sm"
                          style={{ backgroundColor: r.c }}
                        />
                        {r.k}
                        <span className="text-[var(--faint)]">
                          {((r.v / ratedTotal) * 100).toFixed(1)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div
                  aria-hidden="true"
                  className="h-3 rounded-full bg-[rgba(255,255,255,0.06)]"
                />
              )}
            </div>

            {/* Live from the Booru's own stats endpoint. Blank, never guessed,
                if it cannot be reached. */}
            <div className="z3 mt-8 flex items-end justify-between gap-4 border-t border-[var(--border)] pt-6">
              <div className="display text-[clamp(2.2rem,6vw,4rem)] font-bold leading-none tracking-[-0.04em] text-[var(--text)]">
                {stats ? (
                  <CountUp to={stats.images} />
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block h-[0.12em] w-[1.7em] translate-y-[-0.28em] rounded-full bg-[var(--faint)]"
                  />
                )}
              </div>
              <p className="mono pb-1 text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
                Images indexed
              </p>
            </div>
          </Link>
        </Reveal>

        {/* SerikaMoe: the revenue split, which is the whole argument. */}
        <Reveal delay={0.14}>
          <Link
            href={`/products/${moe.slug}`}
            {...tile}
            className="tile tilt group flex h-full flex-col justify-between p-7 transition-[border-color] hover:border-[var(--accent-line)]"
          >
            <div className="z1 flex items-start justify-between gap-4">
              <Wordmark
                main={moe.wordmark.main}
                sub={moe.wordmark.sub}
                className="text-xl"
              />
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--accent-bright)]" />
            </div>

            <div className="z2 mt-8">
              <div className="flex items-baseline gap-2">
                <span className="display text-5xl font-bold tracking-tight text-[var(--accent-bright)]">
                  95%
                </span>
                <span className="mono text-xs text-[var(--faint)]">
                  to creators
                </span>
              </div>
              <div
                aria-hidden="true"
                className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.07)]"
              >
                <span className="h-full w-[95%] bg-[var(--accent)]" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                We keep 5% to run the platform. That is the way it should be.
              </p>
            </div>

            <span className="mono mt-8 text-xs text-[var(--faint)]">
              {badgeText[moe.badge as keyof typeof badgeText]}
            </span>
          </Link>
        </Reveal>

        {/* Social: the newest, and the only one that is a place rather than a page. */}
        <Reveal delay={0.22}>
          <Link
            href={`/products/${social.slug}`}
            {...tile}
            className="tile tilt group flex h-full flex-col justify-between p-7 transition-[border-color] hover:border-[var(--accent-line)]"
          >
            <div className="z1 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Wordmark
                  main={social.wordmark.main}
                  sub={social.wordmark.sub}
                  className="text-xl"
                />
                <StatusDot
                  status={(statuses[social.slug] ?? 'checking') as Status}
                />
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--accent-bright)]" />
            </div>

            <div className="z3 mt-8">
              <Headset
                aria-hidden="true"
                className="h-9 w-9 text-[var(--accent-bright)]"
              />
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Pick an avatar, join a world, talk to whoever is in it. Desktop,
                PC VR and native on Quest.
              </p>
            </div>

            <div className="z1 mt-8 flex items-center gap-2">
              <span className="mono rounded border border-[var(--border-strong)] px-1.5 py-0.5 text-[0.65rem] font-semibold text-[var(--text)]">
                18+
              </span>
              <span className="mono text-xs text-[var(--faint)]">
                {social.url}
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Chat: the wide base of the bento, laid out along its long axis. */}
        <Reveal delay={0.3} className="md:col-span-3">
          <Link
            href={`/products/${chat.slug}`}
            {...tile}
            className="tile tilt group flex h-full flex-col gap-6 p-7 transition-[border-color] hover:border-[var(--accent-line)] md:flex-row md:items-center md:justify-between md:gap-10 md:p-8"
          >
            <div className="z2">
              <div className="flex items-center gap-3">
                <Wordmark
                  main={chat.wordmark.main}
                  sub={chat.wordmark.sub}
                  className="text-2xl"
                />
                <span className="mono text-xs text-[var(--faint)]">
                  {badgeText[chat.badge as keyof typeof badgeText]}
                </span>
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                Own your communities and your data. Built in the open, in early
                release.
              </p>
            </div>

            <div className="z1 flex shrink-0 items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] px-3 py-2.5">
                <StatusDot
                  status={(statuses[chat.slug] ?? 'checking') as Status}
                />
                <span className="mono text-xs text-[var(--text)]">
                  {chat.url}
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--accent-bright)]" />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
