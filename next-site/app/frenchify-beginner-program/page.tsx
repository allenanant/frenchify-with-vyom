import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export const metadata = {
  title: 'Frenchify Beginner Program — Sign-Up for Free',
  description:
    'Your first step to learn French for Canada PR. Sign up for free to build a solid base and understand the key aspects of the French language.',
};

type Module = { title: string; copy: string; highlight?: boolean };

const modules: Module[] = [
  { title: 'Grammar', copy: 'Articles, pronouns, sentence order.' },
  { title: 'Vocabulary', copy: 'Greetings, introductions, family, nationalities.' },
  { title: 'Pronunciation', copy: 'Key sounds, vowels, the French “R”.' },
  { title: 'Reading', copy: 'Short texts to build comprehension.' },
  { title: 'Listening', copy: 'Mini introductions + guided answers.' },
  { title: 'Writing', copy: 'Compose your “Présentez-vous”.' },
  { title: 'Speaking', copy: 'Record and refine a short intro.' },
  { title: 'Final Unit Test', copy: 'Quick check to confirm progress.', highlight: true },
];

export default function FrenchifyBeginnerProgramPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-50 full-bleed-section-ghl aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row mx-auto px-6 py-16 relative z-10 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Beginner Program — Your First Step Towards Canada PR
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
              This is your <span className="font-semibold">first step</span> to learn French for Canada PR.
              Sign up for this program to build a solid base and understand the key aspects of the French language.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-6 flex justify-center">
              <Magnetic>
                <a
                  href="https://learn.frenchifywithvyom.com/l/3f67c30cab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
                >
                  Sign me up for Free (Worth 150$)
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MODULES */}
      <section
        className="py-12 px-6 bg-white full-bleed-section-ghl"
        style={{ paddingLeft: '20px', paddingRight: '20px' }}
      >
        <div className="ghl-row mx-auto">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              What You&rsquo;ll Cover in This Preview
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Get oriented with the core concepts of the French language. You&rsquo;ll understand how to build sentences, follow a clear weekly plan, and finish with a quick check of your understanding at the end.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {modules.map((m) => (
              <Tilt key={m.title} max={5}>
                <div
                  className={`premium-card bg-white border rounded-xl p-5 shadow-sm h-full ${
                    m.highlight ? 'border-blue-200' : 'border-gray-200'
                  }`}
                >
                  <h3
                    className={`font-display font-semibold mb-1 tracking-tight ${
                      m.highlight ? 'text-blue-700' : ''
                    }`}
                  >
                    {m.title}
                  </h3>
                  <p className="text-sm text-gray-600">{m.copy}</p>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SHORT VALUE REMINDER */}
      <section className="py-8 px-6 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto">
          <Reveal>
            <p className="text-gray-700">
              By the end, you&rsquo;ll know the flow of Frenchify A1, have the base of the language, and a weekly plan you can actually follow — with a final unit test to validate your understanding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-14 px-6 bg-white full-bleed-section-ghl">
        <div className="ghl-row mx-auto">
          <Reveal>
            <h3 className="font-display text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Get Started Today
            </h3>
            <p className="text-gray-600 mb-6">Start learning French today for Free</p>
            <Magnetic>
              <a
                href="https://learn.frenchifywithvyom.com/l/3f67c30cab"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow inline-block"
              >
                Begin My Free Access
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
