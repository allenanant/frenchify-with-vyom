import type { Metadata } from 'next';
import HeroSection from '@/components/sections/b2-intensive-program/HeroSection';
import GoalsSection from '@/components/sections/b2-intensive-program/GoalsSection';
import ComponentsSection from '@/components/sections/b2-intensive-program/ComponentsSection';
import HighlightsSection from '@/components/sections/b2-intensive-program/HighlightsSection';
import AccessCtaSection from '@/components/sections/b2-intensive-program/AccessCtaSection';
import FaqSection from '@/components/sections/b2-intensive-program/FaqSection';
import ReviewsEmbed from '@/components/sections/b2-intensive-program/ReviewsEmbed';

export const metadata: Metadata = {
  title: 'Frenchify B2 Intensive Program',
  description:
    'Sharpen your advanced French skills with targeted, exam-focused preparation for TEF/TCF Canada. Intensive mock tests, personalized mentorship, and 3 months of full access.',
};

export default function B2IntensivePage() {
  return (
    <>
      <HeroSection />
      <GoalsSection />
      <ComponentsSection />
      <HighlightsSection />
      <AccessCtaSection />
      <FaqSection />
      <ReviewsEmbed />
    </>
  );
}
