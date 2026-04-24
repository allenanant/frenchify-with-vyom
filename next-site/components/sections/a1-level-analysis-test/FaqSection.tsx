import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const items: FaqItem[] = [
  {
    q: 'Is the assessment really?',
    a: 'No its not as we have limited slots and we do not want you to suffer due to the non-serious candidates. We believe every French learner deserves to know their true level and get proper guidance.',
  },
  {
    q: 'How long does the assessment take?',
    a: 'The complete assessment takes approximately 30-45 minutes. You can take breaks between sections if needed.',
  },
  {
    q: 'Do I get a certificate?',
    a: "Yes! Upon completion, you'll receive a certificate showing your A1 proficiency level that you can share with employers or educational institutions.",
  },
  {
    q: 'Can I retake the test?',
    a: "You can retake the assessment after 30 days to track your progress. This helps ensure you're genuinely improving rather than memorizing answers.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
