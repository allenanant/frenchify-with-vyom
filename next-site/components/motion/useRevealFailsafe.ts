'use client';

import { useEffect, useState } from 'react';

// Scroll-reveal failsafe (same intent as the course pages' 1.5s .reveal
// failsafe from the site audit): if an IntersectionObserver-driven reveal
// hasn't fired shortly after mount — deep links, back-button scroll
// restoration, fast scrolling, odd viewports — force the content visible.
// A blank section is always worse than a skipped entrance animation.
export function useRevealFailsafe(ms = 1800): boolean {
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setForced(true), ms);
    return () => window.clearTimeout(t);
  }, [ms]);

  return forced;
}
