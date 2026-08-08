/**
 * Where the GoHighLevel registration form lands after a submit. Copy is the
 * GHL thank-you page verbatim; the date now comes from the shared schedule
 * instead of a merge tag.
 */

import type { Metadata } from 'next';
import { CalendarDays, CheckCircle2, Mail } from 'lucide-react';
import FunnelShell, { WebinarDateBadge } from '@/components/webinar/FunnelShell';
import Countdown from '@/components/webinar/Countdown';
import { getWebinar } from '@/lib/webinar';

/** Vyom's community group — same link the GHL page used. */
const WHATSAPP_GROUP = 'https://chat.whatsapp.com/JJguQdp1JnI5q1b99HrBBQ';

export const metadata: Metadata = {
  title: 'Your Spot Is Confirmed',
  description:
    'Your spot for the free French for Canada PR workshop is reserved. Check your email for the joining link.',
  robots: { index: false, follow: false },
};

export const revalidate = 600;

const steps = [
  {
    Icon: Mail,
    title: 'Check Your Email',
    copy: "We've sent a confirmation email with your unique link to join the webinar. Check your inbox (and spam folder!).",
  },
  {
    Icon: CalendarDays,
    title: 'Mark Your Calendar',
    copy: "Don't miss it! Be sure to add the event to your calendar so you get a reminder before the workshop begins.",
  },
];

export default function WebinarThankYouPage() {
  const webinar = getWebinar();

  return (
    <FunnelShell maxWidth="max-w-[720px]">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-600/30">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <h1 className="font-display text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
        Congratulations! Your spot is confirmed.&nbsp;🍁
      </h1>
      <p className="mt-3 text-base font-medium text-slate-600">
        Your spot for the exclusive French for Canada PR workshop is reserved. We&apos;re excited to see you there!
      </p>

      <WebinarDateBadge date={webinar.displayDate} />

      <Countdown targetIso={webinar.startsAt} expiredLabel="The workshop is starting" className="mb-7" />

      <a
        href={WHATSAPP_GROUP}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-base font-black text-white shadow-lg transition hover:brightness-95 sm:w-auto"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden>
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.505 1.786 6.456l-1.017 3.717 3.718-1.018z" />
        </svg>
        Join our WhatsApp Community
      </a>

      <hr className="my-8 border-blue-50" />

      <h2 className="font-display text-xl font-black tracking-tight text-slate-900">Your Final Steps:</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {steps.map(({ Icon, title, copy }) => (
          <div key={title} className="rounded-2xl border border-blue-50 bg-blue-50/40 p-5 text-left">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white shadow-md">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-black tracking-tight text-slate-900">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{copy}</p>
          </div>
        ))}
      </div>

      <p className="mt-7 text-sm text-slate-500">
        On the day, head to{' '}
        <a href="/waiting-room/" className="font-bold text-brand-blue underline">
          the waiting room
        </a>{' '}
        a few minutes early and you&apos;ll be let in automatically.
      </p>
    </FunnelShell>
  );
}
