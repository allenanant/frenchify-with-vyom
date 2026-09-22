'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, BookOpen, Compass, Flag, MousePointer2, Pause, Play, RotateCcw, Route } from 'lucide-react';
import { TRACKS } from '../_data';
import { MapLandscape, Traveller } from './JourneyArt';
import styles from './CourseJourney.module.css';

type StopId = 'a1' | 'a2' | 'tef-b1' | 'tef-b2' | 'tcf-b1' | 'tcf-b2';
type Stop = { id: StopId; code: string; title: string; detail: string; href: string; x: number; y: number; track: 'foundation' | 'tef' | 'tcf' };
const STOPS: Stop[] = [
  { id: 'a1', code: 'A1', title: 'A1', detail: 'Your first words. Your first wins.', href: TRACKS.tef.levels[0].href, x: 210, y: 300, track: 'foundation' },
  { id: 'a2', code: 'A2', title: 'A2', detail: 'Turn the basics into conversations.', href: TRACKS.tef.levels[1].href, x: 440, y: 300, track: 'foundation' },
  { id: 'tef-b1', code: 'B1', title: 'Exam Prep 1', detail: 'Build your TEF exam skills.', href: TRACKS.tef.levels[2].href, x: 850, y: 182, track: 'tef' },
  { id: 'tef-b2', code: 'B2', title: 'Final Exam Prep', detail: 'Fine-tune. Practise. Feel ready.', href: TRACKS.tef.levels[3].href, x: 1150, y: 182, track: 'tef' },
  { id: 'tcf-b1', code: 'B1', title: 'Exam Prep 1', detail: 'Build your TCF exam skills.', href: TRACKS.tcf.levels[2].href, x: 850, y: 504, track: 'tcf' },
  { id: 'tcf-b2', code: 'B2', title: 'Final Exam Prep', detail: 'Fine-tune. Practise. Feel ready.', href: TRACKS.tcf.levels[3].href, x: 1150, y: 504, track: 'tcf' },
];
const ROADS = {
  foundation: 'M80 300H590',
  tef: 'M590 300C674 300 673 182 760 182H1320',
  tcf: 'M590 300C674 300 673 504 760 504H1320',
};
type MapPoint = { x: number; y: number; lane: Stop['track'] };

function MobileStop({ stop }: { stop: Stop }) {
  return <li className={`${styles.mobileStop} ${stop.track === 'tcf' ? styles.mobileTeal : ''}`}>
    <span className={styles.mobileCoin} aria-hidden="true">{stop.code}</span>
    <div className={styles.mobileCourse}>
      <h3>{stop.title}{stop.track !== 'foundation' && <span>{stop.code}</span>}</h3>
      <p>{stop.detail}</p>
      <Link href={stop.href} prefetch={false} className={styles.courseLink}
        aria-label={`${stop.track === 'foundation' ? '' : stop.track.toUpperCase() + ' Canada: '}${stop.title}, view course`}>
        Explore course <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  </li>;
}

