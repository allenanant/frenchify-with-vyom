'use client';

import { CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';

const bullets = [
  'Online Self-Paced learning',
  'Designed specifically for independent learners aiming to rapidly achieve French proficiency for TEF Canada',
  'Flexible & step-by-step learning content which fits your own schedule and speed',
  'Includes tests, worksheets, books & resources and how to use them in your French Journey',
];

export default function SelfStudyVideoSection() {
  return (
    <section id="self-study-video" className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video shadow-lg order-2 lg:order-1">
                <video controls className="absolute inset-0 w-full h-full object-cover">
                  <source
                    src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6813e11ab25d2bca52f26cdc.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  Frenchify <span className="gradient-text">Self-Study Programs</span>
                </h3>
                <ul className="space-y-4 mb-8">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start">
                      <div className="bg-brand-blue/10 p-2 rounded-full mr-4 mt-0.5 flex-shrink-0 ring-1 ring-brand-blue/20">
                        <CheckCircle2 className="text-brand-blue w-4 h-4" strokeWidth={2.5} />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                <Magnetic>
                  <a href="#self-study" className="btn-primary inline-block">
                    Learn more
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
