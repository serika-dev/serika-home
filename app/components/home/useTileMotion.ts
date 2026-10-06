'use client';

import { useCallback } from 'react';
import type { PointerEvent } from 'react';
import { usePrefersReducedMotion } from './useReducedMotion';

/** How far the tile leans, in degrees, at the very corner. */
const MAX_TILT = 5;

/**
 * Pointer glow and tilt in one pass. Values are written straight to the
 * element's style so moving the mouse never triggers a React render.
 */
export function useTileMotion() {
  const reduced = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);

      if (reduced) return;
      // Cursor left of centre leans the tile left, and up leans it back.
      el.style.setProperty('--ry', `${(px - 0.5) * 2 * MAX_TILT}deg`);
      el.style.setProperty('--rx', `${(0.5 - py) * 2 * MAX_TILT}deg`);
    },
    [reduced],
  );

  const onPointerLeave = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return { onPointerMove, onPointerLeave };
}

/**
 * Magnetic control. The element drifts toward the cursor while it is near,
 * then springs back on leave.
 */
export function useMagnetic(strength = 0.32) {
  const reduced = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--tx', `${dx * strength}px`);
      el.style.setProperty('--ty', `${dy * strength}px`);
    },
    [reduced, strength],
  );

  const onPointerLeave = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--tx', '0px');
    el.style.setProperty('--ty', '0px');
  }, []);

  return { onPointerMove, onPointerLeave };
}
