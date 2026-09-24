import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, BookOpenCheck, ShieldCheck } from 'lucide-react';
import { currentRoadmapAccount } from '@/lib/roadmap/auth';
import RoadmapLoginForm from './RoadmapLoginForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign In to Your Free French Roadmap',
  description: 'Securely open the free Frenchify TEF/TCF Canada roadmap saved to your account.',
};

export default async function RoadmapLoginPage() {
  if (await currentRoadmapAccount()) redirect('/free-french-roadmap/');

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#f5f7fb] px-4 py-12 sm:px-6 md:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#2563eb]/10 blur-[130px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#f59e0b]/10 blur-[130px]" />
        <div className="absolute inset-0 hero-pattern opacity-35" />
      </div>
      <div className="relative mx-auto max-w-[520px]">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5f6b7a] hover:text-[#2563eb]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Frenchify
        </Link>
        <section className="overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_28px_70px_-38px_rgba(15,23,42,0.36)]">
          <div className="bg-gradient-to-br from-[#0A1426] to-[#10284d] px-6 py-8 text-white sm:px-9">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[#f59e0b]">
              <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="mt-5 font-display text-[31px] font-bold leading-tight tracking-[-0.03em] sm:text-[38px]">
              Your free French roadmap
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-white/72">
              Sign in with the email and password you created after the questionnaire.
            </p>
          </div>
          <div className="p-6 sm:p-9">
            <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-[12px] leading-relaxed text-emerald-800">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Your roadmap is available online from any device after you sign in.
            </div>
            <RoadmapLoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
