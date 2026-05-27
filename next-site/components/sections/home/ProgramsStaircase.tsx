'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, MousePointerClick, ArrowRight, ArrowUpRight } from 'lucide-react';

type StepStatus = 'active' | 'locked';

type Step = {
  number: string;
  title: string;
  description: string;
  status: StepStatus;
  cta: string;
  href: string;
};

const steps: Step[] = [
  {
    number: '01',
    title: 'Frenchify A1 Intensive',
    description: 'Step-By-Step for Beginners',
    status: 'active',
    cta: 'Learn More',
    href: '/a1-intensive-program',
  },
  {
    number: '02',
    title: 'Frenchify A2 Intensive',
    description: 'For Intermediate Level Students',
    status: 'active',
    cta: 'Learn More',
    href: '/a2-intensive-program',
  },
  {
    number: '03',
    title: 'Frenchify B1 TEF/TCF',
    description: 'Fluency Level',
    status: 'active',
    cta: 'Learn More',
    href: '/b1-intensive-program',
  },
  {
    number: '04',
    title: 'Frenchify B2 TEF/TCF',
    description: 'Exam Ready Level',
    status: 'active',
    cta: 'Learn More',
    href: '/b2-intensive-program',
  },
];

// Staircase vertical offsets (desktop only): step 01 pushed down, step 04 at top
const cardOffsets = ['xl:mt-[420px]', 'xl:mt-[280px]', 'xl:mt-[140px]', 'xl:mt-0'];
const arrowOffsets = ['xl:mt-[470px]', 'xl:mt-[330px]', 'xl:mt-[190px]'];


export default function ProgramsStaircase() {
  return (
    <section
      aria-labelledby="staircase-title"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#F5FBFF] to-[#F3F6F8] py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-44 -top-28 h-[600px] w-[600px] rounded-full bg-[#2563eb] opacity-[0.08] blur-[180px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-[420px] h-[600px] w-[600px] rounded-full bg-[#f59e0b] opacity-10 blur-[180px]"
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 md:px-10 xl:px-14">
        <div className="mb-6 flex items-center gap-[14px]">
          <span className="text-[11px] font-extrabold tracking-[2px] text-[#2667FF]">
            01 · 02 · 03 · 04
          </span>
          <span className="h-px w-10 bg-[#c9d8e0]" />
          <span className="text-[11px] font-bold tracking-[2px] text-[#8E8E8E]">
            YOUR PATH TO CANADA
          </span>
        </div>

        <div className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-12">
          <h2
            id="staircase-title"
            className="max-w-[780px] text-[32px] font-bold leading-[1.1] tracking-[-1.2px] text-[#252525] md:text-[40px] xl:text-[44px]"
          >
            Frenchify Programs
          </h2>
          <p className="max-w-[380px] text-[14px] leading-[1.6] text-[#4b5563]">
            Discover Our Step-By-Step French learning Programs for TEF/TCF Canada
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex w-fit max-w-full items-center gap-3 rounded-full border border-[#dbeafe] bg-white py-2 pl-4 pr-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]"
        >
          <MousePointerClick className="h-3.5 w-3.5 shrink-0 text-[#2667FF]" />
          <span className="whitespace-nowrap text-[13px] font-bold text-[#252525]">
            How it works:
          </span>
          <span className="text-[13px] font-medium text-[#4b5563]">
            Click Step 01 → finishing it unlocks Step 02. No skipping the stairs.
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:flex xl:flex-row xl:items-start xl:gap-3">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <div className={`flex-1 min-w-0 ${cardOffsets[i]}`}>
                <StairCard step={step} index={i} />
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden shrink-0 flex-col items-center xl:flex ${arrowOffsets[i]}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2563eb] bg-white shadow-[0_8px_20px_rgba(37,99,235,0.25)]">
                    <ArrowUpRight className="h-[22px] w-[22px] text-[#2667FF]" />
                  </div>
                  <div className="mt-2 flex h-5 items-center justify-center rounded-full border border-[#dbeafe] bg-[#F5FBFF] px-3">
                    <span className="whitespace-nowrap text-[10px] font-extrabold tracking-[1px] text-[#2667FF]">
                      NEXT STEP →
                    </span>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function StairCard({ step, index }: { step: Step; index: number }) {
  const isActive = step.status === 'active';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      className={`flex h-[300px] flex-col gap-4 rounded-3xl bg-white p-6 lg:p-7 ${
        isActive
          ? 'border-2 border-[#2563eb] shadow-[0_24px_48px_rgba(37,99,235,0.25)]'
          : 'border border-[#e5e7eb]'
      }`}
    >
      <CardHeader number={step.number} active={isActive} />
      <h3
        className={`text-[22px] font-extrabold leading-[1.15] tracking-[-0.8px] ${
          isActive ? 'text-[#252525]' : 'text-[#8E8E8E]'
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`text-[13px] leading-[1.55] ${
          isActive ? 'text-[#4b5563]' : 'text-[#8E8E8E]'
        }`}
      >
        {step.description}
      </p>
      <CardCta cta={step.cta} href={step.href} active={isActive} />
    </motion.div>
  );
}

function CardHeader({ number, active }: { number: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-[1.2px] ${
          active
            ? 'bg-gradient-to-r from-[#2563eb] to-[#f59e0b] text-white'
            : 'border border-[#e5e7eb] bg-[#F3F6F8] text-[#8E8E8E]'
        }`}
      >
        STEP {number}
      </span>
      {active ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          <span className="text-[9px] font-bold tracking-[0.8px] text-[#166534]">
            ACTIVE
          </span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fde68a] bg-[#fef3c7] px-2.5 py-1">
          <Lock className="h-2.5 w-2.5 text-[#b45309]" />
          <span className="text-[9px] font-bold tracking-[0.8px] text-[#92400e]">
            LOCKED
          </span>
        </span>
      )}
    </div>
  );
}

function CardCta({
  cta,
  href,
  active,
}: {
  cta: string;
  href: string;
  active: boolean;
}) {
  if (active) {
    return (
      <Link
        href={href}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2667FF] py-3 text-[13px] font-bold text-white shadow-[0_6px_16px_rgba(38,103,255,0.4)] transition-transform hover:-translate-y-0.5"
      >
        <MousePointerClick className="h-3.5 w-3.5" />
        {cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }
  return (
    <div className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e5e7eb] bg-[#F3F6F8] py-3">
      <Lock className="h-3.5 w-3.5 text-[#8E8E8E]" />
      <span className="whitespace-nowrap text-[13px] font-semibold text-[#8E8E8E]">
        {cta}
      </span>
    </div>
  );
}
