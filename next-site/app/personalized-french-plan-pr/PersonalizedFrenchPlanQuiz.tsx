'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  GraduationCap,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  FRENCH_PLAN_DISCLAIMER,
  FrenchPlanAnswers,
  FrenchPlanRecommendation,
  getRecommendedFrenchPlan,
} from '@/lib/french-plan';

type AnswerKey = Exclude<
  keyof FrenchPlanAnswers,
  'listeningScore' | 'speakingScore' | 'readingScore' | 'writingScore'
>;

type Question = {
  key: AnswerKey;
  title: string;
  helper: string;
  multiple?: boolean;
  options: { value: string; label: string }[];
};

const QUESTIONS: Question[] = [
  {
    key: 'currentLevel',
    title: 'What is your current French level?',
    helper: 'Choose the answer that feels most accurate today.',
    options: [
      { value: 'complete-beginner', label: 'Complete beginner — I know almost nothing' },
      { value: 'some-basics', label: 'I know some basics but cannot form sentences properly' },
      { value: 'completed-a1', label: 'I completed A1 or studied basic French before' },
      { value: 'completed-a2', label: 'I completed A2 or can speak/write simple French' },
      { value: 'b1-b2', label: 'I am around B1/B2 and preparing for TEF/TCF' },
      { value: 'attempted-exam', label: 'I already attempted TEF/TCF before' },
      { value: 'unsure', label: 'I am not sure about my level' },
    ],
  },
  {
    key: 'mainGoal',
    title: 'What is your main goal with French?',
    helper: 'Your goal helps us choose the right depth and exam focus.',
    options: [
      { value: 'clb-5', label: 'CLB 5 for work permit / immigration support' },
      { value: 'clb-7-plus', label: 'CLB 7+ for Canadian PR' },
      { value: 'clb-5-then-7', label: 'I want both CLB 5 first and CLB 7 later' },
      { value: 'general-french', label: 'I want to improve French generally' },
      { value: 'unsure', label: 'I am not sure yet' },
    ],
  },
  {
    key: 'workPermitExpiry',
    title: 'When does your work permit expire?',
    helper: 'We use this only to understand how urgent your study timeline is.',
    options: [
      { value: 'less-than-3-months', label: 'Less than 3 months' },
      { value: '3-to-6-months', label: '3–6 months' },
      { value: '6-to-12-months', label: '6–12 months' },
      { value: 'more-than-12-months', label: 'More than 12 months' },
      { value: 'not-applicable', label: 'I am outside Canada / not applicable' },
      { value: 'unsure', label: 'I am not sure' },
    ],
  },
  {
    key: 'dailyStudyTime',
    title: 'How many hours can you study French daily?',
    helper: 'Be realistic — a consistent plan is more useful than an ambitious one.',
    options: [
      { value: 'less-than-1-hour', label: 'Less than 1 hour' },
      { value: '1-to-2-hours', label: '1–2 hours' },
      { value: '2-to-3-hours', label: '2–3 hours' },
      { value: '3-plus-hours', label: '3+ hours' },
      { value: 'changing-schedule', label: 'My schedule changes every week' },
    ],
  },
  {
    key: 'examTarget',
    title: 'Which exam are you targeting?',
    helper: 'Your roadmap can support TEF Canada, TCF Canada, or help you decide.',
    options: [
      { value: 'tef-canada', label: 'TEF Canada' },
      { value: 'tcf-canada', label: 'TCF Canada' },
      { value: 'either', label: 'I am open to either' },
      { value: 'need-comparison', label: 'I do not know the difference yet' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'biggestStruggle',
    title: 'What do you struggle with the most?',
    helper: 'Select all that apply. We’ll use your choices to highlight the support your plan should prioritize.',
    multiple: true,
    options: [
      { value: 'speaking', label: 'Speaking' },
      { value: 'listening', label: 'Listening' },
      { value: 'writing', label: 'Writing' },
      { value: 'reading', label: 'Reading' },
      { value: 'grammar', label: 'Grammar' },
      { value: 'pronunciation', label: 'Pronunciation' },
    ],
  },
  {
    key: 'learningPreference',
    title: 'What type of learning support do you prefer?',
    helper: 'Pick the format you’re most likely to use consistently.',
    options: [
      { value: 'live-group-plus-course', label: 'Live group classes + online course' },
      { value: 'self-paced', label: 'Self-paced course only' },
      { value: 'one-to-one', label: 'One-on-one flexible sessions' },
      { value: 'mixed-live-one-to-one', label: 'A mix of live classes and one-on-one support' },
      { value: 'recommend', label: 'I am not sure, recommend what is best for me' },
    ],
  },
  {
    key: 'previousExamAttempt',
    title: 'Have you taken TEF/TCF before?',
    helper: 'Previous exam experience can change the best starting point.',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes-tef', label: 'Yes, TEF Canada' },
      { value: 'yes-tcf', label: 'Yes, TCF Canada' },
      { value: 'booked-not-taken', label: 'I booked the exam but have not taken it yet' },
    ],
  },
];

const EMPTY_ANSWERS: FrenchPlanAnswers = {
  currentLevel: '',
  mainGoal: '',
  workPermitExpiry: '',
  dailyStudyTime: '',
  examTarget: '',
  biggestStruggle: [],
  learningPreference: '',
  previousExamAttempt: '',
  listeningScore: '',
  speakingScore: '',
  readingScore: '',
  writingScore: '',
};

type ContactDetails = {
  fullName: string;
  email: string;
  phone: string;
  countryTimezone: string;
};

const EMPTY_CONTACT: ContactDetails = {
  fullName: '',
  email: '',
  phone: '',
  countryTimezone: '',
};

type View = 'quiz' | 'contact' | 'result';

export default function PersonalizedFrenchPlanQuiz() {
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [view, setView] = useState<View>('quiz');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<FrenchPlanAnswers>(EMPTY_ANSWERS);
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [recommendation, setRecommendation] = useState<FrenchPlanRecommendation | null>(null);

  const question = QUESTIONS[stepIndex];
  const selectedAnswer = answers[question.key];
  const hasSelectedAnswer = Array.isArray(selectedAnswer)
    ? selectedAnswer.length > 0
    : Boolean(selectedAnswer);
  const showScores =
    question.key === 'previousExamAttempt' &&
    ['yes-tef', 'yes-tcf'].includes(answers.previousExamAttempt);

  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / QUESTIONS.length) * 100),
    [stepIndex],
  );

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [stepIndex, view]);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const next = () => {
    if (!hasSelectedAnswer) return;
    if (stepIndex === QUESTIONS.length - 1) {
      setView('contact');
    } else {
      setStepIndex((current) => current + 1);
    }
    goToTop();
  };

  const back = () => {
    if (view === 'contact') {
      setView('quiz');
      setStepIndex(QUESTIONS.length - 1);
    } else if (stepIndex > 0) {
      setStepIndex((current) => current - 1);
    }
    goToTop();
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const plan = getRecommendedFrenchPlan(answers);
    const lead = {
      ...contact,
      ...answers,
      recommendedProgram: plan.recommendedProgram,
      createdAt: new Date().toISOString(),
    };

    try {
      window.sessionStorage.setItem('frenchifyPersonalizedPlanLead', JSON.stringify(lead));
    } catch {
      // The recommendation still works when storage is blocked or unavailable.
    }

    setRecommendation(plan);
    setView('result');
    goToTop();
  };

  const restart = () => {
    setAnswers(EMPTY_ANSWERS);
    setContact(EMPTY_CONTACT);
    setRecommendation(null);
    setStepIndex(0);
    setView('quiz');
    goToTop();
  };

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#f5f7fb]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-[#2563eb]/10 blur-[130px]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#f59e0b]/10 blur-[130px]" />
        <div className="absolute inset-0 hero-pattern opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-[940px] px-4 py-10 sm:px-6 md:py-16">
        {view !== 'result' && (
          <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5f6b7a] transition-colors hover:text-[#2563eb]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Frenchify
            </Link>
            <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#0A1426] text-[#f59e0b] shadow-[0_14px_30px_-12px_rgba(10,20,38,0.5)]">
              <Compass className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="font-display text-[31px] font-bold leading-[1.08] tracking-[-0.035em] text-[#111827] sm:text-[40px] md:text-[48px]">
              Create My Personalized French Plan for PR
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.65] text-[#5f6b7a] md:text-[17px]">
              Answer a few quick questions and we&apos;ll recommend the best Frenchify roadmap for your TEF/TCF Canada goal.
            </p>
          </header>
        )}

        <AnimatePresence mode="wait" initial={false}>
          {view === 'quiz' && (
            <motion.section
              key={`question-${stepIndex}`}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_28px_70px_-38px_rgba(15,23,42,0.36)]"
              aria-labelledby="quiz-question"
            >
              <div className="border-b border-[#e8edf3] px-5 py-5 sm:px-8">
                <div className="flex items-center justify-between gap-4 text-[12px] font-bold">
                  <span className="text-[#2563eb]">Step {stepIndex + 1} of {QUESTIONS.length}</span>
                  <span className="text-[#7a8492]">{progress}% complete</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e9eef5]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#f59e0b]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
                  />
                </div>
              </div>

              <div className="p-5 sm:p-8 md:p-10">
                <fieldset>
                  <legend className="w-full">
                    <h2
                      ref={headingRef}
                      id="quiz-question"
                      tabIndex={-1}
                      className="font-display text-[25px] font-bold leading-tight tracking-[-0.025em] text-[#111827] outline-none sm:text-[31px]"
                    >
                      {question.title}
                    </h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#6b7280]">{question.helper}</p>
                  </legend>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const selected = question.multiple
                        ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option.value)
                        : selectedAnswer === option.value;
                      return (
                        <label
                          key={option.value}
                          className={`relative flex min-h-[68px] cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 focus-within:ring-4 focus-within:ring-blue-100 sm:px-5 ${
                            selected
                              ? 'border-[#2563eb] bg-blue-50/70 shadow-[0_10px_26px_-18px_rgba(37,99,235,0.7)]'
                              : 'border-[#dfe5ec] bg-white hover:border-blue-300 hover:bg-[#fbfdff]'
                          }`}
                        >
                          <input
                            type={question.multiple ? 'checkbox' : 'radio'}
                            name={question.multiple ? `${question.key}[]` : question.key}
                            value={option.value}
                            checked={selected}
                            onChange={() => {
                              if (question.key === 'biggestStruggle') {
                                setAnswers((current) => ({
                                  ...current,
                                  biggestStruggle: current.biggestStruggle.includes(option.value)
                                    ? current.biggestStruggle.filter((value) => value !== option.value)
                                    : [...current.biggestStruggle, option.value],
                                }));
                                return;
                              }

                              setAnswers((current) => ({
                                ...current,
                                [question.key]: option.value,
                              }));
                            }}
                            className="sr-only"
                          />
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center border transition-colors ${question.multiple ? 'rounded-lg' : 'rounded-full'} ${
                              selected
                                ? 'border-[#2563eb] bg-[#2563eb] text-white'
                                : 'border-[#cfd7e2] bg-white text-transparent'
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                          </span>
                          <span className="text-[13.5px] font-semibold leading-[1.4] text-[#243043] sm:text-[14px]">
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {showScores && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-5"
                    >
                      <h3 className="font-display text-[16px] font-bold text-[#111827]">
                        Optional: add your previous scores or CLB levels
                      </h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#6b7280]">
                        Leave any field blank if you do not have the score nearby.
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {([
                          ['listeningScore', 'Listening score / CLB'],
                          ['speakingScore', 'Speaking score / CLB'],
                          ['readingScore', 'Reading score / CLB'],
                          ['writingScore', 'Writing score / CLB'],
                        ] as const).map(([key, label]) => (
                          <label key={key} className="text-[12px] font-semibold text-[#374151]">
                            {label}
                            <input
                              type="text"
                              value={answers[key]}
                              onChange={(event) =>
                                setAnswers((current) => ({ ...current, [key]: event.target.value }))
                              }
                              placeholder="e.g. CLB 6"
                              className="mt-1.5 min-h-11 w-full rounded-xl border border-[#d9e0e8] bg-white px-3.5 text-[14px] font-normal text-[#111827] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100"
                            />
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </fieldset>

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#edf0f4] pt-6">
                  {stepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#dbe2ea] bg-white px-5 text-[14px] font-bold text-[#374151] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={next}
                    disabled={!hasSelectedAnswer}
                    className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0A1426] px-5 text-[14px] font-bold text-white shadow-[0_12px_28px_-14px_rgba(10,20,38,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#14294c] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:px-6"
                  >
                    {stepIndex === QUESTIONS.length - 1 ? 'See My French Plan' : 'Next'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {view === 'contact' && (
            <motion.section
              key="contact"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_28px_70px_-38px_rgba(15,23,42,0.36)]"
              aria-labelledby="contact-heading"
            >
              <div className="border-b border-[#e8edf3] bg-[#0A1426] px-5 py-6 text-white sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#f59e0b]">
                    <UserRound className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f59e0b]">
                      Almost there
                    </span>
                    <p className="mt-0.5 text-[13px] text-white/70">Your 8 answers are complete.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={submitContact} className="p-5 sm:p-8 md:p-10">
                <h2
                  ref={headingRef}
                  id="contact-heading"
                  tabIndex={-1}
                  className="font-display text-[27px] font-bold tracking-[-0.025em] text-[#111827] outline-none sm:text-[34px]"
                >
                  Where should we attach your plan?
                </h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#6b7280]">
                  Add your details to unlock your recommended program, roadmap, and next step.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {([
                    ['fullName', 'Full Name', 'text', 'Your full name', 'name'],
                    ['email', 'Email', 'email', 'you@example.com', 'email'],
                    ['phone', 'WhatsApp / Phone Number', 'tel', '+1 555 000 0000', 'tel'],
                    ['countryTimezone', 'Country / Time Zone', 'text', 'Canada / Eastern Time', 'country'],
                  ] as const).map(([key, label, type, placeholder, autoComplete]) => (
                    <label key={key} className="text-[13px] font-bold text-[#374151]">
                      {label}
                      <input
                        type={type}
                        required
                        autoComplete={autoComplete}
                        value={contact[key]}
                        onChange={(event) =>
                          setContact((current) => ({ ...current, [key]: event.target.value }))
                        }
                        placeholder={placeholder}
                        className="mt-2 min-h-12 w-full rounded-xl border border-[#d9e0e8] bg-white px-4 text-[14px] font-normal text-[#111827] outline-none transition placeholder:text-[#9aa4b2] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-7 flex items-start gap-2.5 rounded-2xl bg-[#f5f7fb] p-4 text-[12px] leading-relaxed text-[#667085]">
                  <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" aria-hidden="true" />
                  Your answers are used to prepare this recommendation and are kept in this browser session for easy reference.
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#edf0f4] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#dbe2ea] bg-white px-5 text-[14px] font-bold text-[#374151] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f59e0b] px-6 text-[14px] font-bold text-[#111827] shadow-[0_16px_34px_-15px_rgba(245,158,11,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#fbbf24]"
                  >
                    Show My Recommended Plan
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </motion.section>
          )}

          {view === 'result' && recommendation && (
            <motion.section
              key="result"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              aria-labelledby="result-heading"
            >
              <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0A1426] via-[#10284d] to-[#0A1426] px-5 py-9 text-white shadow-[0_34px_80px_-38px_rgba(10,20,38,0.7)] sm:px-9 md:px-12 md:py-12">
                <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2563eb]/35 blur-[90px]" />
                <div aria-hidden className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#f59e0b]/20 blur-[90px]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#fbbf24]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Personalized for {contact.fullName.split(' ')[0] || 'you'}
                  </span>
                  <h1
                    ref={headingRef}
                    id="result-heading"
                    tabIndex={-1}
                    className="mt-5 max-w-3xl font-display text-[34px] font-bold leading-[1.03] tracking-[-0.04em] outline-none sm:text-[46px] md:text-[58px]"
                  >
                    Your Personalized French Plan for PR
                  </h1>
                  <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-white/72 md:text-[17px]">
                    Based on your level, goal, timeline, and preferred support, this is the clearest next step in your Frenchify journey.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <article className="rounded-[26px] border border-[#e1e7ee] bg-white p-6 shadow-[0_20px_55px_-36px_rgba(15,23,42,0.4)] sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2563eb]">
                        Recommended program
                      </span>
                      <h2 className="mt-2 font-display text-[29px] font-bold tracking-[-0.03em] text-[#111827] sm:text-[36px]">
                        {recommendation.recommendedProgram}
                      </h2>
                      <p className="mt-1 text-[13px] font-semibold text-[#f59e0b]">
                        {recommendation.recommendedProgramType}
                      </p>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mt-7 border-t border-[#edf0f4] pt-6">
                    <h3 className="font-display text-[17px] font-bold text-[#111827]">Why this plan fits you</h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-[#5f6b7a] sm:text-[15px]">
                      {recommendation.reason}
                    </p>
                  </div>
                </article>

                <aside className="rounded-[26px] border border-amber-200 bg-amber-50/70 p-6 sm:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f59e0b] text-[#111827]">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-[19px] font-bold text-[#111827]">Estimated timeline</h2>
                  <p className="mt-3 text-[15px] font-semibold leading-[1.6] text-[#4b5563]">
                    {recommendation.estimatedTimeline}
                  </p>
                  <p className="mt-4 text-[12px] leading-relaxed text-[#7c6a43]">
                    This is a planning estimate, not a guaranteed exam or immigration outcome.
                  </p>
                </aside>
              </div>

              <article className="mt-5 rounded-[26px] border border-[#e1e7ee] bg-white p-6 shadow-[0_20px_55px_-36px_rgba(15,23,42,0.4)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#2563eb]">
                    <Target className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7a8492]">Your route</span>
                    <h2 className="font-display text-[20px] font-bold text-[#111827]">Suggested roadmap</h2>
                  </div>
                </div>

                <ol className="mt-7 grid gap-3 md:flex md:items-stretch">
                  {recommendation.roadmapSteps.map((step, index) => (
                    <li key={step} className="flex items-stretch gap-3 md:min-w-0 md:flex-1">
                      <div className="flex min-h-[82px] min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[#e1e7ee] bg-[#f8fafc] p-4">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0A1426] text-[12px] font-extrabold text-white">
                          {index + 1}
                        </span>
                        <span className="text-[13px] font-bold leading-snug text-[#263244]">{step}</span>
                      </div>
                      {index < recommendation.roadmapSteps.length - 1 && (
                        <ChevronRight className="hidden h-5 w-5 shrink-0 self-center text-[#9aa4b2] md:block" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ol>
              </article>

              <div className="mt-5 rounded-[26px] bg-white p-6 text-center shadow-[0_20px_55px_-36px_rgba(15,23,42,0.4)] sm:p-8">
                <GraduationCap className="mx-auto h-7 w-7 text-[#2563eb]" aria-hidden="true" />
                <h2 className="mt-3 font-display text-[24px] font-bold tracking-[-0.02em] text-[#111827]">Take your next step</h2>
                <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-[#6b7280]">
                  Start with the recommended path, or compare every Frenchify program before deciding.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href={recommendation.primaryHref}
                    className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3.5 text-[14px] font-bold text-[#111827] shadow-[0_16px_34px_-15px_rgba(245,158,11,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#fbbf24]"
                  >
                    {recommendation.primaryCTA}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={recommendation.secondaryHref}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#dbe2ea] bg-white px-6 py-3.5 text-[14px] font-bold text-[#374151] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
                  >
                    {recommendation.secondaryCTA}
                  </Link>
                </div>
              </div>

              <div className="mt-5 flex flex-col items-center gap-4 text-center">
                <p className="max-w-2xl text-[11px] leading-relaxed text-[#7a8492]">
                  {recommendation.disclaimer || FRENCH_PLAN_DISCLAIMER}
                </p>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-2 text-[12px] font-bold text-[#5f6b7a] transition-colors hover:text-[#2563eb]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Start again
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {view !== 'result' && (
          <p className="mx-auto mt-7 max-w-2xl text-center text-[11px] leading-relaxed text-[#7a8492]">
            {FRENCH_PLAN_DISCLAIMER}
          </p>
        )}
      </div>
    </main>
  );
}
