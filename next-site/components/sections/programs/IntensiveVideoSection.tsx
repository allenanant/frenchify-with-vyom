'use client';

import { CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';

const bullets = [
  'Online + Live learning',
  'Designed specifically for learners aiming to rapidly achieve French proficiency for TEF Canada',
  'Flexible learning journey that accommodates your own schedule and speed',
  'With frequent live sessions, expert mentorship, and a vibrant community of fellow learners',
];

export default function IntensiveVideoSection() {
  return (
    <section id="intensive-video" className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="ghl-row-full mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  Frenchify <span className="gradient-text">Intensive Programs</span>
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
                  <a href="#intensive" className="btn-primary inline-block">
                    Learn More
                  </a>
                </Magnetic>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video shadow-lg">
                <video controls className="absolute inset-0 w-full h-full object-cover">
                  <source
                    src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6813e11ac9461a75076a2374.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
