'use client';

import { useEffect, useState } from 'react';
import type { Status } from './StatusIndicator';
import type { Product } from '../data/products';

export type StatusMap = Record<string, Status>;

/** Fetches live status for every product with statusCheck + a url. */
export function useStatuses(products: Product[]): StatusMap {
  const [statuses, setStatuses] = useState<StatusMap>({});

  useEffect(() => {
    let cancelled = false;
    const targets = products.filter((p) => p.statusCheck && p.url);

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
  }, [products]);

  return statuses;
}
