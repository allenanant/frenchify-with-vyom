/**
 * Saturday alias of the evergreen landing page. From the week of 28 Nov 2026
 * the main webinar runs on Saturday, and an ad or bio link reading
 * "sunday-webinar" for a Saturday session looks like a mistake. Same page,
 * same data; the canonical stays /sunday-webinar so search engines index one.
 */

import type { Metadata } from 'next';
import MainWebinarLanding from '@/components/webinar/MainWebinarLanding';
import { getWebinar } from '@/lib/webinar';

export const metadata: Metadata = {
  title: 'French for Canadian PR: Live Assessment Workshop',
  description:
    'Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live assessment and get your personalized French learning strategy - completely free.',
  alternates: { canonical: '/sunday-webinar/' },
  robots: { index: false, follow: true },
};

export const revalidate = 600;

export default function SaturdayWebinarPage() {
  return <MainWebinarLanding webinar={getWebinar()} />;
}
