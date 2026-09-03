'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from './useReducedMotion';

/** Counts to a real figure once on view. Never used for an invented number. */
export function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Only the bottom edge is inset. A percentage on all four sides also insets
  // left and right, and this figure sits near the left edge of the page.
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);
  const settled = useRef(false);

  useEffect(() => {
    if (settled.current) return;

    if (inView) {
      settled.current = true;
      if (reduced) {
        setN(to);
        return;
      }
      let raf = 0;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        // Ease out cubic: fast arrival, soft landing.
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }

    // An anchor jump or a fast flick can carry the figure past the viewport
    // without the observer ever firing, which would strand it at zero forever.
    // A number stuck at 0 reads as real and wrong, so snap to the true value.
    const snapIfPassed = () => {
      const el = ref.current;
      if (!el || settled.current) return;
      if (el.getBoundingClientRect().bottom < 0) {
        settled.current = true;
        setN(to);
      }
    };
    snapIfPassed();
    window.addEventListener('scroll', snapIfPassed, { passive: true });
    return () => window.removeEventListener('scroll', snapIfPassed);
  }, [inView, reduced, to, duration]);

  // A later change to `to` (live figures arriving after a snap) must still land.
  useEffect(() => {
    if (settled.current) setN(to);
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString('en-US')}
    </span>
  );
}
