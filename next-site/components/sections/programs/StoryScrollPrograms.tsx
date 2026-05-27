'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

type Chapter = {
  index: string;
  tag: string;
  badge: string;
  title: string;
  body: string;
  metaLeftLabel: string;
  metaLeftValue: string;
  metaRightLabel: string;
  metaRightValue: string;
  cta: string;
  href: string;
  image: string;
  imageLeft: boolean;
  paper: boolean;
};

const CHAPTERS: Chapter[] = [
  {
    index: '01',
    tag: 'Chapter 01 — Beginner',
    badge: 'A1 · Intensive · Live',
    title: 'Frenchify A1 Intensive Program',
    body:
      'New to French? This is your starting point. Build a solid foundation and kickstart your TEF Canada journey with our step-by-step A1 French Program—perfect for absolute beginners.',
    metaLeftLabel: 'Level',
    metaLeftValue: 'A1 — Beginner',
    metaRightLabel: 'Format',
    metaRightValue: 'Live + Recorded',
    cta: 'Know More',
    href: 'https://frenchify-with-vyom.vercel.app/a1-course',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80',
    imageLeft: true,
    paper: false,
  },
  {
    index: '02',
    tag: 'Chapter 02 — Elementary',
    badge: 'A2 · Intensive · Live',
    title: 'Frenchify A2 Intensive Program',
    body:
      "Already mastered the basics and completed A1? Now it's time to deepen your skills, expand your French knowledge with real-life language learning inputs.",
    metaLeftLabel: 'Level',
    metaLeftValue: 'A2 — Elementary',
    metaRightLabel: 'Format',
    metaRightValue: 'Live + Recorded',
    cta: 'Know More',
    href: 'https://frenchify-with-vyom.vercel.app/a2-course',
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80',
    imageLeft: false,
    paper: true,
  },
  {
    index: '03',
    tag: 'Chapter 03 — Intermediate',
    badge: 'B1 · TEF/TCF · Live',
    title: 'Frenchify B1 TEF/TCF Program',
    body:
      'Strengthen advanced grammar, expand vocabulary, and elevate all four TEF/TCF modules—Reading, Listening, Speaking, and Writing—with targeted practice and structured guidance.',
    metaLeftLabel: 'Level',
    metaLeftValue: 'B1 — Intermediate',
    metaRightLabel: 'Exam',
    metaRightValue: 'TEF + TCF',
    cta: 'Know More',
    href: 'https://frenchify-with-vyom.vercel.app/b1-course',
    image:
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1400&q=80',
    imageLeft: true,
    paper: false,
  },
  {
    index: '04',
    tag: 'Chapter 04 — Upper Intermediate',
    badge: 'B2 · TEF/TCF · The All-In',
    title: 'Frenchify B2 TEF/TCF Program',
    body:
      'The "All-In" —where strategy meets fluency for exam-specific preparation: mastering formats, perfecting timing, and practicing with real exam type questions to ace your test.',
    metaLeftLabel: 'Level',
    metaLeftValue: 'B2 — Upper Int.',
    metaRightLabel: 'Focus',
    metaRightValue: 'Exam Strategy',
    cta: 'Know More',
    href: 'https://frenchify-with-vyom.vercel.app/b2-course',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
    imageLeft: false,
    paper: true,
  },
];

const HERO_INDEX = [
  { num: '01', label: 'A1 Intensive' },
  { num: '02', label: 'A2 Intensive' },
  { num: '03', label: 'B1 TEF/TCF' },
  { num: '04', label: 'B2 TEF/TCF' },
];

const INTENSIVE_BULLETS = [
  'Online + Live learning',
  'Designed specifically for learners aiming to rapidly achieve French proficiency for TEF Canada',
  'Flexible learning journey that accommodates your own schedule and speed',
  'With frequent live sessions, expert mentorship, and a vibrant community of fellow learners',
];

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

