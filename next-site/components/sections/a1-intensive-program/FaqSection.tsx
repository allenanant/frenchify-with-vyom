import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const beforeJoining: FaqItem[] = [
  {
    q: 'Do I need any French knowledge before joining A1 Intensive?',
    a: 'No — this program is designed for complete beginners starting from zero. We guide you through every step so you can start speaking, understanding, and reading French with confidence.',
  },
];

const programDetails: FaqItem[] = [
  {
    q: 'What’s included in A1 Intensive?',
    a: 'You get 4 live sessions per week (3 doubt-clearing + 1 activity), a complete step-by-step online course, built-in quizzes and worksheets, vocabulary lists, pronunciation guides, speaking assignments, and a final A1 test to measure your progress.',
  },
  {
    q: 'What happens if I miss a live class?',
    a: 'You’ll get the class recording directly within the community group before your next session.',
  },
  {
    q: 'Is there a community group for A1 Intensive students?',
    a: 'Yes — you’ll be part of an active learning community for daily practice, peer feedback, and extra support between classes.',
  },
];

const learningProcess: FaqItem[] = [
  {
    q: 'How long will it take to complete A1 Intensive?',
    a: 'It takes about 5 weeks for a beginner to complete A1 with 2–3 hours of daily study. You’ll still have 4 months of total course access for flexibility.',
  },
  {
    q: 'Does it take 4 months for A1?',
    a: 'No — that’s the course access timeline. The actual study time is about 5 weeks on average for most beginners.',
  },
  {
    q: 'How is progress tracked in A1 Intensive?',
    a: 'Progress is tracked by unit completion and during live session discussions where your understanding is checked regularly.',
  },
];

const examReadiness: FaqItem[] = [
  {
    q: 'Does A1 Intensive prepare me for TEF/TCF?',
    a: 'While the main goal is to master A1, we include early TEF-style exercises so your exam preparation begins naturally.',
  },
  {
    q: 'Are all assignments mandatory?',
    a: 'Yes — they’re designed to help you master listening, speaking, reading, and writing so you move to A2 with confidence.',
  },
  {
    q: 'What’s included in the A1 test?',
    a: 'A complete grammar evaluation with feedback and personalised improvement tips.',
  },
];

const promotions: FaqItem[] = [
  {
    q: 'Do I get a discount on referring a friend?',
    a: 'Yes! For every friend you refer, you’ll receive $35 off!',
  },
  {
    q: 'Is there a Combo Discount?',
    a: 'Absolutely. We offer special combo pricing when you enroll in multiple programs together. For details, message on WhatsApp at 514-726-5114 directly.',
  },
];

export default function FaqSection() {
  return (
    <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16 tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="space-y-12">
          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
                Before Joining
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={beforeJoining} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
                Program Details
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={programDetails} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
                Learning Process &amp; Duration
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={learningProcess} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
                Exam Readiness
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={examReadiness} />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
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
