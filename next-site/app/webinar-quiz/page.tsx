/**
 * /webinar-quiz/ — Vyom's quiz in front of the webinar registration form.
 *
 * The visitor answers the quiz one question at a time. The last step is the
 * same GHL form 3APCQqdqGuJSH8iTWgS1 that /webinar-form/ embeds, so a
 * registration here starts exactly the same webinar automation. The answers
 * are saved to the site database after each step (Website Admin, Quiz tab) and
 * go onto the GHL contact as a note and tags once the form reports success.
 *
 * The ad's tracking parameters go into the form iframe the same way as on
 * /webinar-form/, so Meta and GHL attribution behave the same. The page has
 * its own mobile-first shell instead of FunnelShell: on a phone there is no
 * card frame, so the answers get the full screen width.
 */

import type { Metadata, Viewport } from 'next';
import WebinarPixel from '@/components/webinar/WebinarPixel';
import { GHL_WEBINAR_FORM_ID, getWebinar } from '@/lib/webinar';
import { trackingQuery } from '@/lib/webinar-tracking';
import WebinarQuiz from './WebinarQuiz';

export const metadata: Metadata = {
  title: 'Your French Plan for Canada PR · Free Workshop',
  description:
    'Answer a few short questions about your French goal and level. Then save your free seat in the live French for Canada PR workshop with Vyom.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

// Per request for the same reason as /webinar-form/: the tracking tags go on
// the iframe src, and the workshop date must be the current one.
export const dynamic = 'force-dynamic';

export default async function WebinarQuizPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const webinar = getWebinar();
  const tracking = trackingQuery(await searchParams);
  const formSrc = `https://api.leadconnectorhq.com/widget/form/${GHL_WEBINAR_FORM_ID}${tracking}`;

  return (
    <>
      <WebinarPixel />
      <WebinarQuiz
        formId={GHL_WEBINAR_FORM_ID}
        formSrc={formSrc}
        tracking={Object.fromEntries(new URLSearchParams(tracking.slice(1)))}
        displayDate={webinar.displayDate}
        startsAt={webinar.startsAt}
      />
    </>
  );
}
