import BodyClass from '@/components/BodyClass';
import NoticeBars from './_components/NoticeBarsSnapshot';
import HomeV2Hero from './_components/HomeV2Hero';
import HomeV2Ticker from './_components/HomeV2Ticker';
import HomeV2Stats from './_components/HomeV2Stats';
import HomeV2CurriculumJourney from './_components/HomeV2CurriculumJourney';
import HomeV2Comparison from './_components/HomeV2Comparison';
import HomeV2BentoFeatures from './_components/HomeV2BentoFeatures';
import HomeV2StudentShowcase from './_components/HomeV2StudentShowcase';
import HomeV2ReviewsWidget from './_components/HomeV2ReviewsWidget';
import HomeV2Faq from './_components/HomeV2Faq';
import HomeV2MegaCta from './_components/HomeV2MegaCta';

// Frozen snapshot of the homepage as it was before the Aug 2026 Vyom-doc revision.
// Not linked from anywhere; kept so nothing is lost.
export const metadata = {
  title: 'Home (backup — pre Aug 2026 revision)',
  robots: { index: false, follow: false },
};

export default function HomeBackupAug2026Page() {
  return (
    <>
      <BodyClass className="has-notice-bars is-home-v2" />
      <NoticeBars />
      <HomeV2Hero />
      <HomeV2Ticker />
      <HomeV2Stats />
      <HomeV2CurriculumJourney />
      <HomeV2Comparison />
      <HomeV2BentoFeatures />
      <HomeV2StudentShowcase />
      <HomeV2ReviewsWidget />
      <HomeV2Faq />
      <HomeV2MegaCta />
    </>
  );
}
