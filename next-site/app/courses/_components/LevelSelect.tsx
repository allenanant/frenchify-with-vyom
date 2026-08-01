'use client';

import Link from 'next/link';
import type { Track } from '../_data';

const ArrowIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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

const BackIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M11 19l-7-7 7-7" />
  </svg>
);

export default function LevelSelect({ track }: { track: Track }) {
  const dark = track.id === 'tcf';

  return (
    <div className={`level-root ${dark ? 'level-root-dark' : ''}`}>
      <div className="level-intro">
        <Link href="/courses" className="level-back">
          <BackIcon />
          Change exam
        </Link>
        <span className="level-exam-pill">{track.exam.toUpperCase()}</span>
        <h1 className="level-title">Choose your level</h1>
        <p className="level-sub">{track.sub}</p>
      </div>

      <div className="level-cols">
        {track.levels.map((lv, i) => (
          <Link
            key={lv.code}
            href={lv.href}
            className={`level-col ${i % 2 === 1 ? 'level-col-alt' : ''}`}
          >
            <div className="level-col-inner">
              <div className="level-acronym">{lv.code}</div>
              <div className="level-name">{lv.name}</div>
              <p className="level-blurb">{lv.blurb}</p>
              <div className="level-formats">
                {lv.formats.map((f) => (
                  <span key={f} className="level-format">
                    {f}
                  </span>
                ))}
              </div>
              <span className="level-cta">
                View {lv.code} Course <ArrowIcon size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        /* body already carries padding-top: 72px for the fixed header */
        .level-root {
          font-family: var(--font-inter), 'Inter', sans-serif;
          min-height: calc(100svh - 72px);
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }
        .level-root-dark {
          background: #0c1636;
        }

        /* Intro strip */
        .level-intro {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          padding: 26px 1.5rem 22px;
          text-align: center;
        }
        .level-back {
          position: absolute;
          left: clamp(1.25rem, 9vw, 135px);
          top: 26px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          color: #6b7280;
          transition: color 0.25s ease, border-color 0.25s ease;
          text-decoration: none;
        }
        .level-back:hover {
          color: #2563eb;
          border-color: #dbeafe;
        }
        .level-root-dark .level-back {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }
        .level-root-dark .level-back:hover {
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.4);
        }
        .level-exam-pill {
          display: inline-flex;
          border-radius: 999px;
          padding: 6px 15px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
        }
        .level-root-dark .level-exam-pill {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.3);
        }
        .level-title {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(1.9rem, 3.4vw, 2.4rem);
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #111827;
        }
        .level-root-dark .level-title {
          color: #ffffff;
        }
        .level-sub {
          font-size: 15.5px;
          color: #4b5563;
        }
        .level-root-dark .level-sub {
          color: rgba(255, 255, 255, 0.72);
        }

        /* Level columns */
        .level-cols {
          flex: 1;
          display: flex;
          min-height: 0;
        }
        .level-col {
          flex: 1 1 0%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2.5rem, 5vh, 4rem) 1.5rem;
          background: #ffffff;
          border-left: 1px solid #f3f4f6;
          transition: flex-grow 0.55s cubic-bezier(0.32, 0.72, 0.28, 1),
            background 0.4s ease;
          text-decoration: none;
        }
        .level-col:first-child {
          border-left: 0;
        }
        .level-col-alt {
          background: #f9fafb;
        }
        .level-root-dark .level-col {
          background: #0c1636;
          border-left-color: rgba(255, 255, 255, 0.08);
        }
        .level-root-dark .level-col-alt {
          background: #101d44;
        }
        .level-col:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: -3px;
        }

        .level-col-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 270px;
          width: 100%;
          transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.32, 0.72, 0.28, 1);
        }

        @media (hover: hover) and (min-width: 901px) {
          .level-col:hover {
            flex-grow: 1.22;
          }
          .level-cols:has(.level-col:hover) .level-col:not(:hover) .level-col-inner {
            opacity: 0.55;
            transform: scale(0.96);
          }
        }

        .level-acronym {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(3.4rem, 5.5vw, 4.5rem);
          letter-spacing: -0.045em;
          line-height: 1;
          color: #2563eb;
        }
        .level-root-dark .level-acronym {
          color: #f59e0b;
        }
        .level-name {
          font-family: var(--font-display), 'Sora', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: #111827;
          margin-top: 12px;
        }
        .level-root-dark .level-name {
          color: #ffffff;
        }
        .level-blurb {
          font-size: 14px;
          line-height: 1.55;
          color: #4b5563;
          margin-top: 8px;
        }
        .level-root-dark .level-blurb {
          color: rgba(255, 255, 255, 0.7);
        }
        .level-formats {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
        }
        .level-format {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 600;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
        }
        .level-root-dark .level-format {
          background: rgba(255, 255, 255, 0.06);
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.28);
        }
        .level-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          padding: 11px 22px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          background: #2563eb;
          color: #ffffff;
          box-shadow: 0 8px 20px -8px rgba(37, 99, 235, 0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .level-col:hover .level-cta {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 12px 26px -8px rgba(37, 99, 235, 0.6);
        }
        .level-root-dark .level-cta {
          background: #f59e0b;
          color: #111827;
          box-shadow: 0 8px 20px -8px rgba(245, 158, 11, 0.45);
        }
        .level-root-dark .level-col:hover .level-cta {
          background: #fbbf24;
          box-shadow: 0 12px 26px -8px rgba(245, 158, 11, 0.55);
        }

        /* Mobile: stacked level cards */
        @media (max-width: 900px) {
          .level-intro {
            padding-top: 64px;
          }
          .level-back {
            top: 14px;
            left: 1.25rem;
          }
          .level-cols {
            flex-direction: column;
          }
          .level-col {
            border-left: 0;
            border-top: 1px solid #f3f4f6;
            padding: 2.25rem 1.25rem;
          }
          .level-root-dark .level-col {
            border-top-color: rgba(255, 255, 255, 0.08);
          }
          .level-col:first-child {
            border-top: 0;
          }
        }
      `}</style>
    </div>
  );
}
