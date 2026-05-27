import { Check, Users, Laptop, Play, BookOpen, GraduationCap, Calendar, Star } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import HeroSection from '@/components/sections/a1-intensive-program/HeroSection';
import FaqSection from '@/components/sections/a1-intensive-program/FaqSection';
import ReviewsEmbed from '@/components/sections/a1-intensive-program/ReviewsEmbed';

export const metadata = {
  title: 'Frenchify A1 Intensive Program',
  description:
    'Start Your French Journey — From Zero to Confident Beginner. A structured, strategic A1 program designed to help you learn efficiently.',
};

const goals = [
  {
    title: 'Master the Fundamentals',
    copy: 'Understand core French grammar rules and pronunciation without confusion.',
  },
  {
    title: 'Build Practical Vocabulary',
    copy: 'Learn the most common words and phrases used in daily conversations.',
  },
  {
    title: 'Start Communicating',
    copy: 'Form simple sentences, ask questions, and talk about yourself and your routine.',
  },
  {
    title: 'Develop Listening Skills',
    copy: 'Begin to understand real, spoken French in common situations.',
  },
];

const roadmap = [
  {
    Icon: Play,
    title: 'Unit 0: Your Starting Plan',
    copy: 'A guided plan on how to begin learning French effectively and make the most of the course.',
  },
  {
    Icon: BookOpen,
    title: 'Units 1-5: Core A1 Syllabus',
    copy: 'Dive into the essentials, covering all necessary grammar, vocabulary, and conversational topics for the A1 level.',
  },
  {
    Icon: GraduationCap,
    title: 'Unit 6: Revision & Assessment',
    copy: 'Consolidate your knowledge with revision practice and a full A1-level test to evaluate your competency.',
  },
];

export default function A1IntensiveProgramPage() {
  return (
    <main>
      <HeroSection />

      {/* Goals Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              What You Will <span className="gradient-text">Achieve</span>
            </h2>
          </Reveal>
          <Stagger className="space-y-6">
            {goals.map((g) => (
              <div key={g.title} className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                  <Check className="text-brand-blue w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{g.title}</h3>
                  <p className="text-gray-600">{g.copy}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Program Components Section */}
      <section className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Two Powerful <span className="gradient-text">Learning Components</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Get the best of both worlds: flexible self-study and expert-led live interaction.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid lg:grid-cols-2 gap-8 items-stretch">
            <Tilt max={5}>
              <div className="premium-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-brand-blue mb-4">
                    <Users className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-800 mb-4 tracking-tight">
                  Live Interactive Sessions
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Reinforce your learning, ask questions, and practice with instructors and peers in four dedicated sessions each week.
                </p>
                <div>
                  <p className="font-semibold text-gray-700">Doubt Sessions (3x weekly)</p>
                  <p className="text-gray-600 mb-3">Monday 8 PM EST, Thursday 7 PM EST, Sunday 10 AM EST</p>
                  <p className="font-semibold text-gray-700">Activity Session (1x weekly)</p>
                  <p className="text-gray-600">Sat 8 AM EST</p>
                </div>
              </div>
            </Tilt>
            <Tilt max={5}>
              <div className="premium-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-brand-blue mb-4">
                    <Laptop className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-800 mb-4 tracking-tight">
                  Complete Online Program
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Access a comprehensive, step-by-step curriculum anytime. Perfect for absolute beginners, covering all A1 skills from zero.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    100% beginner-friendly lessons
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    All skills covered: Reading, Writing, Listening &amp; Speaking
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Built-in worksheets, quizzes, and a final A1 test
                  </li>
                </ul>
              </div>
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Your Step-by-Step <span className="gradient-text">Learning Roadmap</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We&apos;ve laid out every step, so you never feel lost, stuck, or confused.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200" aria-hidden="true" />
            <Stagger className="space-y-12">
              {roadmap.map(({ Icon, title, copy }) => (
                <div key={title} className="relative pl-12">
                  <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue shadow-lg shadow-brand-blue/30">
                    <Icon className="text-white w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-gray-900 tracking-tight">{title}</h4>
                  <p className="text-gray-600">{copy}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Access Duration & Final CTA */}
      <section className="py-10 md:py-12 bg-gray-800 text-white full-bleed-section-ghl" id="signup">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="bg-gray-900/50 p-6 rounded-2xl mb-6 border border-gray-700">
              <div className="flex justify-center items-center gap-4 mb-3">
                <Calendar className="w-8 h-8 text-brand-amber" />
                <h3 className="font-display text-2xl font-bold tracking-tight">4-Month Full Access</h3>
              </div>
              <p className="text-gray-300">
                You get 4 full months of access to the online course and all live sessions. While the average student completes the A1 program in about 5 weeks, the extended access gives you total flexibility to learn at your own pace without pressure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Ready to Start Your French Story?
            </h2>
            <p className="text-lg text-gray-300 mb-5">
              Build your confidence and lay the perfect foundation for your fluency journey.
            </p>
            <Magnetic>
              <a
                href="https://link.fastpaydirect.com/payment-link/67e8ba24717876a0a6a43b45"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Sign Up Now
              </a>
            </Magnetic>
            <p className="text-sm text-gray-400 mt-4">Taught in English. Some content may not be translated.</p>
          </Reveal>
        </div>
      </section>

      <FaqSection />

      {/* Testimonial Widget */}
      <section className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              What Our Students Say
            </h2>
          </Reveal>
          <ReviewsEmbed />
        </div>
      </section>
    </main>
  );
}
