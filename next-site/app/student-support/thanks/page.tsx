import Link from 'next/link';
import { refExists } from '@/lib/tickets/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Ticket raised - Frenchify',
  robots: { index: false, follow: false },
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const { ref } = await searchParams;
  const raw = Array.isArray(ref) ? ref[0] : ref;
  const candidate = (raw || '').replace(/[^A-Z0-9-]/gi, '').slice(0, 20);

  // Three outcomes, not two. A lookup that fails is not the same as a ticket
  // that does not exist: telling a student nothing was submitted because the
  // database blinked would send them off to raise the whole thing again.
  let state: 'found' | 'absent' | 'unverified' = 'absent';
  if (candidate) {
    try {
      state = (await refExists(candidate)) ? 'found' : 'absent';
    } catch {
      state = 'unverified';
    }
  }
  const clean = state === 'found' || state === 'unverified' ? candidate : '';

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {state === 'found' ? 'Got it, thank you.'
            : state === 'unverified' ? 'We cannot check that right now'
            : 'We could not find that ticket'}
        </h1>

        {clean && (
          <p className="mt-5 inline-block rounded-xl bg-blue-50 px-6 py-3 font-display text-xl font-bold tracking-wide text-brand-blue-deep sm:text-2xl">
            {clean}
          </p>
        )}

        {state === 'found' ? (
          <>
            <p className="mt-5 text-base text-gray-600">
              Your issue is with the Frenchify team under the number above. Someone will reach out on the email
              or number you gave us.
            </p>
            <p className="mt-3 text-base text-gray-600">
              Quote that number if you follow up, it pulls up everything you sent including your screenshot.
            </p>
          </>
        ) : state === 'unverified' ? (
          <p className="mt-5 text-base text-gray-600">
            Our system is not responding at the moment, so we cannot confirm this reference either way. If you
            just submitted the form, your ticket is almost certainly saved. Hold on to the number above and email{' '}
            <a className="font-medium text-brand-blue hover:underline" href="mailto:Admin@frenchifywithvyom.com">
              Admin@frenchifywithvyom.com
            </a>{' '}
            if you do not hear back.
          </p>
        ) : (
          <p className="mt-5 text-base text-gray-600">
            That reference does not match anything on our side, so nothing has been submitted. Raise the issue
            below and you will get a number you can quote.
          </p>
        )}

        <Link
          href="/student-support"
          className="mt-8 inline-block rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white shadow-premium transition hover:bg-brand-blue-deep"
        >
          {state === 'absent' ? 'Go to the support form' : 'Raise another issue'}
        </Link>
      </div>
    </main>
  );
}
