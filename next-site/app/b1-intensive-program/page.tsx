import type { Metadata } from 'next';
import HeroSection from '@/components/sections/b1-intensive-program/HeroSection';
import GoalsSection from '@/components/sections/b1-intensive-program/GoalsSection';
import ComponentsSection from '@/components/sections/b1-intensive-program/ComponentsSection';
import KeyFeaturesSection from '@/components/sections/b1-intensive-program/KeyFeaturesSection';
import AccessCtaSection from '@/components/sections/b1-intensive-program/AccessCtaSection';
import FaqSection from '@/components/sections/b1-intensive-program/FaqSection';
import ReviewsEmbed from '@/components/sections/b1-intensive-program/ReviewsEmbed';

export const metadata: Metadata = {
  title: 'Frenchify B1 Intensive Program',
  description:
    'Build a strong foundation in advanced French and begin focused TEF/TCF Canada preparation with weekly live sessions, a full B1/B2 online curriculum, and personalized feedback.',
};

export default function B1IntensivePage() {
  return (
    <>
      <HeroSection />
      <GoalsSection />
      <ComponentsSection />
      <KeyFeaturesSection />
      <AccessCtaSection />
      <FaqSection />
      <ReviewsEmbed />
    </>
  );
}
