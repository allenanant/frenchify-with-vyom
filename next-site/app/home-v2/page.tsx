import BodyClass from '@/components/BodyClass';
import NoticeBars from '@/components/NoticeBars';
import HomeV2Hero from './_components/HomeV2Hero';
import HomeV2Ticker from './_components/HomeV2Ticker';
import HomeV2Stats from './_components/HomeV2Stats';
import HomeV2TrustLogos from './_components/HomeV2TrustLogos';
import HomeV2CurriculumJourney from './_components/HomeV2CurriculumJourney';
import HomeV2Comparison from './_components/HomeV2Comparison';
import HomeV2BentoFeatures from './_components/HomeV2BentoFeatures';
import HomeV2ImageGallery from './_components/HomeV2ImageGallery';
import HomeV2StudentShowcase from './_components/HomeV2StudentShowcase';
import HomeV2TestimonialQuotes from './_components/HomeV2TestimonialQuotes';
import HomeV2WhereStudentsGo from './_components/HomeV2WhereStudentsGo';
import HomeV2ReviewsWidget from './_components/HomeV2ReviewsWidget';
import HomeV2Faq from './_components/HomeV2Faq';
import HomeV2MegaCta from './_components/HomeV2MegaCta';

export const metadata = {
  title: 'Home V2 — Becoming Fluent with Frenchify',
  description:
    'Learn French & clear TEF/TCF Canada exam with step-by-step methodologies. Become fluent in under 12 months with Frenchify with Vyom.',
};

export default function HomeV2Page() {
  return (
    <>
      <BodyClass className="has-notice-bars is-home-v2" />
      <NoticeBars />
      <HomeV2Hero />
      <HomeV2Ticker />
      <HomeV2Stats />
      <HomeV2TrustLogos />
      <HomeV2CurriculumJourney />
      <HomeV2Comparison />
      <HomeV2BentoFeatures />
      <HomeV2ImageGallery />
      <HomeV2StudentShowcase />
      <HomeV2TestimonialQuotes />
      <HomeV2WhereStudentsGo />
      <HomeV2ReviewsWidget />
      <HomeV2Faq />
      <HomeV2MegaCta />
    </>
  );
}
