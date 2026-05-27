import Link from 'next/link';
import { ArrowRight, Calendar, Shield } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import ResultsGallery from '@/components/sections/results-page/ResultsGallery';

export const metadata = {
  title: 'TEF Success Results | Frenchify with Vyom',
  description:
    'Wall of Excellence — Witness the continuous flow of successful results. Our students consistently achieve their Canadian dreams with exceptional TEF & TCF scores.',
};

export default function ResultsPage() {
  return (
    <>
      <main className="pt-32 pb-20 relative overflow-hidden aurora-bg">
        <FloatingOrbs variant="soft" />

        {/* Intro Section */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
          <Reveal>
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-sm font-semibold tracking-wide animate-pulse">
              Proven Success Record
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-[1.1] tracking-tight">
              Wall of <span className="gradient-text">Excellence</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Witness the continuous flow of successful results. Our students consistently achieve their Canadian
              dreams with exceptional TEF &amp; TCF scores.
            </p>
          </Reveal>
        </div>

        <ResultsGallery />

        {/* Enhanced CTA Section */}
        <div className="mt-24 text-center relative z-10 max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="p-8 md:p-16 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 shadow-2xl relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse" />
                <div
                  className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
                <div
                  className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>

              <div className="relative z-10">
                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
                  <i className="fas fa-fire text-orange-300 mr-2" />
                  Limited Spots Available
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight tracking-tight">
                  Ready to <span className="text-yellow-300">Join the Winners?</span>
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Magnetic>
                    <Link
                      href="/programs"
                      className="group bg-white text-blue-700 px-10 py-4 rounded-full font-bold shadow-2xl hover:shadow-white/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                    >
                      Explore Programs
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="bg-blue-800 text-white border-2 border-white/30 px-10 py-4 rounded-full font-bold hover:bg-blue-900 hover:border-white/50 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Consultation
                    </Link>
                  </Magnetic>
                </div>

                <p className="text-blue-200 text-sm mt-6 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  No commitment required • Free consultation • Expert guidance
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
