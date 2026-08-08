/**
 * The dated per-week URL, e.g. /webinar/9aug2026.
 *
 * On GoHighLevel a fresh funnel step was cloned by hand every Monday so each
 * week's Meta ads had their own URL (/webinar-2aug2026 and so on). That is the
 * only thing the clone gave you, so this route reproduces it without the
 * clone: any dated slug renders the current webinar.
 *
 * Old slugs keep working rather than 404ing, because live ads, WhatsApp
 * messages and shared links outlast the week they were made for. Only the
 * canonical points at /sunday-webinar, so search engines index one page and
 * not fifty near-identical ones.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WebinarLanding from '@/components/webinar/WebinarLanding';
import { getWebinar } from '@/lib/webinar';

export const revalidate = 600;

/** Guards against the route swallowing typos: 9aug2026, 2026-08-09, w-12-july-1327 */
const SLUG_RE = /^[a-z0-9][a-z0-9-]{2,63}$/;

export const metadata: Metadata = {
  title: 'French for Canadian PR: Live Assessment Workshop',
  description:
    'Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live assessment and get your personalized French learning strategy - completely free.',
  alternates: { canonical: '/sunday-webinar/' },
  // One indexable copy of this page is enough, and it is /sunday-webinar.
  robots: { index: false, follow: true },
};

export default async function DatedWebinarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();
  return <WebinarLanding webinar={getWebinar()} />;
}
