import type { Metadata } from 'next';
import { ClipboardCheck } from 'lucide-react';
import FrenchPrQuiz from './FrenchPrQuiz';

export const metadata: Metadata = {
  title: 'Free French Study Plan for Canadian PR | Frenchify',
  description: 'Take Frenchify’s free quiz to get a personalized study plan for TEF or TCF Canada, based on your French level, goal and preferred way to study.',
  alternates: { canonical: 'https://www.frenchifywithvyom.com/free-french-pr-plan/' },
};

export default function FreeFrenchPrPlanPage() {
  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-[#fffbeb] px-5 pb-20 pt-12 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fbbf24] text-[#0A1426] shadow-[0_10px_24px_-8px_#f59e0b]">
            <ClipboardCheck className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">Free quiz · TEF &amp; TCF Canada</p>
          <h1 className="mt-2 font-display text-[33px] font-bold leading-[1.08] tracking-tight text-[#0A1426] sm:text-5xl">Get your free French study plan for Canadian PR</h1>
          <p className="mx-auto mt-4 max-w-[34rem] text-base leading-relaxed text-slate-600">Tell us your level, goal, and how you like to learn. Get a personalized recommendation for what to study first. No account or payment needed.</p>
        </header>
        <FrenchPrQuiz />
        <p className="mt-5 text-center text-sm text-slate-600">This plan is for French study and exam preparation. It is not immigration advice.</p>
      </div>
    </section>
  );
}
