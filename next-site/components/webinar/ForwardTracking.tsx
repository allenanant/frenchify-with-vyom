'use client';

/**
 * Carries the ad's tracking parameters from the landing page onto the
 * registration link.
 *
 * Done on the client on purpose: the landing page takes the ad spike and stays
 * statically cached, which reading searchParams on the server would give up.
 * Patching an anchor's href after mount costs nothing and cannot break the page
 * if the JS never runs — the link still works, it just arrives untagged.
 */

import { useEffect } from 'react';
import { trackingQuery } from '@/lib/webinar-tracking';

export default function ForwardTracking() {
  useEffect(() => {
    const q = trackingQuery(new URLSearchParams(window.location.search));
    if (!q) return;
    document.querySelectorAll<HTMLAnchorElement>('a[href^="/webinar-form"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href.includes('?')) return;
      a.setAttribute('href', href + q);
    });
  }, []);

  return null;
}
