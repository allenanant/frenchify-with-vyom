/** Shared class strings for the staff dashboard. Keeps the pages readable. */

/** 16px text on inputs stops iOS Safari zooming the page on focus. */
export const field =
  'w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-[16px] text-gray-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-200';

export const label = 'mb-1.5 block text-sm font-semibold text-gray-700';

export const primaryBtn =
  'min-h-11 rounded-xl bg-brand-blue px-5 py-3 text-[15px] font-semibold text-white shadow-premium transition hover:bg-brand-blue-deep disabled:cursor-progress disabled:opacity-60';

export const ghostBtn =
  'min-h-11 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50 disabled:opacity-60';

export const card = 'rounded-2xl border border-gray-200 bg-white p-5 sm:p-6';

export const pill = 'inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold';

export function whenIst(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function ago(iso: string | null) {
  if (!iso) return '';
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
