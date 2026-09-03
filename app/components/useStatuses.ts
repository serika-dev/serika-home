'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Status } from './StatusIndicator';
import type { Product } from '../data/products';

export type StatusMap = Record<string, Status>;

/** Fetches live status for every product with statusCheck + a url. */
export function useStatuses(products: Product[]): StatusMap {
  const [statuses, setStatuses] = useState<StatusMap>({});

  // Key the effect on what actually matters, not on the array's identity.
  // A caller passing an inline literal would otherwise re-run the fetch on
  // every render, and each fetch sets state, which renders again forever.
  const key = products
    .filter((p) => p.statusCheck && p.url)
    .map((p) => `${p.slug}:${p.url}`)
    .join(',');

  const latest = useRef(products);
  latest.current = products;

  const targetList = useMemo(
    () => latest.current.filter((p) => p.statusCheck && p.url),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  useEffect(() => {
    let cancelled = false;
    const targets = targetList;

    setStatuses(
      Object.fromEntries(targets.map((p) => [p.slug, 'checking' as Status])),
    );

    targets.forEach((p) => {
      fetch(`/api/status?url=${p.url}`)
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          setStatuses((prev) => ({
            ...prev,
            [p.slug]: data.status === 'operational' ? 'operational' : 'downtime',
          }));
        })
        .catch(() => {
          if (cancelled) return;
          setStatuses((prev) => ({ ...prev, [p.slug]: 'downtime' }));
        });
    });

    return () => {
      cancelled = true;
    };
  }, [targetList]);

  return statuses;
}
