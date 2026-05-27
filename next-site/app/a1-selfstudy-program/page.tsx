import { Check, Laptop, Layers, Play, BookOpen, GraduationCap, Calendar, Star } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import FaqSection from '@/components/sections/a1-selfstudy-program/FaqSection';
import ReviewsEmbed from '@/components/sections/a1-selfstudy-program/ReviewsEmbed';

export const metadata = {
  title: 'Frenchify A1 Self-Study Program',
  description:
    'Start Your French Journey — From Zero, At Your Own Pace. A structured, strategic A1 Self-Study program designed to help you learn independently and confidently.',
};

const goals = [
  { title: 'Understand French Rules', copy: 'Help you understand French language rules without confusion.' },
  { title: 'Learn Common Vocabulary', copy: 'Learn the most common vocabulary and phrases used daily.' },
  { title: 'Form Simple Sentences', copy: 'Start forming simple sentences and short paragraphs.' },
  { title: 'Start Listening', copy: 'Begin listening to real conversations and understanding context.' },
  { title: 'Talk About Yourself', copy: 'Talk about yourself, your routine, and daily topics in French.' },
];

const roadmap = [
  {
    Icon: Play,
    title: 'Unit 0: Your Starting Plan',
    copy: 'A guided plan on how to begin learning French effectively.',
  },
  {
    Icon: BookOpen,
    title: 'Units 1-5: Core A1 Topics & Syllabus',
    copy: 'Continue through the essentials, covering all necessary A1 skills.',
  },
  {
    Icon: GraduationCap,
    title: 'Unit 6: Revision & Assessment',
    copy: 'Packed with revision practice and a full A1 test to evaluate your competency.',
  },
];

export default function A1SelfstudyProgramPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-pattern-animated py-16 md:py-24 relative overflow-hidden full-bleed-section-ghl aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              The Frenchify A1 <span className="gradient-text">Self-Study</span> Program
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xl md:text-2xl text-brand-blue font-medium mb-6">
              Start Your French Journey — From Zero, At Your Own Pace
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              If you&apos;re a complete beginner, this is exactly where you begin. Our A1 Self-Study Program lays the foundation for everything that follows. It&rsquo;s structured, strategic, and designed to help you learn independently and confidently.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <Magnetic>
              <a
                href="https://link.fastpaydirect.com/payment-link/684971904d2e493514bd28c6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Enroll Now
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Our Goal Is <span className="gradient-text">Simple</span>
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
                What You <span className="gradient-text">Get</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                A comprehensive program designed for independent, confident learning.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid lg:grid-cols-2 gap-8 items-stretch">
            <Tilt max={5}>
              <div className="premium-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-brand-blue mb-4">
                    <Laptop className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-800 mb-4 tracking-tight">
                  Complete Online Course Access
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Perfect for absolute beginners, this course takes you from zero to confident beginner, step-by-step.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    100% beginner-friendly — no prior French needed
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Covers grammar, vocabulary, reading, listening &amp; writing
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Built-in checkpoints, worksheets, and mini-tests
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Final A1-level test to assess your progress
                  </li>
                </ul>
              </div>
            </Tilt>
            <Tilt max={5}>
              <div className="premium-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-brand-blue mb-4">
                    <Layers className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-800 mb-4 tracking-tight">
                  All Aspects Covered for a Strong Foundation
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  More than just grammar — this program builds your real-world language skills through every angle.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Step-by-Step Grammar Lessons
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Pronunciation Basics &amp; Core Vocabulary
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Listening Practice for Common Conversations
                  </li>
                  <li className="flex items-center">
                    <Star className="text-brand-amber mr-3 w-5 h-5 fill-current" />
                    Beginner Speaking &amp; Writing Exercises
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
                A Clear <span className="gradient-text">Roadmap</span> to Follow
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Every step is laid out — so you never feel lost, stuck, or confused.
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
      <section className="py-16 md:py-20 bg-gray-800 text-white full-bleed-section-ghl" id="signup">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="bg-gray-900/50 p-8 rounded-2xl mb-12 border border-gray-700">
              <div className="flex justify-center items-center gap-4 mb-4">
                <Calendar className="w-8 h-8 text-brand-amber" />
                <h3 className="font-display text-2xl font-bold tracking-tight">Instant Access for 4 Months</h3>
              </div>
              <p className="text-gray-300">
                You get 6 full months of access to complete the course at your own pace — whether that&rsquo;s daily, on weekends, or during spare moments. No short deadlines. No pressure. Just structured, beginner-friendly progress.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Start here. Build confidence.
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Lay the foundation for your PR journey. This is where your French story begins — and it starts on your terms.
            </p>
            <Magnetic>
              <a
                href="https://link.fastpaydirect.com/payment-link/684971904d2e493514bd28c6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Enroll Now
              </a>
            </Magnetic>
            <p className="text-sm text-gray-400 mt-6">Taught in English. Some content may not be translated.</p>
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
