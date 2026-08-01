'use client';

import { usePathname } from 'next/navigation';

/**
 * Hides the marketing header, footer and floating CTA on internal tools.
 * The support desk is a working dashboard, not a page we are selling from.
 */
const BARE_PREFIXES = ['/student-support/staff'];

/**
 * Pages that lose the navigation bar but keep the footer. Students land on
 * the public support form straight from the TagMango portal, so the
 * marketing nav has no business being there.
 */
const HEADER_BARE_PREFIXES = ['/student-support'];

export default function ChromeGate({
  children,
  zone = 'any',
}: {
  children: React.ReactNode;
  zone?: 'header' | 'footer' | 'any';
}) {
  const pathname = usePathname() || '';
  if (BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  if (zone === 'header' && HEADER_BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}
