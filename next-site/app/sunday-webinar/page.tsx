import {
  UserCheck,
  Calendar,
  Tag,
  LineChart,
  Clock,
  Target,
  MapPin,
  CheckCircle2,
  Award,
  MessagesSquare,
  Quote,
  Languages,
  Rocket,
  GraduationCap,
  Flag,
  Users,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import HeroSection from '@/components/sections/sunday-webinar/HeroSection';

export const metadata = {
  title: 'French for Canadian PR: Live Assessment Workshop | Frenchify with Vyom',
  description:
    'Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live assessment and get your personalized French learning strategy - completely free.',
};

const painPoints = [
  {
    Icon: LineChart,
    bg: 'from-red-100 to-red-200',
    color: 'text-red-600',
    title: "CRS Score Isn't Competitive",
    copy: "Draws keep hitting 480+ and your score isn't close. You're watching months go by with no guarantee.",
  },
  {
    Icon: Clock,
    bg: 'from-orange-100 to-orange-200',
    color: 'text-orange-600',
    title: 'Time is Running Out',
    copy: "Your age points are decreasing, permits need renewal, and other options take years you don't have.",
  },
  {
    Icon: Target,
    bg: 'from-blue-100 to-blue-200',
    color: 'text-brand-blue',
    title: 'Opportunity Cost is Huge',
    copy: 'Every month you wait is lost Canadian income, career growth, and life progress.',
  },
];

const benefits = [
  {
    Icon: LineChart,
    title: 'Add 50+ CRS points',
    copy: 'Guarantee your selection in the next draw',
  },
  {
    Icon: Award,
    title: 'Access special francophone draws',
    copy: 'With significantly lower cutoff scores',
  },
  {
    Icon: Flag,
    title: 'Qualify for dedicated streams',
    copy: 'In multiple provinces across Canada',
  },
  {
    Icon: Users,
    title: 'Skip the competition',
    copy: 'Only 5% of candidates speak French',
  },
];

const workshopSteps = [
  {
    Icon: Target,
    title: 'Personal Assessment',
    copy: 'Answer 20 strategic questions to predict your success and get instant results.',
  },
  {
    Icon: MapPin,
    title: 'Custom Roadmap',
    copy: 'Receive a personalized timeline and strategy to reach CLB 7 based on your score.',
  },
  {
    Icon: LineChart,
    title: 'ROI Analysis',
    copy: 'Understand the cost of waiting vs investing in French with a financial comparison.',
  },
  {
    Icon: MessagesSquare,
    title: 'Live Q&A Session',
    copy: 'Meet students who got their PR using French and ask them anything.',
  },
];

const includes = [
  { title: 'Live 20-question Assessment', copy: 'Know your exact French PR potential' },
  { title: 'Personalized Score Interpretation', copy: 'What your results mean for your timeline' },
  { title: 'Custom Learning Roadmap', copy: 'Step-by-step plan based on YOUR situation' },
  { title: 'Latest Immigration Updates', copy: 'Francophone opportunities most people miss' },
  { title: 'ROI Analysis Worksheet', copy: 'Compare French investment vs waiting' },
  { title: 'Exclusive Discount Codes', copy: 'Up to $100 CAD off programs' },
];

const faqs = [
  {
    Icon: Clock,
    q: "I don't have time to learn a new language",
    a: 'The assessment reveals if you have enough time based on your specific timeline. Many students reach CLB 7 in 8-12 months with just 2-3 hours daily.',
  },
  {
    Icon: Languages,
    q: 'French seems too difficult',
    a: 'French shares 60% vocabulary with English. The assessment measures your language learning aptitude - you might be surprised by your natural ability.',
  },
  {
    Icon: LineChart,
    q: "I'm not sure if it's worth the investment",
    a: 'The workshop includes a complete ROI analysis. You\'ll see the exact financial comparison between investing in French and the cost of waiting.',
  },
  {
    Icon: GraduationCap,
    q: 'What if I fail the TEF/TCF exam?',
    a: 'The assessment predicts your success probability. Plus, our students have an 80% first-attempt pass rate, and exams can be retaken.',
  },
];

export default function SundayWebinarPage() {
  return (
    <main>
      <HeroSection />

      {/* Info Cards under hero */}
      <section className="-mt-16 pb-16 sm:pb-24 full-bleed-section-ghl relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Tilt max={5}>
              <div className="premium-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center h-full group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-brand-blue/30 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-6 h-6" />
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider sm:tracking-widest mb-1">
                  Host
                </p>
                <p className="font-display font-black text-slate-900 text-base sm:text-lg tracking-tight">Vyom Sharma</p>
              </div>
            </Tilt>
            <Tilt max={5}>
              <div className="premium-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center h-full group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-brand-blue/30 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider sm:tracking-widest mb-1">
                  When
                </p>
                <p className="font-display font-black text-slate-900 text-sm sm:text-base leading-tight tracking-tight">
                  {'{{custom_values.webinar_date__25th_may}}'}
                </p>
              </div>
            </Tilt>
            <Tilt max={5}>
              <div className="premium-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center h-full group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-6 h-6" />
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider sm:tracking-widest mb-1">
                  Investment
                </p>
                <p className="font-display font-black text-slate-900 text-lg sm:text-xl tracking-tight">
                  <span className="text-red-500 line-through text-sm sm:text-base mr-1 sm:mr-2">$19 CAD</span>
                  <span className="text-green-600">FREE!</span>
                </p>
              </div>
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section id="details" className="py-20 sm:py-28 bg-gradient-to-b from-blue-50 to-white full-bleed-section-ghl relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Tired of Waiting in the Express Entry Pool?
              </h2>
              <p className="mt-5 text-lg sm:text-xl text-slate-600 font-medium">
                If you&apos;re stuck with any of these problems, this workshop will show you a proven alternative.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {painPoints.map(({ Icon, bg, color, title, copy }) => (
              <Tilt key={title} max={5}>
                <div className="premium-card bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 group h-full">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${bg} ${color} rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{copy}</p>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 sm:py-28 relative overflow-hidden full-bleed-section-ghl aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                What if French Could <span className="gradient-text">Change Everything?</span>
              </h2>
              <p className="mt-5 text-lg sm:text-xl text-slate-600 font-medium">
                While thousands wait, smart candidates are using French to guarantee their PR invitation.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <div>
                <h3 className="font-display text-2xl font-black text-slate-900 mb-8 tracking-tight">
                  Here&apos;s what French can do for your application:
                </h3>
                <Stagger className="space-y-6">
                  {benefits.map(({ Icon, title, copy }) => (
                    <div key={title} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-brand-blue/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-lg text-slate-900 mb-1">{title}</p>
                        <p className="text-slate-600 text-base">{copy}</p>
                      </div>
                    </div>
                  ))}
                </Stagger>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="premium-card bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-2xl">
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 text-center mb-6 sm:mb-8 tracking-tight">
                  The Numbers Don&apos;t Lie:
                </h3>
                <Stagger className="grid grid-cols-2 gap-3 sm:gap-5">
                  <div className="text-center bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-100 premium-card">
                    <AnimatedNumber
                      value={50}
                      suffix="+"
                      className="font-display text-3xl sm:text-4xl lg:text-5xl font-black gradient-text block mb-1 sm:mb-2"
                    />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider text-slate-600 leading-tight">
                      CRS Points
                    </span>
                  </div>
                  <div className="text-center bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-100 premium-card">
                    <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-black gradient-text block mb-1 sm:mb-2">
                      8-12
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider text-slate-600 leading-tight">
                      Months to PR
                    </span>
                  </div>
                  <div className="text-center bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-100 premium-card">
                    <AnimatedNumber
                      value={95}
                      suffix="%"
                      className="font-display text-3xl sm:text-4xl lg:text-5xl font-black gradient-text block mb-1 sm:mb-2"
                    />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider text-slate-600 leading-tight">
                      Less Competition
                    </span>
                  </div>
                  <div className="text-center bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-100 premium-card">
                    <span className="font-display text-3xl sm:text-4xl font-black gradient-text block mb-1 sm:mb-2">
                      Proven
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider text-slate-600 leading-tight">
                      Pathway
                    </span>
                  </div>
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORKSHOP DETAILS */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-blue-50 full-bleed-section-ghl relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                What Happens in This Live Assessment Workshop
              </h2>
              <p className="mt-5 text-lg sm:text-xl text-slate-600 font-medium">
                This isn&apos;t a typical webinar. You&apos;ll actively participate in a live assessment that determines your French PR potential.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {workshopSteps.map(({ Icon, title, copy }, i) => (
              <Tilt key={title} max={5}>
                <div className="premium-card bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 h-full group">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${
                      i === 2 ? 'from-green-500 to-green-600 shadow-green-500/30' : 'from-brand-blue to-brand-blue-deep shadow-brand-blue/30'
                    } text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-black text-slate-900 mb-2 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{copy}</p>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ABOUT VYOM */}
      <section className="py-20 sm:py-28 relative overflow-hidden full-bleed-section-ghl aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <div className="relative order-last lg:order-first">
                <div className="absolute -inset-6 bg-gradient-to-r from-brand-blue to-brand-amber rounded-3xl blur-3xl opacity-20" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808d65bdf54eff4377e2466.png"
                    alt="Vyom Sharma"
                    className="relative w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                  Meet Vyom: He Actually <span className="gradient-text">Walked This Path</span>
                </h2>

                <div className="space-y-6 text-slate-600">
                  <p className="text-lg font-semibold text-slate-700">
                    This isn&apos;t theory from someone who&apos;s never done it. Vyom used this exact French strategy to get his own Canadian PR.
                  </p>

                  <div className="premium-card bg-white rounded-3xl p-7 border-2 border-blue-100 shadow-lg relative pl-10">
                    <div
                      className="absolute left-4 top-6 bottom-6 w-1 rounded-full"
                      style={{ background: 'linear-gradient(180deg, #2563eb, #f59e0b)' }}
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-blue-deep rounded-xl flex items-center justify-center">
                        <Quote className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">My Story</h3>
                    </div>
                    <p className="text-base leading-relaxed text-slate-700">
                      I arrived in Canada in December 2018. After my studies, I was stuck in the Express Entry pool with a CRS score that wasn&apos;t competitive enough. In April 2021, I started learning French. In just 8 months, I went from zero to CLB 7 and added 62 points to my CRS score. I received my PR invitation in November 2022.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl border-2 border-blue-200 shadow-md">
                    <p className="text-base font-bold text-slate-900 flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <span>The assessment in this workshop is what I wish I had when I started. Instead of guessing if French is right for you, you&apos;ll know for certain.</span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT ATTENDEES GET */}
      <section
        className="py-20 sm:py-28 relative overflow-hidden full-bleed-section-ghl"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <Reveal>
            <div className="text-center mb-14 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Your Free Workshop Includes:
              </h2>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {includes.map((it) => (
              <div
                key={it.title}
                className="rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white hover:scale-105 transition-all duration-300"
                style={{
                  background: 'rgba(30, 58, 138, 0.6)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-white text-brand-blue rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-display font-black text-base sm:text-lg mb-1 tracking-tight">{it.title}</p>
                    <p className="text-white/90 text-xs sm:text-sm">{it.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>

          <Reveal>
            <div className="text-center mt-12">
              <p className="text-white font-bold text-xl mb-3">
                Regular Workshop Price: <span className="line-through opacity-75">$19 CAD</span>
              </p>
              <div className="inline-block bg-white text-brand-blue-deep px-8 py-4 rounded-2xl font-black text-xl shadow-2xl">
                Today&apos;s Price: FREE! (Plus $497 in Bonuses)
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 sm:py-28 bg-white full-bleed-section-ghl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Reveal>
            <div className="text-center mb-14 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Still Have <span className="gradient-text">Doubts?</span>
              </h2>
            </div>
          </Reveal>

          <Stagger className="space-y-5">
            {faqs.map(({ Icon, q, a }, i) => (
              <Tilt key={q} max={3}>
                <div className="premium-card bg-white rounded-3xl p-7 border-2 border-blue-50">
                  <h4 className="font-display text-lg font-black text-slate-900 flex items-center gap-4 mb-3 tracking-tight">
                    <div
                      className={`w-11 h-11 ${
                        i === 2 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-brand-blue to-brand-blue-deep'
                      } text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span>&ldquo;{q}&rdquo;</span>
                  </h4>
                  <p className="text-slate-600 text-base pl-[60px] leading-relaxed">{a}</p>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="register" className="py-20 sm:py-28 aurora-bg full-bleed-section-ghl relative overflow-hidden">
        <FloatingOrbs variant="soft" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-brand-blue via-brand-blue-deep to-brand-amber rounded-[2.5rem] blur-3xl opacity-30" />

              <div
                className="relative rounded-3xl sm:rounded-[2.5rem] p-10 sm:p-12 lg:p-16 text-center shadow-2xl border-4 border-white/20"
                style={{
                  background:
                    'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)',
                }}
              >
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  Your Canadian PR Journey Starts with One Decision 🍁
                </h2>

                <div className="max-w-3xl mx-auto space-y-4 mb-8">
                  <div
                    className="rounded-2xl p-5 text-left border-2 border-red-400/30"
                    style={{
                      background: 'rgba(30, 58, 138, 0.6)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <p className="text-white text-base">
                      <span className="font-black text-red-300 text-lg">Option 1:</span>
                      <span className="ml-2">Keep waiting in Express Entry, hoping draws get easier (they won&apos;t), watching opportunities pass by.</span>
                    </p>
                  </div>

                  <div
                    className="rounded-2xl p-5 text-left border-2 border-green-400/30"
                    style={{
                      background: 'rgba(30, 58, 138, 0.6)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <p className="text-white text-base">
                      <span className="font-black text-green-300 text-lg">Option 2:</span>
                      <span className="ml-2">Take 90 minutes to discover if French could be your PR game-changer and get a personalized roadmap.</span>
                    </p>
                  </div>
                </div>

                <p className="text-white/95 font-semibold mb-8 text-lg">
                  This workshop, normally <span className="font-black text-blue-100 text-xl">$19 CAD</span>, is completely free today. The assessment alone is worth hundreds in consultation fees.
                </p>

                <div className="space-y-4">
                  <Magnetic>
                    <a
                      href="/webinar-form-page"
                      className="inline-block w-full sm:w-auto bg-white hover:bg-gray-50 text-brand-blue-deep font-black py-5 px-10 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-4 border-white/30"
                    >
                      <Rocket className="inline w-5 h-5 mr-2" />
                      Claim My Spot Before It&apos;s Full
                    </a>
                  </Magnetic>

                  <p className="text-sm font-black text-blue-100 flex items-center justify-center gap-2">
                    <span className="text-xl">🚨</span>
                    <span>Registration closes when we hit capacity or 24 hours before the workshop!</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
