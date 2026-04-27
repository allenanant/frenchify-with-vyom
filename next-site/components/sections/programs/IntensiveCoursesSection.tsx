import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

type Course = {
  href: string;
  img: string;
  alt: string;
  badge: string;
  badgeClass: string;
  title: string;
  desc: string;
  cta: string;
};

const courses: Course[] = [
  {
    href: '/a1-intensive-program',
    img: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb55cbff63d8bc398ecf2.png',
    alt: 'A1 Intensive Program',
    badge: 'A1 Level',
    badgeClass: 'bg-brand-blue text-white',
    title: 'Frenchify A1 Intensive Program',
    desc: 'New to French? This is your starting point. Build a solid foundation and kickstart your TEF Canada journey with our step-by-step A1 French Program—perfect for absolute beginners.',
    cta: 'Know More',
  },
  {
    href: '/a2-intensive-program',
    img: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb597e10a086f93d310ad.png',
    alt: 'A2 Intensive Program',
    badge: 'A2 Level',
    badgeClass: 'bg-purple-600 text-white',
    title: 'Frenchify A2 Intensive Program',
    desc: "Already mastered the basics and completed A1? Now it's time to deepen your skills, expand your French knowledge with real-life language learning inputs.",
    cta: 'Know More',
  },
  {
    href: '/b1-intensive-program',
    img: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb5c8bff63d20e398f6c6.png',
    alt: 'B1 TEF/TCF Program',
    badge: 'B1 Level',
    badgeClass: 'bg-green-600 text-white',
    title: 'Frenchify B1 TEF/TCF Program',
    desc: 'Strengthen advanced grammar, expand vocabulary, and elevate all four TEF/TCF modules—Reading, Listening, Speaking, and Writing—with targeted practice and structured guidance.',
    cta: 'Know More',
  },
  {
    href: '/b2-intensive-program',
    img: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb52781ef6b76cea31ac0.png',
    alt: 'B2 TEF/TCF Program',
    badge: 'B2 Level',
    badgeClass: 'bg-yellow-600 text-white',
    title: 'Frenchify B2 TEF/TCF Program',
    desc: "The 'All-In' —where strategy meets fluency for exam-specific preparation: mastering formats, perfecting timing, and practicing with real exam type questions to ace your test.",
    cta: 'Know More',
  },
];

export default function IntensiveCoursesSection() {
  return (
    <section id="intensive" className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Intensive Courses <span className="gradient-text">(Online Course + Live Sessions)</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Accelerate your French learning with structured guidance, live sessions, and expert mentorship.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((c) => (
            <Tilt key={c.href} max={4}>
              <Link
                href={c.href}
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-0 right-5 font-bold px-5 py-2 rounded-b-2xl text-xs tracking-wide shadow z-10 ${c.badgeClass}`}
                  >
                    {c.badge}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">{c.desc}</p>
                  <span className="inline-flex items-center gap-2 bg-brand-blue group-hover:bg-brand-blue-deep text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 mt-auto w-fit">
                    {c.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Tilt>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
