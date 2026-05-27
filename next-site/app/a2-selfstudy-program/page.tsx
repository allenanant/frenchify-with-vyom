import type { Metadata } from 'next';
import { Check, Laptop, Layers, Star, Play, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import FaqSection from '@/components/sections/a2-selfstudy-program/FaqSection';
import ReviewsWidget from '@/components/sections/a2-selfstudy-program/ReviewsWidget';

export const metadata: Metadata = {
  title: 'Frenchify A2 Self-Study Program',
  description:
    'Take Your French to the Next Level — Confidently, at Your Pace. The Frenchify A2 Self-Study Program with a full A2 curriculum, grammar, vocabulary, and skills-based practice on your schedule.',
};

const goals = [
  { title: 'Strengthen Your Understanding', copy: 'Master sentence structure and complex grammar rules.' },
  { title: 'Express Yourself', copy: 'Learn to express opinions, preferences, and ideas in French.' },
  { title: 'Expand Your Vocabulary', copy: 'Learn words for daily life, social situations, and work.' },
  { title: 'Build Reading & Writing Confidence', copy: 'Read longer texts and write clear messages with ease.' },
  { title: 'Improve Listening Skills', copy: 'Understand and respond to faster-paced spoken French.' },
];

const onlineFeatures = [
  'Advanced beginner grammar & rich vocabulary',
  'Longer reading & listening passages',
  'Built-in checkpoints, worksheets & mini-tests',
  'Full A2-level test to assess your readiness for B1',
];

const aspectsFeatures = [
  'Step-by-Step Grammar & Pronunciation',
  'Extended Reading & Listening Topics',
  'Speaking Prompts for Real-Life Scenarios',
  'Writing Practice, Worksheets, Tools & Tests',
];

const roadmap = [
  {
    Icon: Play,
    title: 'Unit 0: Structure Your Study Plan',
    copy: 'Begin with a clear plan on how to approach your A2 learning.',
  },
  {
    Icon: BookOpen,
    title: 'Units 1-6: Core A2 Syllabus',
    copy: 'Complete the entire A2 curriculum, including applied practice.',
  },
  {
    Icon: GraduationCap,
    title: 'Final Test & Assessment',
    copy: 'Finish with a final A2 test to evaluate your readiness for the next level (B1).',
  },
];

export default function A2SelfstudyProgramPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-pattern-animated py-20 md:py-28 relative overflow-hidden full-bleed-section-ghl aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-[1.08] tracking-tight">
              The Frenchify A2 <span className="gradient-text">Self-Study Program</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl md:text-2xl text-brand-blue font-medium mb-6">
              Take Your French to the Next Level — Confidently, at Your Pace
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              If you&apos;ve already completed A1 or have a basic foundation in French, this is your next step. Transition from beginner to independent speaker with more complex grammar, richer vocabulary, and deeper communication skills — all on your own schedule.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Magnetic>
              <a
                href="https://link.fastpaydirect.com/payment-link/684971d397daa447de9fc3fd"
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
      <section className="py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Our Goal at A2 Is to <span className="gradient-text">Help You:</span>
            </h2>
          </Reveal>
          <Stagger className="space-y-6" duration={0.6}>
            {goals.map((g) => (
              <div key={g.title} className="flex items-start premium-card p-6">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4 ring-1 ring-brand-blue/20">
                  <Check className="w-5 h-5 text-brand-blue" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">{g.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{g.copy}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                What You <span className="gradient-text">Get</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                A comprehensive program designed for real progress and independent learning.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid lg:grid-cols-2 gap-8 items-stretch" duration={0.7}>
            <Tilt max={5}>
              <div className="premium-card p-8 h-full flex flex-col">
                <div className="flex-shrink-0 bg-brand-blue/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 ring-1 ring-brand-blue/20">
                  <Laptop className="w-7 h-7 text-brand-blue" strokeWidth={2.25} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  Complete Online Course Access
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  Perfect for learners moving beyond the basics, with a focus on real-life conversations and increasing complexity.
                </p>
                <ul className="space-y-3 text-gray-700">
                  {onlineFeatures.map((f) => (
                    <li key={f} className="flex items-center">
                      <Star className="w-4 h-4 text-brand-amber mr-3 fill-brand-amber" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>

            <Tilt max={5}>
              <div className="premium-card p-8 h-full flex flex-col">
                <div className="flex-shrink-0 bg-brand-blue/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 ring-1 ring-brand-blue/20">
                  <Layers className="w-7 h-7 text-brand-blue" strokeWidth={2.25} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  All Aspects Covered for Real Progress
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  This isn&rsquo;t just grammar revision — it&rsquo;s full-skill development to help you use the language confidently.
                </p>
                <ul className="space-y-3 text-gray-700">
                  {aspectsFeatures.map((f) => (
                    <li key={f} className="flex items-center">
                      <Star className="w-4 h-4 text-brand-amber mr-3 fill-brand-amber" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                A Clear <span className="gradient-text">Roadmap</span> to Follow
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Every unit is designed to build naturally on the last — no confusion, no overwhelm.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-blue via-brand-blue-deep to-brand-amber" aria-hidden="true" />
            <Stagger className="space-y-12" duration={0.65}>
              {roadmap.map(({ Icon, title, copy }) => (
                <div key={title} className="relative pl-14">
                  <div className="absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue shadow-lg ring-4 ring-white">
                    <Icon className="text-white w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-display font-bold text-xl text-gray-900 mb-1 tracking-tight">{title}</h4>
                  <p className="text-gray-600 leading-relaxed">{copy}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Access Duration & Final CTA */}
      <section className="py-20 full-bleed-section-ghl bg-gray-900 text-white relative overflow-hidden" id="signup">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-amber/10 pointer-events-none" />
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="bg-gray-900/60 p-8 rounded-2xl mb-12 border border-gray-700 backdrop-blur-sm">
              <div className="flex justify-center items-center gap-4 mb-4">
                <Calendar className="w-8 h-8 text-brand-amber" />
                <h3 className="font-display text-2xl font-bold tracking-tight">Instant Access for 4 Months</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                You get 4 months of full course access. Learn when it works best for you, repeat lessons as needed, and track your progress without pressure.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              You&rsquo;ve already started your French journey. Now let&rsquo;s build on it.
            </h2>
            <p className="text-lg text-gray-300 mb-8">Learn independently. Speak with confidence. Let&rsquo;s get going!</p>
            <Magnetic>
              <a
                href="https://link.fastpaydirect.com/payment-link/684971d397daa447de9fc3fd"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg"
              >
                Enroll Now
              </a>
            </Magnetic>
            <p className="text-sm text-gray-400 mt-6">Taught in English. Some content may not be translated.</p>
          </Reveal>
        </div>
      </section>

      <FaqSection />
      <ReviewsWidget />
    </>
  );
}
