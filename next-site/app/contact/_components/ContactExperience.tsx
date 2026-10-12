'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  ExternalLink,
  GraduationCap,
  Mail,
  PlayCircle,
  Route,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Video,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2';

const links = {
  punya: 'https://api.leadconnectorhq.com/widget/bookings/french-for-pr-11-guidance-call',
  darshan: 'https://api.leadconnectorhq.com/widget/bookings/darshanp',
  khushi: 'https://api.leadconnectorhq.com/widget/bookings/khushi-patel',
  harleen:
    'https://api.leadconnectorhq.com/widget/bookings/harleen-kaur-30-mins-one-on-onf25esfyjd43id7imab6s2fmxiihif9',
  a1Analysis: 'https://link.fastpaydirect.com/payment-link/6a778ccec8cc9a2ce7266f61',
  a2Analysis: 'https://link.fastpaydirect.com/payment-link/6aabf0f2f426560dbc2f0c82',
  masterclass: 'https://www.frenchifywithvyom.com/sunday-webinar/',
  beginner: 'https://frenchifywithvyom.com/frenchify-beginner-program/',
  portal: 'https://learn.frenchifywithvyom.com/',
} as const;

const approvedPortraits = {
  punya: '/team/punya-sharma.jpg',
  darshan: '/team/darshan-patel.jpg',
  khushi: '/team/khushi-patel.jpg',
  harleen:
    'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698a1fd867d749129b19c343.png',
} as const;

type Advisor = {
  name: string;
  initials: string;
  badge: string;
  meta: string;
  description: string;
  originalPrice: string;
  price: string;
  button: string;
  href: string;
  imageSrc?: string;
  imagePosition?: string;
  recommended?: boolean;
  showIntroSlot?: boolean;
  introVideoSrc?: string;
};

const advisors: Advisor[] = [
  {
    name: 'Punya Sharma',
    initials: 'PS',
    badge: 'Great place to start',
    meta: 'Student Success and Program Advisor · 30 min video call',
    description:
      'A former Frenchify student who cleared his exam on the first attempt. He helps you pick a program, understand your timeline and get unstuck before you enrol.',
    originalPrice: '$10',
    price: 'CAD $3.99',
    button: 'Book with Punya',
    href: links.punya,
    imageSrc: approvedPortraits.punya,
    imagePosition: 'object-[50%_38%]',
    recommended: true,
    showIntroSlot: true,
  },
  {
    name: 'Darshan Patel',
    initials: 'DP',
    badge: '3+ years of experience',
    meta: 'TEF/TCF Guidance · 30 min video call',
    description:
      'For learners who want detailed TEF or TCF preparation guidance and a clear, structured plan for the next stage of their preparation.',
    originalPrice: '$35',
    price: 'CAD $25',
    button: 'Book with Darshan',
    href: links.darshan,
    imageSrc: approvedPortraits.darshan,
    imagePosition: 'object-[50%_36%]',
  },
  {
    name: 'Khushi Patel',
    initials: 'KP',
    badge: 'Co-creator and founder',
    meta: 'Frenchify founder · 20 min phone call',
    description:
      'Khushi built the Frenchify course together with Vyom. She can help you understand how the program works, which level fits you, what to expect and how to get started.',
    originalPrice: '$10',
    price: 'CAD $4.99',
    button: 'Book with Khushi',
    href: links.khushi,
    imageSrc: approvedPortraits.khushi,
    imagePosition: 'object-[50%_35%]',
  },
];

const chips = [
  'A1 to B2 courses',
  'Flex and Intensive options',
  'TEF & TCF Canada prep',
  'CLB 5 & CLB 7 training',
  'Level analysis & live speaking evaluation',
  'One-on-one or group sessions',
];

