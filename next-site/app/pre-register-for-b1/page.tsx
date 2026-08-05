import {
  Bell,
  ClipboardCheck,
  MessageSquare,
  Target,
  Rocket,
  AlertTriangle,
  Mail,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Magnetic from '@/components/motion/Magnetic';
import ProgramToggle from './_components/ProgramToggle';

export const metadata = {
  title: 'Pre-Register for B1 Program - Frenchify with Vyom',
  description:
    'Pre-register for the Frenchify B1 program. Get early access to the full B1 curriculum while you complete your final A2 steps. Choose B1 Intensive or B1 Flex.',
  alternates: { canonical: 'https://frenchifywithvyom.com/pre-register-for-b1' },
};

const earlyBenefits = [
  {
    emoji: '📚',
    body: 'Complete the final B1 Grammar section alongside your last A2 steps',
  },
  {
    emoji: '🎤',
    body: 'Polish and pass your A2 Speaking while already building B1 foundations',
  },
  {
    emoji: '🚀',
    body: 'Once you officially pass A2, begin the complete B1 Course with Speaking, Writing and submissions with no delay',
  },
  {
    emoji: '✅',
    body: 'Work on feedback from your final A2 analysis and arrive at B1 fully prepared',
  },
];

export default function PreRegisterB1Page() {
  return (
    <main>
      {/* Notice bar */}
      <div className="bg-blue-600 text-white full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-sm font-medium">
          <Bell className="inline w-4 h-4 mr-2 -mt-0.5" />
          Pre-Registration is now open for B1 · Seats are very limited · Submit your A2 Test &amp;
          Checklist first
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white full-bleed-section-ghl">
        <div className="absolute inset-0 hero-pattern opacity-60" aria-hidden />
        <div className="absolute inset-0 aurora-bg opacity-70" aria-hidden />
        <div className="relative ghl-row mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <Reveal>
            <div className="inline-block bg-blue-100 text-blue-800 font-semibold text-sm px-5 py-2 rounded-full mb-6">
              🇫🇷 For Frenchify A2 Students Only
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Ready for <span className="gradient-text">B1?</span> Let&apos;s Go.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Get early access to the full B1 program while you complete your final A2 steps. Build
              your foundation now and hit the ground running the moment you pass.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Step 1 */}
      <section className="bg-gray-50 py-10 md:py-14 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Reveal>
            <div className="premium-card bg-white rounded-2xl border-2 border-brand-amber p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 shrink-0">
                  <ClipboardCheck className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <p className="font-display font-bold text-gray-900 text-lg">
                    Step 1 — Submit your Final A2 Test &amp; Checklist
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">
                    We cannot assess your level or confirm your spot without this.
                  </p>
                </div>
                <Magnetic>
                  <a
                    href="https://forms.gle/MBDZqbxRuDBw1Udf6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-brand-blue-deep text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-300 shrink-0"
                  >
                    Submit Here <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
              <MessageSquare className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                All communication must happen via the <span className="font-semibold">Student Portal</span>{' '}
                only going forward. Not WhatsApp.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who is this for */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Who Is This For
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Is This the Right <span className="gradient-text">Next Step?</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border border-gray-200 p-6 md:p-8 flex gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                <Target className="w-6 h-6" />
              </span>
              <p className="text-gray-700 leading-relaxed">
                This is for Frenchify A2 students who want to get a head start on B1 and make the
                most of their remaining A2 time. You must have submitted your Final A2 Test &amp;
                Checklist before registering. Full B1 access begins only once you officially pass
                A2.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why pre-register early */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Why Pre-Register Early
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                What You Can Do <span className="gradient-text">Right Now</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Don&apos;t wait until you pass A2 to get started. Here&apos;s how pre-registration
                works in your favour:
              </p>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 gap-6">
            {earlyBenefits.map((b, i) => (
              <div key={i} className="premium-card bg-white rounded-2xl p-6 md:p-7 h-full flex gap-4">
                <span className="text-2xl leading-none shrink-0 mt-0.5" aria-hidden>
                  {b.emoji}
                </span>
                <p className="text-gray-700 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Choose your program */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl" id="programs">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Choose Your Program
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Two Ways to <span className="gradient-text">Join B1</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Both give you full access to the B1 Online Curriculum. Choose based on how you like
                to learn.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ProgramToggle />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex gap-3 rounded-xl bg-gray-50 border border-gray-200 p-4 max-w-2xl mx-auto">
              <PlayCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">B1 Intensive — Session Preview:</span>{' '}
                see what a live session looks like. 🔜 Video coming soon.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Please note */}
      <section className="bg-gray-50 py-14 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Important
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Please <span className="gradient-text">Note</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </span>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <span className="font-semibold text-gray-900">
                      For Frenchify A2 Students Only.
                    </span>{' '}
                    This pre-registration is exclusively for existing Frenchify A2 students. You must
                    submit the Final A2 Test &amp; Checklist before we can confirm your spot.
                  </p>
                  <p>Full B1 access begins only once you officially pass A2.</p>
                  <p>
                    No refunds once registered as your personalized study plan and B1 Online Portal
                    access are provided immediately upon registration. For B1 Intensive, seats are
                    very limited so prior commitment is strongly advised.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration */}
      <section className="bg-white py-14 md:py-20 full-bleed-section-ghl" id="register">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">
                Registration
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Ready to Secure <span className="gradient-text">Your Spot?</span>
              </h2>
              <p className="text-gray-600 mt-4">E-Transfer to register for either program</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="premium-card bg-white rounded-2xl border-2 border-brand-amber p-6 md:p-10 text-center">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                E-Transfer To
              </p>
              <a
                href="mailto:frenchifyfee@gmail.com"
                className="font-display text-2xl md:text-3xl font-bold text-brand-blue hover:underline inline-flex items-center gap-3 mt-2"
              >
                <Mail className="w-6 h-6" />
                frenchifyfee@gmail.com
              </a>
              <p className="text-gray-600 mt-3 font-medium">
                B1 Intensive — $899 CAD · B1 Flex — $729 CAD
              </p>

              <div className="mt-8 text-left">
                <p className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-5 text-center">
                  How to Register
                </p>
                <ol className="space-y-4 max-w-xl mx-auto">
                  {[
                    'Send the E-Transfer to frenchifyfee@gmail.com',
                    'In the message area while sending, mention that you are pre-registering for B1 and which program you have chosen',
                    'No need to message anyone — a team member will reach out to you via the Student Portal on Frenchify and your access will be activated within 24 hours',
                  ].map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed pt-1">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4 text-left">
                <span className="text-xl shrink-0" aria-hidden>
                  📌
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">About Your 3 Months Access:</span>{' '}
                  your official 3 months B1 access starts only when you pass the A2 Test and your B1
                  Live Sessions begin. You do not need to worry about time being used up during A2.
                  The course access will be given to you beforehand so you can begin studying right
                  away.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-center text-gray-500 mt-10">Merci 🙂</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
