import Image from 'next/image';
import {
  LineChart,
  PlayCircle,
  Award,
  Clock,
  AlertTriangle,
  XCircle,
  Map,
  Gauge,
  Trophy,
  Rocket,
  Calendar,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import FaqSection from '@/components/sections/a1-level-analysis-test/FaqSection';

export const metadata = {
  title: 'A1 Level Analysis Test - Frenchify with Vyom',
  description:
    'Discover exactly where you stand in your French learning journey. Get a comprehensive A1 assessment and a personalized roadmap to A2 fluency.',
};

const problems = [
  'Without proper assessment, you risk building on a weak foundation',
  'Leading to confusion, frustration, and wasted time at higher levels',
  'Many students repeat content unnecessarily or skip crucial concepts',
];

const steps = [
  { num: 1, title: 'Register & Start', copy: 'Sign up and begin your comprehensive A1 assessment immediately' },
  {
    num: 2,
    title: 'Complete Test',
    copy: 'Take 30-45 minutes to complete all four skill assessments at your own pace',
  },
  {
    num: 3,
    title: 'Get Results',
    copy: 'Receive detailed feedback, scores, and a personalized study plan instantly',
  },
];

const benefits = [
  {
    Icon: LineChart,
    bg: 'bg-blue-100',
    fg: 'text-brand-blue',
    title: 'Track Your Progress',
    copy: "Know exactly where you stand and how far you've come in your A1 journey",
  },
  {
    Icon: Map,
    bg: 'bg-green-100',
    fg: 'text-green-600',
    title: 'Personalized Roadmap',
    copy: 'Get a custom study plan tailored to your strengths and weaknesses',
  },
  {
    Icon: Gauge,
    bg: 'bg-purple-100',
    fg: 'text-purple-600',
    title: 'Save Time',
    copy: 'Stop wasting time on content you already know or topics too advanced',
  },
  {
    Icon: Trophy,
    bg: 'bg-orange-100',
    fg: 'text-brand-amber',
    title: 'Build Confidence',
    copy: "Move forward with certainty knowing you're ready for A2 level",
  },
];

const testimonials = [
  {
    name: 'Ananya Iyer',
    quote:
      '"The grammar test was detailed and well-structured. It took me about an hour to complete, but it was worth it. The questions really made me think and helped me understand how strong my basic grammar is. A great way to check your actual level!"',
  },
  {
    name: 'Rohit Sharma',
    quote:
      '"I found the test quite complete and accurate. Around 80 questions covering all the main grammar topics it gave me a clear idea of where I stand in French and what I should work on next. Perfect for anyone starting their French journey."',
  },
  {
    name: 'Sneha Patel',
    quote:
      '"This test was exactly what I needed to evaluate my foundation in French grammar. It wasn\'t too easy or too hard, just the right mix to test every key concept. I felt more confident about my progress after finishing it."',
  },
];

export default function A1LevelAnalysisTestPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 full-bleed-section-ghl relative overflow-hidden aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-brand-blue px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <LineChart className="w-4 h-4" />
                OFFICIAL ASSESSMENT
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                A1 Level <span className="gradient-text">Analysis</span> Test
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover exactly where you stand in your French learning journey. Get a comprehensive assessment of your A1 skills and a personalized roadmap to A2 fluency.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Magnetic>
                <a
                  href="https://buy.stripe.com/eVqdR9bnF4Vofjo5Us5sA1b"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Start Assessment
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="text-green-600 w-5 h-5" />
                <span className="font-medium">Certificate</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="text-brand-blue w-5 h-5" />
                <span className="font-medium">60 mins</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Reveal direction="left">
                <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-red-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-red-100 p-3 rounded-full">
                      <AlertTriangle className="text-red-600 w-6 h-6" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
                      Are You Stuck at A1?
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Many French learners hit a wall after completing A1. They&apos;re unsure if they&apos;ve truly mastered the fundamentals or if they&apos;re ready to move forward.
                  </p>
                  <div className="space-y-4">
                    {problems.map((p) => (
                      <div key={p} className="flex items-start gap-3">
                        <XCircle className="text-red-500 w-5 h-5 mt-1 flex-shrink-0" />
                        <p className="text-gray-600">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="order-1 md:order-2">
              <Reveal direction="right">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-30 blur-3xl" />
                  <Image
                    src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/6808e5afbcc5c4159279e282.jpeg"
                    alt="Confused student"
                    width={1200}
                    height={800}
                    unoptimized
                    className="relative rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                How The <span className="gradient-text">Assessment</span> Works
              </h2>
              <p className="text-xl text-gray-600">Simple &amp; comprehensive</p>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-brand-blue text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-brand-blue/30">
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200" />
                  )}
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-3 tracking-tight">{s.title}</h3>
                <p className="text-gray-600">{s.copy}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Why Take This <span className="gradient-text">Assessment?</span>
              </h2>
              <p className="text-xl text-gray-600">
                Transform your French learning journey with clarity and confidence
              </p>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 gap-8">
            {benefits.map(({ Icon, bg, fg, title, copy }) => (
              <Tilt key={title} max={5}>
                <div className="premium-card p-6 flex gap-4 h-full">
                  <div className="flex-shrink-0">
                    <div className={`${bg} p-3 rounded-lg`}>
                      <Icon className={`${fg} w-6 h-6`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      {title}
                    </h3>
                    <p className="text-gray-600">{copy}</p>
                  </div>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Student <span className="gradient-text">Success Stories</span>
              </h2>
              <p className="text-xl text-gray-600">
                Join hundreds who&apos;ve accelerated their French journey
              </p>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Tilt key={t.name} max={5}>
                <div className="premium-card bg-white rounded-xl p-6 shadow-lg h-full">
                  <div className="flex gap-1 mb-4 text-yellow-500">⭐️⭐️⭐️⭐️⭐️</div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{t.quote}</p>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-blue-deep full-bleed-section-ghl relative overflow-hidden">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row-faq mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="font-display text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Discover Your True A1 Level?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the assessment now and get your personalized roadmap to French fluency
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic>
                <a
                  href="https://buy.stripe.com/eVqdR9bnF4Vofjo5Us5sA1b"
                  className="bg-white text-brand-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg inline-flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Start Assessment Now
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://buy.stripe.com/eVqdR9bnF4Vofjo5Us5sA1b"
                  className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-brand-blue transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule for Later
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 text-white">
              <p className="text-sm opacity-90">No credit card required • Instant results</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
