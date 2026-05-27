'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export default function HeroSection() {
  return (
    <section className="pt-[calc(4rem+30px)] md:pt-[calc(5rem+30px)] pb-16 md:pb-20 bg-white full-bleed-section-ghl relative overflow-hidden aurora-bg">
      <FloatingOrbs variant="soft" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <Reveal direction="left" duration={0.8}>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Meet Your Guide: Vyom Sharma
              </h1>
            </Reveal>
            <Reveal direction="left" delay={0.15} duration={0.7}>
              <p className="mt-4 text-lg text-gray-600">
                My goal is simple: to help you navigate the path to Canadian PR through French, just like I did.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3} duration={0.6}>
              <div className="mt-6">
                <Magnetic>
                  <Link
                    href="/programs"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <Reveal direction="right" delay={0.2} duration={0.8}>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-amber rounded-2xl blur opacity-60 group-hover:opacity-90 transition duration-500 animate-aurora" />
                <Image
                  src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808d65bdf54eff4377e2466.png"
                  alt="Vyom Sharma - French Language Instructor"
                  width={288}
                  height={320}
                  unoptimized
                  className="relative rounded-2xl shadow-2xl w-72 h-80 object-cover object-center border-4 border-white"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
