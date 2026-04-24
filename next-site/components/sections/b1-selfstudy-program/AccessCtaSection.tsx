'use client';

import { Calendar, DollarSign } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

const whatsappUrl =
  "https://wa.me/15147265114?text=Hi%2C%20I'm%20interested%20in%20the%20B1%20Self-Study%20program%20and%20would%20like%20to%20book%20my%20analysis%20test.";

export default function AccessCtaSection() {
  return (
    <section
      id="signup"
      className="py-16 md:py-20 bg-gray-900 text-white full-bleed-section-ghl relative overflow-hidden"
    >
      <FloatingOrbs variant="soft" />
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Reveal direction="left">
            <div className="bg-gray-800/60 backdrop-blur p-8 rounded-2xl border border-gray-700 ring-1 ring-brand-blue/10 h-full">
              <div className="flex justify-center items-center gap-4 mb-4">
                <Calendar className="text-brand-amber w-8 h-8" strokeWidth={2.25} />
                <h3 className="font-display text-2xl font-bold tracking-tight">4-Month Full Access</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Enjoy 4 months of full access to the online course and your 3 complimentary speaking sessions, plus 5 writing feedbacks (worth $120). Renew anytime if you need extra time or additional practice.
              </p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <div className="bg-gray-800/60 backdrop-blur p-8 rounded-2xl border border-gray-700 ring-1 ring-brand-blue/10 h-full">
              <div className="flex justify-center items-center gap-4 mb-4">
                <DollarSign className="text-brand-amber w-8 h-8" strokeWidth={2.25} />
                <h3 className="font-display text-2xl font-bold tracking-tight">Pricing</h3>
              </div>
              <p className="font-display text-3xl font-bold text-white mb-2">$599 CAD</p>
              <p className="text-gray-300 leading-relaxed">
                Includes 4 months of full access, 3 one-on-one speaking sessions, and 5 detailed writing feedbacks — all worth $120 in added value.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="bg-brand-blue/10 backdrop-blur p-8 rounded-2xl mb-12 border border-brand-blue/30 text-left">
            <h3 className="font-display text-2xl font-bold mb-4 text-center tracking-tight">
              What happens in this Analysis Test?
            </h3>
            <ul className="space-y-3 text-gray-200 list-inside">
              <li>
                <span className="font-semibold text-white">1. On-spot Speaking Test for fluency</span> (3 to 4 minutes)
              </li>
              <li>
                <span className="font-semibold text-white">2. Reading, Listening and Grammar test</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Start Your <span className="gradient-text">Self-Paced TEF Journey</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Take the first step towards achieving your goals. Book your analysis to ensure you start at the right level.
          </p>
          <Magnetic>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg"
            >
              Book my Analysis Test
            </a>
          </Magnetic>
          <p className="text-sm text-gray-400 mt-6">
            Taught in English. Some content may not be translated.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
