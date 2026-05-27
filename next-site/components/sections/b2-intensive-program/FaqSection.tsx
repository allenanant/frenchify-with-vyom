import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const beforeJoining: FaqItem[] = [
  {
    q: 'How do I know if I’m ready for B2?',
    a: 'Connect with Vyom by email at frenchifyfee@gmail.com for a quick analysis test. Based on your results, we’ll confirm if you’re ready for B2 or need to strengthen your B1 first.',
  },
  {
    q: 'Is the analysis test paid?',
    a: 'Technically no — there’s a $50 deposit which you can use as credit towards your fees, whether you start at B1 or B2.',
  },
  {
    q: 'What if I don’t want to start at B1 after the results?',
    a: 'You can self-study with the feedback given and later join B2 when ready.',
  },
];

const programDetails: FaqItem[] = [
  {
    q: 'What exactly is covered in the online program?',
    a: '• Structured Reading, Speaking, Writing, Listening (RSWL) training\n• TEF/TCF exam-specific strategies',
  },
  {
    q: 'How long is the B2 program?',
    a: 'We offer two timelines — a 3-month plan and a 4-month plan — each with different pricing. Connect with Vyom by email at frenchifyfee@gmail.com for details and to choose the plan that best fits your schedule.',
  },
  {
    q: 'Does Frenchify provide only speaking or listening classes individually?',
    a: 'Not really — the B2 Intensive Program covers all modules for your exam preparation and overall language growth.',
  },
];

const learningProcess: FaqItem[] = [
  {
    q: 'What if I have less time and can’t commit to 4 months?',
    a: 'No problem — connect with Vyom by email at frenchifyfee@gmail.com to arrange a customized plan to suit your schedule.',
  },
  {
    q: 'Are assignments included?',
    a: 'Yes — you’ll complete regular speaking, listening, reading, and writing tasks during the program for detailed feedback.',
  },
  {
    q: 'Are one-on-one speaking sessions available?',
    a: 'Yes — they are available only for Frenchify students who need a more intensive and quick approach. They’re at an additional cost, and timing or instructor availability cannot be guaranteed.',
  },
];

const examReadiness: FaqItem[] = [
  {
    q: 'Does B2 Intensive prepare me for TEF/TCF?',
    a: 'Absolutely — the program integrates TEF/TCF strategies throughout, so your exam prep happens naturally as you master B2.',
  },
];

const promotions: FaqItem[] = [
  {
    q: 'Do I get a discount on referring a friend?',
    a: 'Yes! For every friend you refer, you’ll receive $35 off, and your friend receives $35 off as well!',
  },
  {
    q: 'Is there a Combo Discount?',
    a: 'Absolutely. We offer special combo pricing when you enroll in multiple programs together. For details, email us at frenchifyfee@gmail.com.',
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
