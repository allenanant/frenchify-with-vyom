'use client';

import { usePathname } from 'next/navigation';

/**
 * Hides the marketing header, footer and floating CTA on internal tools.
 * The support desk is a working dashboard, not a page we are selling from.
 */
const BARE_PREFIXES = ['/student-support/staff'];

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  if (BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}
