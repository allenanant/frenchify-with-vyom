import type { Metadata } from 'next';
import './programs-v2.css';
import HeroSection from '@/components/sections/programs/HeroSection';
import IntensiveVideoSection from '@/components/sections/programs/IntensiveVideoSection';
import SelfStudyVideoSection from '@/components/sections/programs/SelfStudyVideoSection';
import IntensiveCoursesSection from '@/components/sections/programs-v2/IntensiveCoursesSection';
import SelfStudyCoursesSection from '@/components/sections/programs-v2/SelfStudyCoursesSection';
import WhyFeaturesSection from '@/components/sections/programs/WhyFeaturesSection';
import ContactCtaSection from '@/components/sections/programs/ContactCtaSection';

export const metadata: Metadata = {
  title: 'Frenchify Courses - Master French Fluency',
  description:
    'Explore Frenchify TEF/TCF/TEFAQ French programs — intensive courses with live sessions (A1, A2, B1, B2) and self-paced self-study options (A1, A2) for learners of every level.',
};

export default function ProgramsV2Page() {
  return (
    <>
      <HeroSection />
      <IntensiveVideoSection />
      <IntensiveCoursesSection />
      <SelfStudyVideoSection />
      <SelfStudyCoursesSection />
      <WhyFeaturesSection />
      <ContactCtaSection />
    </>
  );
}