export default function CourseJourney() {
  const [mobileTrack, setMobileTrack] = useState<'tef' | 'tcf'>('tef');
  const [active, setActive] = useState<StopId | null>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const traveller = useRef<SVGGElement>(null);
  const route = useRef<SVGPathElement>(null);
  const frame = useRef(0);
  const tour = useRef<ReturnType<typeof setTimeout>[]>([]);
  const point = useRef<MapPoint>({ x: 96, y: 300, lane: 'foundation' });
  const reduced = useRef(false);
  const pausedRef = useRef(false);
  const generation = useRef(0);

  const stopMotion = useCallback(() => {
    cancelAnimationFrame(frame.current);
    tour.current.forEach(clearTimeout);
    tour.current = [];
    traveller.current?.classList.remove(styles.walking);
    generation.current += 1;
  }, []);

  const moveTo = useCallback((id: StopId) => {
    const stop = STOPS.find((item) => item.id === id)!;
    setActive(id);
    if (reduced.current || pausedRef.current || !traveller.current || !route.current) return;
    cancelAnimationFrame(frame.current);
    const from = point.current;
    const to: MapPoint = { x: stop.x - 72, y: stop.y, lane: stop.track };
    // Travel back through the junction when crossing between exam branches.
    // This also starts from the current position when a hover interrupts a trip.
    let d = `M${from.x} ${from.y}`;
    if (from.lane === to.lane) {
      d += `L${to.x} ${to.y}`;
    } else {
      if (from.lane !== 'foundation') {
        const bend = Math.min(from.x, 760);
        d += `L${bend} ${from.y}C673 ${from.y} 674 300 590 300`;
      } else {
        d += 'L590 300';
      }
      if (to.lane === 'foundation') d += `L${to.x} 300`;
      else d += `C674 300 673 ${to.y} 760 ${to.y}L${to.x} ${to.y}`;
    }
    route.current.setAttribute('d', d);
    const length = route.current.getTotalLength();
    const duration = Math.max(420, Math.min(3200, length * 3.2));
    let started = 0;
    let previousX = from.x;
    traveller.current.classList.add(styles.walking);
    const draw = (now: number) => {
      if (!route.current || !traveller.current) return;
      if (!started) started = now;
      const progress = Math.min((now - started) / duration, 1);
      const p = route.current.getPointAtLength(length * progress);
      const facing = p.x < previousX - .1 ? -1 : p.x > previousX + .1 ? 1 : undefined;
      traveller.current.setAttribute('transform', `translate(${p.x} ${p.y - 10})`);
      if (facing) traveller.current.style.setProperty('--facing', `${facing}`);
      previousX = p.x;
      point.current = { x: p.x, y: p.y, lane: Math.abs(p.y - 300) < 3 && p.x < 610 ? 'foundation' : p.y < 300 ? 'tef' : 'tcf' };
      if (progress < 1) frame.current = requestAnimationFrame(draw);
      else {
        point.current = to;
        traveller.current.classList.remove(styles.walking);
      }
    };
    frame.current = requestAnimationFrame(draw);
  }, []);

  const startTour = useCallback(() => {
    stopMotion();
    setPaused(false);
    pausedRef.current = false;
    if (reduced.current) { setActive('a1'); return; }
    point.current = { x: 96, y: 300, lane: 'foundation' };
    traveller.current?.setAttribute('transform', 'translate(96 290)');
    traveller.current?.style.setProperty('--facing', '1');
    setPlaying(true);
    const sequence: [StopId, number][] = [['a1', 0], ['a2', 1000], ['tef-b1', 2800], ['tef-b2', 5600], ['tcf-b1', 8000], ['tcf-b2', 11700]];
    const currentGeneration = generation.current;
    sequence.forEach(([id, delay]) => {
      tour.current.push(setTimeout(() => {
        if (generation.current === currentGeneration) moveTo(id);
      }, delay));
    });
    tour.current.push(setTimeout(() => { setPlaying(false); setActive(null); }, 13900));
  }, [moveTo, stopMotion]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 1280px)');
    const sync = () => {
      reduced.current = preference.matches || !desktop.matches;
      if (reduced.current) { stopMotion(); setPlaying(false); }
    };
    sync();
    preference.addEventListener('change', sync);
    desktop.addEventListener('change', sync);
    const intro = setTimeout(() => { if (!reduced.current) startTour(); }, 900);
    tour.current.push(intro);
    const onVisibility = () => { if (document.hidden) { stopMotion(); setPlaying(false); } };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearTimeout(intro);
      stopMotion();
      preference.removeEventListener('change', sync);
      desktop.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [startTour, stopMotion]);

  const visit = (id: StopId) => { stopMotion(); setPlaying(false); moveTo(id); };
  const activeTrack = STOPS.find((stop) => stop.id === active)?.track;

  return (
    <section className={styles.journey} aria-labelledby="journey-heading">
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}><span className={styles.flag}><i /><i /><i /></span> A LITTLE FRENCH. A WORLD OF POSSIBILITIES.</p>
          <h1 id="journey-heading">Your French journey.<br /><span>One step at a time.</span></h1>
        </div>
        <div className={styles.introAside}>
          <p>Start with the basics. Find your exam path.<br />Get ready for your next big chapter.</p>
          <span><MousePointer2 size={15} /> Pick any course on the map to explore.</span>
        </div>
      </div>

      <div className={styles.mapSection}>
        <div className={styles.mapTopline}>
          <div className={styles.mapLabel}><Route size={17} /><span>YOUR LEARNING MAP</span><span className={styles.mapLabelRule} /><span className={styles.levelRange}>A1 to B2</span></div>
          <button type="button" className={styles.tourButton} onClick={() => {
            if (playing) { stopMotion(); setPlaying(false); setPaused(true); pausedRef.current = true; }
            else startTour();
          }} aria-label={playing ? 'Pause journey animation' : paused ? 'Play journey animation' : 'Replay journey animation'}>
            {playing ? <Pause size={13} /> : paused ? <Play size={13} /> : <RotateCcw size={13} />}
            {playing ? 'Pause journey' : paused ? 'Play journey' : 'Replay journey'}
          </button>
        </div>

        <div className={styles.map} data-active-track={activeTrack || 'none'}>
          <svg className={styles.landscape} viewBox="0 0 1440 710" fill="none" aria-hidden="true">
            <MapLandscape />
            {Object.entries(ROADS).map(([id, d]) => <g key={id}>
              <path d={d} stroke={id === 'tcf' ? '#d6e5de' : '#d7e1ec'} strokeWidth="24" strokeLinecap="round" />
              <path d={d} stroke="#fcfdfe" strokeWidth="19" strokeLinecap="round" />
              <path d={d} className={`${styles.roadLine} ${id === 'tcf' ? styles.tealRoad : ''} ${activeTrack === id || id === 'foundation' ? styles.litRoad : ''}`} strokeWidth="3" strokeDasharray="3 12" strokeLinecap="round" />
            </g>)}
            <circle cx="590" cy="300" r="9" fill="#f8fafc" stroke="#b0c2d5" strokeWidth="3" />
          </svg>

          <div className={styles.startLabel}><span /> START HERE</div>
          <div className={`${styles.trackLabel} ${styles.tefLabel}`}><span>TEF</span><span>CANADA PATH</span><ArrowRight size={15} /></div>
          <div className={`${styles.trackLabel} ${styles.tcfLabel}`}><span>TCF</span><span>CANADA PATH</span><ArrowRight size={15} /></div>

          {STOPS.map((stop) => (
            <Link key={stop.id} href={stop.href} prefetch={false}
              className={`${styles.stop} ${stop.track === 'tcf' ? styles.tealStop : ''} ${stop.track === 'foundation' ? styles.foundationStop : ''} ${active === stop.id ? styles.activeStop : ''}`}
              style={{ left: `${stop.x / 14.4}%`, top: `${stop.y / 7.1}%` }}
              aria-label={`${stop.track === 'foundation' ? '' : stop.track.toUpperCase() + ' Canada: '}${stop.title}${stop.track === 'foundation' ? '' : ` (${stop.code})`}, view course`}
              onMouseEnter={() => visit(stop.id)} onFocus={() => visit(stop.id)}
              onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)}>
              <span className={styles.coin}><span className={styles.coinInset}>{stop.code}</span><span className={styles.coinGlint} /></span>
              <span className={styles.stopTitle}>{stop.title}{stop.track !== 'foundation' && <span className={styles.levelCode}>{stop.code}</span>}</span>
              <span className={styles.stopDetail}>{stop.detail}</span>
              <span className={styles.courseLink}>Explore course <ArrowRight size={14} /></span>
            </Link>
          ))}

          <div className={styles.foundationNote}>A shared foundation for <strong>both exams.</strong></div>
          <div className={styles.junctionNote}><ArrowDownRight size={22} /><span>Your path splits here.<br /><strong>Choose after A2.</strong></span></div>
          <div className={styles.finishNote}>YOUR NEXT<br /><strong>BIG CHAPTER</strong></div>

          <svg className={styles.travellerLayer} viewBox="0 0 1440 710" fill="none" aria-hidden="true">
            <path ref={route} d="M96 300H138" visibility="hidden" />
            <Traveller ref={traveller} />
          </svg>
          <div className={styles.mapFootnote}><Compass size={15} /> Your pace. Your path. Your French adventure.</div>
        </div>

        <div className={styles.mobileMap}>
          <section className={styles.mobileFoundation} aria-labelledby="foundation-heading">
            <p className={styles.mobileEyebrow}>START HERE</p>
            <h2 id="foundation-heading">Build your foundation</h2>
            <p className={styles.mobileDescription}>A shared start for both exams.</p>
            <ol className={styles.mobileStops}>
              {STOPS.filter(stop => stop.track === 'foundation').map(stop => <MobileStop key={stop.id} stop={stop} />)}
            </ol>
          </section>
          <div className={styles.mobileFork}>
            <svg viewBox="0 0 300 56" fill="none" aria-hidden="true"><path d="M150 0V16Q150 28 136 28H56Q42 28 42 44V56M150 16Q150 28 164 28H244Q258 28 258 44V56" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" /></svg>
            <h2>Choose your exam path</h2>
            <p>After A2, follow TEF or TCF Canada.</p>
          </div>
          <div className={styles.mobileTrackPicker} role="group" aria-label="Choose your exam path">
            {(['tef', 'tcf'] as const).map(track => <button key={track} type="button"
              className={track === 'tcf' ? styles.tcfChoice : styles.tefChoice}
              aria-pressed={mobileTrack === track} aria-controls="mobile-exam-path" onClick={() => setMobileTrack(track)}>
              <strong>{track.toUpperCase()}</strong><span>Canada path</span>
            </button>)}
          </div>
          <section id="mobile-exam-path" className={`${styles.mobileBranch} ${mobileTrack === 'tcf' ? styles.mobileTealBranch : ''}`} aria-labelledby="mobile-exam-heading">
            <h2 id="mobile-exam-heading">{mobileTrack.toUpperCase()} Canada <span>YOUR EXAM PATH</span></h2>
            <ol className={styles.mobileStops}>
              {STOPS.filter(stop => stop.track === mobileTrack).map(stop => <MobileStop key={stop.id} stop={stop} />)}
            </ol>
            <p className={styles.mobileFinish}><Flag size={16} aria-hidden="true" /> Ready for your next big chapter.</p>
          </section>
        </div>

        <div className={styles.steps} aria-label="How the course journey works">
          <div className={styles.step}><span className={styles.stepNumber}>01</span><div><h2>Build your foundation</h2><p>A1 + A2. The same start for everyone.</p></div></div>
          <div className={styles.step}><span className={styles.stepNumber}>02</span><div><h2>Choose your exam</h2><p>TEF or TCF. Decide once your basics are strong.</p></div></div>
          <div className={styles.step}><span className={styles.stepNumber}>03</span><div><h2>Make it exam-ready</h2><p>Exam Prep 1 (B1) → Final Exam Prep (B2).</p></div><Flag size={23} className={styles.stepFlag} /></div>
        </div>
      </div>

      <div className={styles.help}>
        <div className={styles.helpIcon}><BookOpen size={23} /></div>
        <div><h2>Already know a little French?</h2><p>You can join at your level. We’ll help you find the right starting point.</p></div>
        <Link href="/contact" prefetch={false}>Find my starting point <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
