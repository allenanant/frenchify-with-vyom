'use client';

import { Clock, Zap, GraduationCap, UserCheck } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

const features = [
  {
    Icon: Clock,
    tag: 'Easy for Anyone',
    title: 'Flexible Classes',
    copy: 'Complete lectures & classes whenever you want, at your own pace, giving you a complete flexibility and personalization.',
  },
  {
    Icon: Zap,
    tag: 'So. Fast.',
    title: 'Intense & Structured approach',
    copy: 'Syllabus covered at an intensive pace to save valuable time on Study/ Work Permit. A step-by-step order of all the topics to make the syllabus easy to consume.',
  },
  {
    Icon: GraduationCap,
    tag: 'Smart Solutions',
    title: 'Exam focused training',
    copy: 'Complete focus on the concepts/topics which are essential for the exams, right from the beginning.',
  },
  {
    Icon: UserCheck,
    tag: 'Expert Guidance',
    title: 'Personalized Mentorship',
    copy: 'Get guidance and support throughout your French learning journey with experienced instructors and regular doubt-clearing sessions.',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-20 bg-white full-bleed-section-ghl relative">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Frenchify makes French learning <span className="gradient-text">simple and effective</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All within a structured, step-by-step learning environment.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid md:grid-cols-2 gap-8" duration={0.7}>
          {features.map((f) => (
            <Tilt key={f.title} max={5}>
              <div className="relative bg-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 via-transparent to-brand-amber/0 group-hover:from-brand-blue/10 group-hover:to-brand-amber/10 transition-all duration-700 pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-brand-amber/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative flex items-center mb-6">
                  <div className="bg-brand-amber/20 p-3 rounded-full mr-4 ring-1 ring-brand-amber/30">
                    <f.Icon className="text-brand-amber w-6 h-6" strokeWidth={2.25} />
                  </div>
                  <span className="text-brand-amber font-semibold text-sm uppercase tracking-[0.15em]">
                    {f.tag}
                  </span>
                </div>
                <h3 className="relative font-display text-2xl font-bold text-white mb-4 tracking-tight">
                  {f.title}
                </h3>
                <p className="relative text-gray-300 leading-relaxed">{f.copy}</p>
              </div>
            </Tilt>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
