'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export default function AccessCtaSection() {
  return (
    <section
      id="signup"
      className="py-16 md:py-20 bg-gray-900 text-white full-bleed-section-ghl relative overflow-hidden"
    >
      <FloatingOrbs variant="soft" />
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Reveal>
          <div className="bg-gray-800/60 backdrop-blur p-8 rounded-2xl mb-12 border border-gray-700 ring-1 ring-brand-blue/10">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Calendar className="text-brand-amber w-8 h-8" strokeWidth={2.25} />
              <h3 className="font-display text-2xl font-bold tracking-tight">3-Month Full Access</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              You get 3 months of full access to the online course and all live sessions. This intensive program is tailored for exam success, providing mock tests, personalized feedback, and advanced strategy sessions to help you confidently secure B2+ scores.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Sharpen Your Skills for <span className="gradient-text">Exam Success</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            This program is entirely tailored to help you achieve your highest score in TEF/TCF Canada.
          </p>
          <Magnetic>
            <Link href="/contact" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">
              Know More
            </Link>
          </Magnetic>
          <p className="text-sm text-gray-400 mt-6">
            Taught in English. Some content may not be translated.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
