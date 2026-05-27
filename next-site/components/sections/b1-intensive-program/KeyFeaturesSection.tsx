import { BookOpen, Mic, Pen } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

const features = [
  {
    Icon: BookOpen,
    title: 'Comprehensive Syllabus',
    desc: 'Access B1 and B2 grammar, vocabulary, and structured training for Reading, Speaking, Writing, and Listening.',
  },
  {
    Icon: Mic,
    title: 'Live Mock Practice',
    desc: 'Join multiple weekly speaking mock sessions to build fluency, structure, and confidence in an exam-like environment.',
  },
  {
    Icon: Pen,
    title: 'Personalized Feedback',
    desc: 'Receive personalized, exam-specific feedback on your writing (up to 10 submissions) to ensure clarity and confidence.',
  },
];

export default function KeyFeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Key Program <span className="gradient-text">Features</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A flexible, structured, and mentorship-based path to B1.
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