const faqs = [
  {
    question: "I'm a complete beginner. Which call should I book?",
    answer:
      'You can book with Punya, Khushi or Darshan. Punya is a good first step if you are new to Frenchify and want help choosing a program.',
  },
  {
    question: "I've studied French before. How do I know my level?",
    answer:
      'For B1 or B2, book an analysis call with Harleen. For A1 or A2, take the Frenchify analysis test directly. Our team will connect with you after the test for a detailed discussion and your results.',
  },
  {
    question: 'What is the difference between a guidance call and an analysis?',
    answer:
      'A guidance call is a conversation about your goals, timeline and program. An analysis assesses your current French so we can place you at the right level.',
  },
  {
    question: 'Is video mandatory?',
    answer:
      'Calls with Punya, Darshan and Harleen are held over video so we can guide you properly and have a proper discussion. The session with Khushi is a phone call.',
  },
  {
    question: 'What if I miss my call?',
    answer:
      "You will need to pay again and rebook. For Darshan's calls, you can pay a rescheduling fee and book again.",
  },
  {
    question: 'What should I prepare before the call?',
    answer:
      'Your exam goal, your target date, your current level, and any questions about pricing, schedules or instalments.',
  },
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        'mb-3 text-xs font-extrabold uppercase tracking-[0.18em] sm:text-sm',
        light ? 'text-amber-300' : 'text-brand-blue'
      )}
    >
      {children}
    </p>
  );
}

