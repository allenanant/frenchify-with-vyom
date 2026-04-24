import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const beforeJoining: FaqItem[] = [
  {
    q: 'Is there a test to analyze my level?',
    a: 'Yes! Before enrolling, you need to take a mandatory analysis test with Vyom to confirm your current level. To book your test, send a WhatsApp message to 514-726-5114. To book your test there is a 50$ deposit that you need to pay first that will be credited to your course later if you enroll.',
  },
  {
    q: 'Can I buy the program directly from the website?',
    a: 'No. This program is not available for direct purchase on the website. You must message 514-726-5114 on WhatsApp first to complete your analysis with Vyom. This ensures you are placed in the right program for your level and goals.',
  },
  {
    q: 'What if I’m not ready for B1 after the analysis?',
    a: 'No problem — we’ll guide you to start at A2 instead, so you build the right foundation before jumping into advanced concepts or you can self prepare for sometime before we can start B1.',
  },
  {
    q: 'Do I need A2 knowledge before starting B1 Self-Study?',
    a: 'Yes, at least A2-level concepts are needed. This ensures you can follow the lessons smoothly and make the most of your self-paced learning.',
  },
];

const programDetails: FaqItem[] = [
  {
    q: 'What exactly is included in the B1 Self-Study Program?',
    a: 'You’ll get 4 months of access to our online platform, which includes:\n\nFull B1 and B2 advanced grammar lectures\nRSWL training for reading, speaking, writing, and listening\n5 personalized writing feedbacks\n3 one-on-one speaking sessions (25 minutes each)\nAccess to authentic TEF practice resources and brochures',
  },
  {
    q: 'Are the speaking sessions included in the course fee?',
    a: 'Yes! Three private 25-minute sessions are included to help you build fluency and confidence.',
  },
  {
    q: 'Can I book more than 3 speaking sessions if I need extra practice?',
    a: 'Absolutely. Additional sessions are available at $15.99 for a 25-minute session and $25.99 for a 50-minute session. A calendar will be shared with you, and you can book extra sessions based on instructor availability.',
  },
  {
    q: 'How does the writing feedback process work?',
    a: 'You’ll submit your written responses for Section A tasks, and our instructors will provide detailed corrections and suggestions to help you improve step by step.',
  },
];

const learningProcess: FaqItem[] = [
  {
    q: 'How long does it take to finish the Self-Study Program?',
    a: 'On average, students complete the program in 3–4 months, depending on their pace and weekly commitment.',
  },
  {
    q: 'How much time should I dedicate each week to see results?',
    a: 'We recommend 2–3 hours per week to stay consistent and make steady progress. More time can speed up your results.',
  },
  {
    q: 'How is this program different from learning completely on my own?',
    a: 'With Self-Study, you’re not alone. You get personalized feedback, structured lessons, and speaking sessions that make your learning guided and effective — unlike random self-study methods.',
  },
];

const examReadiness: FaqItem[] = [
  {
    q: 'Will this program prepare me for all 4 TEF Canada modules?',
    a: 'Yes! The program builds reading, speaking, writing, and listening skills, focusing on the patterns and strategies needed for TEF success.',
  },
  {
    q: 'How will I know when I’m ready to book my TEF Canada exam?',
    a: 'Once you’ve completed the main modules and performed well in your mock sessions and writing feedback, we’ll guide you on the right time to book your exam.',
  },
  {
    q: 'What if I only need CLB 5 and not higher?',
    a: 'This program still works for you. You’ll build the skills for CLB 5 and beyond, ensuring you’re well-prepared if your goals change.',
  },
  {
    q: 'Can I continue after 4 months if I need more time?',
    a: 'Yes, you can renew your access at a discounted rate if you need more time to complete your preparation.',
  },
];

const promotions: FaqItem[] = [
  {
    q: 'Do I get a discount if I refer a friend?',
    a: 'Yes! For every friend who joins using your referral, you get $35 CAD off your next renewal or course upgrade.',
  },
  {
    q: 'Is there a combo discount if I want to upgrade to the B1 Intensive Program later?',
    a: 'Yes. If you start with Self-Study and later decide to upgrade to the Intensive Program, we’ll adjust your fee so you don’t pay double for the same content.',
  },
];

const groups: { title: string; items: FaqItem[] }[] = [
  { title: 'Before Joining', items: beforeJoining },
  { title: 'Program Details', items: programDetails },
  { title: 'Learning Process & Duration', items: learningProcess },
  { title: 'Exam Readiness', items: examReadiness },
  { title: 'Promotions or Offers', items: promotions },
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
          {groups.map((group) => (
            <div key={group.title}>
              <Reveal>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
                  {group.title}
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <FaqAccordion items={group.items} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
