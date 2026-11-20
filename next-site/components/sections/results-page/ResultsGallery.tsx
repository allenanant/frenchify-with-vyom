'use client';

import { Fragment, useState, useCallback, useEffect, type CSSProperties } from 'react';
import { ArrowUp, X, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';
import { WALL_LEVELS, WALL_LEVEL_LABELS, type WallLevel } from '@/lib/wall-levels';

type ResultsGalleryProps = {
  walls: Record<WallLevel, string[]>;
};

type Filter = 'all' | WallLevel;

// Text and colours for each wall. Class names are written out in full so
// Tailwind finds them (it does not scan lib/).
const SECTIONS: Record<
  WallLevel,
  { badge: string; heading: string; blurb: string; ping: string; dot: string; text: string; spacing: string }
> = {
  clb7: {
    badge: 'CLB 7+ Results',
    heading: 'Advanced Proficiency',
    blurb: 'These students achieved CLB 7 or higher, demonstrating exceptional French language proficiency',
    ping: 'bg-blue-400',
    dot: 'bg-blue-500',
    text: 'text-blue-700',
    spacing: 'mb-24',
  },
  clb5: {
    badge: 'CLB 5 Results',
    heading: 'Intermediate Success',
    blurb: 'Strong foundation results that open doors to Canadian immigration opportunities',
    ping: 'bg-emerald-400',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    spacing: 'mb-20',
  },
  'tcf-clb7': {
    badge: 'TCF CLB 7 Results',
    heading: 'TCF Canada: CLB 7',
    blurb: 'These students reached CLB 7 on the TCF Canada exam',
    ping: 'bg-indigo-400',
    dot: 'bg-indigo-500',
    text: 'text-indigo-700',
    spacing: 'mb-20',
  },
  'tcf-clb5': {
    badge: 'TCF CLB 5 Results',
    heading: 'TCF Canada: CLB 5',
    blurb: 'These students reached CLB 5 on the TCF Canada exam',
    ping: 'bg-teal-400',
    dot: 'bg-teal-500',
    text: 'text-teal-700',
    spacing: 'mb-20',
  },
};

export default function ResultsGallery({ walls }: ResultsGalleryProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<{ section: WallLevel; index: number } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // A wall with no images yet gets no filter button and no section.
  const filledLevels = WALL_LEVELS.filter((level) => walls[level].length > 0);
  const isShown = (level: WallLevel) => walls[level].length > 0 && (filter === 'all' || filter === level);

  const openLightbox = useCallback((section: WallLevel, index: number) => {
    setLightbox({ section, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigate = useCallback(
    (dir: number) => {
      setLightbox((prev) => {
        if (!prev) return prev;
        const arr = walls[prev.section];
        const next = (prev.index + dir + arr.length) % arr.length;
        return { ...prev, index: next };
      });
    },
    [walls]
  );

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, closeLightbox, navigate]);

  const filterBtn = (key: Filter, label: string) => (
    <button
      key={key}
      onClick={() => {
        setFilter(key);
        // Measure after React has hidden the other walls. Measured before,
        // the page is still long and the scroll lands near the footer.
        const targetLevel = key === 'all' ? filledLevels[0] : key;
        window.setTimeout(() => {
          const el = targetLevel ? document.getElementById(`${targetLevel}-section`) : null;
          if (el) window.scrollTo({ top: el.offsetTop - 150, behavior: 'smooth' });
        }, 50);
      }}
      className={`px-6 py-2.5 rounded-full font-medium text-sm border border-slate-200 transition-all ${
        filter === key
          ? 'bg-brand-blue text-white scale-105'
          : 'bg-slate-100 text-slate-700 hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  );

  const glassBadgeStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(37, 99, 235, 0.1)',
    color: '#2563eb',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const currentArray = lightbox ? walls[lightbox.section] : [];

  const renderSection = (level: WallLevel) => {
    const s = SECTIONS[level];
    const images = walls[level];
    return (
      <div className={`max-w-7xl mx-auto px-6 ${s.spacing}`} id={`${level}-section`}>
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-4" style={glassBadgeStyle}>
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${s.ping} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${s.dot}`} />
            </span>
            <span className={`text-sm font-bold tracking-wide ${s.text}`}>{s.badge}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 text-center tracking-tight">
            {s.heading}
          </h2>
          <p className="text-slate-600 mt-2 text-center max-w-xl">{s.blurb}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div
              key={src}
              onClick={() => openLightbox(level, i)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue/25 hover:border-brand-blue"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                loading="lazy"
                alt="Test Result"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
          <PrivacyResultCard />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Filter & Sort Controls */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-sm">
          <div className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-slate-500" aria-hidden />
            <span className="text-sm font-semibold text-slate-700">Filter by Level:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {filterBtn('all', 'All Results')}
            {filledLevels.map((level) => filterBtn(level, WALL_LEVEL_LABELS[level]))}
          </div>
        </div>
      </div>

      {/* One section per wall. The reviews widget stays after the first wall
          (CLB 7+), where it has always been. */}
      {WALL_LEVELS.map((level, i) => (
        <Fragment key={level}>
          {isShown(level) && renderSection(level)}
          {i === 0 && filter === 'all' && <ReviewWidget />}
        </Fragment>
      ))}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 transition-all hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.9)' }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 bg-white/90 text-slate-800 rounded-full flex items-center justify-center hover:bg-white shadow-lg z-20 transition-transform hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="absolute left-4 md:left-10 w-12 h-12 bg-white/90 text-slate-800 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            className="absolute right-4 md:right-10 w-12 h-12 bg-white/90 text-slate-800 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="p-4 max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentArray[lightbox.index]}
              alt="Result"
              className="max-h-[85vh] w-auto max-w-full rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="bg-white/80 text-slate-800 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md shadow-sm border border-white/40">
                {lightbox.index + 1} / {currentArray.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PrivacyResultCard() {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/60 bg-white/80 p-8 text-center shadow-md backdrop-blur-md">
      <p className="font-display text-2xl font-bold leading-relaxed text-slate-800">
        and more... (kept private due to personal privacy)
      </p>
    </div>
  );
}

function ReviewWidget() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://reputationhub.site/reputation/assets/review-widget.js"]'
    );
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-6 mb-24">
      <iframe
        className="lc_reviews_widget"
        src="https://reputationhub.site/reputation/widgets/review_widget/cmjlzerv4DUDyZFj6PYO"
        frameBorder="0"
        scrolling="no"
        style={{ minWidth: '100%', width: '100%' }}
      />
    </div>
  );
}
