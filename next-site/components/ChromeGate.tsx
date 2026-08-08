'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hides the marketing header, footer and floating CTA on internal tools.
 * The support desk is a working dashboard, not a page we are selling from.
 */
const BARE_PREFIXES = [
  '/student-support/staff',
  '/writingsubmissions',
  // The webinar funnel's inner pages carry their own shell and footer. They
  // are paid-traffic steps, so the site nav would only offer a way out.
  '/register-webinar',
  '/webinar-thank-you',
  '/waiting-room',
];

/**
 * Pages that lose the navigation bar but keep the footer. Students land on
 * the public support form straight from the TagMango portal, so the
 * marketing nav has no business being there.
 */
const HEADER_BARE_PREFIXES = ['/student-support', '/sunday-webinar', '/webinar'];

/**
 * Pages that keep the footer but drop the floating "Get in touch" bubble. On
 * the paid-traffic webinar pages it is the only thing on screen offering a way
 * out that isn't registering.
 */
const CTA_BARE_PREFIXES = ['/sunday-webinar', '/webinar'];

export default function ChromeGate({
  children,
  zone = 'any',
}: {
  children: React.ReactNode;
  zone?: 'header' | 'footer' | 'cta' | 'any';
}) {
  const pathname = usePathname() || '';
  const noHeader =
    BARE_PREFIXES.some((p) => pathname.startsWith(p)) ||
    HEADER_BARE_PREFIXES.some((p) => pathname.startsWith(p));

  // One gate renders per zone, so this runs from the header gate only.
  useEffect(() => {
    if (zone !== 'header') return;
    document.body.classList.toggle('no-site-header', noHeader);
    return () => document.body.classList.remove('no-site-header');
  }, [zone, noHeader]);

  if (BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  if (zone === 'header' && HEADER_BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  if (zone === 'cta' && CTA_BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}
