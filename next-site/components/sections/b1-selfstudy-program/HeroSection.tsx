'use client';

import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

const analysisTestUrl = '/a1-level-analysis-test';

export default function HeroSection() {
  return (
    <section className="hero-pattern-animated py-16 md:py-24 relative overflow-hidden full-bleed-section-ghl aurora-bg">
      <FloatingOrbs variant="soft" />
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Reveal duration={0.8}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Frenchify B1 <span className="gradient-text">Self-Study (TEF) Program</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15} duration={0.7}>
          <p className="text-xl md:text-2xl text-brand-blue font-medium mb-6">
            Your Foundation for TEF Canada Success &amp; Achieving CLB 5 for Work Permit Extension
          </p>
        </Reveal>
        <Reveal delay={0.25} duration={0.7}>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            This program is designed for learners who want flexible, self-paced preparation while still getting expert guidance for their TEF journey. Build a strong base in advanced grammar, practice RSWL skills, and prepare for the TEF exam with confidence — anytime, anywhere.
          </p>
        </Reveal>
        <Reveal delay={0.35} duration={0.6}>
          <Magnetic>
            <a
              href={analysisTestUrl}
              className="btn-primary"
            >
              Book my Analysis Test
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
