'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Megaphone, Trophy, CalendarClock, Star, ListChecks, LogOut, CheckCircle2, AlertTriangle } from 'lucide-react';
import { adminSignOut } from '@/lib/content-admin/actions';
import type { AdminAnnouncement, AdminWallEntry } from '@/lib/content-admin/content';
import ResultsTab from './ResultsTab';
import AnnouncementsTab from './AnnouncementsTab';
import WebinarTab, { type WebinarAdminState } from './WebinarTab';
import InstructorReviewsTab from './InstructorReviewsTab';
import WebinarQuizTab from './WebinarQuizTab';

export type Banner = { kind: 'ok' | 'error'; text: string } | null;

type TabId = 'announcements' | 'results' | 'webinar' | 'reviews' | 'quiz';

type Props = {
  userName: string;
  isAdmin: boolean;
  announcements: AdminAnnouncement[];
  wall: AdminWallEntry[];
  webinar: WebinarAdminState;
  loadError: string | null;
};

export default function AdminShell({ userName, isAdmin, announcements, wall, webinar, loadError }: Props) {
  const [tab, setTab] = useState<TabId>('announcements');
  const [banner, setBanner] = useState<Banner>(null);
  const router = useRouter();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('tab');
    if (q === 'results' || q === 'webinar' || q === 'announcements') {
      setTab(q);
    } else if ((q === 'reviews' || q === 'quiz') && isAdmin) {
      setTab(q);
    }
  }, [isAdmin]);

  const done = (text: string) => {
    setBanner({ kind: 'ok', text });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // GitHub needs a beat before reads reflect a fresh commit; refresh twice
    // so the list is right even if the first one races it.
    router.refresh();
    setTimeout(() => router.refresh(), 2500);
  };
  const fail = (text: string) => {
    setBanner({ kind: 'error', text });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabBtn = (active: boolean) =>
    `flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 py-3 text-sm font-semibold transition sm:px-4 sm:py-3.5 sm:text-[15px] ${
      active ? 'bg-brand-blue text-white shadow-premium' : 'bg-white text-gray-700 hover:bg-blue-50'
    }`;

  return (
    <main className="min-h-screen bg-gray-50 px-4 pt-24 pb-20 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-ink">Website Admin</h1>
            <p className="text-sm text-gray-600">Signed in as {userName}</p>
          </div>
          <form action={adminSignOut}>
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>

        {banner && (
          <div
            role="status"
            className={`mb-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium ${
              banner.kind === 'ok' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {banner.kind === 'ok' ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>{banner.text}</span>
          </div>
        )}

        {loadError && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{loadError}</span>
          </div>
        )}

        <div
          className={`mb-8 gap-2 rounded-2xl border border-gray-200 bg-gray-100 p-1.5 ${
            isAdmin ? 'grid grid-cols-2 sm:flex sm:flex-wrap' : 'flex flex-wrap'
          }`}
        >
          <button className={tabBtn(tab === 'announcements')} onClick={() => setTab('announcements')}>
            <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" /> Announcements
          </button>
          <button className={tabBtn(tab === 'results')} onClick={() => setTab('results')}>
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5" /> Results
          </button>
          <button className={tabBtn(tab === 'webinar')} onClick={() => setTab('webinar')}>
            <CalendarClock className="h-4 w-4 sm:h-5 sm:w-5" /> Webinar
          </button>
          {isAdmin && (
            <button className={tabBtn(tab === 'reviews')} onClick={() => setTab('reviews')}>
              <Star className="h-4 w-4 sm:h-5 sm:w-5" /> Reviews
            </button>
          )}
          {isAdmin && (
            <button className={tabBtn(tab === 'quiz')} onClick={() => setTab('quiz')}>
              <ListChecks className="h-4 w-4 sm:h-5 sm:w-5" /> Quiz
            </button>
          )}
        </div>

        {tab === 'announcements' && (
          <AnnouncementsTab announcements={announcements} onDone={done} onError={fail} />
        )}
        {tab === 'results' && <ResultsTab wall={wall} onDone={done} onError={fail} />}
        {tab === 'webinar' && <WebinarTab initial={webinar} onDone={done} onError={fail} />}
        {tab === 'reviews' && isAdmin && <InstructorReviewsTab onDone={done} onError={fail} />}
        {tab === 'quiz' && isAdmin && <WebinarQuizTab onError={fail} />}
      </div>
    </main>
  );
}
