import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import { TRACKS, type Track, type TrackCourse } from '../_data';

function CourseCard({ course }: { course: TrackCourse }) {
  return (
    <Tilt max={4}>
      <Link
        href={course.href}
        className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col"
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={course.img}
            alt={course.alt}
            fill
            unoptimized
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute top-0 right-5 font-bold px-5 py-2 rounded-b-2xl text-xs tracking-wide shadow z-10 ${course.badgeClass}`}
          >
            {course.badge}
          </span>
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            {course.title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed flex-1">{course.desc}</p>
          <span className="inline-flex items-center gap-2 bg-brand-blue group-hover:bg-brand-blue-deep text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 mt-auto w-fit">
            {course.cta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Tilt>
  );
}

export default function TrackCoursesView({ track }: { track: Track }) {
  const other = TRACKS[track.id === 'tef' ? 'tcf' : 'tef'];

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              track.id === 'tef'
                ? 'radial-gradient(800px 420px at 20% 10%, rgba(37,99,235,0.12), transparent 60%), radial-gradient(700px 400px at 85% 60%, rgba(245,158,11,0.08), transparent 60%)'
                : 'radial-gradient(800px 420px at 20% 10%, rgba(245,158,11,0.12), transparent 60%), radial-gradient(700px 400px at 85% 60%, rgba(37,99,235,0.1), transparent 60%)',
          }}
        />
        <div className="relative max-w-[1200px] mx-auto">
          <Link
            href="/course-test"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-blue transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Choose a different exam
          </Link>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue border border-blue-100 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
              {track.exam} Track
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mt-6">
              {track.exam} <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-5">
              {track.heroBody}
            </p>
            <div className="mt-7">
              <Link
                href={`/course-test/${other.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-blue border border-gray-200 hover:border-blue-200 rounded-full px-5 py-2.5 transition-colors"
              >
                Preparing for {other.exam} instead?
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTENSIVE COURSES */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Intensive Courses{' '}
                <span className="gradient-text">(Online Course + Live Sessions)</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Accelerate your {track.exam} preparation with structured guidance,
                live sessions, and expert mentorship.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {track.intensive.map((c) => (
              <CourseCard key={c.title} course={c} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* SELF-STUDY COURSES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Self Study Programs{' '}
                <span className="gradient-text">(Self-Paced Online Programs)</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn at your own pace with our comprehensive self-study programs,
                perfect for busy learners.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {track.selfStudy.map((c) => (
              <CourseCard key={c.title} course={c} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-gray-900 text-white text-center py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 420px at 50% -10%, rgba(37,99,235,0.25), transparent 60%), radial-gradient(700px 380px at 90% 100%, rgba(245,158,11,0.1), transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Ready to Start Your {track.exam} Journey?
          </h2>
          <p className="mt-5 text-lg text-white/80">
            Join thousands of students and achieve your language goals with
            Frenchify.
          </p>
          <div className="mt-10">
            <a
              href="https://frenchifywithvyom.app.clientclub.net/"
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-semibold transition"
              style={{
                background: '#2563EB',
                boxShadow: '0 12px 28px -8px rgba(37,99,235,0.5)',
              }}
            >
              Enroll Today
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