function ChapterBlock({ chapter }: { chapter: Chapter }) {
  const media = (
    <div className="chapter-media">
      <img src={chapter.image} alt="" loading="lazy" />
    </div>
  );

  const text = (
    <div className="chapter-text relative">
      <div className="chap-index">{chapter.index}</div>
      <span className="side-tag">{chapter.tag}</span>
      <div className="max-w-xl">
        <span className="level-badge">
          <span className="dot"></span> {chapter.badge}
        </span>
        <h2 className="course-title mt-6">{chapter.title}</h2>
        <p className="course-body">{chapter.body}</p>
        <div className="meta-row">
          <div className="meta-cell">
            <div className="meta-label">{chapter.metaLeftLabel}</div>
            <div className="meta-value">{chapter.metaLeftValue}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-label">{chapter.metaRightLabel}</div>
            <div className="meta-value">{chapter.metaRightValue}</div>
          </div>
        </div>
        <div className="mt-2">
          <a href={chapter.href} className="ssp-btn-primary">
            {chapter.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section className="chapter grid md:grid-cols-2">
      {chapter.imageLeft ? (
        <>
          {media}
          {text}
        </>
      ) : (
        <>
          {text}
          {media}
        </>
      )}
    </section>
  );
}

export default function StoryScrollPrograms() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>('[data-flow-section]')
    );
    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    sections.forEach((section, i) => {
      section.style.zIndex = String(i + 1);
      const inner = section.querySelector<HTMLElement>('.flow-art-container');
      if (!inner) return;
      if (i > 0) {
        gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
        const t = gsap.to(inner, {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
          },
        });
        tweens.push(t);
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      }
      if (i < sections.length - 1) {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          })
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
    };
  }, []);

  // Progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(100, Math.max(0, scrolled * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={rootRef} className="ssp-root">
      {/* Scroll progress */}
      <div className="ssp-progress">
        <div className="ssp-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* HERO */}
      <section className="ssp-hero">
        <div className="max-w-[1170px] mx-auto w-full">
          <div className="text-center">
            <span className="hero-kicker">Programs 2026</span>
          </div>
          <h1 className="hero-headline mt-6 text-center">
            Our <span className="gradient-text">TEF/TCF Specific</span>
            <br />
            <span className="gradient-text">French Programs</span>
          </h1>
          <p
            className="mt-8 max-w-3xl mx-auto text-center text-lg"
            style={{ color: '#4B5563' }}
          >
            Our French programs are specially designed for French learners for
            TEF/TCF/TEFAQ examinations — intensive courses paired with live
            sessions and expert mentorship.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#track-1" className="ssp-btn-primary">
              Explore Intensive Programs
            </a>
          </div>

          {/* chapter index strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#F3F4F6] pt-10">
            {HERO_INDEX.map((it) => (
              <div key={it.num}>
                <div className="text-xs tracking-[0.22em] uppercase text-[#6B7280] font-semibold">
                  {it.num}
                </div>
                <div className="ssp-display text-[#111827] mt-2 text-sm font-semibold">
                  {it.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-cue">
          <span>Scroll to begin</span>
          <span className="line"></span>
        </div>
      </section>

      {/* TRACK 1 INTRO + INTENSIVE VIDEO */}
      <section data-flow-section className="paper-flow">
        <div className="flow-art-container">
          <section id="track-1" className="track-header-compact paper">
            <div className="track-num-compact">01</div>
            <div className="track-intro-compact">
              <span className="level-badge">
                <span className="dot"></span> Track One — Live + Online
              </span>
              <h3 className="mt-5">
                Intensive Courses (Online Course + Live Sessions)
              </h3>
              <p>
                Accelerate your French learning with structured guidance, live
                sessions, and expert mentorship.
              </p>
            </div>

            {/* intensive program video card */}
            <div className="track-video-card">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                    Frenchify{' '}
                    <span className="gradient-text">Intensive Programs</span>
                  </h3>
                  <ul className="space-y-4 mb-8">
                    {INTENSIVE_BULLETS.map((b) => (
                      <li key={b} className="flex items-start">
                        <div className="bg-brand-blue/10 p-2 rounded-full mr-4 mt-0.5 flex-shrink-0 ring-1 ring-brand-blue/20">
                          <CheckCircle2
                            className="text-brand-blue w-4 h-4"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#chapter-01"
                    className="ssp-btn-primary inline-block"
                  >
                    Learn More
                  </a>
                </div>
                <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video shadow-lg">
                  <video
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source
                      src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6813e11ac9461a75076a2374.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* CHAPTER 1 */}
      <section data-flow-section>
        <div className="flow-art-container">
          <ChapterBlock chapter={CHAPTERS[0]} />
        </div>
      </section>

      {/* CHAPTER 2 */}
      <section data-flow-section className="paper-flow">
        <div className="flow-art-container">
          <ChapterBlock chapter={CHAPTERS[1]} />
        </div>
      </section>

      {/* CHAPTER 3 */}
      <section data-flow-section>
        <div className="flow-art-container">
          <ChapterBlock chapter={CHAPTERS[2]} />
        </div>
      </section>

      {/* CHAPTER 4 */}
      <section data-flow-section className="paper-flow">
        <div className="flow-art-container">
          <ChapterBlock chapter={CHAPTERS[3]} />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="ssp-why">
        <div className="max-w-[1170px] mx-auto">
          <div className="mb-12">
            <p className="why-eyebrow">WHY FRENCHIFY</p>
            <h2 className="ssp-why-title mt-3">
              What Makes <span className="gradient-text">Frenchify Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="why-card-v2">
              <h3 className="why-card-v2__title">
                <span className="why-card-v2__emoji" aria-hidden="true">🎓</span>
                Learn from Vyom Who Has Been There too
              </h3>
              <p className="why-card-v2__body">
                Frenchify was founded by Vyom, who personally went through the TEF Canada journey in 2021-22 and achieved CLB 7/8+. Since then, he has helped students do same.
              </p>
            </div>

            <div className="why-card-v2">
              <h3 className="why-card-v2__title">
                <span className="why-card-v2__emoji" aria-hidden="true">🚀</span>
                Complete Beginner to Exam-Ready in 9 to 10 Months
              </h3>
              <p className="why-card-v2__body">
                Frenchify&apos;s structured curriculum takes you from 0 to CLB 7+ in 9 to 10 months with consistent daily effort. CLB 5 prep takes about 4/5 months.
              </p>
            </div>

            <div className="why-card-v2 why-card-v2--highlight">
              <h3 className="why-card-v2__title">
                <span className="why-card-v2__emoji" aria-hidden="true">⭐</span>
                Proven Student Results
              </h3>
              <p className="why-card-v2__body">
                Many Frenchify students have achieved CLB 5+ &amp; CLB 7+ and fulfilled their PR goals. See the real results and success stories for yourself.
              </p>
              <a href="/results-page" className="why-card-v2__btn">
                View Student Results <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="why-card-v2">
              <h3 className="why-card-v2__title">
                <span className="why-card-v2__emoji" aria-hidden="true">🏆</span>
                Every Instructor is TEF Canada Certified
              </h3>
              <p className="why-card-v2__body">
                Every single Frenchify instructor has cleared the TEF Canada exam themselves. You will always learn from someone who has real exam experience, not just theory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-band">
        <div className="max-w-3xl mx-auto relative">
          <h2 className="ssp-cta-title text-white">
            Ready to Start Your French Journey?
          </h2>
          <p
            className="mt-5 text-lg"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
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
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .ssp-root {
          font-family: var(--font-inter), 'Inter', sans-serif;
          color: #252525;
          background: #ffffff;
          overflow-x: hidden;
        }
        .ssp-display {
          font-family: var(--font-display), 'Sora', sans-serif;
          letter-spacing: -0.02em;
        }

        /* Progress bar */
        .ssp-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 70;
          background: transparent;
          pointer-events: none;
        }
        .ssp-progress-bar {
          height: 100%;
          width: 0%;
          background: #2563eb;
          transition: width 0.1s linear;
        }

        /* Story-scroll flow sections */
        [data-flow-section] {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
        }
        [data-flow-section] .flow-art-container {
          transform-origin: bottom left;
          will-change: transform;
          min-height: 100vh;
          width: 100%;
          position: relative;
          background: #ffffff;
        }
        [data-flow-section].paper-flow .flow-art-container {
          background: #f9fafb;
        }

        /* Hero */
        .ssp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 6rem 2rem 6rem;
          background: #ffffff;
          overflow: hidden;
        }
        .ssp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(900px 500px at 20% 20%, rgba(37, 99, 235, 0.16), transparent 55%),
            radial-gradient(800px 450px at 80% 30%, rgba(245, 158, 11, 0.12), transparent 55%),
            radial-gradient(900px 500px at 50% 100%, rgba(37, 99, 235, 0.08), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .ssp-hero > * {
          position: relative;
          z-index: 1;
        }

        .hero-headline {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.025em;
          font-size: clamp(2.5rem, 7vw, 5.25rem);
          color: #111827;
        }

        .gradient-text {
          background-image: linear-gradient(90deg, #2563eb 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .hero-kicker {
          font-family: var(--font-inter), 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          font-size: 12px;
          font-weight: 600;
          color: #2563eb;
        }

        /* Scroll cue */
        .scroll-cue {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #6b7280;
          z-index: 2;
        }
        .scroll-cue .line {
          width: 1px;
          height: 56px;
          background: #e5e7eb;
          position: relative;
          overflow: hidden;
        }
        .scroll-cue .line::after {
          content: '';
          position: absolute;
          top: -56px;
          left: 0;
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, transparent, #2563eb);
          animation: cueDrop 2.2s ease-in-out infinite;
        }
        @keyframes cueDrop {
          0% {
            top: -56px;
          }
          100% {
            top: 56px;
          }
        }

        /* Chapter layout */
        .chapter {
          position: relative;
          min-height: 100vh;
        }
        .chapter-media {
          position: relative;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }
        .chapter-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .chapter-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(17, 24, 39, 0.08) 0%,
            rgba(17, 24, 39, 0) 30%,
            rgba(17, 24, 39, 0) 70%,
            rgba(17, 24, 39, 0.18) 100%
          );
          pointer-events: none;
        }
        .chapter-text {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 6rem 4rem;
        }
        [data-flow-section].paper-flow .chapter {
          background: #f9fafb;
        }
        @media (max-width: 900px) {
          .chapter-text {
            padding: 4rem 1.5rem;
            min-height: auto;
          }
          .chapter-media {
            position: relative;
            height: 60vh;
          }
        }

        /* Level badge */
        .level-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eff6ff;
          color: #2563eb;
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12px;
          letter-spacing: 0.02em;
          font-weight: 600;
          font-family: var(--font-inter), 'Inter', sans-serif;
        }
        .level-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #2563eb;
        }

        /* Buttons */
        .ssp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #2563eb;
          color: #ffffff;
          padding: 15px 32px;
          border-radius: 12px;
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.25s ease, background 0.25s ease,
            box-shadow 0.25s ease;
          box-shadow: 0 8px 20px -6px rgba(37, 99, 235, 0.35);
        }
        .ssp-btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 12px 28px -8px rgba(37, 99, 235, 0.45);
        }
        .ssp-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #2563eb;
          padding: 13px 32px;
          border-radius: 12px;
          border: 2px solid #2563eb;
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .ssp-btn-secondary:hover {
          background: #2563eb;
          color: #ffffff;
        }

        /* Track header */
        .track-header {
          background: #ffffff;
          color: #111827;
          padding: 8rem 2rem;
          text-align: center;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .track-header.paper {
          background: #f9fafb;
        }
        /* Compact track header (heading + video together) */
        .track-header-compact {
          background: #ffffff;
          color: #111827;
          padding: clamp(4rem, 9vw, 7rem) 1.5rem clamp(4rem, 8vw, 6rem);
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(2rem, 4vw, 3.5rem);
          position: relative;
        }
        .track-header-compact.paper {
          background: #f9fafb;
        }
        .track-num-compact {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(7rem, 18vw, 18rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: rgba(37, 99, 235, 0.05);
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .track-intro-compact {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          z-index: 1;
        }
        .track-intro-compact h3 {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(1.75rem, 3.6vw, 2.75rem);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #111827;
          margin-bottom: 1rem;
        }
        .track-intro-compact p {
          color: #4b5563;
          font-size: 17px;
          line-height: 1.6;
          max-width: 620px;
          margin: 0 auto;
        }
        .track-video-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #f3f4f6;
          border-radius: 1rem;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.12);
        }
        .track-num {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(8rem, 22vw, 22rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: rgba(37, 99, 235, 0.05);
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .track-intro {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          z-index: 1;
        }
        .track-intro h3 {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 4.6vw, 3.6rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #111827;
          margin-bottom: 1.25rem;
        }
        .track-intro p {
          color: #4b5563;
          font-size: 18px;
          line-height: 1.6;
          max-width: 640px;
          margin: 0 auto;
        }

        /* Why choose */
        .ssp-why {
          background: #f9fafb;
          padding: 6rem 1.5rem;
        }
        @media (max-width: 767px) {
          .ssp-why {
            padding-top: 50px;
            padding-bottom: 50px;
          }
        }
        @media (min-width: 1024px) {
          .ssp-why {
            padding: 6rem 2rem;
          }
        }
        .ssp-why-title {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-size: clamp(2.1rem, 4vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: #0c1d4e;
        }
        .why-eyebrow {
          font-family: var(--font-inter), 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          font-weight: 600;
          color: #2563eb;
          margin: 0;
        }
        .why-card-v2 {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          padding: 1.75rem 1.75rem 1.85rem;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .why-card-v2:hover {
          box-shadow: 0 18px 30px -10px rgba(0, 0, 0, 0.08),
            0 8px 14px -6px rgba(0, 0, 0, 0.06);
          transform: translateY(-3px);
        }
        .why-card-v2--highlight {
          background: #fef3c7;
          border-color: #fde68a;
        }
        .why-card-v2__title {
          font-family: var(--font-display), 'Sora', sans-serif;
          color: #0c1d4e;
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin: 0;
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
        }
        .why-card-v2__emoji {
          font-size: 1.25rem;
          line-height: 1.2;
          flex-shrink: 0;
        }
        .why-card-v2__body {
          color: #4b5563;
          line-height: 1.65;
          font-size: 0.95rem;
          margin: 0;
        }
        .why-card-v2__btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0c1d4e;
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          width: fit-content;
          margin-top: 0.25rem;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .why-card-v2__btn:hover {
          background: #14296b;
          transform: translateY(-1px);
        }

        /* Chapter ornament + course typography */
        .chap-index {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(4rem, 9vw, 9rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: rgba(37, 99, 235, 0.05);
          position: absolute;
          top: 6rem;
          right: 2rem;
          pointer-events: none;
        }
        .side-tag {
          position: absolute;
          top: 6rem;
          left: 2rem;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 600;
        }
        .course-title {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(2.1rem, 4vw, 3.25rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #111827;
          margin-bottom: 1rem;
        }
        .course-body {
          font-size: 17px;
          line-height: 1.65;
          color: #4b5563;
          max-width: 540px;
        }

        /* Meta row */
        .meta-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: transparent;
          border: 1px solid #f3f4f6;
          border-radius: 16px;
          overflow: hidden;
          margin: 2rem 0;
          box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.04);
        }
        .meta-cell {
          background: #ffffff;
          padding: 1.15rem 1.4rem;
        }
        .meta-cell + .meta-cell {
          border-left: 1px solid #f3f4f6;
        }
        .meta-label {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .meta-value {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #111827;
        }

        /* Final CTA */
        .cta-band {
          background: #111827;
          color: #ffffff;
          text-align: center;
          padding: 6rem 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .cta-band::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(900px 420px at 50% -10%, rgba(37, 99, 235, 0.25), transparent 60%),
            radial-gradient(700px 380px at 90% 100%, rgba(245, 158, 11, 0.1), transparent 60%);
          pointer-events: none;
        }
        .ssp-cta-title {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(2.1rem, 4.5vw, 3.5rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
        }

        @media (max-width: 768px) {
          .chap-index {
            display: none;
          }
          .side-tag {
            display: none;
          }
          .chapter-text {
            padding: 3rem 1.25rem 4rem;
          }
          .course-title {
            font-size: 1.85rem;
          }
          .course-body {
            font-size: 16px;
          }
          .ssp-hero {
            padding: 5rem 1.25rem 5rem;
          }
        }
      `}</style>
    </div>
  );
}
