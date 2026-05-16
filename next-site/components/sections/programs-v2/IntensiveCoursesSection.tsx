type Course = {
  href: string;
  img: string;
  alt: string;
  level: string;
  title: string;
  desc: string;
  cta: string;
  theme: string;
};

const courses: Course[] = [
  {
    href: 'https://frenchifywithvyom.com/a1_intensive_program',
    img: '/images/programs-v2/a1-intensive.png',
    alt: 'A1 Intensive Program',
    level: 'A1 · Beginner',
    title: 'Frenchify A1 Intensive Program',
    desc: 'New to French? This is your starting point. Build a solid foundation and kickstart your TEF Canada journey with our step-by-step A1 French Program—perfect for absolute beginners.',
    cta: 'Know More',
    theme: 'theme-sky',
  },
  {
    href: 'https://frenchifywithvyom.com/a2_intensive_program',
    img: '/images/programs-v2/a2-intensive.png',
    alt: 'A2 Intensive Program',
    level: 'A2 · Elementary',
    title: 'Frenchify A2 Intensive Program',
    desc: "Already mastered the basics and completed A1? Now it's time to deepen your skills, expand your French knowledge with real-life language learning inputs.",
    cta: 'Know More',
    theme: 'theme-pink',
  },
  {
    href: 'https://frenchifywithvyom.com/b1_intensive_program',
    img: '/images/programs-v2/b1-tef-tcf.png',
    alt: 'B1 TEF/TCF Program',
    level: 'B1 · Intermediate',
    title: 'Frenchify B1 TEF/TCF Program',
    desc: 'Strengthen advanced grammar, expand vocabulary, and elevate all four TEF/TCF modules—Reading, Listening, Speaking, and Writing—with targeted practice and structured guidance.',
    cta: 'Know More',
    theme: 'theme-mint',
  },
  {
    href: 'https://frenchifywithvyom.com/b2_intensive_program',
    img: '/images/programs-v2/b2-tef-tcf.png',
    alt: 'B2 TEF/TCF Program',
    level: 'B2 · Advanced',
    title: 'Frenchify B2 TEF/TCF Program',
    desc: "The 'All-In' —where strategy meets fluency for exam-specific preparation: mastering formats, perfecting timing, and practicing with real exam type questions to ace your test.",
    cta: 'Know More',
    theme: 'theme-cream',
  },
];

export default function IntensiveCoursesSection() {
  return (
    <section className="pt-0 pb-16 md:py-20 bg-gray-50 full-bleed-section-ghl" id="intensive">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Intensive Courses <span className="gradient-text">(Online Course + Live Sessions)</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Accelerate your French learning with structured guidance, live sessions, and expert mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {courses.map((c) => (
            <a key={c.href} href={c.href} className={`ed-card ${c.theme}`}>
              <div className="ed-card__media">
                <span className="ed-card__circle"></span>
                <span className="ed-card__level">{c.level}</span>
                <img src={c.img} alt={c.alt} className="ed-card__img" />
              </div>
              <div className="ed-card__body">
                <h3 className="ed-card__title">{c.title}</h3>
                <p className="ed-card__desc">{c.desc}</p>
              </div>
              <div className="ed-card__overlay">
                <h4 className="ed-card__overlay-title">{c.cta}</h4>
                <span className="ed-card__overlay-btn">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
