import { Check } from 'lucide-react';
import MentorBookingCard from '@/components/booking/MentorBookingCard';
import type { Mentor, Session } from '../_data';

const GHL_ORIGIN = 'https://api.leadconnectorhq.com';

const sessionUrl = (s: Session) =>
  s.bookingUrl ?? `${GHL_ORIGIN}/widget/booking/${s.calendarId}`;

// Both calendars are embedded in the card (side by side on desktop, behind a
// dropdown on mobile) instead of opening the GHL booking page in a new tab.
export default function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <MentorBookingCard
      id={mentor.slug}
      name={mentor.name}
      photo={mentor.photo}
      tagline={<p className="text-sm font-medium text-brand-blue mt-0.5">{mentor.specialty}</p>}
      sessions={mentor.sessions.map((s) => ({
        src: sessionUrl(s),
        label: s.label,
        duration: s.duration,
        price: s.price,
        note: s.note,
      }))}
    >
      {(mentor.clb || mentor.clearedNote) && (
        <div className="flex flex-wrap gap-2">
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
      )}

      <p className="text-gray-600 text-sm leading-relaxed mt-3 first:mt-0">{mentor.blurb}</p>
    </MentorBookingCard>
  );
}
