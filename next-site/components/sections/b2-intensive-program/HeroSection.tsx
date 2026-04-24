'use client';

import Link from 'next/link';
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
              Frenchify B2 <span className="gradient-text">Intensive Program</span>
            </h1>
          </Reveal>
          <Reveal direction="left" delay={0.15} duration={0.7}>
            <p className="text-xl md:text-2xl text-brand-blue font-medium mb-6">
              Ready to achieve your highest score yet? 🚀
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.25} duration={0.7}>
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Our B2 Program is specifically designed to sharpen your advanced French skills through targeted, exam-focused preparation for TEF/TCF Canada. Dive deep into exam strategies, practice intensive mock tests, and benefit from personalized mentorship.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.35} duration={0.6}>
            <Magnetic>
              <Link href="/contact" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Know More
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal direction="right" delay={0.2} duration={0.8}>
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-amber rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-aurora" />
            <div className="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200">
              <video
                src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/68d39928b43dbdae391f37fa.mp4"
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
