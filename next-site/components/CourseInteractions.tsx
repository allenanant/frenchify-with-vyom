'use client';

import { useEffect } from 'react';

/**
 * The scroll-reveal and magnetic-button behaviour for the level pages
 * (/a1-course … /b2-course).
 *
 * These pages are authored as standalone HTML with an inline <script> at the
 * end of the body. That script used to be extracted and replayed through
 * next/script, which broke in three ways at once:
 *
 *   1. next/script emitted it more than once per page. Every copy after the
 *      first died on `Identifier 'inSeq' has already been declared`, because
 *      the source declares its state with top-level `const`.
 *   2. The reveal failsafe was concatenated onto that same script, so the
 *      SyntaxError took the failsafe down with it and any section the
 *      IntersectionObserver missed stayed at opacity 0 permanently.
 *   3. Injected scripts do not re-run on client-side navigation, so arriving
 *      from /courses left the page with no observers at all.
 *
 * Running it as a real effect fixes all three: it executes on every mount,
 * cleans up on unmount, and cannot collide with itself.
 */

/** Levels that tag their CTAs as magnetic in addition to explicit opt-ins. */
export const MAGNETIC_CTAS =
  '.cta-link, a.btn-primary, .ed-mini a, button.magnetic, a.magnetic, [data-magnetic]';

/** A2 only ever opted in individual elements — keep it that way. */
export const MAGNETIC_OPT_IN_ONLY = '[data-magnetic], .magnetic';

/** Max px the cursor can pull a magnetic button on each axis. */
const MAX_OFFSET = 12;

/** How long to wait before force-revealing whatever the observers missed. */
const FAILSAFE_MS = 1500;

export default function CourseInteractions({
  magneticSelector = MAGNETIC_CTAS,
}: {
  magneticSelector?: string;
}) {
  useEffect(() => {
    const root = document.documentElement;
    const cleanups: Array<() => void> = [];

    // Only now, with the observers about to attach, may the CSS hide anything.
    // Until this class lands, `html:not(.js-reveal) .reveal` keeps every
    // section visible, so a JS failure costs the animation, never the content.
    root.classList.add('js-reveal');

    // --- Reveal on scroll ---------------------------------------------------
    // Children of a .seq-reveal are gated by their parent so they fire in
    // lockstep and the per-child transition-delay reads as a 1-2-3 staircase.
    const sequenced = new Set<Element>();
    document.querySelectorAll('.seq-reveal').forEach((parent) => {
      parent.querySelectorAll('.reveal').forEach((child) => sequenced.add(child));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !sequenced.has(entry.target)) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    const seqIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((c) => c.classList.add('in'));
            seqIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    document.querySelectorAll('.seq-reveal').forEach((el) => seqIo.observe(el));
    cleanups.push(() => seqIo.disconnect());

    // Anything the observers never got to — a deep link that jumps past a
    // section, a restored scroll position, a fast flick to the footer — is
    // revealed unconditionally rather than left blank.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
    }, FAILSAFE_MS);
    cleanups.push(() => window.clearTimeout(failsafe));

    // --- Magnetic buttons ---------------------------------------------------
    // Buttons and button-like CTAs only. Explicitly not cards (.ed-card,
    // .tl__card), badges (.stat-pill) or layout columns.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const targets = new Set<HTMLElement>();
      document
        .querySelectorAll<HTMLElement>(magneticSelector)
        .forEach((el) => targets.add(el));

      targets.forEach((el) => {
        el.classList.add('magnetic');

        const onMove = (event: MouseEvent) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          const x = ((event.clientX - r.left - r.width / 2) / (r.width / 2)) * MAX_OFFSET;
          const y = ((event.clientY - r.top - r.height / 2) / (r.height / 2)) * MAX_OFFSET;
          el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
        };
        const onLeave = () => {
          el.style.transform = 'translate(0, 0)';
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      root.classList.remove('js-reveal');
    };
  }, [magneticSelector]);

  return null;
}
