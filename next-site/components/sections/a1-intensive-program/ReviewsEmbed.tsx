'use client';

import ReviewsIframe from '@/components/ReviewsIframe';

export default function ReviewsEmbed() {
  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_-20px_rgba(30,58,138,0.18)] border border-gray-100 bg-white">
      <ReviewsIframe />
    </div>
  );
}
