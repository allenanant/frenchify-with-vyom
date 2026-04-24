'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

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
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
