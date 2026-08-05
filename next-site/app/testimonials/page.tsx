import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { Youtube } from 'lucide-react';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import ReviewsEmbed from '@/components/sections/testimonials/ReviewsEmbed';

export const metadata = {
  title: 'Testimonials - Frenchify',
  description:
    'Real stories and results from learners who transformed their French skills with Frenchify.',
};

// The student success stories now come from Vyom's YouTube playlist instead of
// seven self-hosted clips (his call, Aug 2026). Playlist: 34 videos.
const PLAYLIST_ID = 'PLIX434KgUuaHsNre2lGTCXOTsROKjy6Z3';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
const PLAYLIST_COUNT = 34;

export default function TestimonialsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white full-bleed-section-ghl relative overflow-hidden aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="mx-auto w-full lg:max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              What Our Students Are <span className="gradient-text">Saying</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories and results from learners who transformed their French skills with Frenchify.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Review Widget Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="mx-auto w-full lg:max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Our Reviews on Trustpilot
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="premium-card bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
              style={{ maxWidth: 1080, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <ReviewsEmbed />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-center text-[15px] md:text-base text-gray-600 mt-8">
              Find more reviews and testimonies on our{' '}
              <a
                href="https://ca.trustpilot.com/review/frenchifywithvyom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-blue underline-offset-4 hover:underline"
              >
                Trustpilot profile
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
        <div className="mx-auto w-full lg:max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-4 tracking-tight">
              Hear Directly From Our Students
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
              {PLAYLIST_COUNT} success stories from students who cleared CLB 5 and CLB 7. Play them
              straight through, right here.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="premium-card max-w-4xl mx-auto aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}`}
                title="CLB 5 and CLB 7 Student Success Stories"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-center mt-8">
              <Magnetic>
                <a
                  href={PLAYLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Youtube className="w-5 h-5" />
                  Watch all {PLAYLIST_COUNT} on YouTube
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gray-800 text-white full-bleed-section-ghl">
        <div className="mx-auto w-full lg:max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold mb-4 tracking-tight">
              Ready to Start Your Own Success Story?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-gray-300 mb-8">
              Join hundreds of successful students and achieve your French language goals. Explore our programs today.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic>
              <Link href="/courses" className="btn-primary">
                Explore Our Courses
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
