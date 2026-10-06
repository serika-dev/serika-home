'use client';

import { useEffect, useState } from 'react';
import type { GithubStats } from '../../api/github-stats/route';

export type { GithubStats };

/**
 * Public GitHub activity, or null while loading and on failure. Callers omit
 * the whole panel when this is null rather than rendering empty figures.
 */
export function useGithubStats(): GithubStats | null {
  const [stats, setStats] = useState<GithubStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github-stats')
      .then((r) => r.json())
      .then((json) => {
        if (cancelled || !json?.ok) return;
        setStats(json.stats as GithubStats);
      })
      .catch(() => {
        /* Leave it null. The UI handles the absent case. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}

/** "3 hours ago" style, for a timestamp that should feel current. */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return months < 12 ? `${months}mo ago` : `${Math.round(months / 12)}y ago`;
}
