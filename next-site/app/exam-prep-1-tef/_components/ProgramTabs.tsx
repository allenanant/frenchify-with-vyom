'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Feature = { emoji: string; title: string; body: string };
type Slot = { day: string; time: string; focus: string };

type ProgramId = 'intensive' | 'flex' | 'clb5';

const TABS: { id: ProgramId; name: string; meta: string }[] = [
  { id: 'intensive', name: 'EP1 Intensive', meta: '$899 CAD · 5 Live Sessions a week' },
  { id: 'flex', name: 'EP1 Flex', meta: '$729 CAD · 20 One on One Sessions' },
  { id: 'clb5', name: 'CLB 5 Speaking and Listening', meta: '$799 CAD · 25 One on One Sessions' },
];

const intensiveOnline: Feature[] = [
  {
    emoji: '✍️',
    title: 'Section A Writing',
    body: 'CLB 9/10 model answers, exam structure, connectors and argumentation strategies',
  },
  {
    emoji: '🎙️',
    title: 'Section A Speaking',
    body: '30 assignments, real exam prompts, frameworks and strategies for Section A and B style responses',
  },
  {
    emoji: '📖',
    title: 'Reading and Listening Roadmap',
    body: 'Month by month plan on what to study, which resources to use and when to take mock tests',
  },
  {
    emoji: '💬',
    title: 'B1 Community Group',
    body: 'Dedicated group for peer discussions, shared resources and support throughout the journey',
  },
];

const intensiveSchedule: Slot[] = [
  { day: 'Sunday', time: '11:00 AM to 12:30 PM EST', focus: 'Speaking Practice' },
  { day: 'Tuesday', time: '8:30 PM to 9:30 PM EST', focus: 'Speaking Practice' },
  { day: 'Thursday', time: '8:00 AM to 9:30 AM EST', focus: 'Reading and Listening' },
  { day: 'Thursday', time: '8:00 PM to 9:00 PM EST', focus: 'Writing Section A' },
  { day: 'Saturday', time: '10:30 AM to 12:00 PM EST', focus: 'B2 Shadow Session' },
];

const intensiveSessionTypes: Feature[] = [
  {
    emoji: '🎤',
    title: 'Speaking Practice, twice a week',
    body: 'Small groups of 3 to 4 students only. Maximum speaking time and real time feedback every session',
  },
  {
    emoji: '👂',
    title: 'Reading and Listening, once a week',
    body: 'Exam strategy and comprehension using authentic French resources',
  },
  {
    emoji: '📝',
    title: 'Writing Section A, once a week',
    body: 'On the spot writing under exam conditions with instructor review',
  },
  {
    emoji: '🔍',
    title: 'B2 Shadow Session, once a week',
    body: 'Observe and analyze real B2 level performances. Most students see their biggest improvement in speaking clarity from this session',
  },
];

const flexIncluded: Feature[] = [
  {
    emoji: '🎙️',
    title: '20 One on One Speaking Sessions',
    body: "Section A TEF with a TEF certified Frenchify instructor. Timings chosen from your instructor's booking link",
  },
  {
    emoji: '✍️',
    title: '10 Writing Corrections',
    body: 'TEF Canada Section A with detailed instructor feedback',
  },
  {
    emoji: '💻',
    title: 'Complete Online Curriculum',
    body: 'Advanced grammar, TEF preparation for Reading, Listening, Speaking and Writing, plus a month by month focus plan',
  },
  {
    emoji: '🗒️',
    title: '30 Speaking Assignments',
    body: 'Master exam specific responses and build Section B style thinking',
  },
  {
    emoji: '📖',
    title: 'Reading and Listening Roadmap',
    body: 'Correct resources and mock strategy to build speed, accuracy and exam readiness',
  },
  {
    emoji: '💬',
    title: 'B1 Community Group',
    body: 'Peer discussions, shared resources and community support throughout your journey',
  },
];

const clb5Included: Feature[] = [
  {
    emoji: '🎙️',
    title: '25 One on One Sessions',
    body: '30 minutes each with a TEF certified Frenchify instructor',
  },
  {
    emoji: '📘',
    title: 'Advanced Grammar',
    body: 'Concepts specifically selected to push you to a higher CLB score',
  },
  {
    emoji: '🗣️',
    title: 'Full Pronunciation Course',
    body: 'Revise pronunciation patterns so nothing trips you up on exam day',
  },
  {
    emoji: '🅰️',
    title: 'Section A Speaking',
    body: 'Complete walkthrough with mock practices and ready to use templates',
  },
  {
    emoji: '🅱️',
    title: 'Section B Speaking',
    body: 'Complete walkthrough with mock practices and ready to use templates',
  },
  {
    emoji: '👂',
    title: 'Listening',
    body: 'All 40 questions broken down by section with a full study plan on what to practice and when to mock test',
  },
];

