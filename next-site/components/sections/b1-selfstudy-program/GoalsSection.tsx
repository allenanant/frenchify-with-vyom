import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

const goals = [
  {
    title: 'Master Advanced Grammar',
    desc: 'Build a deep understanding of B1 and B2 level grammar with clear explanations.',
  },
  {
    title: 'Strengthen Speaking & Writing Fluency',
    desc: 'Get personalized 5 writing feedbacks and 3 one-on-one speaking sessions to refine your structure, fluency, and confidence. More available at an extra fee.',
  },
  {
    title: 'Sharpen Reading & Listening Skills',
    desc: 'Learn to understand authentic conversations and texts with extensive real TEF preparation resources and brochures.',
  },
];

export default function GoalsSection() {
  return (
    <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Your B1 Self-Study Program Goal: <span className="gradient-text">Mastery at Your Pace</span>
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
