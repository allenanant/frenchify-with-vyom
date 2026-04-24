'use client';

import { useState, useCallback, useEffect, type CSSProperties } from 'react';
import { CheckCircle2, ArrowUp, X, ChevronLeft, ChevronRight } from 'lucide-react';

const clb7Images = [
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8b.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8c.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf190683601a10238d.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4cce80b446d0fb62a8f3.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfb935a2d764b020ab.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfb935a2d764b020b2.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf1605aaccae17a99e.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf190683601a10238c.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/698fda91899b8843c9757497.jpeg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/698f52a71afc8eebb797f377.jpeg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab22b4f0f19b4cd135e.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b5444d77392d.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cc792f2a3c1ec7dc.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b5efe277392e.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cc792f6bae1ec7dd.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab22b4f0f67eacd135d.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cef1010936ac866c.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b5fbf177392b.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab22dd5fdf1e8555c79.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d783877f83ca.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2f8a93b452443d49b.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cef1013a1aac866d.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d700f97f83d0.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2f13bc3ad1918d6eb.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b58d8c77392c.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d786007f83cb.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d738577f83cc.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2f13bc3828f18d6ec.png',
];

const clb5Images = [
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de445244bd271f55917fce.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452f3d637abac0f3dd8.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452f3d637abac0f3dd7.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452add632fcdc742315.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de445280b446d0fb60a10a.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452e7237c4dd3f9c616.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452acf21ea88ace86f8.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de44523d44725644782ff5.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de44523d44725644782ff6.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452acf21ea88ace86f7.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452f3d637abac0f3dd9.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de445244bd271f55917fcf.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4452e7237c4dd3f9c617.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba899b8849548d18ad.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba36a3929a03348d4e.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba24813c558f7d8aa9.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbac086650437d76763.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba36a3921eaa348d4d.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba36a392777d348d4f.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba24813c77b97d8aa7.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba899b88d8e88d18b7.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba24813c1c637d8aaa.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba899b88bc728d18b3.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba899b882ed38d18b2.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba36a3920d7b348d50.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba24813c24fb7d8ab0.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba899b8850408d18b6.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbac08665a909d76764.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba899b8866fc8d18b5.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba24813c346b7d8aac.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb36a392144b348d62.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb008498f787732b82.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb36a392db97348d63.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba24813c4f067d8aa8.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbbc0866553add76783.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb008498dc98732b83.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbbc086650f90d76780.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbbc086651a4fd76781.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb36a392cf05348d64.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba36a39254f3348d51.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba24813cf98e7d8aab.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb899b88789b8d18ca.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba899b8861df8d18b4.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acba008498e0b6732b65.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbbc086659b52d7677f.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb24813c981c7d8ac4.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6990acbb008498cc7f732b81.jpg',
];

type Filter = 'all' | 'clb7' | 'clb5';

export default function ResultsGallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<{ section: 'clb7' | 'clb5'; index: number } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const showClb7 = filter === 'all' || filter === 'clb7';
  const showClb5 = filter === 'all' || filter === 'clb5';

  const openLightbox = useCallback((section: 'clb7' | 'clb5', index: number) => {
    setLightbox({ section, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigate = useCallback(
    (dir: number) => {
      setLightbox((prev) => {
        if (!prev) return prev;
        const arr = prev.section === 'clb7' ? clb7Images : clb5Images;
        const next = (prev.index + dir + arr.length) % arr.length;
        return { ...prev, index: next };
      });
    },
    []
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

  const filterBtn = (key: Filter, label: string, count: string) => (
    <button
      onClick={() => {
        setFilter(key);
        const targetId =
          key === 'clb5' ? 'clb5-section' : 'clb7-section';
        const el = document.getElementById(targetId);
        if (el) window.scrollTo({ top: el.offsetTop - 150, behavior: 'smooth' });
      }}
      className={`px-6 py-2.5 rounded-full font-medium text-sm border border-slate-200 transition-all ${
        filter === key
          ? 'bg-brand-blue text-white scale-105'
          : 'bg-slate-100 text-slate-700 hover:bg-blue-50'
      }`}
    >
      {label} <span className="ml-1 text-xs opacity-70">({count})</span>
    </button>
  );

  const glassBadgeStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(37, 99, 235, 0.1)',
    color: '#2563eb',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const currentArray = lightbox ? (lightbox.section === 'clb7' ? clb7Images : clb5Images) : [];

  return (
    <>
      {/* Filter & Sort Controls */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-filter text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Filter by Level:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {filterBtn('all', 'All Results', '75')}
            {filterBtn('clb7', 'CLB 7+', '28')}
            {filterBtn('clb5', 'CLB 5', '47')}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="text-emerald-500 w-4 h-4" />
            <span className="font-medium">Updated Daily</span>
          </div>
        </div>
      </div>

      {/* CLB 7 SECTION */}
      {showClb7 && (
        <div className="max-w-7xl mx-auto px-6 mb-24" id="clb7-section">
          <div className="flex flex-col items-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-4"
              style={glassBadgeStyle}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
              </span>
              <span className="text-sm font-bold tracking-wide text-blue-700">CLB 7+ Results</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 text-center tracking-tight">
              Advanced Proficiency
            </h2>
            <p className="text-slate-600 mt-2 text-center max-w-xl">
              These students achieved CLB 7 or higher, demonstrating exceptional French language proficiency
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clb7Images.map((src, i) => (
              <div
                key={src}
                onClick={() => openLightbox('clb7', i)}
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
          </div>
        </div>
      )}

      {/* Testimonial Carousel Section - reviews widget stays between sections */}
      {filter === 'all' && <ReviewWidget />}

      {/* CLB 5 SECTION */}
      {showClb5 && (
        <div className="max-w-7xl mx-auto px-6 mb-20" id="clb5-section">
          <div className="flex flex-col items-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-4"
              style={glassBadgeStyle}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-sm font-bold tracking-wide text-emerald-700">CLB 5 Results</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 text-center tracking-tight">
              Intermediate Success
            </h2>
            <p className="text-slate-600 mt-2 text-center max-w-xl">
              Strong foundation results that open doors to Canadian immigration opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clb5Images.map((src, i) => (
              <div
                key={src}
                onClick={() => openLightbox('clb5', i)}
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
          </div>
        </div>
      )}

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
