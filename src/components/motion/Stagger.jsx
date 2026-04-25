import { motion, useReducedMotion } from 'framer-motion';

/**
 * Stagger reveals the whole group as one block without wrapping children,
 * so parent grid/flex layouts are preserved. For per-item stagger inside
 * Astro, use plain CSS nth-child delays on the children.
 */
export default function Stagger({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  amount = 0.2,
  once = true,
}) {
  const prefersReducedMotion = useReducedMotion();
  const offset = { up: { y: 30 }, down: { y: -30 }, left: { x: 30 }, right: { x: -30 } }[direction] ?? { y: 30 };

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
