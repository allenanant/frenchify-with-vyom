import Image from 'next/image';
import Link from 'next/link';
import { Rocket, GraduationCap, Briefcase, Lightbulb, BookOpen, Target, Medal } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Magnetic from '@/components/motion/Magnetic';
import HeroSection from '@/components/sections/about-us/HeroSection';

function MapleLeaf({ className = '' }: { className?: string }) {
  return <i aria-hidden="true" className={`fab fa-canadian-maple-leaf ${className}`} />;
}

export const metadata = {
  title: 'About Us - Frenchify with Vyom',
  description:
    'Meet Vyom Sharma — my goal is simple: to help you navigate the path to Canadian PR through French, just like I did.',
};

type TimelineItem = {
  date: string;
  copy: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const timeline: TimelineItem[] = [
  {
    date: '28th Dec, 2018',
    copy: 'Arrived in Canada as an International student after 12th Grade.',
    Icon: GraduationCap,
    color: 'bg-blue-600',
  },
  {
    date: '1st Nov, 2020',
    copy: 'Got my Work Permit and a Full-Time field job.',
    Icon: Briefcase,
    color: 'bg-blue-600',
  },
  {
    date: '9th April, 2021',
    copy: 'On my birthday, a friend shared how French could help my PR application.',
    Icon: Lightbulb,
    color: 'bg-orange-500',
  },
  {
    date: 'Aug, 2021',
    copy: 'Self-learned for 4 months for A1 & A2 but stopped due to a lack of proper guidance.',
    Icon: BookOpen,
    color: 'bg-yellow-500',
  },
  {
    date: 'Feb, 2022',
    copy: 'Resumed my self-learning journey with proper goal setting and renewed focus.',
    Icon: Target,
    color: 'bg-green-500',
  },
  {
    date: '13th Sept, 2022',
    copy: 'Passed my TEF exam with B2 and C1 levels.',
    Icon: Medal,
    color: 'bg-yellow-400',
  },
  {
    date: '9th Nov, 2022',
    copy: 'Got my PR invitation with 62 extra points for French!',
    Icon: MapleLeaf,
    color: 'bg-red-600',
  },
];

const gallery = [
  {
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808e5af92612101acc2eb1b.jpeg',
    alt: 'Frenchify students',
  },
  {
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808e5afbcc5c4159279e282.jpeg',
    alt: 'Frenchify event',
  },
  {
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808e6658ee8cd77a2cba4b7.jpeg',
    alt: 'Frenchify community',
  },
];

export default function AboutUsPage() {
  return (
    <main>
      <HeroSection />

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-blue-600 text-white full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <Rocket className="w-10 h-10 mx-auto mb-4 text-blue-200" />
            <h2 className="font-display text-3xl font-bold mb-4 tracking-tight">
              Our Mission: Making French Accessible for Every Immigrant
            </h2>
            <p className="text-lg text-blue-100">
              To empower aspiring immigrants in Canada by guiding them through the journey of learning French with clarity, confidence, and community. Drawing from his own experience, Vyom is committed to helping others unlock new opportunities—like boosting CRS scores and achieving permanent residency—through easy &amp; effective French education.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-16 tracking-tight">
              My French Learning Journey
            </h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-1/2 -ml-0.5 w-1 bg-blue-100 h-full hidden md:block" aria-hidden="true" />
            <div className="absolute left-6 top-0 w-0.5 bg-blue-100 h-full md:hidden" aria-hidden="true" />

            <Stagger className="space-y-6 md:space-y-12">
              {timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={`${item.date}-${idx}`} className="relative">
                    {/* Mobile layout */}
                    <div className="flex md:hidden items-start">
                      <div
                        className={`flex-shrink-0 w-6 h-6 ${item.color} rounded-full flex items-center justify-center text-white text-xs relative z-10 mt-1`}
                      >
                        <item.Icon className="w-3 h-3" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="p-4 bg-white rounded-lg shadow-lg">
                          <p className="font-bold text-gray-800 text-sm mb-1">{item.date}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.copy}</p>
                        </div>
                      </div>
                    </div>
                    {/* Desktop layout */}
                    <div
                      className={`hidden md:flex items-center ${
                        isLeft ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {isLeft ? (
                        <div className="w-1/2 pr-8 text-right">
                          <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="font-bold text-gray-800">{item.date}</p>
                            <p className="text-gray-600">{item.copy}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-1/2 pl-8">
                          <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="font-bold text-gray-800">{item.date}</p>
                            <p className="text-gray-600">{item.copy}</p>
                          </div>
                        </div>
                      )}
                      <div
                        className={`absolute left-1/2 -ml-4 h-8 w-8 rounded-full ${item.color} flex items-center justify-center text-white`}
                      >
                        <item.Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 tracking-tight">
              Watch The Full Story
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/4nMBI53-7Uw"
                title="Vyom's French Learning Journey - Frenchify"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Moments From The Journey
            </h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <Image
                key={g.src}
                src={g.src}
                alt={g.alt}
                width={400}
                height={400}
                unoptimized
                className="rounded-xl shadow-lg w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gray-800 text-white full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold mb-4 tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let&apos;s work together to achieve your language goals and unlock your path to Canadian PR.
            </p>
            <Magnetic>
              <Link
                href="/programs"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Explore Courses
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
