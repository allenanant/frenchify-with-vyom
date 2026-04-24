import { Target, UserCheck, Lightbulb } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

const features = [
  {
    Icon: Target,
    title: 'Targeted Exam Practice',
    desc: 'Dive deep into intensive Speaking (Section A+B) and Writing mock sessions that mimic the real TEF/TCF exam.',
  },
  {
    Icon: UserCheck,
    title: 'Personalized Mentorship',
    desc: 'Benefit from personalized feedback on writing and speaking to improve fluency, structure, and confidence.',
  },
  {
    Icon: Lightbulb,
    title: 'Advanced Concept Clarity',
    desc: 'Sharpen your skills by clarifying complex B1, B2, and C1 grammar concepts with expert instructors.',
  },
];

export default function HighlightsSection() {
  return (
    <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Program <span className="gradient-text">Highlights</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A flexible, structured, and entirely tailored path to exam success.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div
            className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-blue/60 via-brand-blue/30 to-brand-amber/40"
            aria-hidden="true"
          />
          <Stagger className="space-y-12">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="relative pl-16">
                <div className="absolute left-0 top-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue shadow-lg ring-4 ring-brand-blue/15">
                  <Icon className="text-white w-4 h-4" strokeWidth={2.5} />
                </div>
                <h4 className="font-display font-bold text-xl text-gray-900 mb-2 tracking-tight">{title}</h4>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
