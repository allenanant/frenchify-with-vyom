/**
 * Lead capture. The form itself stays native to GoHighLevel on purpose: every
 * webinar automation ("Webinar seq. (sundays)" and everything downstream) is
 * triggered by a submission of GHL form 3APCQqdqGuJSH8iTWgS1, so embedding the
 * real form rather than rebuilding it means none of that had to be touched.
 *
 * The one setting that lives on the GHL side is where the form redirects after
 * submit — it has to point at /webinar-thank-you/ on this domain.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import FunnelShell, { WebinarDateBadge } from '@/components/webinar/FunnelShell';
import Countdown from '@/components/webinar/Countdown';
import { GHL_WEBINAR_FORM_ID, getWebinar } from '@/lib/webinar';

export const metadata: Metadata = {
  title: 'Register for the Workshop',
  description:
    'Complete your registration for the free workshop and take the first step towards boosting your Canada PR application with French.',
  robots: { index: false, follow: false },
};

// Ten minutes: fresh enough that the date is never visibly stale, cached
// enough that an ad spike does not render this per request.
export const revalidate = 600;

export default function RegisterWebinarPage() {
  const webinar = getWebinar();

  return (
    <FunnelShell>
      <h1 className="font-display text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
        You&apos;re Almost In! 🍁
      </h1>
      <p className="mt-3 text-base font-medium text-slate-600">
        Confirm your details below to secure your spot for this exclusive Canadian PR workshop.
      </p>

      <WebinarDateBadge date={webinar.displayDate} />

      <Countdown targetIso={webinar.startsAt} expiredLabel="The workshop is starting" className="mb-7" />

      <div className="rounded-2xl border border-blue-50 bg-white">
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${GHL_WEBINAR_FORM_ID}`}
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
          className="w-full rounded-xl border-0"
          style={{ minHeight: 411 }}
        />
        {/* GHL's embed script resizes the iframe to the form's real height. */}
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
      </div>

      <p className="mt-5 text-xs text-slate-500">
        Your details go straight to Frenchify with Vyom. No spam, and you can leave the WhatsApp group any time.
      </p>
    </FunnelShell>
  );
}
