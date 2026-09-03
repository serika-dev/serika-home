import { Footer } from './Footer';
import { PageHeader } from './home/PageHeader';
import { Reveal } from './home/Reveal';

export interface Clause {
  id: string;
  heading: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  lead: string;
  callout: string;
  clauses: Clause[];
}

export function LegalPage({
  eyebrow,
  title,
  updated,
  lead,
  callout,
  clauses,
}: LegalPageProps) {
  return (
    <>
      <main className="relative z-10">
        <PageHeader kicker={eyebrow} title={title} lead={lead}>
          <p className="mono text-xs text-[var(--faint)]">
            Last updated: {updated}
          </p>
        </PageHeader>

        <div className="mx-auto max-w-6xl px-5 pb-28">
        <p className="tile max-w-3xl p-5 text-sm leading-relaxed text-[var(--muted)]">
          {callout}
        </p>

        <div className="mt-16 grid gap-x-14 gap-y-10 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mono mb-4 text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
              On this page
            </p>
            <nav className="flex flex-col">
              {clauses.map((c, i) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="group flex gap-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                >
                  <span className="mono text-[var(--faint)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{c.heading}</span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="max-w-3xl">
            {clauses.map((c, i) => (
              <Reveal key={c.id} direction="none" blur={false}>
                <section
                  id={c.id}
                  className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="display flex items-baseline gap-3 text-xl font-bold tracking-tight text-[var(--text)]">
                    <span className="mono text-sm text-[var(--accent-bright)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {c.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-[var(--muted)]">
                    {c.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
