'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const directions: Record<Direction, { x: number; y: number }> = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
  none: { y: 0, x: 0 },
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof typeof motion;
  once?: boolean;
  amount?: number;
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  as = 'div',
  once = true,
  amount = 0.2,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = directions[direction] ?? directions.up;

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, ...offset };
  const whileInView = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 };

  const MotionTag = (motion as unknown as Record<string, ElementType>)[as as string] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
