'use client';

import Reveal from '@/components/motion/Reveal';
import ReviewsIframe from '@/components/ReviewsIframe';

export default function ReviewsWidget() {
  return (
    <section className="py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              What Our Students Say
            </h2>
          </div>
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
