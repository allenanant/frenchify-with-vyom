'use client';

import ReviewsIframe from '@/components/ReviewsIframe';

export default function ReviewsEmbed() {
  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_-20px_rgba(30,58,138,0.18)] border border-gray-100 bg-white">
      <ReviewsIframe src="https://reputationhub.site/reputation/widgets/review_widget/cmjlzerv4DUDyZFj6PYO?widgetId=68173d384ec35400c369663a" />
    </div>
  );
}
