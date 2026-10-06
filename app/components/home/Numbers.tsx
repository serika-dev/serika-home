'use client';

import { useMemo } from 'react';
import { products, type Product } from '../../data/products';
import { useStatuses } from '../useStatuses';
import type { Status } from '../StatusIndicator';
import { usePrefersReducedMotion } from './useReducedMotion';
import { useBooruStats } from './useBooruStats';
import { useGithubStats, relativeTime } from './useGithubStats';
import { useTileMotion } from './useTileMotion';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';

const hosts = products.filter((p) => p.url);

/** Language swatches, kept inside the brand's purple family. */
const LANG_COLORS = ['var(--accent)', 'var(--accent-bright)', '#6d28d9', '#4c1d95'];

const dotColor: Record<string, string> = {
  operational: 'var(--ok)',
  downtime: 'var(--down)',
  checking: 'var(--faint)',
};

function StateLabel({ product, status }: { product: Product; status?: Status }) {
  if (!product.statusCheck) {
    return (
      <span className="mono text-xs text-[var(--faint)]">
        {product.badge === 'soon' ? 'launching soon' : 'in development'}
      </span>
    );
  }
  if (!status || status === 'checking') {
    return <span className="mono text-xs text-[var(--faint)]">checking</span>;
  }
  return (
    <span
      className="mono text-xs"
      style={{ color: status === 'operational' ? 'var(--ok)' : 'var(--down)' }}
    >
      {status === 'operational' ? 'operational' : 'downtime'}
    </span>
  );
}

