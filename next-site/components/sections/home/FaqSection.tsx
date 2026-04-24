import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const items: FaqItem[] = [
  {
    q: 'Does Frenchify Program offer TEF/TCF or TEFAQ training?',
    a: 'Yes, Exam specific training is provided right from the start and the programs are designed in a way to fast-track the preparation.',
  },
  {
    q: 'How much time does it take to clear TEF with Frenchify?',
    a: 'If you study average 2-3 hours daily A1 & A2 can be completed within 3 months, B1 & B2 within 5-6 months. If you are studying French full-time the time frame reduces.',
  },
  {
    q: 'Does the Frenchify Program have doubt sessions?',
    a: 'Yes. Along with the online programs, we provide 4 live doubt sessions each week for better understanding and mentorship.',
  },
  {
    q: 'At what level does TEF/TCF-specific training start in Frenchify?',
    a: 'At B1 level, mock exam practices begin with sessions focusing on exam-specific preparation covering all 4 modules (Reading, Writing, Speaking, Listening).',
  },
];

export default function FaqSection() {
  return (
    <section className="py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our French learning programs
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