function ExternalCta({
  href,
  children,
  amber = false,
  className,
}: {
  href: string;
  children: ReactNode;
  amber?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-bold transition duration-200 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none sm:w-auto',
        amber
          ? 'bg-brand-amber text-[#172033] shadow-[0_10px_25px_-12px_rgba(245,158,11,0.75)] hover:bg-amber-400'
          : 'bg-brand-blue text-white shadow-[0_10px_25px_-12px_rgba(37,99,235,0.7)] hover:bg-brand-blue-deep',
        focusRing,
        className
      )}
    >
      <span>{children}</span>
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ProfilePortrait({ advisor }: { advisor: Advisor }) {
  return (
    <div
      className={cn(
        'relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 bg-white shadow-sm',
        advisor.recommended ? 'border-amber-100' : 'border-blue-50'
      )}
    >
      {advisor.imageSrc ? (
        <Image
          src={advisor.imageSrc}
          alt={`${advisor.name}, ${advisor.meta}`}
          fill
          sizes="96px"
          className={cn('object-cover', advisor.imagePosition)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#1d4ed8,#16235f)] text-2xl font-extrabold tracking-wide text-white"
          aria-label={`${advisor.name} profile photo coming soon`}
        >
          {advisor.initials}
        </div>
      )}
    </div>
  );
}

function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-3xl border bg-white p-5 shadow-[0_18px_50px_-35px_rgba(22,35,95,0.45)] sm:p-6',
        advisor.recommended
          ? 'border-amber-300 ring-2 ring-amber-100'
          : 'border-[#e4e7f2]'
      )}
    >
      {advisor.recommended && (
        <div className="absolute -top-3 left-5 rounded-full bg-brand-amber px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#172033] shadow-sm">
          Recommended
        </div>
      )}

      <div className="mt-2 flex items-start gap-4">
        <ProfilePortrait advisor={advisor} />
        <div className="min-w-0 pt-1">
          <span
            className={cn(
              'inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-tight',
              advisor.recommended
                ? 'bg-amber-100 text-amber-900'
                : 'bg-blue-50 text-blue-800'
            )}
          >
            <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {advisor.badge}
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-[#121a31]">{advisor.name}</h3>
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold leading-6 text-[#4f5872]">{advisor.meta}</p>
      <p className="mt-3 flex-1 text-[15px] leading-7 text-[#5d6380]">{advisor.description}</p>

      {advisor.showIntroSlot && (
        advisor.introVideoSrc ? (
          <video
            controls
            preload="metadata"
            className="mt-5 aspect-video w-full rounded-2xl bg-[#0b1530] object-cover"
          >
            <source src={advisor.introVideoSrc} />
            Your browser does not support embedded video.
          </video>
        ) : (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm text-blue-950">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
              <PlayCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold">Meet Punya</p>
              <p className="text-xs leading-5 text-blue-800">Short introduction video coming soon</p>
            </div>
          </div>
        )
      )}

      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-sm text-gray-400 line-through decoration-2">{advisor.originalPrice}</span>
        <span className="font-display text-2xl font-extrabold text-[#121a31]">{advisor.price}</span>
      </div>
      <ExternalCta
        href={advisor.href}
        amber={advisor.recommended}
        className="mt-4 w-full sm:w-full"
      >
        {advisor.button}
      </ExternalCta>
    </article>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-10 divide-y divide-[#e4e7f2] overflow-hidden rounded-3xl border border-[#e4e7f2] bg-white shadow-[0_18px_50px_-40px_rgba(22,35,95,0.45)]">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={faq.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className={cn(
                  'flex min-h-16 w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-bold text-[#18213d] transition hover:bg-[#f8f9fd] sm:px-7 sm:text-lg',
                  focusRing
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 motion-reduce:transition-none',
                    open && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-5 text-[15px] leading-7 text-[#5d6380] sm:px-7 sm:pb-6 sm:text-base"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ContactExperience() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="overflow-x-clip bg-white text-[#1b1f3b]">
      <section className="relative overflow-hidden bg-white pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 top-4 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Frenchify student guidance</Eyebrow>
            <h1 className="font-display text-[2.25rem] font-extrabold leading-[1.12] tracking-tight text-[#11182d] sm:text-5xl lg:text-[3.75rem]">
              Let&apos;s find the right next step for your French journey
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5d6380] sm:text-lg">
              Pick what fits you and we will point you to the right person.
            </p>
          </Reveal>

          <Reveal className="mt-10 grid gap-4 md:grid-cols-2" delay={0.08}>
            <div className="rounded-3xl border border-blue-200 bg-white p-2 shadow-[0_20px_55px_-40px_rgba(37,99,235,0.6)]">
              <button
                type="button"
                aria-expanded={joinOpen}
                aria-controls="join-options"
                onClick={() => setJoinOpen((open) => !open)}
                className={cn(
                  'group flex min-h-32 w-full items-center gap-4 rounded-[1.25rem] px-5 py-5 text-left transition hover:bg-blue-50/70 sm:px-6',
                  focusRing
                )}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-brand-blue">
                  <Route className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-bold text-[#121a31] sm:text-2xl">
                    I want to join Frenchify
                  </span>
                  <span className="mt-1 block text-sm text-[#5d6380]">Tap to see where to start</span>
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 motion-reduce:transition-none',
                    joinOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>

            <a
              href="#students"
              className={cn(
                'group flex min-h-36 items-center gap-4 rounded-3xl border border-[#e4e7f2] bg-white p-7 shadow-[0_20px_55px_-40px_rgba(22,35,95,0.45)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_22px_55px_-35px_rgba(37,99,235,0.45)] motion-reduce:transform-none motion-reduce:transition-none',
                focusRing
              )}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <UserRoundCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl font-bold text-[#121a31] sm:text-2xl">
                  I&apos;m already a student
                </span>
                <span className="mt-1 block text-sm text-[#5d6380]">
                  Message us on the student portal
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-brand-blue transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Reveal>

          <div
            id="join-options"
            aria-hidden={!joinOpen}
            className={cn(
              'grid transition-[grid-template-rows,opacity,margin] duration-300 motion-reduce:transition-none',
              joinOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <div className="grid gap-3 rounded-3xl border border-blue-100 bg-[#f7f9ff] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
                {[
                  {
                    title: "I'm a complete beginner",
                    text: 'Start with the free Beginner Program',
                    href: links.beginner,
                    external: true,
                    icon: GraduationCap,
                  },
                  {
                    title: 'I know some French',
                    text: 'Check my level with an analysis',
                    href: '#analysis',
                    icon: BarChart3,
                  },
                  {
                    title: 'I want guidance',
                    text: 'TEF/TCF help or choosing a program',
                    href: '#calls',
                    icon: Compass,
                  },
                  {
                    title: 'I want to learn more first',
                    text: 'Free masterclass and demo',
                    href: '#learn',
                    icon: BookOpenCheck,
                  },
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <a
                      key={option.title}
                      href={option.href}
                      target={option.external ? '_blank' : undefined}
                      rel={option.external ? 'noopener noreferrer' : undefined}
                      tabIndex={joinOpen ? 0 : -1}
                      className={cn(
                        'group flex min-h-32 flex-col rounded-2xl border border-[#e4e7f2] bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none',
                        focusRing
                      )}
                    >
                      <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                      <span className="mt-4 font-bold leading-snug text-[#18213d]">{option.title}</span>
                      <span className="mt-1 text-sm leading-5 text-[#5d6380]">{option.text}</span>
                      {option.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <Reveal className="mt-8 flex flex-wrap justify-center gap-2.5" delay={0.12}>
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e4e7f2] bg-white px-3.5 py-2 text-xs font-semibold text-[#4f5872] shadow-sm sm:text-sm"
              >
                <Check className="h-3.5 w-3.5 text-brand-blue" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="calls" className="scroll-mt-[180px] bg-[#f6f7fc] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <Eyebrow>Recommended for new students</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#11182d] sm:text-4xl lg:text-5xl">
              Book a guidance call
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5d6380] sm:text-lg">
              Three people who can help you plan. Choose the one that matches what you need.
            </p>
          </Reveal>

          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advisors.map((advisor, index) => (
              <Reveal key={advisor.name} delay={index * 0.06} className="h-full">
                <AdvisorCard advisor={advisor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="analysis" className="scroll-mt-[180px] bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <Eyebrow>Not sure of your level?</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#11182d] sm:text-4xl lg:text-5xl">
              Level analysis
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5d6380] sm:text-lg">
              A guidance call helps you plan. An analysis checks where you actually are, so you start at the right level.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-[#e4e7f2] bg-white p-5 shadow-[0_18px_50px_-35px_rgba(22,35,95,0.45)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-blue-50 bg-white shadow-sm">
                    <Image
                      src={approvedPortraits.harleen}
                      alt="Harleen Kaur, Frenchify analysis advisor"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 pt-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      3+ years of experience
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-[#121a31]">Harleen Kaur</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm font-semibold leading-6 text-[#4f5872]">
                  B1 / B2 Analysis Call · speaking analysis
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-[#5d6380]">
                  A live speaking analysis to see if you are ready to begin B1 or B2, with a clear level recommendation.
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm text-gray-400 line-through decoration-2">$30</span>
                  <span className="font-display text-2xl font-extrabold text-[#121a31]">CAD $15</span>
                </div>
                <ExternalCta href={links.harleen} className="mt-4 w-full sm:w-full">
                  Book with Harleen
                </ExternalCta>
              </article>
            </Reveal>

            <Reveal className="h-full" delay={0.06}>
              <article className="flex h-full flex-col rounded-3xl border border-[#e4e7f2] bg-[#f9faff] p-5 shadow-[0_18px_50px_-35px_rgba(22,35,95,0.45)] sm:p-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-900">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                  3 days of access
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-[#121a31] sm:text-3xl">
                  A1 and A2 Analysis Test
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5872]">
                  A1 test to start A2 · A2 test to start Exam Prep 1, with a live speaking check by Harleen
                </p>
                <p className="mt-3 text-[15px] leading-7 text-[#5d6380]">
                  Take it any time within 3 days. Our team connects with you afterwards for a detailed discussion of your results.
                </p>
                <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-950">
                  The test fee is credited to your course fee if you start the same day or the next day after the test.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e4e7f2] bg-white p-4">
                    <p className="text-sm font-semibold text-[#5d6380]">A1 test</p>
                    <p className="mt-1 font-display text-xl font-extrabold text-[#121a31]">CAD $20</p>
                  </div>
                  <div className="rounded-2xl border border-[#e4e7f2] bg-white p-4">
                    <p className="text-sm font-semibold text-[#5d6380]">A2 test</p>
                    <p className="mt-1 font-display text-xl font-extrabold text-[#121a31]">CAD $25</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <ExternalCta href={links.a1Analysis} className="w-full sm:w-full">
                    Take the A1 test
                  </ExternalCta>
                  <ExternalCta href={links.a2Analysis} className="w-full sm:w-full">
                    Take the A2 test
                  </ExternalCta>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="learn" className="scroll-mt-[180px] bg-[#f6f7fc] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <Eyebrow>Want to know more first?</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#11182d] sm:text-4xl lg:text-5xl">
              Try Frenchify before you decide
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-[#e4e7f2] bg-white p-6 shadow-[0_18px_50px_-38px_rgba(22,35,95,0.45)] sm:p-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-800">
                  <Video className="h-3.5 w-3.5" aria-hidden="true" />
                  Free live session with Vyom
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#121a31] sm:text-3xl">
                  Sunday Masterclass
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-[#5d6380]">
                  Join Vyom live to understand how Frenchify works and ask your questions.
                </p>
                <ExternalCta href={links.masterclass} className="mt-6 w-full sm:w-full">
                  Join the masterclass
                </ExternalCta>
              </article>
            </Reveal>

            <Reveal className="h-full" delay={0.06}>
              <article className="flex h-full flex-col rounded-3xl border border-[#e4e7f2] bg-white p-6 shadow-[0_18px_50px_-38px_rgba(22,35,95,0.45)] sm:p-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-900">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Free, worth $150
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#121a31] sm:text-3xl">
                  Beginner Program Demo
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-[#5d6380]">
                  See the student portal, how the lectures are structured and how Vyom teaches. Also explains our course types, with some offers.
                </p>
                <ExternalCta href={links.beginner} amber className="mt-6 w-full sm:w-full">
                  Start the free demo
                </ExternalCta>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="students" className="scroll-mt-[180px] bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1426] px-5 py-10 text-white shadow-[0_25px_65px_-35px_rgba(10,20,38,0.8)] sm:px-10 sm:py-12 lg:px-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="relative max-w-3xl">
                <Eyebrow light>Existing Frenchify students</Eyebrow>
                <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  Already a Frenchify student?
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
                  Message us on the student portal and our team will reply or call you if needed. Even if your course access has ended, you can still use the portal to message us and connect with us.
                </p>
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-slate-100 sm:text-base">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
                  <p>
                    You don&apos;t need to book a paid guidance call above simply to receive regular student support.
                  </p>
                </div>
                <ExternalCta href={links.portal} amber className="mt-7 w-full sm:w-auto">
                  Message us on the student portal
                </ExternalCta>
                <p className="mt-6 text-sm leading-6 text-slate-300 sm:text-base">
                  Prefer not to use the portal? Email us at{' '}
                  <a
                    href="mailto:admin@frenchifywithvyom.com"
                    className={cn(
                      'break-words font-bold text-white underline decoration-amber-300 decoration-2 underline-offset-4 hover:text-amber-200',
                      focusRing
                    )}
                  >
                    admin@frenchifywithvyom.com
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f6f7fc] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <Eyebrow>Questions before you choose?</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#11182d] sm:text-4xl lg:text-5xl">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[#e4e7f2] bg-white py-12 sm:py-14">
        <div className="mx-auto flex max-w-[900px] flex-col items-center px-4 text-center sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
            <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
          </div>
          <p className="mt-4 text-base font-semibold leading-7 text-[#4f5872] sm:text-lg">
            Prefer not to book a call? Email us at{' '}
            <a
              href="mailto:admin@frenchifywithvyom.com"
              className={cn(
                'break-words font-bold text-brand-blue underline decoration-blue-200 decoration-2 underline-offset-4 hover:text-brand-blue-deep',
                focusRing
              )}
            >
              admin@frenchifywithvyom.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
