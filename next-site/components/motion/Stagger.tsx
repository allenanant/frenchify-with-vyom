'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRevealFailsafe } from './useRevealFailsafe';

type Direction = 'up' | 'down' | 'left' | 'right';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  amount?: number;
  once?: boolean;
}

export default function Stagger({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  amount = 0.2,
  once = true,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  // Reveal has always had this; Stagger never did, and Stagger is what wraps
  // the card grids — the benefits, the pain points, the FAQ, the offer stack.
  // Without it, any time whileInView does not fire (deep link, back-button
  // scroll restore, a flick past the section, an IntersectionObserver callback
  // starved on a slow phone) that content stays at opacity 0 permanently.
  // A skipped entrance animation is always better than a blank section.
  const forced = useRevealFailsafe();
  const offsetMap: Record<Direction, { x?: number; y?: number }> = {
    up: { y: 30 }, down: { y: -30 }, left: { x: 30 }, right: { x: -30 },
  };
  const offset = offsetMap[direction] ?? { y: 30 };

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, ...offset };
  const whileInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      animate={forced ? whileInView : undefined}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
