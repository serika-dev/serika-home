import type { Metadata } from 'next';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { NewYearCountdown } from '../components/NewYearCountdown';

export const metadata: Metadata = {
  title: 'Support Serika, keep open source running',
  description:
    'Serika is self-funded. We spend roughly €500/month on servers and make only ~€23 from donations. Help us reach €500/month in community support so we can keep building open source software for everyone.',
  alternates: { canonical: 'https://serika.dev/donate' },
  openGraph: {
    title: 'Support Serika',
    description:
      'Help us cover €500/month in server costs. After 4 years of self-funding, we need community support to keep going.',
    url: 'https://serika.dev/donate',
    type: 'website',
  },
};

const donationLinks = [
  {
    label: 'Stripe',
    description: 'Card payment via Stripe. Direct and fast.',
    href: 'https://pay.serika.dev/b/5kQbJ2fms3Ly5EY7eZ8Zq09',
  },
  {
    label: 'Ko-fi',
    description: 'One-time or monthly support through Ko-fi.',
    href: 'https://ko-fi.com/pikachubolk',
  },
  {
    label: 'PayPal',
    description: 'Send a one-time contribution via PayPal.',
    href: 'https://www.paypal.com/paypalme/pikachubolk',
  },
  {
    label: 'GitHub Sponsors',
    description: 'Recurring monthly sponsorship through GitHub.',
    href: 'https://github.com/sponsors/Pikachubolk',
  },
];

const monthlyExpenses = 500;
const monthlyDonations = 23;
const selfFunded = monthlyExpenses - monthlyDonations;
const goal = 500;
const fundedPct = Math.round((monthlyDonations / monthlyExpenses) * 100);
const unfundedPct = 100 - fundedPct;

const expenseBreakdown = [
  { label: 'Servers', amount: 35, description: 'Compute, VPS, and hosting', color: 'var(--accent)' },
  { label: 'Storage', amount: 85, description: 'Object storage and backups', color: '#a78bfa' },
  { label: 'Domains & APIs', amount: 380, description: 'Domain registrations, third-party APIs, development tools, and unforeseen costs', color: '#c4b5fd' },
];