function Figure({
  value,
  label,
  note,
}: {
  value: number | null;
  label: string;
  note?: string;
}) {
  return (
    <div className="border-t border-[var(--border)] pt-5">
      <p className="display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold leading-none tracking-[-0.04em] text-[var(--text)]">
        {/* No number, no counter. An absent figure shows a rule, never a zero. */}
        {value === null ? (
          <span
            aria-hidden="true"
            className="inline-block h-[0.12em] w-[1.7em] translate-y-[-0.28em] rounded-full bg-[var(--faint)]"
          />
        ) : (
          <CountUp to={value} />
        )}
      </p>
      <p className="mono mt-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--faint)]">
        {label}
      </p>
      {note && (
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * Act 5. Everything the company can actually count, and nothing it cannot.
 * The Booru figures come live from its own public stats endpoint through
 * /api/booru-stats, and the host states come from /api/status. If either is
 * unreachable the figures are withheld rather than filled in.
 */
export function Numbers() {
  const reduced = usePrefersReducedMotion();
  const targets = useMemo(() => hosts, []);
  const statuses = useStatuses(targets);
  const stats = useBooruStats();
  const gh = useGithubStats();
  const tile = useTileMotion();

  const checked = targets.filter((p) => p.statusCheck);
  const up = checked.filter((p) => statuses[p.slug] === 'operational').length;
  const settled = checked.filter(
    (p) => statuses[p.slug] && statuses[p.slug] !== 'checking',
  ).length;

  const rated = stats
    ? stats.safe + stats.questionable + stats.explicit
    : 0;
  const ratings = stats && rated > 0
    ? [
        { k: 'Safe', v: stats.safe, c: 'var(--ok)' },
        { k: 'Questionable', v: stats.questionable, c: 'var(--accent)' },
        { k: 'Explicit', v: stats.explicit, c: 'var(--down)' },
      ]
    : [];

  const aiShare =
    stats && stats.images > 0
      ? (stats.aiGenerated / stats.images) * 100
      : null;

  return (
    <section
      id="numbers"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:py-20"
    >
      <Reveal>
        <h2 className="display max-w-2xl text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.03] tracking-[-0.035em]">
          What we can
          <br />
          actually <span className="text-[var(--accent-bright)]">count.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
          Read live from our own endpoints when the page loads. Where a service
          cannot answer, the figure stays blank instead of being guessed.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-x-8 gap-y-6 sm:mt-14 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
        <Reveal delay={0.04}>
          <Figure
            value={stats?.images ?? null}
            label="Images indexed"
            note="Serika Booru, live"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Figure value={stats?.tags ?? null} label="Distinct tags" />
        </Reveal>
        <Reveal delay={0.16}>
          <Figure value={stats?.users ?? null} label="Registered users" />
        </Reveal>
        <Reveal delay={0.22}>
          <Figure
            value={settled === 0 ? null : up}
            label={`Of ${checked.length} hosts up`}
            note="Checked on page load"
          />
        </Reveal>
      </div>


      {gh && (
        <Reveal delay={0.06}>
          <div className="mt-4 grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1.15fr]">
            <div {...tile} className="tile tilt h-full p-5 sm:p-7">
              <p className="z1 mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--faint)]">
                Open source, measured
              </p>

              <dl className="z2 mt-6 grid grid-cols-3 gap-4">
                {[
                  { k: gh.repos, l: 'Public repos' },
                  { k: gh.stars, l: 'Stars' },
                  { k: gh.forks, l: 'Forks' },
                ].map((f) => (
                  <div key={f.l}>
                    <dt className="display text-3xl font-bold leading-none tracking-[-0.03em] text-[var(--text)]">
                      <CountUp to={f.k} />
                    </dt>
                    <dd className="mono mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-[var(--faint)]">
                      {f.l}
                    </dd>
                  </div>
                ))}
              </dl>

              {gh.languages.length > 0 && (
                <div className="z1 mt-7">
                  <div
                    aria-hidden="true"
                    className="flex h-2.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]"
                  >
                    {gh.languages.map((l, i) => (
                      <span
                        key={l.name}
                        className="h-full"
                        style={{
                          width: `${(l.count / gh.repos) * 100}%`,
                          backgroundColor: LANG_COLORS[i % LANG_COLORS.length],
                        }}
                      />
                    ))}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {gh.languages.map((l, i) => (
                      <li
                        key={l.name}
                        className="mono flex items-center gap-2 text-xs text-[var(--muted)]"
                      >
                        <span
                          className="h-2 w-2 rounded-sm"
                          style={{
                            backgroundColor:
                              LANG_COLORS[i % LANG_COLORS.length],
                          }}
                        />
                        {l.name}
                        <span className="text-[var(--faint)]">{l.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {gh.lastPush && (
                <p className="z1 mt-7 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted)]">
                  Last public commit{' '}
                  <span className="font-semibold text-[var(--text)]">
                    {relativeTime(gh.lastPush)}
                  </span>
                  {gh.since &&
                    `, building in the open since ${new Date(gh.since).getFullYear()}.`}
                </p>
              )}
            </div>

            <div className="tile h-full p-5 sm:p-7">
              <p className="mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--faint)]">
                Most starred repositories
              </p>
              <ul className="mt-5">
                {gh.top.map((r) => (
                  <li
                    key={r.name}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-[var(--border)] py-3 last:border-b-0"
                  >
                    <a
                      href={`https://github.com/serika-dev/${r.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono truncate text-sm text-[var(--text)] underline-offset-4 hover:text-[var(--accent-bright)] hover:underline"
                    >
                      {r.name}
                    </a>
                    <span className="mono flex items-center gap-3 text-xs text-[var(--faint)]">
                      {r.language && <span>{r.language}</span>}
                      <span className="text-[var(--text)]">
                        {r.stars} &#9733;
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/serika-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="mono mt-6 inline-block text-xs text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--accent-bright)] hover:underline"
              >
                github.com/serika-dev
              </a>
            </div>
          </div>
        </Reveal>
      )}

      <div className="mt-8 grid gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Reveal delay={0.06}>
          <div {...tile} className="tile tilt h-full p-5 sm:p-7">
            <p className="z1 mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--faint)]">
              The index, by rating
            </p>

            {ratings.length > 0 ? (
              <>
                <div
                  aria-hidden="true"
                  className="z2 mt-6 flex h-2.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]"
                >
                  {ratings.map((r) => (
                    <span
                      key={r.k}
                      className="h-full"
                      style={{
                        width: `${(r.v / rated) * 100}%`,
                        backgroundColor: r.c,
                      }}
                    />
                  ))}
                </div>
                <ul className="z1 mt-6 space-y-3">
                  {ratings.map((r) => (
                    <li
                      key={r.k}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="flex items-center gap-2.5 text-[var(--muted)]">
                        <span
                          className="h-2.5 w-2.5 rounded-sm"
                          style={{ backgroundColor: r.c }}
                        />
                        {r.k}
                      </span>
                      <span className="mono text-[var(--text)]">
                        {r.v.toLocaleString('en-US')}
                        <span className="ml-2 text-[var(--faint)]">
                          {((r.v / rated) * 100).toFixed(1)}%
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                {aiShare !== null && (
                  <p className="z1 mt-6 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted)]">
                    <span className="font-semibold text-[var(--text)]">
                      {aiShare.toFixed(1)}%
                    </span>{' '}
                    of the index is AI generated (
                    {stats!.aiGenerated.toLocaleString('en-US')} of{' '}
                    {stats!.images.toLocaleString('en-US')}). The rest was made
                    by people.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
                The index could not be reached, so there is nothing to report
                here right now.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12} direction="right">
          <div className="tile h-full p-5 sm:px-7 sm:py-6">
            <div className="mb-2 flex items-center justify-between gap-4 pb-3">
              <span className="mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--faint)]">
                {settled < checked.length
                  ? 'Auditing hosts'
                  : 'Last checked on load'}
              </span>
              <span className="mono text-[0.65rem] text-[var(--faint)]">
                {targets.length} services
              </span>
            </div>

            <div className="relative mb-1 h-px overflow-hidden bg-[var(--border)]">
              {settled < checked.length && !reduced && (
                <span
                  aria-hidden="true"
                  className="sweep absolute inset-y-0 left-0 w-1/4 bg-[var(--accent)]"
                />
              )}
            </div>

            <ul>
              {targets.map((p, i) => {
                const status = statuses[p.slug] as Status | undefined;
                const live = p.statusCheck && status === 'operational';
                return (
                  <li
                    key={p.slug}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[var(--border)] py-2.5 last:border-b-0"
                  >
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      {live && !reduced && (
                        <span
                          aria-hidden="true"
                          className="ping-ring absolute h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: 'var(--ok)',
                            animationDelay: `${i * 0.24}s`,
                          }}
                        />
                      )}
                      <span
                        className="relative h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: p.statusCheck
                            ? dotColor[status ?? 'checking']
                            : 'transparent',
                          border: p.statusCheck
                            ? undefined
                            : '1px solid var(--faint)',
                        }}
                      />
                    </span>
                    <span className="mono truncate text-sm text-[var(--text)]">
                      {p.url}
                    </span>
                    <StateLabel product={p} status={status} />
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
