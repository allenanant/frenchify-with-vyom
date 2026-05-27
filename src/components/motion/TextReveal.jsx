import { motion, useReducedMotion } from 'framer-motion';

export default function TextReveal({
  text,
  as = 'h1',
  className = '',
  delay = 0,
  stagger = 0.04,
}) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : stagger, delayChildren: delay } },
  };
  const child = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: '100%' },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      };

  const MotionTag = motion[as] ?? motion.h1;

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: 'inline-block' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.1em' }}>
          <motion.span variants={child} style={{ display: 'inline-block' }}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
