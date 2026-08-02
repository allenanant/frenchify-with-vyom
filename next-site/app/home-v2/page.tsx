import BodyClass from '@/components/BodyClass';
import NoticeBars from '@/components/NoticeBars';
import HomeV2Hero from './_components/HomeV2Hero';
import HomeV2Stats from './_components/HomeV2Stats';
import HomeV2CurriculumJourney from './_components/HomeV2CurriculumJourney';
import HomeV2StudentShowcase from './_components/HomeV2StudentShowcase';
import HomeV2TestimonialQuotes from './_components/HomeV2TestimonialQuotes';
import HomeV2Faq from './_components/HomeV2Faq';
import HomeV2MegaCta from './_components/HomeV2MegaCta';

export const metadata = {
  title: 'Home',
  description:
    'Learn French & clear TEF/TCF Canada exam with step-by-step methodologies. Become fluent in under 12 months with Frenchify with Vyom.',
};

export default function HomeV2Page() {
  return (
    <>
      <BodyClass className="has-notice-bars is-home-v2" />
      <NoticeBars />
      <HomeV2Hero />
      <HomeV2Stats />
      <HomeV2CurriculumJourney />
      <HomeV2StudentShowcase />
      <HomeV2TestimonialQuotes />
      <HomeV2Faq />
      <HomeV2MegaCta />
    </>
  );
}
