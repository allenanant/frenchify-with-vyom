import type { Metadata } from 'next';
import {
  getFeaturedAnnouncement,
  getNonFeaturedAnnouncements,
  getAllAnnouncements,
} from '@/lib/announcements';
import FeaturedCard from '@/components/announcements/FeaturedCard';
import AnnouncementsClient from './AnnouncementsClient';

export const metadata: Metadata = {
  title: 'Announcements & Updates · Frenchify with Vyom',
  description:
    'Latest webinars, discounts, student results, and news from Frenchify with Vyom.',
};

export default function AnnouncementsPage() {
  const featured = getFeaturedAnnouncement();
  const all = getAllAnnouncements();
  const rest = getNonFeaturedAnnouncements();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-blue-50/40 via-white to-white">
      <div className="max-w-[1170px] mx-auto px-6">
        <header className="text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-blue font-bold mb-3">
            Stay In The Loop
          </span>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-ink leading-tight">
            Announcements & Updates
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Upcoming webinars, current offers, recent student wins, and what&apos;s new at Frenchify.
          </p>
        </header>

        {featured && (
          <section className="mb-16" aria-label="Featured announcement">
            <FeaturedCard announcement={featured} />
          </section>
        )}

        {all.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No announcements yet — check back soon.</p>
          </div>
        ) : (
          <section aria-label="All announcements">
            <AnnouncementsClient items={rest.length > 0 ? rest : all} />
          </section>
        )}
      </div>
    </div>
  );
}
