'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from './useReducedMotion';

type Direction = 'up' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Entrance reveal. Every act uses this so arrivals share one timing signature
 * rather than each section inventing its own.
 *
 * The viewport margin insets the bottom edge only. A percentage on all four
 * sides also insets left and right, which silently never fires for anything
 * sitting near the page edge.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  blur = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  blur?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const d = offset[direction];

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: d.x,
        y: d.y,
        filter: blur ? 'blur(6px)' : 'blur(0px)',
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
