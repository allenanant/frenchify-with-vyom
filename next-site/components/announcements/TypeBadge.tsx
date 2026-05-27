import { cn } from '@/lib/cn';
import type { AnnouncementType } from '@/lib/announcements-types';
import { TYPE_LABELS } from '@/lib/announcements-types';

const COLOR_BY_TYPE: Record<AnnouncementType, string> = {
  webinar: 'bg-blue-100 text-brand-blue ring-blue-200',
  discount: 'bg-amber-100 text-amber-700 ring-amber-200',
  result: 'bg-green-100 text-green-700 ring-green-200',
  news: 'bg-gray-100 text-gray-700 ring-gray-200',
};

interface Props {
  type: AnnouncementType;
  className?: string;
}

export default function TypeBadge({ type, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset',
        COLOR_BY_TYPE[type],
        className
      )}
    >
      {TYPE_LABELS[type]}
    </span>
  );
}
