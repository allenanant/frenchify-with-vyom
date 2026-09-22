import { forwardRef } from 'react';
import styles from './CourseJourney.module.css';

export function Tree({ x, y, scale = 1, blue = false }: { x: number; y: number; scale?: number; blue?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cy="7" rx="24" ry="7" fill="#bfccc8" opacity=".24" />
      <path d="M0 0V-50" stroke="#8b9d98" strokeWidth="5" strokeLinecap="round" />
      <path d="M-25-17 0-58 25-17Z" fill={blue ? '#a9c7e3' : '#9cbbad'} />
      <path d="M-21-32 0-70 21-32Z" fill={blue ? '#bfd6e9' : '#bdd1c0'} />
      <path d="M-16-46 0-78 16-46Z" fill={blue ? '#d7e5f0' : '#d1dfcd'} />
    </g>
  );
}

export function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={styles.cloud}>
      <path d="M0 24C-3 9 11 1 23 8 25-13 59-18 66 6 88-2 101 15 92 28H7Q0 28 0 24Z" fill="#fcfdfe" stroke="#e4ecf0" strokeWidth="1.4" />
    </g>
  );
}

export function Cafe() {
  return (
    <g transform="translate(104 90) rotate(-5)" aria-hidden="true">
      <ellipse cx="45" cy="109" rx="74" ry="12" fill="#d3dfdf" opacity=".4" />
      <path d="M-10 20 95 20 95 104-10 104Z" fill="#f9f5ed" stroke="#b7c5d1" strokeWidth="2" />
      <path d="M-17 20 100 20 89 3 0 3Z" fill="#91adc4" />
      <path d="M3 2 3-5 82-5 82 3" fill="#c9d7df" />
      <rect x="11" y="31" width="66" height="17" rx="3" fill="#e5eced" />
      <text x="44" y="43" textAnchor="middle" fontSize="10" letterSpacing="2" fontWeight="700" fill="#59758a">BONJOUR</text>
      <path d="M-15 56 97 56 103 72-21 72Z" fill="#719ec5" />
      <path d="M-3 56 9 56 7 72-7 72ZM21 56H33V72H19ZM45 56H57L59 72H45ZM69 56H81L87 72H73Z" fill="#f8fafb" />
      <path d="M-21 72h124v7q-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-12 0Z" fill="#d8e5ef" />
      <rect x="29" y="81" width="25" height="23" rx="2" fill="#9db9ce" />
      <path d="M41 82v22" stroke="#eff5f7" strokeWidth="2" />
      <path d="M1 87h16v13H1ZM68 87h16v13H68Z" fill="#c3d7e4" />
      <path d="M-29 105V91m-8 0h16m85 21h21m-11-1V91m-6 0h12" stroke="#8daba6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-29" cy="90" r="10" fill="#b6cbb7" />
    </g>
  );
}

export function EiffelTower() {
  return (
    <g transform="translate(424 48) rotate(8)" fill="none" stroke="#b6c9d7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="0" cy="137" rx="53" ry="7" fill="#e3eaf0" stroke="none" />
      <path d="M0 0v14m-5 0h10M-4 15C-5 63-16 101-38 134h19q19-39 38 0h19C16 100 5 62 4 15ZM-15 77h30M-22 97h44M-11 56h22M-9 43h18M-16 77 8 56M16 77-8 56M-23 97 13 77M23 97-13 77" />
      <path d="M-27 98h54M-18 78h36" strokeWidth="5" />
    </g>
  );
}

export function FinishFlag({ x, y, teal = false }: { x: number; y: number; teal?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cy="8" rx="30" ry="8" fill={teal ? '#d6e9df' : '#dde6f3'} />
      <path d="M-4 7V-67" stroke={teal ? '#64a39a' : '#7b9ecc'} strokeWidth="4" strokeLinecap="round" />
      <path d="M-2-65C13-75 26-55 43-64V-26C24-16 13-37-2-27Z" fill={teal ? '#d0e9df' : '#d5e6fc'} stroke={teal ? '#8fbdaf' : '#9bbde9'} strokeWidth="1.5" />
      <path d="m19-59 3 8 6-3-2 8 6 1-9 8 1 6h-7l1-6-8-8 6-1-2-8 6 3Z" fill={teal ? '#5d9d87' : '#6b98d1'} />
    </g>
  );
}

export function MapLandscape() {
  return (
    <g aria-hidden="true">
      <path d="M8 266C-30 188 66 73 220 85S488 49 534 173 515 428 384 444 67 441 8 266Z" fill="#edf3f7" />
      <path d="M692 134C747 10 943 81 1036 46S1300 30 1370 131 1320 323 1149 313 930 354 783 297 668 202 692 134Z" fill="#e3edfc" />
      <path transform="translate(0 60)" d="M706 421C753 329 894 391 997 360S1265 325 1360 415 1321 608 1176 597 991 636 853 601 671 522 706 421Z" fill="#e0f0e8" />
      <Cafe /><EiffelTower />
      <Tree x={112} y={278} scale={.9} />
      <FinishFlag x={1320} y={202} /><FinishFlag x={1320} y={524} teal />
    </g>
  );
}

export const Traveller = forwardRef<SVGGElement>(function Traveller(_, ref) {
  return (
    <g ref={ref} transform="translate(96 290)" aria-hidden="true" data-traveller="true" data-avatar-version="2">
      <ellipse cx="0" cy="4" rx="21" ry="4.5" fill="#37526f" opacity=".13" />
      <g className={styles.travellerBody}>
        {/* Each frame is a registered 384 x 512 cell. The inner SVG clips
            adjacent frames while the existing outer group follows the map. */}
        <svg x="-46" y="-115" width="92" height="123" viewBox="0 0 384 512" overflow="hidden">
          <image className={styles.spriteSheet} href="/courses/traveller-walk-v2.webp" width="1536" height="1024" />
        </svg>
      </g>
    </g>
  );
});
