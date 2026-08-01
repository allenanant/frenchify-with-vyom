import Reveal from '@/components/motion/Reveal';
import { CATEGORIES } from '@/lib/tickets/db';
import PortalHandoff from './_components/PortalHandoff';
import TicketForm from './_components/TicketForm';

export const metadata = {
  title: 'Student Support - Frenchify',
  description: 'Currently enrolled? Raise an issue and the Frenchify team will pick it up with a ticket number.',
  robots: { index: false, follow: false },
};

const SUPPORT_EMAIL = 'Admin@frenchifywithvyom.com';

const STEPS = [
  { n: '1', t: 'Describe it', d: 'What you were doing and what went wrong.' },
  { n: '2', t: 'Add a screenshot', d: 'Required. Fastest way for us to see the problem.' },
  { n: '3', t: 'Get a ticket number', d: 'Quote it any time you follow up.' },
];

export default function StudentSupportPage() {
  return (
    <main>
      <PortalHandoff />
      <section className="bg-white px-4 pb-10 pt-12 sm:px-6 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Stuck on something? Tell us.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
              Raise it here and it lands straight with the Frenchify team with a ticket number, so nothing gets
              lost in a chat thread. Most issues are picked up the same working day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-blue-100 bg-blue-50/50 px-5 py-4">
                <p className="text-[15px] font-extrabold text-gray-900">
                  <span className="text-brand-blue">{s.n}.</span> {s.t}
                </p>
                <p className="mt-0.5 text-sm text-gray-600">{s.d}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/*
            Deliberately NOT wrapped in <Reveal>. That helper renders
            opacity:0 inline and only fades in once JavaScript runs, which is
            an acceptable trade on a marketing section and a bad one here: if
            hydration fails or is slow, the student is looking at an invisible
            form on the one page whose entire job is that form.
          */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft sm:p-7 md:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Raise an issue
            </h2>
            <p className="mb-6 mt-1 text-[15px] text-gray-500">
              Fields marked <span className="text-red-600">*</span> are required.
            </p>
            <TicketForm categories={CATEGORIES} />
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Prefer email? Write to{' '}
            <a className="font-medium text-brand-blue hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
