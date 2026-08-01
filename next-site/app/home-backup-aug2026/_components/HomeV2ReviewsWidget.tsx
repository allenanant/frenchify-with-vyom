'use client';

import Script from 'next/script';
import Reveal from '@/components/motion/Reveal';
import { Star } from 'lucide-react';

export default function HomeV2ReviewsWidget() {
  return (
    <section className="relative bg-[#F9FAFB] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-6 items-end mb-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
                <Star className="h-3.5 w-3.5 fill-current text-[#f59e0b]" />
                Student reviews
              </span>
              <h2 className="mt-3 font-display text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
                What our students say.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-[#f59e0b]" />
                  ))}
                </div>
                <span className="text-[13px] font-semibold text-[#252525]">
                  Verified testimonials from real TEF Canada scorers
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(30,58,138,0.18)] border border-[#e5e7eb] bg-white">
            <Script
              src="https://reputationhub.site/reputation/assets/review-widget.js"
              strategy="lazyOnload"
            />
            <iframe
              className="lc_reviews_widget block w-full h-[600px] md:h-[460px] border-0"
              src="https://reputationhub.site/reputation/widgets/review_widget/cmjlzerv4DUDyZFj6PYO"
              frameBorder={0}
              scrolling="auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
