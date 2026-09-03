'use client';

import { useEffect, useState } from 'react';
import type { BooruStats } from '../../api/booru-stats/route';

export type { BooruStats };

/**
 * Live Booru figures, or null while loading and on failure. Callers render
 * nothing rather than a placeholder zero: an invented number is worse than an
 * absent one.
 */
export function useBooruStats(): BooruStats | null {
  const [stats, setStats] = useState<BooruStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/booru-stats')
      .then((r) => r.json())
      .then((json) => {
        if (cancelled || !json?.ok) return;
        setStats(json.stats as BooruStats);
      })
      .catch(() => {
        /* Leave it null. The UI already handles the absent case. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
