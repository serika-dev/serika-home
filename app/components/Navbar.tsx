'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { href: '/#products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: 'https://status.serika.dev', label: 'Status', external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Serika home" className="flex items-center">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = !item.external && pathname === item.href.replace('/#products', '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-[var(--text)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://accounts.serika.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join us
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)]"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-5 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--panel)]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://accounts.serika.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-lg bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Join us
          </a>
        </div>
      )}
    </nav>
  );
}
