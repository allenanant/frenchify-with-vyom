'use client';

import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export default function ContactCtaSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-gray-900 text-white full-bleed-section-ghl relative overflow-hidden"
    >
      <FloatingOrbs variant="soft" />
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Start Your <span className="gradient-text">French Journey</span>?
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and achieve your language goals with Frenchify.
          </p>
          <Magnetic>
            <a
              href="https://frenchifywithvyom.app.clientclub.net/"
              className="btn-primary inline-block"
            >
              Enroll Today
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
