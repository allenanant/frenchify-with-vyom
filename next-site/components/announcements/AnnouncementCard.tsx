import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Announcement } from '@/lib/announcements';
import { DEFAULT_BUTTON_TEXT } from '@/lib/announcements';
import TypeBadge from './TypeBadge';
import ImageCarousel from './ImageCarousel';

interface Props {
  announcement: Announcement;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AnnouncementCard({ announcement: a }: Props) {
  const buttonLabel = a.buttonText || DEFAULT_BUTTON_TEXT[a.type];

  return (
    <article className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      {a.images.length > 0 && (
        <ImageCarousel images={a.images} alt={a.title} aspect="aspect-[16/10]" />
      )}

      <div className="flex flex-col flex-grow p-6 gap-4">
        <div className="flex items-center justify-between">
          <TypeBadge type={a.type} />
          <span className="text-xs text-gray-400">{formatDate(a.createdAt)}</span>
        </div>

        <h3 className="text-lg font-bold text-brand-ink leading-snug line-clamp-2">{a.title}</h3>

        {a.type === 'webinar' && (
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold text-brand-blue">{formatDate(a.webinarDate)}</span>
              {a.webinarTime && <span className="ml-2">· {a.webinarTime}</span>}
            </p>
            {a.description && <p className="line-clamp-3">{a.description}</p>}
          </div>
        )}

        {a.type === 'discount' && (
          <div className="text-sm text-gray-600 space-y-1.5">
            <p className="text-2xl font-bold text-amber-600">{a.discountAmount}</p>
            {a.couponCode && (
              <p>
                Code:{' '}
                <span className="font-mono font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                  {a.couponCode}
                </span>
              </p>
            )}
            {a.expiryDate && (
              <p className="text-xs text-gray-500">Valid till {formatDate(a.expiryDate)}</p>
            )}
            {a.description && <p className="line-clamp-2">{a.description}</p>}
          </div>
        )}

        {a.type === 'result' && (
          <div className="text-sm text-gray-600 space-y-1.5">
            <p className="font-semibold text-brand-ink">{a.studentName}</p>
            <p className="text-green-700 font-medium">{a.achievement}</p>
            {a.quote && (
              <blockquote className="text-gray-500 italic line-clamp-3">&ldquo;{a.quote}&rdquo;</blockquote>
            )}
          </div>
        )}

        {a.type === 'news' && (
          <div className="text-sm text-gray-600 line-clamp-3 prose prose-sm max-w-none">
            <ReactMarkdown>{a.body}</ReactMarkdown>
          </div>
        )}

        {a.link && (
          <div className="mt-auto pt-2">
            <Link
              href={a.link}
              className="inline-flex items-center justify-center w-full bg-brand-blue text-white px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-blue-deep transition-all"
            >
              {buttonLabel}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
