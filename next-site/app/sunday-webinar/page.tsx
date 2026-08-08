/**
 * The evergreen webinar landing page. It always shows the next upcoming
 * Sunday, so an ad, a bio link or an email can point here forever without
 * anyone remembering to repoint it. The dated per-week URLs live at
 * /webinar/<slug> and render exactly the same thing.
 */

import type { Metadata } from 'next';
import WebinarLanding from '@/components/webinar/WebinarLanding';
import { getWebinar } from '@/lib/webinar';

const TITLE = 'French for Canadian PR: Live Assessment Workshop';
const DESCRIPTION =
  'Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live assessment and get your personalized French learning strategy - completely free.';

/**
 * This page gets forwarded in WhatsApp and Telegram groups constantly, and
 * without og tags every one of those shares previewed as a bare URL. The
 * poster still is Wistia's own frame from the VSL, so there is no new asset to
 * keep in sync.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/sunday-webinar/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/sunday-webinar/',
    siteName: 'Frenchify with Vyom',
    type: 'website',
    images: [
      {
        url: 'https://embed-fastly.wistia.com/deliveries/2a75fd811a1058c4aaca949de855a774.jpg?image_crop_resized=1200x630',
        width: 1200,
        height: 630,
        alt: 'Vyom Sharma, French for Canadian PR live assessment workshop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const revalidate = 600;

export default function SundayWebinarPage() {
  return <WebinarLanding webinar={getWebinar()} />;
}
