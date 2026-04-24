import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const beforeJoining: FaqItem[] = [
  {
    q: 'Do I need to know any French before starting?',
    a: 'Not at all. The lessons are 100% beginner-friendly, taught in English (with French at higher levels), and guide you through everything from the very basics.',
  },
];

const programDetails: FaqItem[] = [
  {
    q: 'What’s included in the A1 Self-Study Program?',
    a: 'Step-by-step grammar lessons; Pronunciation basics & core vocabulary; Listening practice for various conversations; Beginner speaking & writing exercises; Built-in checkpoints, worksheets, and mini-tests; Final A1-level test to assess your progress.',
  },
  {
    q: 'How long do I get access to the course?',
    a: 'You get 4 months of access, so you can learn at your own pace — daily, on weekends, or whenever your schedule allows.',
  },
  {
    q: 'Does it really take 4 months to finish?',
    a: 'No — most students finish in about 5 weeks with 2–3 hours of study per day. The 6-month access simply gives you flexibility and no pressure.',
  },
  {
    q: 'Can I access the course on multiple devices?',
    a: 'No — you cannot access it on multiple devices as the system flags when this happens.',
  },
];

const learningProcess: FaqItem[] = [
  {
    q: 'How is the course structured?',
    a: 'The course follows a clear roadmap: Unit 0: Starting Plan — how to begin learning effectively; Units 1–5: Core A1 topics & syllabus; Unit 6: Revision & Assessment.',
  },
  {
    q: 'Is there any speaking practice?',
    a: 'Yes — you’ll get beginner speaking exercises and listening activities designed to help you start communicating in French.',
  },
];

const examReadiness: FaqItem[] = [
  {
    q: 'Does this prepare me for TEF/TCF?',
    a: 'While it’s focused on A1-level mastery, the program builds the grammar, vocabulary, and listening skills you’ll need for higher-level exam preparation later.',
  },
];

const promotions: FaqItem[] = [
  {
    q: 'Do I get a discount on referring a friend?',
    a: 'Yes! For every friend you refer, you’ll receive $35 off, and your friend receives $35 off as well!',
  },
  {
    q: 'Is there a Combo Discount?',
    a: 'Absolutely. We offer special combo pricing when you enroll in multiple programs together. For details, message on WhatsApp at 514-726-5114 directly.',
  },
];

export default function FaqSection() {
  return (
    <section className="py-16 md:py-20 full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="space-y-10">
          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-100 pb-3">
                Before Joining
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={beforeJoining} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-100 pb-3">
                Program Details
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={programDetails} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-100 pb-3">
                Learning Process &amp; Duration
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={learningProcess} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-100 pb-3">
                Exam Readiness
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={examReadiness} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-100 pb-3">
                Promotions or Offers
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={promotions} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
