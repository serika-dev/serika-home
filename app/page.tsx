import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HomeProducts } from './components/HomeProducts';
import { Footer } from './components/Footer';

export const metadata: Metadata = {
  title: 'Serika, open source software, built out of curiosity',
  description:
    'Serika builds open source software for a freer internet: SerikaMoe anime streaming, Serika Booru, Serika.chat, Serika Search and more. Open by default, built to learn, shipped in public.',
  alternates: { canonical: 'https://serika.dev' },
};

const ethos = [
  { value: 'Open source', label: 'At the heart of everything we build.' },
  { value: 'Built to learn', label: 'Every project teaches us something new.' },
  { value: 'In public', label: 'Successes and experiments, shared openly.' },
];

export default function Home() {
  return (
    <>
      <div className="glow" aria-hidden="true" />
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        {/* Hero: open source, curiosity, a freer internet. */}
        <section className="rise pt-24 pb-20 sm:pt-32 sm:pb-28">
          <h1 className="display max-w-4xl pt-4 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text)] sm:text-6xl md:text-[5.25rem]">
            Open software,
            <br />
            built out of{' '}
            <span className="text-[var(--accent)]">curiosity.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            The internet is at its best when people are free to create, learn and
            share. We build open source software anyone can use, learn from, or
            build upon, from anime streaming and image boards to chat, search and
            developer tools.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="#products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]"
            >
              See what we&rsquo;ve built
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            >
              About Serika
            </Link>
          </div>

          <dl className="mt-20 flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)] sm:flex-row sm:divide-y-0 sm:divide-x">
            {ethos.map((e) => (
              <div key={e.value} className="flex-1 py-6 sm:px-8 sm:first:pl-0">
                <dt className="display text-lg font-bold text-[var(--text)]">
                  {e.value}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-[var(--muted)]">
                  {e.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <HomeProducts />
      </main>
      <Footer />
    </>
  );
}
