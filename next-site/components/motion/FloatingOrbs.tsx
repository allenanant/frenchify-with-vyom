'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'blue' | 'amber' | 'soft';

interface FloatingOrbsProps {
  variant?: Variant;
}

export default function FloatingOrbs({ variant = 'blue' }: FloatingOrbsProps) {
  const prefersReducedMotion = useReducedMotion();

  const palettes: Record<Variant, string[]> = {
    blue: ['bg-blue-400/30', 'bg-indigo-400/25', 'bg-amber-300/25'],
    amber: ['bg-amber-400/30', 'bg-orange-300/25', 'bg-blue-400/20'],
    soft: ['bg-blue-300/20', 'bg-indigo-300/20', 'bg-amber-200/20'],
  };
  const colors = palettes[variant] ?? palettes.blue;

  const orbs: Array<{
    size: number;
    top?: string; left?: string; right?: string; bottom?: string;
    color: string; delay: number;
  }> = [
    { size: 420, top: '-10%', left: '-8%', color: colors[0], delay: 0 },
    { size: 320, top: '30%', right: '-6%', color: colors[1], delay: 1.2 },
    { size: 260, bottom: '-10%', left: '30%', color: colors[2], delay: 2.4 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${o.color}`}
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            right: o.right,
            bottom: o.bottom,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.08, 1] }
          }
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: o.delay,
          }}
        />
      ))}
    </div>
  );
}
