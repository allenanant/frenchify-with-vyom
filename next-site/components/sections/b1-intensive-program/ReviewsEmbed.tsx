'use client';

import Reveal from '@/components/motion/Reveal';
import ReviewsIframe from '@/components/ReviewsIframe';

export default function ReviewsEmbed() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_-20px_rgba(30,58,138,0.18)] border border-gray-100 bg-white">
            <ReviewsIframe />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
