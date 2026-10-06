import Link from 'next/link';
import { Reveal } from './Reveal';

const rules = [
  {
    k: 'Source',
    v: 'Every product is open source. You can read the code that handles your data, not a description of it.',
  },
  {
    k: 'Training',
    v: 'No AI training on your data. Not ours, not anyone else’s.',
  },
  {
    k: 'Revenue',
    v: '95% of SerikaMoe revenue goes to creators and licensors. We keep 5% to run the platform.',
  },
  {
    k: 'Subtitles',
    v: 'Full ASS format with proper styling, made with subtitle studios. Subtitles should feel like part of the show.',
  },
  {
    k: 'Censorship',
    v: 'Privacy first and anti-censorship, maintained with the Schoolsquid Media Foundation.',
  },
];

/**
 * Act 6. Deliberately motionless. Everything before it moved and everything
 * after it moves more, so this is the page holding its breath. It is authored
 * silence, not dead scroll.
 *
 * Rows fade in with no travel and no blur, which is the one concession to the
 * page's entrance language. Once landed, nothing here moves again.
 */
export function OpenLedger() {
  return (
    <section
      id="open"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:py-28"
    >
      <div className="grid gap-12 md:grid-cols-[18rem_1fr] md:gap-16">
        <div className="md:sticky md:top-40 md:self-start">
          <h2 className="display text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            Open by
            <br />
            <span className="text-[var(--accent-bright)]">default.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
            The rules we hold ourselves to. Written plainly, because a promise
            that needs a diagram is not a promise.
          </p>
        </div>

        <dl className="border-t border-[var(--border)]">
          {rules.map((r, i) => (
            <Reveal
              key={r.k}
              direction="none"
              blur={false}
              delay={i * 0.07}
            >
              <div className="grid gap-2 border-b border-[var(--border)] py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <dt className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
                  {r.k}
                </dt>
                <dd className="max-w-xl text-base leading-relaxed text-[var(--text)]">
                  {r.v}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <Link
        href="https://github.com/serika-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="mono mt-10 inline-block text-sm text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--accent-bright)] hover:underline md:ml-[calc(18rem+4rem)]"
      >
        github.com/serika-dev
      </Link>
    </section>
  );
}
