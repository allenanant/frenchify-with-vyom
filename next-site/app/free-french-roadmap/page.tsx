import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, BookOpenCheck, LockKeyhole, Sparkles } from 'lucide-react';
import { currentRoadmapAccount } from '@/lib/roadmap/auth';
import { ROADMAP_DOCUMENT_ID } from '@/lib/roadmap/constants';
import { syncPendingRoadmapAccount } from '@/lib/roadmap/crm';
import SignOutButton from './SignOutButton';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export const metadata: Metadata = {
  title: 'My Free French Roadmap',
  description: 'Your private Frenchify TEF/TCF Canada learning roadmap.',
  robots: { index: false, follow: false },
};

export default async function FreeFrenchRoadmapPage() {
  const account = await currentRoadmapAccount();
  if (!account) redirect('/free-french-roadmap/login/');

  // If the original GHL call was unavailable, this visit is a durable retry.
  await syncPendingRoadmapAccount(account.id);

  const firstName = account.full_name.split(/\s+/)[0] || 'there';
  const documentUrl = `https://docs.google.com/document/d/${ROADMAP_DOCUMENT_ID}/preview`;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#eef2f7]">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0A1426] via-[#10284d] to-[#0A1426] px-4 py-7 text-white sm:px-6 md:py-9">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2563eb]/30 blur-[90px]" />
        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/65 transition hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Frenchify home
            </Link>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#f59e0b]">
                <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#fbbf24]">Unlocked for {firstName}</p>
                <h1 className="font-display text-[25px] font-bold tracking-[-0.025em] sm:text-[32px]">Your Free French Roadmap</h1>
              </div>
            </div>
          </div>
          <SignOutButton />
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-3 py-5 sm:px-6 md:py-8">
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-[12px] leading-relaxed text-blue-900">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" aria-hidden="true" />
            Your latest questionnaire result recommends <strong>{account.recommended_program}</strong> as your next step.
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-[#dfe5ec] bg-white px-4 py-3 text-[12px] leading-relaxed text-[#5f6b7a]">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" aria-hidden="true" />
            This roadmap is provided for online viewing through your password-protected Frenchify account.
          </div>
        </div>

        <section className="overflow-hidden rounded-[24px] border border-[#d9e0e8] bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]">
          <iframe
            src={documentUrl}
            title="Frenchify free French roadmap"
            className="h-[76vh] min-h-[620px] w-full bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </section>

        <p className="mx-auto mt-4 max-w-3xl text-center text-[11px] leading-relaxed text-[#7a8492]">
          The roadmap is educational guidance for French learning and TEF/TCF preparation. It is not legal immigration advice.
        </p>
      </div>
    </main>
  );
}
