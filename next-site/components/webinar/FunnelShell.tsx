import Image from 'next/image';

/**
 * The card layout the three small funnel pages share — registration, thank you
 * and the waiting room. On GoHighLevel these were three standalone HTML pages
 * that each carried their own copy of the background, the logo and the date
 * box; keeping that shell in one place is what stops them drifting apart.
 */

const LOGO =
  '/brand/frenchify-logo.png';

export function WebinarDateBadge({ date }: { date: string }) {
  return (
    <div className="my-6 rounded-xl border-l-[5px] border-brand-blue bg-gradient-to-br from-blue-50 to-sky-50 p-5 text-left shadow-soft">
      <p className="text-[11px] font-bold uppercase tracking-widest text-brand-blue">Workshop date</p>
      <p className="mt-1 text-base font-bold leading-snug text-blue-900 sm:text-lg">{date}</p>
    </div>
  );
}

export default function FunnelShell({
  children,
  maxWidth = 'max-w-[640px]',
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
      {/* Brand wash + dot grid, carried over from the GHL pages */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(at 18% 12%, rgba(37,99,235,0.10) 0, transparent 45%),' +
            'radial-gradient(at 85% 18%, rgba(245,158,11,0.07) 0, transparent 45%),' +
            'radial-gradient(at 50% 92%, rgba(37,99,235,0.08) 0, transparent 50%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(37,99,235,0.10) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <main className="relative z-10 flex flex-grow items-center justify-center px-5 py-10 sm:py-14">
        <div
          className={`w-full ${maxWidth} relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-7 text-center shadow-premium sm:p-11`}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5"
            style={{ background: 'linear-gradient(90deg,#2563EB 0%,#60A5FA 50%,#F59E0B 100%)' }}
          />
          <Image
            src={LOGO}
            alt="Frenchify with Vyom"
            width={132}
            height={38}
            className="mx-auto mb-6 h-[38px] w-auto"
            unoptimized
            priority
          />
          {children}
        </div>
      </main>

      <footer className="relative z-10 px-5 pb-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Frenchify with Vyom Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
