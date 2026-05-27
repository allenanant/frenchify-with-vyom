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
    href: 'https://frenchifywithvyom.com/a1-selfstudy-program',
    img: '/images/programs-v2/a1-selfstudy.png',
    alt: 'A1 Self-Study Program',
    level: 'A1 · Self-Paced',
    title: 'Frenchify A1 Self-Study Program',
    desc: 'If you are just starting out, our Frenchify A1 Self-Study Program is built for busy learners who want structure, strategy, and serious results without live sessions, at their own pace.',
    cta: 'Enroll Now',
    theme: 'theme-lilac',
  },
  {
    href: 'https://frenchifywithvyom.com/a2-selfstudy-program',
    img: '/images/programs-v2/a2-selfstudy.png',
    alt: 'A2 Self-Study Program',
    level: 'A2 · Self-Paced',
    title: 'Frenchify A2 Self-Study Program',
    desc: 'If you have built a strong foundation of A1 level syllabus, our Frenchify A2 Self-Study Program is a second step for our busy learners who want to continue diving deeper in the language, without live sessions, at their own pace.',
    cta: 'Enroll Now',
    theme: 'theme-peach',
  },
];

export default function SelfStudyCoursesSection() {
  return (
    <section className="py-16 md:py-20 bg-white full-bleed-section-ghl" id="self-study">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Self Study Programs <span className="gradient-text">(Self-Paced Online Programs)</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn at your own pace with our comprehensive self-study programs, perfect for busy learners.
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
