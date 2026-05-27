'use client';

import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="hero-pattern-animated py-16 md:py-20 md:pt-[calc(4rem+50px)] relative overflow-hidden full-bleed-section-ghl aurora-bg"
    >
      <FloatingOrbs variant="soft" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Reveal duration={0.8}>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.08] tracking-tight">
            Our <span className="gradient-text">TEF/TCF Specific French Programs</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15} duration={0.7}>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our French programs are specially designed for French learners for TEF/TCF/TEFAQ examinations. Choose between intensive programs with live sessions or self-paced study courses.
          </p>
        </Reveal>
        <Reveal delay={0.3} duration={0.6}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Magnetic>
              <a href="#intensive-video" className="btn-primary">
                Intensive Programs
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#self-study-video" className="btn-ghost">
                Self-Study Courses
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
