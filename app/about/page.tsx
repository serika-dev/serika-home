import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { PageHeader } from '../components/home/PageHeader';
import { Reveal } from '../components/home/Reveal';

export const metadata: Metadata = {
  title: 'About Serika, open source, curiosity, continuous learning',
  description:
    'Serika builds open source software because the internet is at its best when people are free to create, learn and share. Read about our mission, our love of passion projects, and how we build in public.',
  alternates: { canonical: 'https://serika.dev/about' },
  openGraph: {
    title: 'About Serika',
    description:
      'Open source software built out of curiosity: create, learn, share, and make the internet a little more open, one project at a time.',
    url: 'https://serika.dev/about',
    type: 'website',
  },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: 'Why we build',
    body: [
      'Serika exists because we believe the internet is at its best when people are free to create, learn, and share. Our goal is not to build closed ecosystems or lock people into proprietary platforms, but to create open source software that anyone can use, learn from, contribute to, or build upon.',
      'Most of our projects begin with a simple question: “What if we built this ourselves?” Sometimes that means creating an alternative to an existing platform. Other times it means experimenting with new technologies, exploring different ideas, or solving problems we personally run into. We don’t believe every piece of software has to reinvent an entire category to be valuable. Better accessibility, greater transparency, stronger privacy, and open development are all meaningful improvements.',
    ],
  },
  {
    heading: 'Built to learn',
    body: [
      'Every project is built with learning in mind. Serika is driven by curiosity and a desire to continuously improve as engineers. We enjoy exploring new programming languages, frameworks, operating systems, infrastructure, and technologies. Rather than treating learning as something separate from development, we see every project as an opportunity to gain experience while creating something useful, for ourselves and for others.',
      'Because of this, not every project follows the same journey. Some become actively maintained platforms used by a growing community. Others remain experiments or learning projects that helped us understand a new technology or concept. We believe there is value in sharing that work instead of hiding it away. Building software is an ongoing process, and showing both the successes and the experiments better represents what real development looks like.',
    ],
  },
  {
    heading: 'Open by default',
    body: [
      'Open source is at the heart of everything we do. We believe software improves when people can inspect it, learn from it, modify it, and contribute back. Whenever possible, our projects are released openly so others can understand how they work, build on top of them, or simply use them as a learning resource.',
    ],
  },
  {
    heading: 'Passion projects matter',
    body: [
      'Some of the most interesting software starts because someone wanted to solve a problem for themselves, learn a new skill, or simply create something for fun. That’s how many of our projects begin. We build tools we want to use ourselves, and if others find them useful too, that’s even better.',
    ],
  },
  {
    heading: 'Steady over fast',
    body: [
      'Rather than focusing on rapid expansion or chasing every trend, we focus on steady improvement. We prefer shipping software, listening to feedback, refining the experience, and making meaningful progress over time. Every release teaches us something new, and every project helps us grow.',
      'Serika is ultimately about creativity, curiosity, and continuous learning. Whether it’s a community platform, developer tool, creative application, operating system experiment, or something completely unexpected, every project reflects the same passion for making things and constantly improving along the way.',
    ],
  },
];

const links = [
  { label: 'GitHub', href: 'https://github.com/serika-dev' },
  { label: 'SerikaCord', href: 'https://serika.cc/serika' },
  { label: 'Discord', href: 'https://discord.gg/F3Dxp2DsWj' },
  { label: 'X / SerikaDev', href: 'https://x.com/SerikaDev' },
  { label: 'X / SerikaMoe', href: 'https://x.com/SerikaMoe' },
  { label: 'YouTube / SerikaDev', href: 'https://www.youtube.com/@SerikaDev' },
  { label: 'YouTube / SerikaMoe', href: 'https://www.youtube.com/@SerikaMoe' },
];

export default function AboutPage() {
  return (
    <>
      <main className="relative z-10">
        <PageHeader
          kicker="About Serika"
          title="Software we believe in,"
          accent="kept open."
          lead="We’re a small team driven by curiosity, building open source software, experimenting with new ideas, and sharing what we make along the way."
        />

        <div className="mx-auto max-w-6xl px-5 pb-28">
          <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[1fr_16rem]">
            <div>
              <div className="space-y-14">
                {sections.map((s, i) => (
                  <Reveal key={s.heading} delay={i * 0.04}>
                    <section className="border-t border-[var(--border)] pt-8">
                      <h2 className="display text-2xl font-bold tracking-tight text-[var(--text)]">
                        {s.heading}
                      </h2>
                      <div className="mt-4 space-y-5 text-[17px] leading-[1.75] text-[var(--muted)]">
                        {s.body.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <blockquote className="mt-16 border-l-2 border-[var(--accent)] pl-7">
                  <p className="display text-2xl font-bold leading-snug tracking-[-0.02em] text-[var(--text)] sm:text-3xl">
                    Build software we believe in, keep it open, keep learning,
                    and make the internet a little more open, one project at a
                    time.
                  </p>
                </blockquote>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.1}>
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
                  Follow the work
                </h2>
                <div className="mt-4 flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 py-3 text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                    >
                      <span className="text-sm font-medium">{l.label}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 text-[var(--faint)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[var(--accent-bright)] group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
                <a
                  href="https://accounts.serika.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Join us
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
