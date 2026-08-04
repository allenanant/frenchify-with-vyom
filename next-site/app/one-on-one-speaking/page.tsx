import { CalendarDays, Info, Lock, MessageSquare } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import FaqAccordion from '@/components/FaqAccordion';
import MentorCard from './_components/MentorCard';
import { bookingSteps, faqs, levels, mentors } from './_data';

export const metadata = {
  title: 'One-on-One TEF Mentorship - Frenchify with Vyom',
  description:
    'Book one-on-one speaking sessions with Frenchify students who have cleared the TEF Canada exam. Practise Section A and Section B, get feedback on structure and pronunciation, and build exam confidence.',
  alternates: { canonical: 'https://frenchifywithvyom.com/one-on-one-speaking' },
};

export default function OneOnOneSpeakingPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 hero-pattern opacity-60" aria-hidden />
        <div className="absolute inset-0 aurora-bg opacity-70" aria-hidden />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              One-on-One <span className="gradient-text">TEF Mentorship</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Book practice sessions with successful Frenchify students who have cleared their TEF
              Canada exam and achieved their PR dreams.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3 text-yellow-800 text-sm font-medium">
              <Lock className="w-4 h-4 mr-2 shrink-0" />
              Exclusive for Frenchify Students Only
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mentor line-up ──────────────────────────────────── */}
      <section className="bg-white pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="flex flex-wrap justify-center gap-x-4 gap-y-6 md:gap-x-8">
            {mentors.map((m) => (
              <a
                key={m.slug}
                href={`#${m.slug}`}
                className="group flex w-[calc(50%-1rem)] sm:w-40 flex-col items-center text-center hover-lift rounded-2xl p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-blue-50 bg-gray-50 transition-colors duration-300 group-hover:border-brand-blue/40"
                />
                <span className="font-display font-bold text-gray-900 text-sm mt-3 leading-tight">
                  {m.name}
                </span>
                <span className="text-xs text-gray-500 mt-1 leading-snug">{m.specialty}</span>
              </a>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Booking ─────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Book Your <span className="gradient-text">Speaking Session</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Pick a mentor and choose a duration. The booking calendar opens in a new tab, and
                you will get an email with the meeting link once the booking is confirmed.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {mentors.map((m) => (
              <Reveal key={m.slug} amount={0.05}>
                <MentorCard mentor={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to book ─────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center tracking-tight">
              How to Book One-on-One Speaking Sessions
            </h2>
            <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
              These are one of the fastest ways to improve your fluency, confidence and TEF speaking
              performance.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="premium-card mt-10 p-6 md:p-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-gray-900 mb-6">
                <CalendarDays className="w-5 h-5 text-brand-blue shrink-0" />
                Step-by-Step Booking Process
              </h3>

              <ol className="space-y-4">
                {bookingSteps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
                <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">Note:</span> You may bring your own
                  prepared topic or practise an on-the-spot topic during the session.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How the sessions work ───────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center tracking-tight mb-12">
              How Do These <span className="gradient-text">Sessions Work?</span>
            </h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6">
            {levels.map((l) => (
              <div key={l.level} className="premium-card p-6 md:p-8 h-full">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gradient text-white font-display font-bold">
                  {l.level}
                </span>
                <h3 className="font-display text-lg font-bold text-gray-900 mt-5 mb-3 tracking-tight">
                  {l.title}
                </h3>
                {l.body.map((p, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FAQs ────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center tracking-tight mb-12">
              FAQs
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600">
              <MessageSquare className="w-4 h-4 text-brand-blue shrink-0" />
              <span>
                Still stuck? Email{' '}
                <a
                  href="mailto:frenchifyfee@gmail.com"
                  className="text-brand-blue font-semibold hover:underline"
                >
                  frenchifyfee@gmail.com
                </a>
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
