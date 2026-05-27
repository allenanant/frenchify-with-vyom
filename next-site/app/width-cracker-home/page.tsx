import Link from 'next/link';
import { Clock, Zap, GraduationCap, UserCheck, Calendar, Target, MessagesSquare, BookOpen } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import HeroSection from '@/components/sections/width-cracker-home/HeroSection';
import ReviewsEmbed from '@/components/sections/width-cracker-home/ReviewsEmbed';

export const metadata = {
  title: 'Frenchify - Master French Fluency',
  description:
    'Learn French & clear TEF/TCF Canada exam with a step-by-step real life language learning methodologies and roadmap.',
};

const successImages = [
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6894588a297c860ea7933340.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcd640fe2bec6b6d90.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fd29e384747704e2b1.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fd29e38456a804e2b2.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fd29e3840ce004e2af.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fca2e2e2e29e16466f.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcdcebe2ffbb6a5c55.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/694e627373a5e05f4028bf11.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcd640fec1b96b6d8e.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcb1bd69584f93d1ee.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcb1bd69032d93d1ed.png',
];

const features = [
  {
    Icon: Clock,
    tag: 'Easy for Anyone',
    title: 'Flexible Classes',
    copy:
      'Complete lectures & classes whenever you want, at your own pace, giving you a complete flexibility and personalization.',
  },
  {
    Icon: Zap,
    tag: 'So. Fast.',
    title: 'Intense & Structured approach',
    copy:
      'Syllabus covered at an intensive pace to save valuable time on Study/ Work Permit. A step-by-step order of all the topics to make the syllabus easy to consume.',
  },
  {
    Icon: GraduationCap,
    tag: 'Smart Solutions',
    title: 'Exam focused training',
    copy:
      'Complete focus on the concepts/topics which are essential for the exams, right from the beginning.',
  },
  {
    Icon: UserCheck,
    tag: 'Expert Guidance',
    title: 'Personalized Mentorship',
    copy:
      'Get guidance and support throughout your French learning journey with experienced instructors and regular doubt-clearing sessions.',
  },
];

const programs = [
  { code: 'A1', bg: 'bg-red-500', title: 'Frenchify A1 Intensive', sub: 'Step-By-Step for Beginners', href: '/a1-intensive-program' },
  { code: 'A2', bg: 'bg-purple-500', title: 'Frenchify A2 Intensive', sub: 'For Intermediate Level Students', href: '/a2-intensive-program' },
  { code: 'B1', bg: 'bg-green-500', title: 'Frenchify B1 TEF/TCF', sub: 'Fluency Level', href: '/b1-intensive-program' },
  { code: 'B2', bg: 'bg-brand-blue', title: 'Frenchify B2 TEF/TCF', sub: 'Exam Ready Level', href: '/b2-intensive-program' },
];

const bookingFeatures = [
  { Icon: Target, title: 'Personalized Assessment', copy: 'Get your current French level evaluated and receive a customized learning plan' },
  { Icon: MessagesSquare, title: 'Expert Guidance', copy: 'Speak directly with our experienced French instructors about your goals' },
  { Icon: BookOpen, title: 'Program Recommendations', copy: 'Discover which Frenchify program is perfect for your timeline and objectives' },
];

const faqs: FaqItem[] = [
  {
    q: 'Does Frenchify Program offer TEF/TCF or TEFAQ training?',
    a: 'Yes, Exam specific training is provided right from the start and the programs are designed in a way to fast-track the preparation.',
  },
  {
    q: 'How much time does it take to clear TEF with Frenchify?',
    a: 'If you study average 2-3 hours daily A1 & A2 can be completed within 3 months, B1 & B2 within 5-6 months. If you are studying French full-time the time frame reduces.',
  },
  {
    q: 'Does the Frenchify Program have doubt sessions?',
    a: 'Yes. Along with the online programs, we provide 4 live doubt sessions each week for better understanding and mentorship.',
  },
  {
    q: 'At what level does TEF/TCF-specific training start in Frenchify?',
    a: 'At B1 level, mock exam practices begin with sessions focusing on exam-specific preparation covering all 4 modules (Reading, Writing, Speaking, Listening).',
  },
];

export default function WidthCrackerHomePage() {
  const doubled = [...successImages, ...successImages];

  return (
    <>
      {/* BLUE NOTICE BAR (unchanged) */}
      <a
        href="/b1-self-study"
        className="fixed top-[117px] left-0 right-0 bg-brand-blue text-white text-center py-2 text-sm font-semibold z-40 hover:bg-brand-blue-deep transition-all duration-300"
      >
        IMPORTANT UPDATE: 🚨 B1 Self-Study Program is now AVAILABLE 🚨
      </a>

      <HeroSection />

      {/* Success Stories Marquee */}
      <section className="py-20 bg-gray-50 full-bleed-section-ghl relative overflow-hidden">
        <div className="ghl-row-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See the amazing results our students have achieved with Frenchify
              </p>
            </div>
          </Reveal>
          <div className="relative image-slider-container">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"
            />
            <div className="overflow-hidden image-slider">
              <div className="flex image-slide-track">
                {doubled.map((src, i) => (
                  <div key={i} className="flex-shrink-0 w-[350px] p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt="Student Result"
                      className="rounded-xl shadow-lg w-full h-auto transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Frenchify makes French learning{' '}
                <span className="gradient-text">simple and effective</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                All within a structured, step-by-step learning environment.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 gap-8">
            {features.map(({ Icon, tag, title, copy }) => (
              <Tilt key={title} max={5}>
                <div className="premium-card bg-gray-900 p-8 rounded-2xl shadow-xl h-full">
                  <div className="flex items-center mb-6">
                    <div className="bg-brand-amber/20 p-3 rounded-full mr-4">
                      <Icon className="text-brand-amber w-6 h-6" />
                    </div>
                    <span className="text-brand-amber font-semibold text-sm uppercase tracking-wider">
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{copy}</p>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Frenchify Programs
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover Our Step-By-Step French learning Programs for TEF/TCF Canada
              </p>
              <Magnetic>
                <Link href="/programs" className="btn-primary inline-block mt-8">
                  View All
                </Link>
              </Magnetic>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 gap-8">
            {programs.map((p) => (
              <Tilt key={p.code} max={5}>
                <div className="premium-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 h-full">
                  <div
                    className={`${p.bg} h-40 flex items-center justify-center text-white text-5xl font-bold font-display transition-transform duration-300`}
                  >
                    {p.code}
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{p.sub}</p>
                    <Link
                      href={p.href}
                      className="block w-full bg-brand-blue hover:bg-brand-blue-deep text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Book a Call */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Ready to Start Your French Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book a consultation call with our French learning experts. Get personalized guidance, learn about our programs, and discover how we can help you achieve your French language goals.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Magnetic>
                <Link href="/contact" className="btn-primary">
                  <Calendar className="w-5 h-5 mr-3" /> Book Consultation
                </Link>
              </Magnetic>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-8 mt-12">
            {bookingFeatures.map(({ Icon, title, copy }) => (
              <Tilt key={title} max={5}>
                <div className="premium-card bg-white p-6 rounded-xl shadow-md transition-all duration-300 h-full">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-brand-blue text-xl mb-4 mx-auto">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-gray-600">{copy}</p>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our French learning programs
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* Widget Section */}
      <section className="py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                What Our Students Say
              </h2>
              <p className="text-xl text-gray-600">Read testimonials from our successful students</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="w-full overflow-hidden rounded-xl shadow-lg">
              <ReviewsEmbed />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
