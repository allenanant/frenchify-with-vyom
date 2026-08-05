import { ArrowUpRight, Check, Clock } from 'lucide-react';
import type { Mentor } from '../_data';

const GHL_ORIGIN = 'https://api.leadconnectorhq.com';

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div id={mentor.slug} className="premium-card scroll-mt-28 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mentor.photo}
          alt={mentor.name}
          loading="lazy"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shrink-0 bg-gray-50"
        />

        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-gray-900 tracking-tight">
            {mentor.name}
          </h3>
          <p className="text-sm font-medium text-brand-blue mt-0.5">{mentor.specialty}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {mentor.clb && (
              <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-semibold">
                {mentor.clb}
              </span>
            )}
            {mentor.clearedNote && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                <Check className="w-3 h-3" />
                {mentor.clearedNote}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mt-4">{mentor.blurb}</p>
        </div>
      </div>

      {/* Each session opens its own GHL booking page in a new tab, so the
          booking flow keeps the full window and this page stays put. */}
      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {mentor.sessions.map((s) => (
          <a
            key={s.bookingUrl ?? s.calendarId}
            href={s.bookingUrl ?? `${GHL_ORIGIN}/widget/booking/${s.calendarId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue hover:shadow-glow-blue"
          >
            <span className="min-w-0">
              <span className="block font-semibold text-sm text-gray-900 truncate transition-colors group-hover:text-white">
                {s.label}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 transition-colors group-hover:text-blue-100">
                <Clock className="w-3 h-3 shrink-0" />
                {s.duration} min
                {s.price && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="font-semibold">{s.price}</span>
                  </>
                )}
              </span>
            </span>
            <span className="flex items-center gap-1 shrink-0 text-xs font-semibold text-brand-blue transition-colors group-hover:text-white">
              Book
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">
                {mentor.name} - {s.label} (opens in a new tab)
              </span>
            </span>
          </a>
        ))}
      </div>

      {mentor.sessions.some((s) => s.note) && (
        <ul className="mt-3 space-y-1">
          {mentor.sessions
            .filter((s) => s.note)
            .map((s) => (
              <li key={s.bookingUrl ?? s.calendarId} className="text-xs text-gray-500">
                {s.label}: {s.note}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
