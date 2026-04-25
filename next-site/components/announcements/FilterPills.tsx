'use client';

import { cn } from '@/lib/cn';
import type { AnnouncementType } from '@/lib/announcements-types';
import { TYPE_LABELS } from '@/lib/announcements-types';

export type FilterValue = 'all' | AnnouncementType;

interface Props {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

const ORDER: FilterValue[] = ['all', 'webinar', 'discount', 'result', 'news'];

const LABELS: Record<FilterValue, string> = {
  all: 'All',
  webinar: TYPE_LABELS.webinar,
  discount: TYPE_LABELS.discount,
  result: TYPE_LABELS.result,
  news: TYPE_LABELS.news,
};

export default function FilterPills({ value, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {ORDER.map((v) => {
        const isActive = v === value;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
              isActive
                ? 'bg-brand-blue text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-700 hover:bg-blue-50 ring-1 ring-gray-200'
            )}
            aria-pressed={isActive}
          >
            {LABELS[v]}
            <span
              className={cn(
                'inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-xs font-bold',
                isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              )}
            >
              {counts[v]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
