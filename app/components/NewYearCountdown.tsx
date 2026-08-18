'use client';

import { useEffect, useState } from 'react';

function getNextNewYear(): number {
  const now = new Date();
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0).getTime();
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function NewYearCountdown() {
  const [target] = useState(getNextNewYear);
  const [mounted, setMounted] = useState(false);
  const [diff, setDiff] = useState(target - Date.now());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(0, diff);
  const days = Math.floor(clamped / 86_400_000);
  const hours = Math.floor((clamped % 86_400_000) / 3_600_000);
  const minutes = Math.floor((clamped % 3_600_000) / 60_000);
  const seconds = Math.floor((clamped % 60_000) / 1_000);
  const year = new Date(target).getFullYear();

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8 text-center">
      <p className="mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        Countdown to {year}
      </p>
      <div className="mt-6 flex items-end justify-center gap-4 sm:gap-8">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-end gap-4 sm:gap-8">
            <div>
              <div className="display text-4xl font-bold tabular-nums text-[var(--text)] sm:text-5xl">
                {mounted ? pad(u.value) : '--'}
              </div>
              <div className="mono mt-2 text-[11px] uppercase tracking-[0.15em] text-[var(--faint)]">
                {u.label}
              </div>
            </div>
            {i < units.length - 1 && (
              <span className="display pb-6 text-3xl font-bold text-[var(--faint)] sm:text-4xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
