'use client';

import { useEffect } from 'react';

/**
 * The hero ticket tilts a little toward the pointer and a gold glare follows
 * it (styles: .ticket.is-hover in black-friday.css). Mouse and trackpad only.
 * Touch screens and reduced-motion users keep the still, straight ticket.
 * Renders nothing; it only wires the listeners after hydration.
 */
export default function BfTicketTilt() {
  useEffect(() => {
    const t = document.querySelector<HTMLElement>('.bfp .ticket');
    if (!t) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      const r = t.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (x - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (y - r.top) / r.height));
      t.style.setProperty('--bfp-rx', `${((0.5 - py) * 5).toFixed(2)}deg`);
      t.style.setProperty('--bfp-ry', `${((px - 0.5) * 7).toFixed(2)}deg`);
      t.style.setProperty('--bfp-mx', `${(px * 100).toFixed(1)}%`);
      t.style.setProperty('--bfp-my', `${(py * 100).toFixed(1)}%`);
    };
    const enter = () => t.classList.add('is-hover');
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      t.classList.remove('is-hover');
      t.style.setProperty('--bfp-rx', '0deg');
      t.style.setProperty('--bfp-ry', '0deg');
    };

    t.addEventListener('pointerenter', enter);
    t.addEventListener('pointermove', move);
    t.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      t.removeEventListener('pointerenter', enter);
      t.removeEventListener('pointermove', move);
      t.removeEventListener('pointerleave', leave);
    };
  }, []);

  return null;
}
