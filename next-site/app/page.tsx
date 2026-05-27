import BodyClass from '@/components/BodyClass';
import NoticeBars from '@/components/NoticeBars';
import HeroSection from '@/components/sections/home/HeroSection';
import SuccessStoriesMarquee from '@/components/sections/home/SuccessStoriesMarquee';
import FeaturesGrid from '@/components/sections/home/FeaturesGrid';
import StudentStoriesStack from '@/components/sections/home/StudentStoriesStack';
import ProgramsStaircase from '@/components/sections/home/ProgramsStaircase';
import BookACallSection from '@/components/sections/home/BookACallSection';
import FaqSection from '@/components/sections/home/FaqSection';
import ReviewsWidget from '@/components/sections/home/ReviewsWidget';
import FloatingLeadButton from '@/components/FloatingLeadButton';

export default function HomePage() {
  return (
    <>
      <BodyClass className="has-notice-bars is-home" />
      <NoticeBars />
      <HeroSection />
      <SuccessStoriesMarquee />
      <ProgramsStaircase />
      <FeaturesGrid />
      <StudentStoriesStack />
      <BookACallSection />
      <FaqSection />
      <ReviewsWidget />
      <FloatingLeadButton />
    </>
  );
}
