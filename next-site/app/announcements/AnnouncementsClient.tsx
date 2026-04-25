'use client';

import { useMemo, useState } from 'react';
import type { Announcement } from '@/lib/announcements-types';
import AnnouncementCard from '@/components/announcements/AnnouncementCard';
import FilterPills, { type FilterValue } from '@/components/announcements/FilterPills';

interface Props {
  items: Announcement[];
}

export default function AnnouncementsClient({ items }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = {
      all: items.length,
      webinar: 0,
      discount: 0,
      result: 0,
      news: 0,
    };
    for (const a of items) c[a.type]++;
    return c;
  }, [items]);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((a) => a.type === filter)),
    [items, filter]
  );

  return (
    <>
      <div className="mb-10">
        <FilterPills value={filter} onChange={setFilter} counts={counts} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <AnnouncementCard key={a.slug} announcement={a} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No {filter === 'all' ? 'announcements' : filter + 's'} right now — check back soon.</p>
        </div>
      )}
    </>
  );
}
