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
      <div className="split-intro">
        <span className="split-kicker">Frenchify Courses</span>
        <h1 className="split-headline">
          Which exam are you <span className="split-gradient">preparing for?</span>
        </h1>
        <p className="split-sub">
          Both are accepted by IRCC for Canadian PR. Pick your exam to see the
          courses built for it.
        </p>
      </div>

      <div className="split-wrap">
        <Link href="/course-test/tef" className="split-panel panel-tef">
          <div className="panel-inner">
            <span className="panel-pill panel-pill-tef">Most Popular</span>
            <div className="panel-acronym">TEF</div>
            <div className="panel-exam">TEF Canada</div>
            <p className="panel-body">
              The exam most Frenchify students take for Canadian PR. Full journey
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

        <div className="split-divider" aria-hidden="true">
          <span>OR</span>
        </div>

        <Link href="/course-test/tcf" className="split-panel panel-tcf">
          <div className="panel-inner">
            <span className="panel-pill panel-pill-tcf">Also IRCC Accepted</span>
            <div className="panel-acronym panel-acronym-tcf">TCF</div>
            <div className="panel-exam panel-exam-tcf">TCF Canada</div>
            <p className="panel-body panel-body-tcf">
              The same structured journey, with prep tuned to the TCF exam format,
              question types, and timing.
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

        .split-intro {
          text-align: center;
          padding: clamp(2rem, 4.5vh, 3.5rem) 1.5rem clamp(1.5rem, 3vh, 2.5rem);
        }
        .split-kicker {
          text-transform: uppercase;
          letter-spacing: 0.28em;
          font-size: 12px;
          font-weight: 600;
          color: #2563eb;
        }
        .split-headline {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.05;
          font-size: clamp(2rem, 4.2vw, 3.25rem);
          color: #111827;
          margin-top: 14px;
        }
        .split-gradient {
          background-image: linear-gradient(90deg, #2563eb 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .split-sub {
          margin: 14px auto 0;
          max-width: 560px;
          color: #4b5563;
          font-size: 16px;
          line-height: 1.6;
        }

        .split-wrap {
          flex: 1;
          display: flex;
          position: relative;
          min-height: 0;
        }

        .split-panel {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 4vw, 4rem);
          transition: flex-grow 0.55s cubic-bezier(0.32, 0.72, 0.28, 1);
          text-decoration: none;
        }
        @media (min-width: 901px) {
          .split-panel:hover {
            flex-grow: 1.25;
          }
        }

        .panel-tef {
          background: #f8faff;
        }
        .panel-tef::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(700px 420px at 25% 20%, rgba(37, 99, 235, 0.14), transparent 60%),
            radial-gradient(600px 400px at 80% 90%, rgba(37, 99, 235, 0.08), transparent 60%);
          transition: opacity 0.5s ease;
          opacity: 0.75;
          pointer-events: none;
        }
        .panel-tef:hover::before {
          opacity: 1;
        }

        .panel-tcf {
          background: #0b1533;
        }
        .panel-tcf::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(700px 420px at 75% 20%, rgba(245, 158, 11, 0.16), transparent 60%),
            radial-gradient(600px 400px at 20% 90%, rgba(37, 99, 235, 0.22), transparent 60%);
          transition: opacity 0.5s ease;
          opacity: 0.75;
          pointer-events: none;
        }
        .panel-tcf:hover::before {
          opacity: 1;
        }

        .panel-inner {
          position: relative;
          z-index: 1;
          max-width: 460px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .panel-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12px;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        .panel-pill-tef {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
        }
        .panel-pill-tcf {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .panel-acronym {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.95;
          font-size: clamp(4.5rem, 10vw, 8.5rem);
          color: #2563eb;
          margin-top: clamp(1rem, 2.5vh, 1.75rem);
          transition: transform 0.55s cubic-bezier(0.32, 0.72, 0.28, 1);
        }
        .panel-acronym-tcf {
          color: #f59e0b;
        }
        .split-panel:hover .panel-acronym {
          transform: scale(1.05);
        }

        .panel-exam {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(1.15rem, 1.8vw, 1.5rem);
          letter-spacing: -0.01em;
          color: #111827;
          margin-top: 10px;
        }
        .panel-exam-tcf {
          color: #ffffff;
        }

        .panel-body {
          color: #4b5563;
          font-size: 15.5px;
          line-height: 1.65;
          margin-top: 12px;
          max-width: 400px;
        }
        .panel-body-tcf {
          color: rgba(255, 255, 255, 0.72);
        }

        .panel-levels {
          display: flex;
          gap: 8px;
          margin-top: 20px;
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
          margin-top: 28px;
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

        .split-divider {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 58px;
          height: 58px;
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px -10px rgba(17, 24, 39, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .split-divider span {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: #6b7280;
        }

        @media (max-width: 900px) {
          .split-wrap {
            flex-direction: column;
          }
          .split-panel {
            min-height: 52svh;
            padding: 3.5rem 1.5rem;
          }
          .split-divider {
            width: 48px;
            height: 48px;
          }
          .split-divider span {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
