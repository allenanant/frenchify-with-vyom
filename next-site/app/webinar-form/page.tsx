/**
 * Lead capture. The form itself stays native to GoHighLevel on purpose: every
 * webinar automation ("Webinar seq. (sundays)" and everything downstream) is
 * triggered by a submission of GHL form 3APCQqdqGuJSH8iTWgS1, so embedding the
 * real form rather than rebuilding it means none of that had to be touched.
 *
 * The URL is the GHL funnel's own, letter for letter, so the form's existing
 * post-submit redirect and every registration email already sent still land in
 * the right place. Nothing on the GHL side had to be re-pointed.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import FunnelShell, { WebinarDateBadge } from '@/components/webinar/FunnelShell';
import Countdown from '@/components/webinar/Countdown';
import { GHL_WEBINAR_FORM_ID, getWebinar } from '@/lib/webinar';
import { trackingQuery } from '@/lib/webinar-tracking';

export const metadata: Metadata = {
  title: 'Register for the Workshop',
  description:
    'Complete your registration for the free workshop and take the first step towards boosting your Canada PR application with French.',
  robots: { index: false, follow: false },
};

// Reading searchParams makes this render per request, which is the price of
// passing the ad's tracking tags into the form. The landing page, which takes
// the actual traffic spike, stays cached and forwards them on the client.
export const dynamic = 'force-dynamic';

export default async function RegisterWebinarPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const webinar = getWebinar();
  // GHL's form_embed.js does not copy the parent page's query string into the
  // iframe, so the form only sees the campaign if we put it on the src.
  const formSrc =
    `https://api.leadconnectorhq.com/widget/form/${GHL_WEBINAR_FORM_ID}` +
    trackingQuery(await searchParams);

  return (
    <FunnelShell>
      <h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.015em] text-fnl-ink sm:text-[34px]">
        You&apos;re Almost In!
      </h1>
      <p className="mt-3 text-[17px] leading-[1.55] text-fnl-body">
        Confirm your details below to secure your spot for this exclusive Canadian PR workshop.
      </p>

      <WebinarDateBadge date={webinar.displayDate} />

      <Countdown targetIso={webinar.startsAt} expiredLabel="The workshop is starting" className="mb-7" />

      <div className="rounded-[10px] border border-fnl-line bg-fnl-surface">
        <iframe
          src={formSrc}
          id={`inline-${GHL_WEBINAR_FORM_ID}`}
          title="Webinar Registration form"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Webinar Registration form"
          data-height="411"
          data-layout-iframe-id={`inline-${GHL_WEBINAR_FORM_ID}`}
          data-form-id={GHL_WEBINAR_FORM_ID}
          className="w-full rounded-[10px] border-0"
          style={{ minHeight: 411 }}
        />
        {/* GHL's embed script resizes the iframe to the form's real height. */}
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
      </div>

      <p className="mt-5 text-[14px] leading-[1.5] text-fnl-mute">
        Your details go straight to Frenchify with Vyom. No spam, and you can leave the WhatsApp group any time.
      </p>
    </FunnelShell>
  );
}
