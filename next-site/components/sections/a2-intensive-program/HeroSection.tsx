'use client';

import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export default function HeroSection() {
  return (
    <section className="hero-pattern-animated py-16 md:py-24 relative overflow-hidden full-bleed-section-ghl aurora-bg">
      <FloatingOrbs variant="soft" />
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center lg:text-left">
          <Reveal direction="left" duration={0.8}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Frenchify A2 <span className="gradient-text">Intensive Program</span>
            </h1>
          </Reveal>
          <Reveal direction="left" delay={0.1} duration={0.7}>
            <p className="text-xl md:text-2xl text-brand-blue font-medium mb-6">
              Deepen Your French Journey and Build Real Confidence
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.2} duration={0.7}>
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Congratulations, you&rsquo;ve mastered the basics at A1! Now, join this exciting second step to uncover the real beauty of French and understand how the language truly comes together.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.3} duration={0.6}>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Magnetic>
                <a
                  href="https://link.fastpaydirect.com/payment-link/67e8bb027178768a29a43b4e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Sign Up
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal direction="right" delay={0.2} duration={0.8}>
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-amber rounded-2xl blur opacity-60 group-hover:opacity-90 transition duration-500 animate-aurora" />
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-black">
              <video
                src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/68d39928e1ce45e40bf67452.mp4"
                controls
                preload="metadata"
                playsInline
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
