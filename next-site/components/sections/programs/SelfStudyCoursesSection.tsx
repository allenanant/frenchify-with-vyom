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
    href: '/a1-selfstudy-program',
    img: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6846f140afd030d330c5b831.png',
    alt: 'A1 Self-Study Program',
    badge: 'A1 Level',
    badgeClass: 'bg-brand-blue text-white',
    title: 'Frenchify A1 Self-Study Program',
    desc: 'If you are just starting out, our Frenchify A1 Self-Study Program is built for busy learners who want structure, strategy, and serious results without live sessions, at their own pace.',
    cta: 'Enroll Now',
  },
  {
    href: '/a2-selfstudy-program',
    img: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6846f1408e362184a301feb7.png',
    alt: 'A2 Self-Study Program',
    badge: 'A2 Level',
    badgeClass: 'bg-purple-600 text-white',
    title: 'Frenchify A2 Self-Study Program',
    desc: 'If you have built a strong foundation of A1 level syllabus, our Frenchify A2 Self-Study Program is a second step for our busy learners who want to continue diving deeper in the language, without live sessions, at their own pace.',
    cta: 'Enroll Now',
  },
];

export default function SelfStudyCoursesSection() {
  return (
    <section id="self-study" className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Self Study Programs <span className="gradient-text">(Self-Paced Online Programs)</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn at your own pace with our comprehensive self-study programs, perfect for busy learners.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {courses.map((c) => (
            <Tilt key={c.href} max={4}>
              <Link
                href={c.href}
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden border border-gray-100 h-full flex flex-col"
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
