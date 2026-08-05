import Link from 'next/link';
import { ClipboardCheck, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import ProgramTabs from './_components/ProgramTabs';

export const metadata = {
  title: 'Exam Prep 1 for TEF Canada - Frenchify with Vyom',
  description:
    'Three focused TEF Canada Exam Prep 1 programs: EP1 Intensive, EP1 Flex and CLB 5 Speaking and Listening. Book your compulsory Analysis Test and get placed in the right one.',
  alternates: { canonical: 'https://frenchifywithvyom.com/exam-prep-1-tef' },
};

const fees = [
  { name: 'EP1 Intensive', price: '$899 CAD' },
  { name: 'EP1 Flex', price: '$729 CAD' },
  { name: 'CLB 5 Speaking and Listening', price: '$799 CAD' },
];

const faqs: FaqItem[] = [
  {
    q: 'Do I need to take the Analysis Test even if I know I am at B1 level?',
    a: 'Yes, the Analysis Test is compulsory for all students before registering for any Exam Prep 1 program. It only takes a short time and ensures we place you correctly so your preparation is targeted and effective. Book here 👉 frenchifywithvyom.com/analysis-page',
  },
  {
    q: 'What is the difference between EP1 Intensive and EP1 Flex?',
    a: 'EP1 Intensive includes 5 live group sessions per week with small groups of 3 to 4 students and is best for students who want structured accountability and maximum live practice. EP1 Flex gives you 20 personalized one on one sessions and is better for students with busy or unpredictable schedules who need flexible timings.',
  },
  {
    q: 'What is the CLB 5 Speaking and Listening program for?',
    a: 'This program is for students who are already at B1 level and specifically need focused preparation for the Speaking and Listening modules of TEF Canada. It does not include Writing or Reading preparation.',
  },
  {
    q: 'Are all sessions recorded if I miss one?',
    a: 'Yes, all live sessions for EP1 Intensive are recorded and available in your Student Portal anytime. One on one sessions for EP1 Flex and CLB 5 are scheduled directly with your instructor so recordings depend on your arrangement.',
  },
  {
    q: 'How do I register?',
    a: 'Send an E-Transfer to frenchifyfee@gmail.com and mention which program you are joining along with your full name. Your access will be activated within 24 hours. If you have questions before registering, book a call with our team here 👉 frenchifywithvyom.com/book-online',
  },
  {
    q: 'Is there a refund policy?',
    a: 'All fees are non refundable once access is granted. We strongly recommend completing the Analysis Test and booking a consultation call before registering if you have any questions 👉 frenchifywithvyom.com/book-online',
  },
];

const registerSteps = [
  'Book and complete your Analysis Test at frenchifywithvyom.com/analysis-page',
  'Send an E-Transfer to frenchifyfee@gmail.com and mention the program name and your full name',
  'A team member will reach out via your Student Portal within 24 hours to activate your access',
  'If you have questions first, book a call with our team at frenchifywithvyom.com/book-online',
];

export default function ExamPrep1TefPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white full-bleed-section-ghl">
        <div className="absolute inset-0 hero-pattern opacity-60" aria-hidden />
        <div className="absolute inset-0 aurora-bg opacity-70" aria-hidden />
        <div className="relative ghl-row mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 font-semibold text-sm px-5 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              TEF Canada Exam Prep 1
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Ready for Exam Prep? Let&apos;s Clear{' '}
              <span className="gradient-text">TEF Canada.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the program that fits your schedule and goal. All three give you structured,
              focused TEF Canada preparation.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 max-w-2xl mx-auto rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-left flex gap-4">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100 text-amber-600 shrink-0">
                <ClipboardCheck className="w-5 h-5" />
              </span>
              <p className="text-gray-700 leading-relaxed">
                Before getting started with any program, an Analysis Test is compulsory. This helps
                us place you correctly and make the most of your preparation time.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <Magnetic>
              <Link
                href="/analysis-page"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-brand-blue-deep text-white font-semibold px-7 py-3.5 rounded-lg shadow transition-all duration-300 mt-7"
              >
                Book Your Analysis Test <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl" id="programs">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Choose Your Program
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Three Ways to <span className="gradient-text">Prepare</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Every program runs for 3 months and is built only for TEF Canada. Tap a program to
                see exactly what is inside.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ProgramTabs />
          </Reveal>
        </div>
      </section>

      {/* Analysis test */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl" id="analysis-test">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Step One
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Before You Begin, the Analysis Test is{' '}
                <span className="gradient-text">Compulsory</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border-2 border-brand-amber p-6 md:p-10 text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mx-auto">
                <ClipboardCheck className="w-7 h-7" />
              </span>
              <p className="text-gray-700 leading-relaxed mt-6">
                Before registering for any of the three programs, every student must complete an
                Analysis Test. This is a short live assessment that helps us understand your current
                level, identify your strengths and weaknesses, and make sure you are placed in the
                right program so your preparation is as effective as possible.
              </p>
              <Magnetic>
                <Link
                  href="/analysis-page"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-brand-blue-deep text-white font-semibold px-7 py-3.5 rounded-lg shadow transition-all duration-300 mt-8"
                >
                  Book Your Analysis Test <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl" id="faqs">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center tracking-tight mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
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
                Complete your Analysis Test first, then register for the program that fits you best.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border-2 border-brand-amber p-6 md:p-10 text-center">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                E-Transfer To
              </p>
              <a
                href="mailto:frenchifyfee@gmail.com"
                className="font-display text-2xl md:text-3xl font-bold text-brand-blue hover:underline inline-flex items-center gap-3 mt-2"
              >
                <Mail className="w-6 h-6" />
                frenchifyfee@gmail.com
              </a>

              <div className="mt-8 grid sm:grid-cols-3 gap-3">
                {fees.map((f) => (
                  <div key={f.name} className="rounded-xl bg-blue-50/70 border border-blue-100 p-4">
                    <p className="font-semibold text-gray-900 text-sm leading-snug">{f.name}</p>
                    <p className="font-display text-xl font-bold text-brand-blue mt-1">{f.price}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-left">
                <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5 text-center">
                  How to Register
                </p>
                <ol className="space-y-4 max-w-xl mx-auto">
                  {registerSteps.map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed pt-1">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Magnetic>
                  <Link
                    href="/analysis-page"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-brand-blue-deep text-white font-semibold px-7 py-3.5 rounded-lg shadow transition-all duration-300"
                  >
                    Book Your Analysis Test <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Magnetic>
                <Link
                  href="/book-a-meet"
                  className="inline-flex items-center justify-center border-2 border-brand-blue text-brand-blue font-semibold px-7 py-3.5 rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  Book a Call With Our Team
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                No refunds once registered. All amounts in CAD.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
