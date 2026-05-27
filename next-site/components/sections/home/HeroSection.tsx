'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-pattern-animated py-20 md:py-24 relative overflow-hidden full-bleed-section-ghl aurora-bg"
    >
      <FloatingOrbs variant="soft" />

      <motion.div
        style={{ y: textY }}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10"
      >
        <div>
          <Reveal direction="left" duration={0.6}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-5 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-bold tracking-wide text-blue-700">
                4+ Years of Experience with TEF Canada Training
              </span>
            </div>
          </Reveal>
          <Reveal direction="left" duration={0.8}>
            <h1 className="font-display text-[40px] lg:text-[64px] font-bold text-gray-900 mb-6 leading-[1.08] tracking-tight">
              Becoming <span className="gradient-text">Fluent</span> with Frenchify
            </h1>
          </Reveal>
          <Reveal direction="left" delay={0.15} duration={0.7}>
            <p className="text-base lg:text-[1.15rem] text-gray-600 mb-8 leading-relaxed">
              Learn French &amp; clear TEF/TCF Canada exam with a step-by-step real life language learning methodologies and roadmap used by a lot of students to become fluent in under 12 months.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.3} duration={0.6}>
            <div className="flex flex-wrap gap-4 lg:flex-nowrap lg:gap-3">
              <Magnetic>
                <Link href="/contact" className="btn-primary whitespace-nowrap lg:!px-5 lg:!text-[15px]">
                  Book My TEF Expert Call
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/analysis-page" className="btn-ghost whitespace-nowrap lg:!px-5 lg:!text-[15px]">
                  Book my analysis test
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal direction="right" delay={0.2} duration={0.8}>
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-amber rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-aurora" />
            <Image
              src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808e5afbcc5c4159279e282.jpeg"
              alt="French Learning Session"
              width={700}
              height={500}
              priority
              unoptimized
              className="relative w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
            />
          </motion.div>
        </Reveal>
      </motion.div>
    </section>
  );
}
