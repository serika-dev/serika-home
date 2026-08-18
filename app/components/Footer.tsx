import Link from 'next/link';
import { Logo } from './Logo';

const columns: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: 'Products',
    links: [
      { label: 'Serika Booru', href: '/products/serika-booru' },
      { label: 'SerikaMoe', href: '/products/serikamoe' },
      { label: 'Serika.chat', href: '/products/serika-chat' },
      { label: 'Serika Search', href: '/products/serika-search' },
      { label: 'Serika Games', href: '/products/serika-games' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Donate', href: '/donate' },
      { label: 'Status', href: 'https://status.serika.dev', external: true },
      { label: 'Join us', href: 'https://accounts.serika.dev', external: true },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'SerikaCord', href: 'https://serika.cc/serika', external: true },
      { label: 'GitHub', href: 'https://github.com/serika-dev', external: true },
      { label: 'X (SerikaDev)', href: 'https://x.com/SerikaDev', external: true },
      { label: 'X (SerikaMoe)', href: 'https://x.com/SerikaMoe', external: true },
      { label: 'YouTube', href: 'https://www.youtube.com/@SerikaDev', external: true },
      { label: 'Discord', href: 'https://discord.gg/F3Dxp2DsWj', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
              Open source software, built out of curiosity. We create, learn and
              share, hoping to make the internet a little more open, one project
              at a time.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mono text-xs uppercase tracking-[0.18em] text-[var(--faint)]">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--faint)]">
            © {new Date().getFullYear()} The Serika Company. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="text-xs text-[var(--muted)] hover:text-[var(--text)]">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-[var(--muted)] hover:text-[var(--text)]">
              Privacy
            </Link>
            <a
              href="https://status.serika.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted)] hover:text-[var(--text)]"
            >
              status.serika.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
