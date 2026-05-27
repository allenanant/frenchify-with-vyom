import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Announcement } from '@/lib/announcements-types';
import { DEFAULT_BUTTON_TEXT } from '@/lib/announcements-types';
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

export default function FeaturedCard({ announcement: a }: Props) {
  const buttonLabel = a.buttonText || DEFAULT_BUTTON_TEXT[a.type];

  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-premium border border-gray-100">
      <div className="grid lg:grid-cols-2 gap-0">
        {a.images.length > 0 ? (
          <ImageCarousel
            images={a.images}
            alt={a.title}
            aspect="aspect-[16/10] lg:aspect-auto lg:h-full"
            className="lg:rounded-r-none"
          />
        ) : (
          <div className="hidden lg:block bg-brand-gradient-soft" aria-hidden />
        )}

        <div className="flex flex-col gap-5 p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <TypeBadge type={a.type} />
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
              Featured
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-ink leading-tight">
            {a.title}
          </h2>

          {a.type === 'webinar' && (
            <div className="text-base text-gray-700 space-y-2">
              <p>
                <span className="font-bold text-brand-blue text-lg">{formatDate(a.webinarDate)}</span>
                {a.webinarTime && <span className="ml-3 text-gray-600">· {a.webinarTime}</span>}
              </p>
              {a.description && <p>{a.description}</p>}
            </div>
          )}

          {a.type === 'discount' && (
            <div className="text-base text-gray-700 space-y-2">
              <p className="text-4xl font-bold text-amber-600">{a.discountAmount}</p>
              {a.couponCode && (
                <p>
                  Use code:{' '}
                  <span className="font-mono font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-lg">
                    {a.couponCode}
                  </span>
                </p>
              )}
              {a.expiryDate && (
                <p className="text-sm text-gray-500">Valid till {formatDate(a.expiryDate)}</p>
              )}
              {a.description && <p>{a.description}</p>}
            </div>
          )}

          {a.type === 'result' && (
            <div className="text-base text-gray-700 space-y-2">
              <p className="text-xl font-semibold text-brand-ink">{a.studentName}</p>
              <p className="text-green-700 font-medium text-lg">{a.achievement}</p>
              {a.quote && (
                <blockquote className="text-gray-600 italic border-l-4 border-green-400 pl-4">
                  &ldquo;{a.quote}&rdquo;
                </blockquote>
              )}
            </div>
          )}

          {a.type === 'news' && (
            <div className="prose prose-base max-w-none text-gray-700">
              <ReactMarkdown>{a.body}</ReactMarkdown>
            </div>
          )}

          {a.link && (
            <div className="pt-2">
              <Link
                href={a.link}
                className="inline-flex items-center bg-brand-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-brand-blue-deep hover:-translate-y-0.5 hover:shadow-glow-blue transition-all duration-300"
              >
                {buttonLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
