'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Feature = { emoji: string; title: string; body: string };

const intensiveOnline: Feature[] = [
  {
    emoji: '✍️',
    title: 'Section A Writing',
    body: 'CLB 9/10 model answers, detailed lectures on exam structure, connectors and argumentation breakdowns',
  },
  {
    emoji: '🎙️',
    title: 'Section A Speaking',
    body: 'Real exam prompts, stocks and samples, 30 Assignments (Sec A + B Style), lectures, frameworks and strategies to respond logically and confidently',
  },
  {
    emoji: '📖',
    title: 'Reading & Listening Roadmap',
    body: 'Month by month plan on what to study, how to build speed, accuracy and exam technique',
  },
];

const liveSchedule = [
  { day: 'Sunday', time: '12:30 PM to 1:30 PM EST' },
  { day: 'Tuesday', time: '8:30 PM to 9:30 PM EST' },
  { day: 'Thursday', time: '8:00 AM to 9:30 AM EST' },
  { day: 'Saturday', time: '10:30 AM to 12:00 PM EST' },
];

const liveFormats: Feature[] = [
  {
    emoji: '🎤',
    title: 'Section A Speaking Mock (x2)',
    body: 'Small groups of only 2 to 4 students for maximum speaking time',
  },
  {
    emoji: '👂',
    title: 'Listening or Reading Mock (x1)',
    body: 'Focused on improving exam strategy, technique and getting started',
  },
  {
    emoji: '🔍',
    title: 'Section B Shadow Session (x1)',
    body: 'Learn by observing and analyzing real B2-level performances. This is where most students improve clarity very quickly.',
  },
];

const flexIncluded: Feature[] = [
  {
    emoji: '🎙️',
    title: '20 One-on-One Speaking Sessions',
    body: 'Focusing on Sec A TEF with a TEF Certified Frenchify Instructor. Timings chosen from the booking link provided by your instructor.',
  },
  {
    emoji: '✍️',
    title: '5 Writing Corrections',
    body: 'For TEF Canada Section A',
  },
  {
    emoji: '💻',
    title: 'Complete B1 Online Curriculum',
    body: 'Advanced grammar and TEF preparation for Reading, Listening, Speaking and Writing, plus a month by month focus plan',
  },
  {
    emoji: '📝',
    title: '30 Speaking Assignments',
    body: 'Master exam-specific responses and gradually introduce Section B style thinking',
  },
  {
    emoji: '🗺️',
    title: 'Reading & Listening Preparation Roadmap',
    body: 'Correct resources and mock strategy to build speed, accuracy and technique',
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

export default function ProgramToggle() {
  const [program, setProgram] = useState<'intensive' | 'flex'>('intensive');

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8">
        <button
          type="button"
          onClick={() => setProgram('intensive')}
          aria-pressed={program === 'intensive'}
          className={`rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300 ${
            program === 'intensive'
              ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
              : 'border-gray-200 bg-white text-gray-900 hover:border-brand-blue/50 hover:-translate-y-0.5'
          }`}
        >
          <p className="font-display font-bold text-lg">B1 Intensive</p>
          <p className={`text-sm mt-1 ${program === 'intensive' ? 'text-blue-100' : 'text-gray-500'}`}>
            $899 CAD · Online + 4 Live Sessions/week
          </p>
        </button>
        <button
          type="button"
          onClick={() => setProgram('flex')}
          aria-pressed={program === 'flex'}
          className={`rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300 ${
            program === 'flex'
              ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
              : 'border-gray-200 bg-white text-gray-900 hover:border-brand-blue/50 hover:-translate-y-0.5'
          }`}
        >
          <p className="font-display font-bold text-lg">B1 Flex</p>
          <p className={`text-sm mt-1 ${program === 'flex' ? 'text-blue-100' : 'text-gray-500'}`}>
            $729 CAD · Flexible + 20 One-on-One Sessions
          </p>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {program === 'intensive' ? (
          <motion.div
            key="intensive"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="premium-card bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="p-6 md:p-10 text-center border-b border-gray-100 bg-gradient-to-br from-blue-50 to-yellow-50">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                B1 Intensive
              </h3>
              <p className="text-gray-600 mt-2">
                Complete Online Curriculum + 4 Weekly Live Sessions · TEF Canada
              </p>
              <p className="font-display text-4xl font-bold text-brand-blue mt-4">$899 CAD</p>
              <p className="text-sm text-gray-500 mt-1">
                3 months access · Complete sooner at your own pace
              </p>
            </div>

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
                  📅 Weekly Live Sessions · 4 per week · 1 to 1.5 hrs
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {liveSchedule.map((s) => (
                    <div key={s.day} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                      <p className="font-semibold text-gray-900 text-sm">{s.day}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.time}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-5">
                  {liveFormats.map((f) => (
                    <FeatureRow key={f.title} f={f} />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 md:px-10 pb-6 md:pb-10">
              <div className="flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
                <span className="text-xl shrink-0" aria-hidden>
                  👤
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  One-on-One Speaking Sessions available for an extra fee with any Frenchify
                  Instructor, 30 to 50 mins. Not compulsory but they help expedite learning or if
                  you prefer more personalized practice.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="flex"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="premium-card bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="p-6 md:p-10 text-center border-b border-gray-100 bg-gradient-to-br from-blue-50 to-yellow-50">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                B1 Flex
              </h3>
              <p className="text-gray-600 mt-2">
                Flexible Learning + Personalized Guidance · Targeting CLB 7+
              </p>
              <p className="font-display text-4xl font-bold text-brand-blue mt-4">$729 CAD</p>
              <p className="text-sm text-gray-500 mt-1">
                3 months access · Many complete in 2 to 3 months
              </p>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5">
                ✅ What&apos;s Included
              </p>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                {flexIncluded.map((f) => (
                  <FeatureRow key={f.title} f={f} />
                ))}
              </div>
              <div className="mt-8 flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
                <span className="text-xl shrink-0" aria-hidden>
                  ➕
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Additional speaking sessions or writing corrections can be booked anytime. Once
                  you clear B1, we move to Final TEF Preparation which takes approximately 2 to 3
                  months.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
