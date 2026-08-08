/**
 * The evergreen webinar landing page. It always shows the next upcoming
 * Sunday, so an ad, a bio link or an email can point here forever without
 * anyone remembering to repoint it. The dated per-week URLs live at
 * /webinar/<slug> and render exactly the same thing.
 */

import type { Metadata } from 'next';
import WebinarLanding from '@/components/webinar/WebinarLanding';
import { getWebinar } from '@/lib/webinar';

export const metadata: Metadata = {
  title: 'French for Canadian PR: Live Assessment Workshop',
  description:
    'Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live assessment and get your personalized French learning strategy - completely free.',
  alternates: { canonical: '/sunday-webinar/' },
};

export const revalidate = 600;

export default function SundayWebinarPage() {
  return <WebinarLanding webinar={getWebinar()} />;
}
