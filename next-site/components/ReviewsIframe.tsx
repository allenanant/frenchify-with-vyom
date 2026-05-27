'use client';

import Script from 'next/script';

interface ReviewsIframeProps {
  src?: string;
  height?: number;
  className?: string;
}

export default function ReviewsIframe({
  src = 'https://reputationhub.site/reputation/widgets/review_widget/cmjlzerv4DUDyZFj6PYO',
  height = 600,
  className = '',
}: ReviewsIframeProps) {
  return (
    <>
      <Script
        src="https://reputationhub.site/reputation/assets/review-widget.js"
        strategy="lazyOnload"
      />
      <iframe
        className={`lc_reviews_widget ${className}`}
        src={src}
        frameBorder={0}
        scrolling="no"
        style={{ width: '100%', minWidth: '100%', height, border: 'none' }}
      />
    </>
  );
}