function FeatureRow({ f }: { f: Feature }) {
  return (
    <div className="flex gap-4">
      <span className="text-2xl leading-none shrink-0 mt-0.5" aria-hidden>
        {f.emoji}
      </span>
      <div>
        <p className="font-display font-bold text-gray-900">{f.title}</p>
        <p className="text-gray-600 text-sm leading-relaxed mt-1">{f.body}</p>
      </div>
    </div>
  );
}

function CardHead({
  title,
  subtitle,
  price,
}: {
  title: string;
  subtitle: string;
  price: string;
}) {
  return (
    <div className="p-6 md:p-10 text-center border-b border-gray-100 bg-gradient-to-br from-blue-50 to-yellow-50">
      <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-600 mt-2">{subtitle}</p>
      <p className="font-display text-4xl font-bold text-brand-blue mt-4">{price}</p>
      <p className="text-sm text-gray-500 mt-1">3 months access</p>
    </div>
  );
}

function Note({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
      <span className="text-xl shrink-0" aria-hidden>
        {emoji}
      </span>
      <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
    </div>
  );
}

const panelMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
  className: 'premium-card bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden',
};

export default function ProgramTabs() {
  const [program, setProgram] = useState<ProgramId>('intensive');

  return (
    <div>
      <div
        role="tablist"
        aria-label="Exam Prep 1 programs"
        className="grid gap-3 sm:grid-cols-3 max-w-4xl mx-auto mb-8"
      >
        {TABS.map((t) => {
          const active = program === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`ep1-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`ep1-panel-${t.id}`}
              onClick={() => setProgram(t.id)}
              className={`rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300 ${
                active
                  ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-brand-blue/50 hover:-translate-y-0.5'
              }`}
            >
              <p className="font-display font-bold text-lg leading-snug">{t.name}</p>
              <p className={`text-sm mt-1 ${active ? 'text-blue-100' : 'text-gray-500'}`}>
                {t.meta}
              </p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {program === 'intensive' && (
          <motion.div
            key="intensive"
            role="tabpanel"
            id="ep1-panel-intensive"
            aria-labelledby="ep1-tab-intensive"
            {...panelMotion}
          >
            <CardHead
              title="EP1 Intensive"
              subtitle="Complete Online Curriculum plus 5 Live Sessions per week, TEF Canada"
              price="$899 CAD"
            />

            <div className="p-6 md:p-10 grid md:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5">
                  💻 Online Program · 24/7 Access
                </p>
                <div className="space-y-5">
                  {intensiveOnline.map((f) => (
                    <FeatureRow key={f.title} f={f} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5">
                  📅 Weekly Live Sessions · 5 per week · 1 to 1.5 hours each
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {intensiveSchedule.map((s) => (
                    <div
                      key={`${s.day}-${s.time}`}
                      className="rounded-xl bg-gray-50 border border-gray-100 p-3"
                    >
                      <p className="font-semibold text-gray-900 text-sm">{s.day}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.time}</p>
                      <p className="text-xs font-semibold text-brand-amber mt-1">{s.focus}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5">
                  🎯 What Each Session Looks Like
                </p>
                <div className="space-y-5">
                  {intensiveSessionTypes.map((f) => (
                    <FeatureRow key={f.title} f={f} />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 md:px-10 pb-6 md:pb-10">
              <Note emoji="👤">
                One on one sessions are available at an extra fee if you want more personalized
                practice.
              </Note>
            </div>
          </motion.div>
        )}

        {program === 'flex' && (
          <motion.div
            key="flex"
            role="tabpanel"
            id="ep1-panel-flex"
            aria-labelledby="ep1-tab-flex"
            {...panelMotion}
          >
            <CardHead
              title="EP1 Flex"
              subtitle="Flexible Learning plus Personalized One on One Sessions, TEF Canada"
              price="$729 CAD"
            />

            <div className="p-6 md:p-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5">
                ✅ What&apos;s Included
              </p>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                {flexIncluded.map((f) => (
                  <FeatureRow key={f.title} f={f} />
                ))}
              </div>
              <div className="mt-8">
                <Note emoji="➕">
                  More speaking sessions or writing corrections can be booked at any time.
                </Note>
              </div>
            </div>
          </motion.div>
        )}

        {program === 'clb5' && (
          <motion.div
            key="clb5"
            role="tabpanel"
            id="ep1-panel-clb5"
            aria-labelledby="ep1-tab-clb5"
            {...panelMotion}
          >
            <CardHead
              title="CLB 5, Speaking and Listening"
              subtitle="Focused Exam Prep for Listening and Speaking Modules Only, TEF Canada"
              price="$799 CAD"
            />

            <div className="p-6 md:p-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5">
                ✅ What&apos;s Included
              </p>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                {clb5Included.map((f) => (
                  <FeatureRow key={f.title} f={f} />
                ))}
              </div>
              <div className="mt-8">
                <Note emoji="📌">
                  This program covers Speaking and Listening only. It does not include Writing or
                  Reading modules. Best for students who are already at B1 level and need focused
                  exam practice.
                </Note>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
