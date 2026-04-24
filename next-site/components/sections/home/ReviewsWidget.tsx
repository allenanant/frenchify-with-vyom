'use client';

import Script from 'next/script';
import Reveal from '@/components/motion/Reveal';

export default function ReviewsWidget() {
  return (
    <section className="py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">Read testimonials from our successful students</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_-20px_rgba(30,58,138,0.18)] border border-gray-100 bg-white">
            <Script
              src="https://reputationhub.site/reputation/assets/review-widget.js"
              strategy="lazyOnload"
            />
            <iframe
              className="lc_reviews_widget"
              src="https://reputationhub.site/reputation/widgets/review_widget/cmjlzerv4DUDyZFj6PYO"
              frameBorder={0}
              scrolling="no"
              style={{ width: '100%', minWidth: '100%', height: 600, border: 'none' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
