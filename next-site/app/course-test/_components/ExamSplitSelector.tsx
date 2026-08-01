'use client';

import Link from 'next/link';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function ExamSplitSelector() {
  return (
    <div className="exam-split-root">
      <div className="split-wrap">
        <div className="split-question" aria-hidden="true">
          Which exam are you preparing for?
        </div>

        <Link href="/course-test/tef" className="split-panel panel-tef">
          <span className="panel-ghost panel-ghost-tef" aria-hidden="true">
            TEF
          </span>
          <div className="panel-inner">
            <span className="panel-pill panel-pill-tef">Most Popular</span>
            <div className="panel-acronym panel-acronym-tef">TEF</div>
            <div className="panel-exam">TEF Canada</div>
            <p className="panel-body">
              The exam most of our students take for Canadian PR — full journey
              from A1 to exam-ready B2.
            </p>
            <div className="panel-levels">
              {LEVELS.map((l) => (
                <span key={l} className="panel-level panel-level-tef">
                  {l}
                </span>
              ))}
            </div>
            <span className="panel-cta panel-cta-tef">
              See TEF Courses <ArrowIcon />
            </span>
          </div>
        </Link>

        <Link href="/course-test/tcf" className="split-panel panel-tcf">
          <span className="panel-ghost panel-ghost-tcf" aria-hidden="true">
            TCF
          </span>
          <div className="panel-inner">
            <span className="panel-pill panel-pill-tcf">Also IRCC Accepted</span>
            <div className="panel-acronym panel-acronym-tcf">TCF</div>
            <div className="panel-exam panel-exam-tcf">TCF Canada</div>
            <p className="panel-body panel-body-tcf">
              The same structured journey, tuned to the TCF format, question
              types, and timing.
            </p>
            <div className="panel-levels">
              {LEVELS.map((l) => (
                <span key={l} className="panel-level panel-level-tcf">
                  {l}
                </span>
              ))}
            </div>
            <span className="panel-cta panel-cta-tcf">
              See TCF Courses <ArrowIcon />
            </span>
          </div>
        </Link>
      </div>

      <style jsx global>{`
        .exam-split-root {
          font-family: var(--font-inter), 'Inter', sans-serif;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          padding-top: 68px;
        }

        .split-wrap {
          flex: 1;
          display: flex;
          position: relative;
          min-height: 0;
        }

        /* Floating question */
        .split-question {
          position: absolute;
          top: clamp(18px, 3.5vh, 36px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          padding: 12px 26px;
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.01em;
          color: #111827;
          white-space: nowrap;
          box-shadow: 0 14px 34px -14px rgba(17, 24, 39, 0.32);
          pointer-events: none;
        }

        /* Panels */
        .split-panel {
          flex: 1 1 0%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: clamp(2rem, 5vh, 4rem) clamp(1.5rem, 4vw, 4rem);
          transition: flex-grow 0.6s cubic-bezier(0.32, 0.72, 0.28, 1);
          text-decoration: none;
        }
        .split-panel:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: -3px;
        }

        .panel-tef {
          background: linear-gradient(135deg, #f7faff 0%, #edf3ff 100%);
        }
        .panel-tef::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(720px 460px at 22% 18%, rgba(37, 99, 235, 0.16), transparent 62%),
            radial-gradient(640px 420px at 82% 88%, rgba(37, 99, 235, 0.1), transparent 62%);
          transition: opacity 0.5s ease;
          opacity: 0.7;
          pointer-events: none;
        }

        .panel-tcf {
          background: linear-gradient(135deg, #0a1230 0%, #101c42 100%);
        }
        .panel-tcf::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(720px 460px at 78% 16%, rgba(245, 158, 11, 0.18), transparent 62%),
            radial-gradient(640px 420px at 18% 88%, rgba(37, 99, 235, 0.26), transparent 62%);
          transition: opacity 0.5s ease;
          opacity: 0.7;
          pointer-events: none;
        }

        /* Giant ghost acronym behind the content */
        .panel-ghost {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -54%);
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(16rem, 30vw, 30rem);
          line-height: 1;
          letter-spacing: -0.05em;
          pointer-events: none;
          user-select: none;
          transition: transform 0.7s cubic-bezier(0.32, 0.72, 0.28, 1);
        }
        .panel-ghost-tef {
          color: transparent;
          -webkit-text-stroke: 2px rgba(37, 99, 235, 0.07);
        }
        .panel-ghost-tcf {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.06);
        }

        .panel-inner {
          position: relative;
          z-index: 1;
          max-width: 480px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.32, 0.72, 0.28, 1);
        }

        /* Hover choreography (desktop, real pointers only) */
        @media (hover: hover) and (min-width: 901px) {
          .split-panel:hover {
            flex-grow: 1.35;
          }
          .split-panel:hover::before {
            opacity: 1;
          }
          .split-panel:hover .panel-ghost {
            transform: translate(-50%, -54%) scale(1.06);
          }
          .split-wrap:has(.split-panel:hover) .split-panel:not(:hover) .panel-inner {
            opacity: 0.45;
            transform: scale(0.95);
          }
        }

        .panel-pill {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 6px 15px;
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .panel-pill-tef {
          background: #ffffff;
          color: #2563eb;
          border: 1px solid #dbeafe;
          box-shadow: 0 6px 14px -8px rgba(37, 99, 235, 0.4);
        }
        .panel-pill-tcf {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .panel-acronym {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 0.92;
          font-size: clamp(4.5rem, 11vw, 10rem);
          margin-top: clamp(0.9rem, 2.2vh, 1.5rem);
        }
        .panel-acronym-tef {
          background-image: linear-gradient(120deg, #1d4ed8 0%, #3b82f6 70%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .panel-acronym-tcf {
          background-image: linear-gradient(120deg, #f59e0b 0%, #fbbf24 70%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .panel-exam {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(1.1rem, 1.7vw, 1.4rem);
          letter-spacing: -0.01em;
          color: #111827;
          margin-top: 8px;
        }
        .panel-exam-tcf {
          color: #ffffff;
        }

        .panel-body {
          color: #4b5563;
          font-size: 15.5px;
          line-height: 1.6;
          margin-top: 10px;
          max-width: 400px;
        }
        .panel-body-tcf {
          color: rgba(255, 255, 255, 0.72);
        }

        .panel-levels {
          display: flex;
          gap: 8px;
          margin-top: clamp(0.9rem, 2.2vh, 1.4rem);
          flex-wrap: wrap;
          justify-content: center;
        }
        .panel-level {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 7px 14px;
          border-radius: 999px;
        }
        .panel-level-tef {
          background: #ffffff;
          color: #2563eb;
          border: 1px solid #dbeafe;
          box-shadow: 0 4px 10px -4px rgba(37, 99, 235, 0.25);
        }
        .panel-level-tcf {
          background: rgba(255, 255, 255, 0.06);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.28);
        }

        .panel-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: clamp(1.4rem, 3.2vh, 2rem);
          padding: 14px 30px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15.5px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .panel-cta-tef {
          background: #2563eb;
          color: #ffffff;
          box-shadow: 0 10px 24px -8px rgba(37, 99, 235, 0.5);
        }
        .split-panel:hover .panel-cta-tef {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(37, 99, 235, 0.6);
        }
        .panel-cta-tcf {
          background: #f59e0b;
          color: #111827;
          box-shadow: 0 10px 24px -8px rgba(245, 158, 11, 0.45);
        }
        .split-panel:hover .panel-cta-tcf {
          background: #fbbf24;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(245, 158, 11, 0.55);
        }

        /* Stacked layout on mobile / narrow screens */
        @media (max-width: 900px) {
          .split-wrap {
            flex-direction: column;
          }
          .split-panel {
            min-height: calc((100svh - 68px) / 2);
            padding: 2rem 1.25rem;
          }
          .panel-tef {
            padding-top: 74px;
          }
          .split-question {
            top: 14px;
            font-size: 13px;
            padding: 10px 18px;
          }
          .panel-acronym {
            font-size: clamp(3.5rem, 16vw, 4.5rem);
          }
          .panel-body {
            font-size: 14px;
            max-width: 340px;
          }
          .panel-ghost {
            font-size: 15rem;
          }
          .panel-cta {
            padding: 12px 24px;
            font-size: 14.5px;
          }
        }
      `}</style>
    </div>
  );
}
