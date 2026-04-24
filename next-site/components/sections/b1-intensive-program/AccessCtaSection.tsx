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
              <h3 className="font-display text-2xl font-bold tracking-tight">4-Month Full Access</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              You get 4 months of full access to the online course and all live sessions. This includes up to 10 personalized writing checks to track your improvements over time, with an option to renew.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Focus on <span className="gradient-text">TEF/TCF Canada</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Build an advanced foundation and start your focused exam preparation with expert guidance.
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
