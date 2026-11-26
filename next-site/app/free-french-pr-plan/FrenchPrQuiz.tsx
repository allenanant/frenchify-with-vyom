'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeCheck, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getPlan, questions, quizSteps, type QuestionKey } from '@/lib/french-pr-quiz';

type Plan = ReturnType<typeof getPlan>;
const action = 'group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#fbbf24] px-6 py-3 text-center font-extrabold text-[#0A1426] shadow-sm transition-colors hover:bg-[#f59e0b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600';
const field = 'mt-2 min-h-[48px] w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base text-[#0A1426] outline-blue-700';

export default function FrenchPrQuiz() {
  const [answers, setAnswers] = useState<Partial<Record<QuestionKey, string>>>({});
  const [position, setPosition] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', website: '' });
  const submission = useRef<string | null>(null);
  const inFlight = useRef(false);
  const lastPosition = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const steps = quizSteps(answers.goal);
  const current = steps[position];
  const question = current && questions[current];

  useEffect(() => {
    if (plan || lastPosition.current !== position) heading.current?.focus({ preventScroll: false });
    lastPosition.current = position;
  }, [position, plan]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true);
    setError('');
    try {
      submission.current ??= globalThis.crypto.randomUUID();
      const response = await fetch('/api/french-pr-quiz/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, answers, submissionId: submission.current }),
        signal: AbortSignal.timeout(50_000),
      });
      const result = await response.json();
      if (!response.ok || !result.plan) throw new Error(result.error || 'We couldn’t save your plan. Please try again.');
      setPlan(result.plan);
    } catch (err) {
      setError(err instanceof Error && err.name !== 'TimeoutError' && err.name !== 'TypeError'
        ? err.message : 'We couldn’t reach Frenchify just now. Your answers are still here. Please try again.');
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  function choose(key: QuestionKey, value: string) {
    setAnswers((previous) => ({ ...previous, [key]: value,
      ...(key === 'goal' && value !== 'permit' && value !== 'both' ? { permit: undefined } : {}),
    }));
  }

  return (
    <div className="overflow-hidden rounded-[26px] border border-blue-100 bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.25)]">
      {plan ? (
        <section className="p-6 sm:p-10" aria-labelledby="quiz-result">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700"><BadgeCheck className="h-5 w-5" aria-hidden="true" /> Plan ready</p>
          <h2 id="quiz-result" ref={heading} tabIndex={-1} className="mt-3 font-display text-[30px] font-bold leading-tight text-[#0A1426] outline-none sm:text-4xl">Here’s what to study first</h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">{plan.first}</p>
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="mb-3 font-bold text-[#0A1426]">Your recommended path</h3>
            <ol className="flex flex-wrap items-center gap-2">
              {plan.path.map((step, i) => <li key={step} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-blue-900"><span className="text-blue-700">{i + 1}.</span> {step}</li>)}
            </ol>
          </div>
          <dl className="mt-6 space-y-4 text-slate-700">
            <div><dt className="font-bold text-[#0A1426]">How to study</dt><dd className="mt-1 leading-relaxed">{plan.format}</dd></div>
            <div><dt className="font-bold text-[#0A1426]">Exam preparation</dt><dd className="mt-1 leading-relaxed">{plan.examAdvice}</dd></div>
            {plan.timing && <div><dt className="font-bold text-[#0A1426]">Your timeline</dt><dd className="mt-1 leading-relaxed">{plan.timing}</dd></div>}
          </dl>
          <Link href="/courses/" className={`${action} mt-7 w-full sm:w-auto`}>Explore Frenchify programs <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </section>
      ) : (
        <>
          <header className="border-b border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-10">
            <div className="flex justify-between text-sm font-bold text-blue-800">
              <span>{question ? `Question ${position + 1}${position > 0 ? ` of ${steps.length}` : ''}` : 'Last step'}</span>
              <span>{question ? 'Free French plan quiz' : 'Your contact details'}</span>
            </div>
            <progress aria-label="Quiz progress" value={position + 1} max={steps.length + 1} className="mt-3 h-2 w-full overflow-hidden rounded-full accent-blue-700" />
          </header>
          <div className="p-6 sm:p-10">
            {question ? (
              <form onSubmit={(event) => { event.preventDefault(); if (answers[current]) setPosition(position + 1); }}>
                <h2 id="quiz-question" ref={heading} tabIndex={-1} className="font-display text-[28px] font-bold leading-tight text-[#0A1426] outline-none sm:text-[34px]">{question.title}</h2>
                <p id="quiz-question-help" className="mt-2 text-slate-600">{question.hint}</p>
                <fieldset className="mt-5 grid gap-2.5" aria-labelledby="quiz-question" aria-describedby="quiz-question-help">
                  {Object.entries(question.options).map(([value, label]) => (
                    <label key={`${current}-${value}`} className="flex min-h-[54px] cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 font-semibold leading-snug text-slate-800 hover:border-blue-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                      <input type="radio" name={`quiz-${current}`} value={value} checked={answers[current] === value} onChange={() => choose(current, value)} className="h-4 w-4 shrink-0 accent-blue-700" />
                      {label}
                    </label>
                  ))}
                </fieldset>
                <div className="mt-6 flex items-center justify-between gap-4">
                  {position > 0 ? <button type="button" onClick={() => setPosition(position - 1)} className="inline-flex min-h-12 items-center gap-2 font-bold text-slate-700 hover:text-blue-800"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back</button> : <span />}
                  <button type="submit" disabled={!answers[current]} className={action}>Next <ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
                </div>
              </form>
            ) : (
              <form onSubmit={submit}>
                <h2 ref={heading} tabIndex={-1} className="font-display text-[28px] font-bold leading-tight text-[#0A1426] outline-none sm:text-[34px]">See your free study plan</h2>
                <p className="mt-2 text-slate-600">Add your name and email to view your recommended study path. Phone is optional.</p>
                <div className="mt-6 grid gap-4">
                  <label className="block text-sm font-bold text-[#0A1426]">Full name<input name="name" autoComplete="name" required maxLength={100} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className={field} /></label>
                  <label className="block text-sm font-bold text-[#0A1426]">Email<input name="email" type="email" autoComplete="email" required maxLength={180} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={field} /></label>
                  <label className="block text-sm font-bold text-[#0A1426]">Phone (optional)<input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+1 514 555 0123" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={field} /></label>
                </div>
                <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} /></label></div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Frenchify will save your answers and details to help with your request and follow up about your plan. <Link href="/privacy-policy/" className="font-semibold text-blue-800 underline">Privacy policy</Link>.</p>
                {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <button type="button" disabled={submitting} onClick={() => { setError(''); setPosition(position - 1); }} className="inline-flex min-h-12 items-center gap-2 font-bold text-slate-700 hover:text-blue-800"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back</button>
                  <button type="submit" disabled={submitting} className={`${action} flex-1 sm:flex-none`}>{submitting ? 'Saving your plan…' : 'Show My Free Study Plan'} <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}
