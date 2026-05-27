'use client';

import Script from 'next/script';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center py-16 lg:py-20 overflow-hidden full-bleed-section-ghl aurora-bg hero-pattern-animated">
      <FloatingOrbs variant="soft" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <Reveal direction="left">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 px-5 py-2.5 rounded-full text-sm font-bold mb-6 border-2 border-blue-200 shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50" />
                </span>
                <span className="font-extrabold">Live Workshop - Limited Seats 🍁</span>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.05}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] mb-5 tracking-tight">
                French for Canadian PR:
                <span className="gradient-text block mt-1">Live Assessment</span>
                <span className="block">Workshop</span>
              </h1>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Discover in <span className="font-black text-brand-blue">90 minutes</span> if French is your fastest path to Canadian PR. Take a live assessment and get your personalized French learning strategy - completely free.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Magnetic>
                  <a
                    href="/webinar-form-page"
                    className="btn-primary text-lg group"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Reserve My Free Spot
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-5 text-center lg:text-left">
                <p className="text-base font-bold text-slate-700">
                  <span className="text-red-500 line-through text-lg">$19 CAD Value</span>
                  <span className="ml-2 text-brand-blue text-xl">Absolutely FREE For a Limited Time!</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: Video */}
          <Reveal direction="right" delay={0.2} duration={0.8}>
            <div className="w-full max-w-2xl mx-auto order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-amber rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
                <div
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
                  style={{ boxShadow: '0 25px 50px rgba(37, 99, 235, 0.25), 0 10px 30px rgba(0, 0, 0, 0.15)' }}
                >
                  <Script src="https://fast.wistia.com/embed/giyksplji4.js" strategy="lazyOnload" />
                  <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
                  {/* Wistia custom element rendered via innerHTML to avoid JSX type issues */}
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<wistia-player media-id="giyksplji4" style="height:100%;width:100%"></wistia-player>',
                    }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
