import type { Metadata } from 'next';
import HeroSection from '@/components/sections/b1-selfstudy-program/HeroSection';
import GoalsSection from '@/components/sections/b1-selfstudy-program/GoalsSection';
import ComponentsSection from '@/components/sections/b1-selfstudy-program/ComponentsSection';
import AccessCtaSection from '@/components/sections/b1-selfstudy-program/AccessCtaSection';
import FaqSection from '@/components/sections/b1-selfstudy-program/FaqSection';
import ReviewsEmbed from '@/components/sections/b1-selfstudy-program/ReviewsEmbed';

export const metadata: Metadata = {
  title: 'Frenchify B1 Self-Study (TEF) Program',
  description:
    'Self-paced B1 preparation for TEF Canada with a full B1/B2 online curriculum, 3 one-on-one speaking sessions, 5 personalized writing feedbacks, and 4 months of access for $599 CAD.',
};

export default function B1SelfStudyPage() {
  return (
    <>
      <HeroSection />
      <GoalsSection />
      <ComponentsSection />
      <AccessCtaSection />
      <FaqSection />
      <ReviewsEmbed />
    </>
  );
}