export default function DonatePage() {
  return (
    <>
      <div className="glow" aria-hidden="true" />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-24 sm:pt-32">
        {/* Hero */}
        <div className="rise">
          <p className="mono mb-8 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
            Support Serika
          </p>
          <h1 className="display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--text)] sm:text-6xl">
            We can&rsquo;t keep doing this alone.
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-[var(--muted)]">
            Four years. Every server, every domain, every bill. Paid out of our
            own pockets. We built all of this because we care, and we wanted
            everyone to have access to it for free. But we&rsquo;re tired, and
            we&rsquo;re running out of reasons to keep paying for it ourselves.
          </p>
        </div>

        {/* Finances overview */}
        <section className="mt-16">
          <h2 className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
            This month at a glance
          </h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
            {/* Summary numbers */}
            <div className="grid grid-cols-3 divide-x divide-[var(--border)] border-b border-[var(--border)]">
              <div className="px-5 py-6 sm:px-6">
                <p className="mono text-[11px] uppercase tracking-[0.15em] text-[var(--faint)]">
                  Expenses
                </p>
                <p className="display mt-2 text-2xl font-bold text-[var(--text)] sm:text-3xl">
                  &euro;{monthlyExpenses}
                </p>
              </div>
              <div className="px-5 py-6 sm:px-6">
                <p className="mono text-[11px] uppercase tracking-[0.15em] text-[var(--faint)]">
                  Donations
                </p>
                <p className="display mt-2 text-2xl font-bold text-[var(--ok)] sm:text-3xl">
                  &euro;{monthlyDonations}
                </p>
              </div>
              <div className="px-5 py-6 sm:px-6">
                <p className="mono text-[11px] uppercase tracking-[0.15em] text-[var(--faint)]">
                  Self-funded
                </p>
                <p className="display mt-2 text-2xl font-bold text-[var(--down)] sm:text-3xl">
                  &euro;{selfFunded}
                </p>
              </div>
            </div>

            {/* Where the money goes + funding progress in one bar */}
            <div className="px-6 py-6">
              <p className="mono text-xs uppercase tracking-[0.15em] text-[var(--faint)]">
                Where the money goes
              </p>

              {/* Single bar: expense breakdown segments + unfunded remainder */}
              <div className="mt-4 flex h-5 w-full overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg)]">
                {expenseBreakdown.map((item, i) => {
                  const pct = (item.amount / monthlyExpenses) * 100;
                  return (
                    <div
                      key={item.label}
                      className="h-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: item.color,
                        borderRight: i < expenseBreakdown.length - 1 ? '1px solid var(--bg)' : undefined,
                      }}
                    />
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-5 space-y-4">
                {expenseBreakdown.map((item) => {
                  const pct = Math.round((item.amount / monthlyExpenses) * 100);
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-3 w-3 shrink-0 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="text-sm font-semibold text-[var(--text)]">
                            {item.label}
                          </p>
                          <p className="display shrink-0 text-base font-bold text-[var(--text)]">
                            &euro;{item.amount}
                            <span className="ml-1.5 text-xs font-normal text-[var(--faint)]">{pct}%</span>
                          </p>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Funding progress overlay bar */}
              <div className="mt-6 border-t border-[var(--border)] pt-6">
                <div className="flex items-end justify-between">
                  <p className="mono text-xs uppercase tracking-[0.15em] text-[var(--faint)]">
                    Funded by community
                  </p>
                  <p className="mono text-sm text-[var(--muted)]">
                    &euro;{monthlyDonations} / &euro;{goal}
                    <span className="text-[var(--faint)]"> /mo</span>
                  </p>
                </div>
                <div className="mt-3 flex h-5 w-full overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg)]">
                  <div
                    className="h-full bg-[var(--ok)]"
                    style={{ width: `${fundedPct}%` }}
                  />
                  <div
                    className="h-full bg-[var(--down)]/40"
                    style={{ width: `${unfundedPct}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-6 text-xs">
                  <span className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-2.5 w-2.5 rounded-sm bg-[var(--ok)]" />
                    Funded &euro;{monthlyDonations} ({fundedPct}%)
                  </span>
                  <span className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-2.5 w-2.5 rounded-sm bg-[var(--down)]/40" />
                    Self-funded &euro;{selfFunded} ({unfundedPct}%)
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  We need to reach{' '}
                  <strong className="font-semibold text-[var(--text)]">&euro;{goal}/month</strong>{' '}
                  in community support for Serika to survive. Right now{' '}
                  <strong className="font-semibold text-[var(--text)]">{fundedPct}%</strong>{' '}
                  of our costs are covered by donations. The rest comes out of
                  our own pockets. Every single month.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The ask */}
        <section className="mt-16 space-y-5 text-[17px] leading-[1.75] text-[var(--muted)]">
          <h2 className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
            Why we need your help
          </h2>
          <p>
            We&rsquo;ve been doing this for four years. Four years of paying
            for every server, every domain, every API, every unexpected bill
            that shows up. That&rsquo;s roughly &euro;{monthlyExpenses} every
            month. Over &euro;{monthlyExpenses * 12} a year. More than{' '}
            &euro;{monthlyExpenses * 12 * 4} in total, all from our own
            pockets, just to keep things online for you and everyone else.
          </p>
          <p>
            We don&rsquo;t run ads. We don&rsquo;t sell your data. We don&rsquo;t
            lock features behind paywalls. Everything we build is open source
            and free to use. We thought that was the right way to do things.
            But it also means the only way we keep going is if people who care
            chip in.
          </p>
          <p>
            Almost nobody does. &euro;{monthlyDonations} a month. That&rsquo;s
            what we get back. We&rsquo;re grateful for every cent of it, but
            it covers less than {fundedPct}% of what we need. The rest is on us.
            It has been on us for four years.
          </p>
          <p>
            We need to reach{' '}
            <strong className="font-semibold text-[var(--text)]">&euro;{goal} per month</strong>{' '}
            in donations to keep going without paying out of pocket. If we
            can&rsquo;t hit that goal by{' '}
            <strong className="font-semibold text-[var(--text)]">2027</strong>,
            we will most likely have to shut down the company. All of it.
            Every service, every project, everything we&rsquo;ve spent four
            years building. Gone.
          </p>
          <p>
            We don&rsquo;t want that to happen. We built all of this because we
            believed in it, and we still do. But we can&rsquo;t keep funding it
            alone. It&rsquo;s not sustainable, and honestly, it&rsquo;s
            heartbreaking to think that all of this could disappear just
            because we ran out of money to pay for it.
          </p>
          <p>
            If you use any of our services, if you&rsquo;ve enjoyed anything
            we&rsquo;ve made, if you believe in open source and a free
            internet, please consider supporting us. Even a small amount helps.
            It tells us we&rsquo;re not doing this for nothing.
          </p>
        </section>

        {/* Donation links */}
        <section className="mt-12">
          <h2 className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
            Ways to support
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {donationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--panel-hover)]"
              >
                <div className="flex items-center justify-between">
                  <span className="display text-lg font-bold text-[var(--text)]">
                    {link.label}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[var(--faint)] transition-all group-hover:translate-x-0 group-hover:text-[var(--accent)]" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* New Year's countdown */}
        <section className="mt-16">
          <h2 className="mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
            A new year, a new goal
          </h2>
          <p className="mt-4 text-[17px] leading-[1.75] text-[var(--muted)]">
            Our resolution for the new year is simple: make Serika
            self-sustaining. We&rsquo;re counting down to January 1st, and
            hoping we can count on you to help us get there.
          </p>
          <div className="mt-6">
            <NewYearCountdown />
          </div>
        </section>

        {/* Closing */}
        <section className="mt-16 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-8">
          <div className="flex items-start gap-4">
            <Heart className="mt-1 h-6 w-6 shrink-0 text-[var(--accent)]" />
            <div>
              <p className="display text-xl font-bold text-[var(--text)]">
                Every contribution matters.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Whether it&rsquo;s &euro;2 or &euro;20, one-time or monthly,
                it all goes directly toward keeping our services online and
                free for everyone. We don&rsquo;t want to shut down. We want to
                keep building. But we can&rsquo;t do it without you. Thank you
                for being part of the Serika community.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
