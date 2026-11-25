/**
 * Black Friday 2026 webinar landing page (Vyom, via Allen, 25 Nov 2026).
 *
 * Same funnel as /sunday-webinar: same schedule, same GHL form behind every
 * CTA, same tracking. Only the design is Black Friday. Once the promo date in
 * lib/promo.ts passes, this route sends visitors to the evergreen page, so an
 * old ad or link never shows an expired sale.
 */

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import BlackFridayLanding from '@/components/webinar/BlackFridayLanding';
import { isBlackFridayOn } from '@/lib/promo';
import { getWebinar } from '@/lib/webinar';

const TITLE = 'Black Friday: French for Canadian PR Live Assessment Workshop';
const DESCRIPTION =
  'Discover in 90 minutes if French is your fastest path to Canadian PR. Join the free live workshop and get the Black Friday offer from Vyom.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // A time-boxed copy of the evergreen page: one indexable version is enough.
  alternates: { canonical: '/sunday-webinar/' },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/black-friday-webinar/',
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
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export const revalidate = 600;

export default function BlackFridayWebinarPage() {
  if (!isBlackFridayOn()) redirect('/sunday-webinar/');
  return <BlackFridayLanding webinar={getWebinar()} />;
}
