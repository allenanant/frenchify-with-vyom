import {
  CheckCircle2,
  PauseCircle,
  Flag,
  CreditCard,
  Gift,
  MessageSquare,
  Send,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import PathTabs from '@/components/renewal/PathTabs';

export const metadata = {
  title: 'A2 Course Renewal - Frenchify with Vyom',
  description:
    'Renew your A2 course access and continue your French learning journey. Online course renewal, live session add-ons, and a free renewal offer with B1 pre-registration.',
  alternates: { canonical: 'https://frenchifywithvyom.com/a2-renewal' },
};

const situations = [
  {
    Icon: CheckCircle2,
    color: 'bg-green-100 text-green-600',
    title: 'Almost Done',
    body: 'Just need to revise, take the test, and finish a couple assignments',
  },
  {
    Icon: PauseCircle,
    color: 'bg-amber-100 text-amber-600',
    title: 'Paused Midway',
    body: 'Stopped in between and now need a month or more to catch up',
  },
  {
    Icon: Flag,
    color: 'bg-blue-100 text-blue-600',
    title: 'Few Assignments Left',
    body: 'Need about 2 to 3 weeks to finish the last couple assignments',
  },
];

const onlinePlans = [
  { term: '1 Month', price: '$149 CAD', href: 'https://buy.stripe.com/4gM28rajBafI7QW3Mk5sA1E' },
  { term: '2 Months', price: '$249 CAD', href: 'https://buy.stripe.com/5kQ5kD4Zh2Ng6MSfv25sA1y' },
];

const livePlans = [
  { term: '1 Month', price: '$199 CAD', href: 'https://buy.stripe.com/5kQdR9fDVbjM0ou82A5sA17' },
  { term: '2 Months', price: '$299 CAD', href: 'https://buy.stripe.com/8x29ATbnF0F85IO0A85sA1w' },
];

const pathSteps = [
  { stage: 'A2', title: 'You Are Here', detail: '', current: true },
  { stage: 'CLB 5', title: '~2.5 to 3 Months', detail: 'at 2 to 3 hours daily', current: false },
  { stage: 'CLB 7', title: '~5 to 6 Months', detail: 'at 2 to 3 hours daily', current: false },
];

const faqs: FaqItem[] = [
  {
    q: "What if I can't complete A2 within the free 1 month and need more time after paying for B1 to claim the offer?",
    a: "You'll be given some time to still submit your test and assignments so you can move ahead. Note that the free access itself won't be extended beyond the initial 30 days.",
  },
  {
    q: 'What if I choose TEF now and then want TCF later?',
    a: 'You need to decide before access is given to you, since it cannot be changed later.',
  },
  {
    q: "Can I switch between CLB 5 and CLB 7 after I've started?",
    a: 'Same as TEF/TCF, this needs to be decided before your access begins, since the course structure and pacing are set around your chosen level.',
  },
  {
    q: 'Is there a refund after registration?',
    a: 'No refund is available after registration, since you get early access to the B1 online course for 30 days along with your free 30 days of A2.',
  },
  {
    q: 'Can I switch from Flex to Intensive?',
    a: 'Yes, but only within the first week. Not after that.',
  },
  {
    q: 'Can I switch from Intensive to Flex?',
    a: 'No, this switch is not available.',
  },
  {
    q: 'In the CLB 5 course, will I be taught all modules?',
    a: 'No. To save time and follow the right strategy, the focus is on Listening and Speaking only for the exam.',
  },
  {
    q: 'Will my B1 3 months access start from the day I pay for it, to get the free A2 renewal?',
    a: 'No. When you pay for B1, you first get 30 days of complimentary B1 online course access alongside your free A2 renewal. Your official 3 month B1 access only begins after those 30 days end.',
  },
  {
    q: 'Can I pay the B1 fee by card?',
    a: 'No. The B1 fee can only be paid via E-Transfer to frenchifyfee@gmail.com. There is no card payment option for B1.',
  },
  {
    q: 'After I take CLB 5 for a PR profile extension, do I need to do B1 again, or can I go directly to B2 (Final Prep)?',
    a: "You can go directly to Final Prep (B2). You don't need to do B1 again since you've already completed the CLB 5 course. Writing and Reading will be caught up for you within B2.",
  },
];

const policy = [
  'The total renewal period cannot exceed 2 months beyond the original access period, under any circumstances.',
  'A student may renew once for 2 months, or twice for 1 month each — no other combination is permitted.',
  'All renewals must be consecutive — there can be no gap or break between the original access period and any renewal.',
  'Students who have exhausted their renewal allowance, exceeded the 2-month cap, or missed the request deadline need to connect with the team via email at admin@frenchifywithvyom.com, or may need to re-register for the course as a new enrolment.',
  'For any queries regarding next steps, students are encouraged to reach out to the Frenchify Team directly for guidance via the Student Portal — even after your course access ends, you can still message us there.',
];

function PricingCard({
  title,
  plans,
  highlight,
}: {
  title: string;
  plans: { term: string; price: string; href: string }[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`premium-card bg-white rounded-2xl p-8 h-full relative border-2 transition-all duration-300 ${
        highlight ? 'border-brand-amber' : 'border-gray-200 hover:border-brand-blue'
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-brand-amber text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            MOST VALUE
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-amber mx-auto rounded-full" />
      </div>
      <div className="space-y-4">
        {plans.map((p) => (
          <div
            key={p.term}
            className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl ${
              highlight ? 'bg-yellow-50' : 'bg-gray-50'
            }`}
          >
            <div>
              <p className="font-semibold text-gray-700">{p.term}</p>
              <p className="text-2xl font-bold text-brand-blue">{p.price}</p>
            </div>
            <Magnetic>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-brand-blue-deep text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-all duration-300 hover:-translate-y-0.5"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with Card
              </a>
            </Magnetic>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function A2RenewalPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white full-bleed-section-ghl">
        <div className="absolute inset-0 hero-pattern opacity-60" aria-hidden />
        <div className="absolute inset-0 aurora-bg opacity-70" aria-hidden />
        <div className="relative ghl-row mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              A2 Course <span className="gradient-text">Renewal</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-gray-600">Continue your French learning journey</p>
          </Reveal>
        </div>
      </section>

      {/* Situations */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Did Your A2 <span className="gradient-text">Access End?</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Whichever option sounds like you, no need to worry — we&apos;ll help you complete the
                course either way.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {situations.map((s) => (
              <div key={s.title} className="premium-card bg-white rounded-2xl p-6 md:p-8 h-full hover-lift">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.color}`}>
                  <s.Icon className="w-6 h-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-gray-900 mt-5 mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl" id="pricing">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Renewal <span className="gradient-text">Pricing</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Pay by card using the buttons below, or by E-Transfer to{' '}
                <a
                  href="mailto:frenchifyfee@gmail.com"
                  className="text-brand-blue font-semibold hover:underline"
                >
                  frenchifyfee@gmail.com
                </a>
              </p>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 gap-8 items-stretch">
            <Tilt max={4}>
              <PricingCard title="A2 - Online Course Renewal" plans={onlinePlans} />
            </Tilt>
            <Tilt max={4}>
              <PricingCard title="A2 Online Course + Live Sessions" plans={livePlans} highlight />
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* Free renewal offer */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="premium-card bg-white rounded-2xl border-2 border-brand-amber p-6 md:p-10 relative overflow-hidden">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-brand-amber text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  LIMITED OFFER
                </span>
              </div>
              <div className="text-center mt-4">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mb-5">
                  <Gift className="w-7 h-7" />
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4">
                  How to Get A2 1 Month Renewal Worth $199 CAD, Free?
                </h2>
                <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  Pre-register and pay the fee for B1, your next level, to get 1 month of A2 Online
                  Course + Live Sessions renewal for free.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Plan your next path */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Let&apos;s Plan Your <span className="gradient-text">Next Path</span>
              </h2>
              <p className="text-gray-600 mt-4">Pick an option to see the journey, step by step.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PathTabs
              options={[
                {
                  emoji: '🎁',
                  label: 'Get Free A2 with B1 Payment',
                  steps: [
                    'Get 1 month of free A2 renewal with your B1 payment',
                    <span key="video">
                      Decide TEF or TCF by watching{' '}
                      <a
                        href="https://drive.google.com/file/d/1Deu2YswMMOCZIEYxK1mKpLTBuRKrf9pG/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue font-semibold hover:underline"
                      >
                        this video
                      </a>
                    </span>,
                    <span key="clb">
                      Decide{' '}
                      <a
                        href="https://frenchifywithvyom.com/clb-5--tef/"
                        className="text-brand-blue font-semibold hover:underline"
                      >
                        CLB 5
                      </a>{' '}
                      (TEF or TCF, same course and fee for both) or CLB 7 based on your PR profile
                      deadline
                    </span>,
                    <span key="type">
                      Decide Flex or Intensive course type using{' '}
                      <a
                        href="/pre-register-for-b1"
                        className="text-brand-blue font-semibold hover:underline"
                      >
                        this link
                      </a>
                    </span>,
                    <span key="pay">
                      Pay via E-Transfer to{' '}
                      <a
                        href="mailto:frenchifyfee@gmail.com"
                        className="text-brand-blue font-semibold hover:underline"
                      >
                        frenchifyfee@gmail.com
                      </a>{' '}
                      and get access today
                    </span>,
                  ],
                },
                {
                  emoji: '📘',
                  label: 'Renew 1/2 Months, Online Course Only',
                  steps: [
                    <span key="book">
                      Book a 1-on-1 with a Frenchify instructor{' '}
                      <a
                        href="/one-on-one-speaking#row-XrC4LrMvPw"
                        className="text-brand-blue font-semibold hover:underline"
                      >
                        here
                      </a>{' '}
                      to discuss and resume your learning properly, either right away or after
                      catching up on some lectures
                    </span>,
                    'Complete your A2 test and syllabus',
                    'Register for TEF or TCF and CLB 5 or CLB 7, then choose Flex or Intensive',
                  ],
                },
                {
                  emoji: '🎥',
                  label: 'Renew 1/2 Months, Online + Live Course',
                  steps: [
                    'Join the next live session with a Frenchify instructor (4 weekly sessions) to discuss and resume your learning properly, either right away or after catching up on some lectures',
                    'Complete your A2 test and syllabus',
                  ],
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Path after A2 */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Your Path <span className="gradient-text">After A2</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Roughly how long it takes from here, studying 2 to 3 hours daily
              </p>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-4 md:gap-6">
            {pathSteps.map((p) => (
              <div
                key={p.stage}
                className={`premium-card rounded-2xl p-5 md:p-6 text-center h-full ${
                  p.current ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center px-4 h-12 rounded-xl font-display font-bold ${
                    p.current ? 'bg-white/20 text-white' : 'bg-brand-gradient text-white'
                  }`}
                >
                  {p.stage}
                </span>
                <p
                  className={`font-display font-bold mt-4 leading-snug ${
                    p.current ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {p.title}
                </p>
                {p.detail && (
                  <p className={`text-sm mt-1 ${p.current ? 'text-blue-100' : 'text-gray-500'}`}>
                    {p.detail}
                  </p>
                )}
              </div>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <p className="text-sm text-gray-600 leading-relaxed mt-8 max-w-3xl mx-auto text-center">
              This timeline assumes 2 to 3 hours of daily study. If you&apos;re short on time and
              need a faster pace, don&apos;t worry, we can always plan and train around that. Just
              connect with us during your sessions or message us on the Student Portal with your
              timeline.
            </p>
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

      {/* Renewal policy */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Renewal <span className="gradient-text">Policy</span>
              </h2>
              <p className="text-gray-600 mt-4">
                Please read the following carefully before submitting your renewal request:
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <ol className="space-y-4">
                {policy.map((p, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed pt-1">{p}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Magnetic>
                  <a
                    href="https://learn.frenchifywithvyom.com/web/community/messages"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message on Portal
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="/student-support/"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-brand-blue-deep text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closer */}
      <section className="bg-white py-14 md:py-16 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Let&apos;s make sure that we complete A2 this time
            </p>
            <p className="text-lg text-gray-600 mt-2">and start with B1 💯</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
