import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const beforeJoining: FaqItem[] = [
  {
    q: 'How do I know if I’m ready to start at B1?',
    a: 'If you’ve completed A2 or have equivalent skills, you may be ready. Connect with Vyom by email at frenchifyfee@gmail.com to book a quick analysis test and confirm your starting level.',
  },
  {
    q: 'Is the analysis test paid?',
    a: 'Technically, no. There’s a $50 deposit for the test, which is credited toward your fees once you enroll. Based on your results, you’ll be guided to start at either A2 or B1 — and your $50 applies to whichever program you join.',
  },
  {
    q: 'What if I don’t want to start at A2 after the results?',
    a: 'You can self-study using the feedback and recommendations provided, then rejoin B1 when you feel ready.',
  },
  {
    q: 'Do I need A2 knowledge before joining B1 Intensive?',
    a: 'Yes. This program is for students who have completed A2 and want to advance quickly toward B1/B2 fluency and TEF/TCF readiness.',
  },
];

const programDetails: FaqItem[] = [
  {
    q: 'What exactly is covered in the program?',
    a: 'Advanced B1 & B2 grammar mastery to strengthen accuracy and expression.\nStructured RSWL training — Reading, Speaking, Writing, Listening — with practical, exam-aligned exercises.\nTEF/TCF mock exam practices - specific strategies to improve speed, accuracy, and confidence in each module.\nLive sessions led by successful TEF/TCF achievers, sharing proven techniques and real exam insights.',
  },
  {
    q: 'How are the live sessions structured?',
    a: 'There are 4 live sessions in total every week with intense exam preparation and mock training.',
  },
  {
    q: 'Will I get feedback on my writing?',
    a: 'Yes — you can submit writing tasks for detailed, exam-focused corrections and improvement tips.',
  },
];

const learningProcess: FaqItem[] = [
  {
    q: 'How long does it take to complete B1 Intensive?',
    a: 'Most students complete it in 3–4 months with consistent participation in live sessions and independent practice.',
  },
  {
    q: 'What makes this program different from learning on my own?',
    a: 'Direct mentorship and real-time feedback from exam experienced trainers.\nPersonalized feedback on speaking and writing tasks to fix mistakes quickly.',
  },
];

const examReadiness: FaqItem[] = [
  {
    q: 'How will I know I’m ready for TEF Canada?',
    a: 'By the end, you’ll be consistently meeting or exceeding exam-level benchmarks in mock tests, with trainer feedback confirming your readiness.',
  },
  {
    q: 'What if I only need CLB 5?',
    a: 'If your target is CLB 5, you’ll need B1-level skills, plus 1–2 months of B2-style practice to strengthen your exam performance and maximize your score.',
  },
  {
    q: 'What if I can’t commit 4 months to B1?',
    a: 'No problem at all — connect with Vyom by email at frenchifyfee@gmail.com, and we’ll create a customized, fast-track plan to fit your timeline without compromising your results.',
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
