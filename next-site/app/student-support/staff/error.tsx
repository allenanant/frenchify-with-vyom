'use client';

/**
 * Anything that throws inside the support desk lands here rather than showing
 * a bare 500. The most likely cause by far is the database being unreachable
 * or DATABASE_URL missing, so the copy says that plainly.
 */
export default function StaffError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md pt-[8vh] text-center">
      <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900">
        The support desk is not reachable
      </h1>
      <p className="mt-3 text-[15px] text-gray-600">
        Usually this means the database connection is down or not configured. No ticket data is lost,
        the desk just cannot read it right now.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-brand-blue px-5 py-3 text-[15px] font-semibold text-white shadow-premium transition hover:bg-brand-blue-deep"
      >
        Try again
      </button>
      <p className="mt-6 text-[13px] text-gray-500">
        If it keeps happening, check that <code className="rounded bg-gray-100 px-1.5 py-0.5">DATABASE_URL</code> is
        set in the Vercel project settings.
      </p>
    </div>
  );
}
