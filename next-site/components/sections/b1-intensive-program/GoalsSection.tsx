import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

const goals = [
  {
    title: 'Build a Strong Foundation',
    desc: 'Gain fluency for scoring B1/B2 in TEF Canada through targeted training.',
  },
  {
    title: 'Master Advanced Concepts',
    desc: 'Access a complete B1 and B2 grammar syllabus, vocabulary, and structured RSWL training.',
  },
  {
    title: 'Develop Exam-Specific Skills',
    desc: 'Get personalized feedback on speaking and writing to improve fluency, structure, and confidence for the exam.',
  },
  {
    title: 'Enhance Comprehension Strategies',
    desc: 'Learn to filter information and spot keywords with exam-focused listening and reading resources.',
  },
];

export default function GoalsSection() {
  return (
    <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Your B1 Program Goal: <span className="gradient-text">Fluency for TEF Canada</span>
          </h2>
        </Reveal>

        <Stagger className="space-y-6">
          {goals.map((g) => (
            <div key={g.title} className="flex items-start premium-card p-6">
              <div className="flex-shrink-0 bg-brand-blue/10 p-3 rounded-full mr-4 ring-1 ring-brand-blue/20">
                <Check className="text-brand-blue w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{g.title}</h3>
                <p className="text-gray-600 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
