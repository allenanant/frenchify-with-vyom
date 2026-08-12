import Image from 'next/image';
import {
  CheckCircle2,
  PauseCircle,
  Flag,
  CreditCard,
  Gift,
  MessageSquare,
  Send,
  ShieldAlert,
  Quote,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import PathTabs from '@/components/renewal/PathTabs';

export const metadata = {
  title: 'A1 Course Renewal - Frenchify with Vyom',
  description:
    'Renew your A1 course access and continue your French learning journey. Online course renewal, live session add-ons, and a free renewal offer with A2 pre-registration.',
  alternates: { canonical: 'https://frenchifywithvyom.com/a1-renewal' },
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
    title: 'Last Few Units Left',
    body: 'Need about 2 to 3 weeks to finish the last few units and the test',
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
  {
    stage: 'A1',
    title: 'You Are Here',
    detail: '',
    current: true,
  },
  {
    stage: 'A2',
    title: '~6 to 8 Weeks',
    detail: 'at 2 to 3 hours daily',
    current: false,
  },
  {
    stage: 'EP1',
    title: 'Exam Prep 1 (CLB 5)',
    detail: '~2.5 to 3 Months',
    current: false,
  },
  {
    stage: 'EP2',
    title: 'Exam Prep 2 (CLB 7)',
    detail: '~2.5 to 3 More Months',
    current: false,
  },
];

const a1Testimonials = [
  {
    quote:
      'The grammar lessons finally made sense the way Vyom explains them, step by step. I stopped feeling lost within the first two units.',
    name: 'Priya S.',
  },
  {
    quote:
      'I was nervous about pronunciation, but the pronunciation lectures walked me through the patterns step by step. I can actually pick out accents and common words that used to trip me up.',
    name: 'Arjun M.',
  },
  {
    quote:
      'The 5 week study plan is the best. I always had a goal in mind to follow, which pushed me to get great scores in the unit-end tests.',
    name: 'Neha K.',
  },
  {
    quote:
      "A1 gave me a strong foundation and everything was easy to follow. This is the first time I've actually enjoyed learning French instead of dreading it.",
    name: 'Rohan T.',
  },
];

const a2Testimonials = [
  {
    quote:
      'The speaking assignments made me comfortable practicing on my own first, instead of jumping straight into a room full of people and feeling put on the spot. I really liked this approach.',
    name: 'Simran D.',
  },
  {
    quote:
      'A2 covered exactly what I needed before starting my CLB 5 prep, no gaps. I felt properly prepared, not thrown in.',
    name: 'Aman J.',
  },
  {
    quote:
      'The listening assignments were lengthy, but they were exactly what helped me the most on my actual test.',
    name: 'Karan V.',
  },
  {
    quote:
      'By the end of A2 I felt ready, not overwhelmed, going into exam prep. That made all the difference in my confidence.',
    name: 'Ritika P.',
  },
];

const faqs: FaqItem[] = [
  {
    q: "What if I can't complete A1 within the free 1 month and need more time after paying for A2 to claim the offer?",
    a: "You'll be given some time to still submit your test and assignments so you can move ahead. Note that the free access itself won't be extended beyond the initial 30 days.",
  },
  {
    q: 'Is there a refund after registration?',
    a: 'No refund is available after registration, since you get early access to the A2 online course for 30 days along with your free 30 days of A1.',
  },
  {
    q: 'Will my A2 access start from the day I pay for it, to get the free A1 renewal?',
    a: "The day you make the payment, you get 30 days of A1 access. From that same day, you also get 4 months of A2 access. A2 is officially a 3 month access, it's extended to 4 months because the first month mainly goes toward finishing A1. That said, you're always free to start A2 earlier if you finish A1 sooner.",
  },
  {
    q: 'What does A2 actually cover?',
    a: "A2 is where you complete all the conceptual learning, along with your speaking assignments, listening assignments, and all module-specific training, so you're ready to prepare for the exam-specific format. This is also where you cover a lot of the speaking assignments that help build your speaking skills.",
  },
  {
    q: 'Do I need to decide CLB 5 or CLB 7, or TEF vs TCF, right now?',
    a: "Not yet. That decision happens once you're ready to start exam prep after finishing A2. For now, just focus on completing A2.",
  },
  {
    q: 'How do I pay the A2 fee?',
    a: 'Via E-Transfer to frenchifyfee@gmail.com only. There is no card payment option for A2.',
  },
  {
    q: 'I purchased the A1 + A2 Combo. Can I get the free A1 renewal offer?',
    a: "No. This offer is only for students who purchased A1 Self-Paced or A1 Intensive. Combo purchasers already received a discount at the time of registration, so this offer doesn't apply.",
  },
];

const policy = [
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

export default function A1RenewalPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white full-bleed-section-ghl">
        <div className="absolute inset-0 hero-pattern opacity-60" aria-hidden />
        <div className="absolute inset-0 aurora-bg opacity-70" aria-hidden />
        <div className="relative ghl-row mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <Reveal>
            <div className="flex flex-col items-center gap-3 mb-6">
              <Image
                src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808d65bdf54eff4377e2466.png"
                alt="Vyom Sharma, Founder of Frenchify with Vyom"
                width={88}
                height={88}
                className="w-20 h-20 md:w-22 md:h-22 rounded-full object-cover object-top border-4 border-blue-100 bg-gray-50"
              />
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Founder of Frenchify with Vyom</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="italic">Courage, on avance ensemble !</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              A1 Course <span className="gradient-text">Renewal</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
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
                Did Your A1 <span className="gradient-text">Access End?</span>
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
              <PricingCard title="A1 - Online Course Renewal" plans={onlinePlans} />
            </Tilt>
            <Tilt max={4}>
              <PricingCard title="A1 Online Course + Live Sessions" plans={livePlans} highlight />
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* Free renewal offer */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="premium-card bg-white rounded-2xl border-2 border-brand-amber p-6 md:p-10 relative">
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
                  How to Get A1 1 Month Renewal Worth $199 CAD, Free?
                </h2>
                <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  Pre-register and pay the fee for A2, your next level, to get 1 month of A1 Online
                  Course + Live Sessions renewal for free.
                </p>
                <div className="mt-6 flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4 text-left">
                  <ShieldAlert className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Who&apos;s eligible:</span> Students
                    who purchased A1 Self-Paced or A1 Intensive (not the A1 + A2 Combo). If you
                    purchased the Combo, this offer doesn&apos;t apply, since a discount was already
                    given to you at the time of registration.
                  </p>
                </div>
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
                  label: 'Get Free A1 with A2 Payment',
                  steps: [
                    'Give this whole page a read before you begin',
                    <span key="pay">
                      Pay for your A2 course (Self-Paced / Online, or Intensive / Online + Live) via
                      E-Transfer to{' '}
                      <a
                        href="mailto:frenchifyfee@gmail.com"
                        className="text-brand-blue font-semibold hover:underline"
                      >
                        frenchifyfee@gmail.com
                      </a>
                      . In your message, mention &quot;1 month A1 free + A2 Self-Paced&quot; or
                      &quot;1 month A1 free + A2 Intensive&quot;, whichever applies. Access is
                      usually given within the hour
                    </span>,
                    'Use your free month to complete your A1 revision, remaining units, and test',
                    'Your 1 month of A1 and 4 months of A2 access are both given the same day. (A2 is officially a 3 month access, it’s given as 4 months because your first month goes toward finishing A1. If you move to A2 early, no worries, that time is still yours.)',
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
                    'Complete your A1 test and syllabus',
                    'Register for A2 when you’re ready',
                  ],
                },
                {
                  emoji: '🎥',
                  label: 'Renew 1/2 Months, Online + Live Course',
                  steps: [
                    'Join the next live session with a Frenchify instructor to discuss and resume your learning properly, either right away or after catching up on some lectures',
                    'Complete your A1 test and syllabus',
                  ],
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Path after A1 */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Your Path <span className="gradient-text">After A1</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                A2 builds on your grammar and speaking foundation. Once you finish A2, you&apos;re
                ready to begin structured exam prep.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {pathSteps.map((p) => (
              <div
                key={p.stage}
                className={`premium-card rounded-2xl p-5 md:p-6 text-center h-full ${
                  p.current ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl font-display font-bold ${
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
              This timeline assumes 2 to 3 hours of daily study. A more specific study plan can be
              made depending on your goal and exam type, during your sessions or on the Student
              Portal. Whether you aim for CLB 5 or CLB 7, and TEF or TCF, is a decision we&apos;ll
              help you make once you&apos;re ready to start exam prep after A2.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                What Students <span className="gradient-text">Are Saying</span>
              </h2>
              <p className="text-gray-600 mt-4">
                A few words from students who&apos;ve been where you are now
              </p>
            </div>
          </Reveal>

          {[
            { label: 'From A1 Students', items: a1Testimonials },
            { label: 'From A2 Students', items: a2Testimonials },
          ].map((group) => (
            <div key={group.label} className="mb-10 last:mb-0">
              <Reveal>
                <p className="text-center text-sm font-bold tracking-widest text-brand-blue uppercase mb-6">
                  {group.label}
                </p>
              </Reveal>
              <Stagger className="grid md:grid-cols-2 gap-6">
                {group.items.map((t) => (
                  <div key={t.name} className="premium-card bg-white rounded-2xl p-6 md:p-7 h-full">
                    <Quote className="w-6 h-6 text-brand-amber mb-3" aria-hidden />
                    <p className="text-gray-700 leading-relaxed">&quot;{t.quote}&quot;</p>
                    <p className="font-display font-bold text-gray-900 mt-4">{t.name}</p>
                  </div>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl" id="faqs">
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
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl">
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
      <section className="bg-gray-50 py-14 md:py-16 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Let&apos;s make sure that we complete A1 this time
            </p>
            <p className="text-lg text-gray-600 mt-2">and start with A2 💯</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
