'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowRight, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';

export default function RoadmapLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/french-roadmap/login/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Sign-in failed.');
      window.location.assign(result.roadmapHref || '/free-french-roadmap/');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Sign-in failed.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block text-[13px] font-bold text-[#374151]">
        Email address
        <span className="relative mt-2 block">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a8492]" aria-hidden="true" />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-12 w-full rounded-xl border border-[#d9e0e8] bg-white pl-11 pr-4 text-[14px] font-normal text-[#111827] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100"
            placeholder="you@example.com"
          />
        </span>
      </label>

      <label className="block text-[13px] font-bold text-[#374151]">
        Roadmap password
        <span className="relative mt-2 block">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a8492]" aria-hidden="true" />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-h-12 w-full rounded-xl border border-[#d9e0e8] bg-white pl-11 pr-4 text-[14px] font-normal text-[#111827] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100"
            placeholder="Your password"
          />
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#f59e0b] px-6 text-[14px] font-bold text-[#111827] shadow-[0_16px_34px_-15px_rgba(245,158,11,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#fbbf24] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {submitting ? 'Opening your roadmap…' : 'Open My Free Roadmap'}
        {!submitting ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /> : null}
      </button>

      <p className="text-center text-[12px] leading-relaxed text-[#6b7280]">
        Don&apos;t have access yet?{' '}
        <Link href="/personalized-french-plan-pr/" className="font-bold text-[#2563eb] hover:underline">
          Take the free 2-minute questionnaire
        </Link>
      </p>
    </form>
  );
}
