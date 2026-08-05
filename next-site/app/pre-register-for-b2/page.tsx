import {
  Bell,
  Target,
  AlertTriangle,
  Mail,
  Star,
  CalendarDays,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Magnetic from '@/components/motion/Magnetic';

export const metadata = {
  title: 'Pre-Register for B2 Intensive Final Exam Preparation - Frenchify with Vyom',
  description:
    'Pre-register for early access to the Frenchify B2 Intensive Final Exam Preparation program. Learn the correct Section B Speaking format and prepare for your TEF exam sooner.',
  alternates: { canonical: 'https://frenchifywithvyom.com/pre-register-for-b2' },
};

const benefits = [
  {
    main: true,
    body: 'Full access to the Online B2 Portal right away. Start learning immediately, before B2 Intensive Live Sessions begin.',
  },
  {
    body: "Learn the correct Section B Speaking Format through lectures and sample stocks so you understand exactly what's expected in the exam.",
  },
  {
    body: 'Once you understand Section B, you can practice with Frenchify Instructors in One-on-One Sessions on the side if you would like.',
  },
  {
    body: 'Your B1 Intensive sessions continue as usual alongside B2 — nothing changes, you simply gain early B2 access on top.',
  },
];

const schedule = [
  { day: 'Wednesday', time: '8:30 PM – 9:30 PM EST' },
  { day: 'Friday', time: '8:30 PM – 9:30 PM EST' },
  { day: 'Saturday', time: '11:30 AM – 12:30 PM EST' },
];

export default function PreRegisterB2Page() {
  return (
    <main>
      {/* Notice bar */}
      <div className="bg-blue-600 text-white full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-sm font-medium">
          <Bell className="inline w-4 h-4 mr-2 -mt-0.5" />
          Pre-Registration is now open for B2 Intensive Final Exam Preparation · Limited spots
          available
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white full-bleed-section-ghl">
        <div className="absolute inset-0 hero-pattern opacity-60" aria-hidden />
        <div className="absolute inset-0 aurora-bg opacity-70" aria-hidden />
        <div className="relative ghl-row mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <Reveal>
            <div className="inline-block bg-blue-100 text-blue-800 font-semibold text-sm px-5 py-2 rounded-full mb-6">
              🇫🇷 B2 Intensive Final Exam Preparation
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Pre-Register for <span className="gradient-text">Early Access</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Get access to the B2 online portal before the batch begins. Learn the correct Section
              B Speaking format and prepare for your TEF exam sooner.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who is this for */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Who Is This For
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Is This the Right <span className="gradient-text">Next Step?</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border border-gray-200 p-6 md:p-8 flex gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                <Target className="w-6 h-6" />
              </span>
              <p className="text-gray-700 leading-relaxed">
                If you have a TEF exam booked at B1 Intensive level for CLB 5, or want to complete
                your prep sooner and move to B2 Intensive Final Exam Preparation, this is the right
                next step for you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why register early */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Why Register Early
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Why Go Through <span className="gradient-text">B2 First?</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                To prepare for your TEF exam, you need to go through the B2 Intensive Final Exam
                Preparation program first to understand the format, lectures, and samples for all 4
                modules.
              </p>
              <p>
                Currently, B1 Intensive students cannot practice Section B speaking correctly
                because the format hasn&apos;t been introduced yet, which leads to incorrect
                understanding and practice — which is not what we are looking for.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Early access benefits */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                What You Get
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Early Access <span className="gradient-text">Benefits</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Everything included when you pre-register for B2 Intensive Final Exam Preparation.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`premium-card rounded-2xl p-6 md:p-7 h-full ${
                  b.main ? 'bg-blue-600 text-white border-2 border-blue-600' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center ${
                      b.main ? 'bg-white/20 text-white' : 'bg-brand-blue text-white'
                    }`}
                  >
                    {i + 1}
                  </span>
                  {b.main && (
                    <span className="inline-flex items-center gap-1 bg-brand-amber text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3" />
                      MAIN BENEFIT
                    </span>
                  )}
                </div>
                <p className={`leading-relaxed ${b.main ? 'text-blue-50' : 'text-gray-700'}`}>
                  {b.body}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Live session schedule */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Live Session Schedule
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                B2 Live Session <span className="gradient-text">Timings</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                These are fixed timings for B2 Intensive Final Exam Preparation live sessions. Live
                sessions will begin once you pass your B1 Intensive Test.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {schedule.map((s) => (
              <div key={s.day} className="premium-card bg-white rounded-2xl p-6 text-center h-full">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                  <CalendarDays className="w-6 h-6" />
                </span>
                <p className="font-display font-bold text-gray-900">{s.day}</p>
                <p className="text-sm text-gray-500 mt-1">{s.time}</p>
                <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mt-3">
                  Weekly
                </p>
              </div>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <div className="mt-6 flex gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                Live sessions begin after passing the B1 Intensive Test.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Please note */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Important
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Please <span className="gradient-text">Note</span>
              </h2>
              <p className="text-gray-600 mt-4">A few things to keep in mind before registering.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </span>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <span className="font-semibold text-gray-900">
                      For Frenchify Students Only.
                    </span>{' '}
                    This pre-registration is exclusively for existing Frenchify B1 Intensive
                    students. Registration from outside Frenchify will not be accepted.
                  </p>
                  <p>
                    Your B1 Intensive sessions continue as usual. Once you complete your exam or
                    finish B1 Intensive, your B2 Intensive Final Exam Preparation live sessions will
                    begin.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl" id="register">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Registration
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Ready to <span className="gradient-text">Get Started?</span>
              </h2>
              <p className="text-gray-600 mt-4">
                Secure your early access spot in B2 Intensive Final Exam Preparation
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border-2 border-brand-amber p-6 md:p-10 text-center">
              <p className="font-display text-5xl font-bold text-brand-blue">$899</p>
              <p className="text-sm text-gray-500 mt-2">
                3 months access from when B2 Intensive Live Sessions begin
              </p>

              <div className="mt-8 text-left">
                <ol className="space-y-4 max-w-xl mx-auto">
                  {[
                    'E-Transfer to frenchifyfee@gmail.com',
                    'Send a screenshot or notify through WhatsApp',
                    'Receive your B2 Portal access link',
                  ].map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed pt-1">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8">
                <Magnetic>
                  <a
                    href="mailto:frenchifyfee@gmail.com"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-brand-blue-deep text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    E-Transfer &amp; Pre-Register Now
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-center text-gray-500 mt-10">Merci 🙂</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
