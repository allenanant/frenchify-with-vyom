'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  ExternalLink,
  Loader2,
  RefreshCw,
  Search,
  Star,
  Trash2,
  X,
} from 'lucide-react';

type InstructorRow = {
  name: string;
  roles: string;
  totalReviews: number;
  avgQ1: number | null;
  avgQ2: number | null;
  avgQ3: number | null;
  overallAvg: number | null;
  lowCount: number;
  lastReviewedAt: string | null;
};

type ReviewRow = {
  id: number;
  appointment_id: string;
  submitted_at: string;
  submitted_toronto: string;
  student_name: string;
  student_email: string;
  instructor: string;
  session_type: string;
  calendar_name: string;
  session_datetime: string;
  q1_helped: number;
  q2_book_again: number;
  q3_on_time: number;
  avg_score: number;
  is_low: number;
  comment: string;
  is_test: number;
};

type AlertRow = {
  id: number;
  review_id: number;
  appointment_id: string;
  created_at: string;
  created_toronto: string;
  instructor: string;
  student_name: string;
  student_email: string;
  session_type: string;
  q1_helped: number;
  q2_book_again: number;
  q3_on_time: number;
  avg_score: number;
  comment: string;
  mode: string;
  status: string;
  detail: string;
  is_test: number;
};

type DashboardPayload = {
  alertsEnabled: boolean;
  formKey: string;
  appUrl: string;
  testCount: number;
  summary: {
    totalReviews: number;
    overallAvg: number | null;
    q1Avg: number | null;
    q2Avg: number | null;
    q3Avg: number | null;
    lowAlertsCount: number;
    ratedInstructors: number;
    totalInstructors: number;
    byType: Record<string, number>;
  };
  instructors: InstructorRow[];
  reviews: ReviewRow[];
  alerts: AlertRow[];
};

type SortKey = 'name' | 'totalReviews' | 'avgQ1' | 'avgQ2' | 'avgQ3' | 'overallAvg' | 'lowCount';

const SESSION_TYPES = ['One-on-One Speaking', 'Flex Session', 'Contact Us Call'] as const;

const selectCls =
  'w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-brand-ink outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20';

function fmtScore(v: number | null | undefined): string {
  if (v === null || v === undefined) return '-';
  return Number(v).toFixed(2);
}

function scorePillClass(v: number | null | undefined): string {
  if (v === null || v === undefined) return 'text-gray-400 font-medium';
  if (v >= 4.5) return 'bg-green-50 text-green-700 border border-green-200';
  if (v >= 3.5) return 'bg-blue-50 text-brand-blue border border-blue-200';
  return 'bg-red-50 text-red-700 border border-red-200';
}

export default function InstructorReviewsTab({
  onDone,
  onError,
}: {
  onDone: (text: string) => void;
  onError: (text: string) => void;
}) {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  const [fInstructor, setFInstructor] = useState('all');
  const [fType, setFType] = useState('all');
  const [fDays, setFDays] = useState('all');
  const [fScore, setFScore] = useState('all');
  const [fSearchInput, setFSearchInput] = useState('');
  const [fSearch, setFSearch] = useState('');

  const [sortKey, setSortKey] = useState<SortKey>('overallAvg');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [subTab, setSubTab] = useState<'reviews' | 'alerts'>('reviews');

  const [testModalOpen, setTestModalOpen] = useState(false);
  const [tInstructor, setTInstructor] = useState('Ashish Kohli');
  const [tType, setTType] = useState<string>('One-on-One Speaking');
  const [tStudent, setTStudent] = useState('Vyom Test');
  const [clearing, setClearing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setFSearch(fSearchInput.trim()), 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fSearchInput]);

  const filterQs = useMemo(() => {
    const p = new URLSearchParams();
    if (fInstructor !== 'all') p.set('instructor', fInstructor);
    if (fType !== 'all') p.set('type', fType);
    if (fDays !== 'all') p.set('days', fDays);
    if (fScore !== 'all') p.set('score', fScore);
    if (fSearch) p.set('q', fSearch);
    return p.toString();
  }, [fInstructor, fType, fDays, fScore, fSearch]);

  const load = useCallback(
    async (silent = false) => {
      if (!silent) setRefreshing(true);
      try {
        const res = await fetch(`/api/admin/instructor-reviews${filterQs ? `?${filterQs}` : ''}`, {
          cache: 'no-store',
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json || json.ok === false) {
          setFetchErr(json?.error || 'Could not load instructor reviews.');
          return;
        }
        setFetchErr(null);
        setData(json as DashboardPayload);
        if (json.instructors?.length) {
          setTInstructor((prev) =>
            json.instructors.some((i: InstructorRow) => i.name === prev)
              ? prev
              : json.instructors[0].name
          );
        }
      } catch {
        setFetchErr('Could not reach the Instructor Reviews service. Try again.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filterQs]
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const onFocus = () => load(true);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [load]);

  const sortedInstructors = useMemo(() => {
    if (!data) return [];
    return [...data.instructors].sort((a, b) => {
      if (sortKey === 'name') {
        return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      const av = a[sortKey] === null ? -1 : Number(a[sortKey]);
      const bv = b[sortKey] === null ? -1 : Number(b[sortKey]);
      if (av === bv) return b.totalReviews - a.totalReviews || a.name.localeCompare(b.name);
      return sortDir === 'asc' ? av - bv : bv - av;
    });
  }, [data, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'name' ? 'asc' : 'desc');
    }
  };

  const resetFilters = () => {
    setFInstructor('all');
    setFType('all');
    setFDays('all');
    setFScore('all');
    setFSearchInput('');
    setFSearch('');
  };

  const handleClearTest = async () => {
    setClearing(true);
    try {
      const res = await fetch('/api/admin/instructor-reviews/test', { method: 'DELETE' });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        onDone(`Cleared ${json.deletedReviews ?? 0} test review(s).`);
        await load();
      } else {
        onError(json.error || 'Could not clear test reviews.');
      }
    } catch {
      onError('Could not clear test reviews.');
    } finally {
      setClearing(false);
    }
  };

  const handleDeleteOneTest = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/instructor-reviews/test/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await load();
      } else {
        onError('Could not delete test review.');
      }
    } catch {
      onError('Could not delete test review.');
    } finally {
      setDeletingId(null);
    }
  };

  const launchTestLink = () => {
    if (!data?.appUrl || !data?.formKey) return;
    const aid = `test_${Date.now()}`;
    const student = tStudent.trim() || 'Vyom Test';
    const params = new URLSearchParams({
      k: data.formKey,
      aid,
      student,
      email: 'test@frenchifywithvyom.com',
      instructor: tInstructor,
      type: tType,
      cal: `${tInstructor} - ${tType}`,
      when: `${new Date().toLocaleDateString('en-CA')} 10:00 AM ET`,
      test: '1',
    });
    window.open(`${data.appUrl}/rate?${params.toString()}`, '_blank', 'noopener,noreferrer');
    setTestModalOpen(false);
  };

  const activeFilterParts = useMemo(() => {
    const parts: string[] = [];
    if (fInstructor !== 'all') parts.push(`Instructor: ${fInstructor}`);
    if (fType !== 'all') parts.push(`Type: ${fType}`);
    if (fDays !== 'all') parts.push(`Range: ${fDays === 'month' ? 'This Month' : `Last ${fDays} Days`}`);
    if (fScore !== 'all') parts.push(`Score: ${fScore === 'low' ? 'Low Only (<= 2)' : 'With Comments'}`);
    if (fSearch) parts.push(`Search: "${fSearch}"`);
    return parts;
  }, [fInstructor, fType, fDays, fScore, fSearch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-sm text-gray-600 shadow-soft">
        <Loader2 className="h-5 w-5 animate-spin text-brand-blue" />
        Loading instructor reviews...
      </div>
    );
  }

  if (fetchErr && !data) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Instructor Reviews unavailable</p>
            <p className="mt-1 text-amber-800">{fetchErr}</p>
            <button
              type="button"
              onClick={() => load()}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { summary } = data;
  const filledStars = summary.overallAvg ? Math.round(summary.overallAvg) : 0;

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />;
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3 w-3 text-brand-blue" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3 text-brand-blue" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Action Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="font-display text-lg font-bold text-brand-ink">Instructor Ratings</h2>
          {data.alertsEnabled ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Live Alerts On
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              Pre-Live Draft Mode
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => load()}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => setTestModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Try Test Rating Link
          </button>

          {data.testCount > 0 && (
            <button
              type="button"
              onClick={handleClearTest}
              disabled={clearing}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {clearing ? 'Clearing...' : `Clear Test (${data.testCount})`}
            </button>
          )}

          <a
            href={`/api/admin/instructor-reviews/export${filterQs ? `?${filterQs}` : ''}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-3.5 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-blue-deep"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </a>
        </div>
      </div>

      {!data.alertsEnabled && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p>
            <strong className="font-semibold">Pre-Live Review Mode:</strong> Low-score alerts (&lt;= 2 stars) to Vyom
            are currently paused and logged in the Alerts tab only. No live student emails or Vyom alerts send until
            workflows are published.
          </p>
        </div>
      )}

      {fetchErr && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{fetchErr}</span>
        </div>
      )}

      {/* Bento KPI Grid */}
      <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
        <div className="grid grid-cols-1 items-center gap-5 rounded-2xl border border-blue-200 bg-white p-5 shadow-soft sm:col-span-2 sm:grid-cols-[auto_1fr] lg:col-span-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Overall Rating</p>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold tracking-tight text-brand-ink">
                {fmtScore(summary.overallAvg)}
              </span>
              <span className="text-sm font-semibold text-gray-400">/ 5</span>
            </div>
            <div className="mt-2 flex items-center gap-0.5" aria-label={`Average ${fmtScore(summary.overallAvg)} out of 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-4 w-4 ${
                    n <= filledStars ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { label: 'Q1 Helped', val: summary.q1Avg },
              { label: 'Q2 Book Again', val: summary.q2Avg },
              { label: 'Q3 On Time', val: summary.q3Avg },
            ].map((q) => (
              <div key={q.label} className="grid grid-cols-[96px_1fr_34px] items-center gap-2.5 text-xs">
                <span className="font-medium text-gray-600">{q.label}</span>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-brand-blue transition-all duration-300"
                    style={{ width: q.val ? `${(q.val / 5) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-right font-display font-bold text-brand-ink">{fmtScore(q.val)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-soft lg:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Total Reviews</p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-ink">{summary.totalReviews}</p>
          <p className="mt-2 text-xs text-gray-500">
            1:1: {summary.byType['One-on-One Speaking'] || 0} · Flex: {summary.byType['Flex Session'] || 0} · Contact:{' '}
            {summary.byType['Contact Us Call'] || 0}
          </p>
        </div>

        <div
          className={`flex flex-col justify-between rounded-2xl border p-5 shadow-soft lg:col-span-3 ${
            summary.lowAlertsCount > 0 ? 'border-red-200 bg-red-50/70' : 'border-gray-200 bg-white'
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Low-Score Alerts (&lt;= 2)</p>
          <p
            className={`mt-2 font-display text-3xl font-bold ${
              summary.lowAlertsCount > 0 ? 'text-red-600' : 'text-brand-ink'
            }`}
          >
            {summary.lowAlertsCount}
          </p>
          <p className="mt-2 text-xs text-gray-500">Any single question rated 1 or 2 stars</p>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-soft lg:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Instructors Rated</p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-ink">
            {summary.ratedInstructors} / {summary.totalInstructors}
          </p>
          <p className="mt-2 text-xs text-gray-500">Across 34 active calendars</p>
        </div>
      </section>

      {/* Instructor Leaderboard */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 px-5 py-4">
          <div>
            <h3 className="font-display text-base font-bold text-brand-ink">Instructor Leaderboard</h3>
            <p className="text-xs text-gray-500">Click any instructor row to filter their individual reviews below.</p>
          </div>
          {fInstructor !== 'all' && (
            <button
              type="button"
              onClick={() => setFInstructor('all')}
              className="text-xs font-semibold text-brand-blue hover:underline"
            >
              Show all instructors
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <th
                  className="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left hover:text-brand-ink"
                  onClick={() => toggleSort('name')}
                >
                  Instructor <SortIcon col="name" />
                </th>
                <th
                  className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-center hover:text-brand-ink"
                  onClick={() => toggleSort('totalReviews')}
                >
                  Reviews <SortIcon col="totalReviews" />
                </th>
                <th
                  className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-center hover:text-brand-ink"
                  onClick={() => toggleSort('avgQ1')}
                >
                  Q1 Helped <SortIcon col="avgQ1" />
                </th>
                <th
                  className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-center hover:text-brand-ink"
                  onClick={() => toggleSort('avgQ2')}
                >
                  Q2 Book Again <SortIcon col="avgQ2" />
                </th>
                <th
                  className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-center hover:text-brand-ink"
                  onClick={() => toggleSort('avgQ3')}
                >
                  Q3 On Time <SortIcon col="avgQ3" />
                </th>
                <th
                  className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-center hover:text-brand-ink"
                  onClick={() => toggleSort('overallAvg')}
                >
                  Overall Avg <SortIcon col="overallAvg" />
                </th>
                <th
                  className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-center hover:text-brand-ink"
                  onClick={() => toggleSort('lowCount')}
                >
                  Low (&lt;= 2) <SortIcon col="lowCount" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedInstructors.map((inst) => {
                const isSelected = fInstructor === inst.name;
                return (
                  <tr
                    key={inst.name}
                    onClick={() => setFInstructor((cur) => (cur === inst.name ? 'all' : inst.name))}
                    className={`cursor-pointer transition ${
                      isSelected ? 'bg-blue-50/80' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-brand-ink">{inst.name}</div>
                      <div className="text-xs text-gray-500">{inst.roles}</div>
                    </td>
                    <td className="px-3 py-3 text-center font-semibold text-brand-ink">{inst.totalReviews}</td>
                    <td className="px-3 py-3 text-center text-gray-700">{fmtScore(inst.avgQ1)}</td>
                    <td className="px-3 py-3 text-center text-gray-700">{fmtScore(inst.avgQ2)}</td>
                    <td className="px-3 py-3 text-center text-gray-700">{fmtScore(inst.avgQ3)}</td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex min-w-[48px] items-center justify-center rounded-full px-2.5 py-0.5 font-display text-xs font-bold ${scorePillClass(
                          inst.overallAvg
                        )}`}
                      >
                        {fmtScore(inst.overallAvg)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      {inst.lowCount > 0 ? (
                        <span className="inline-flex min-w-[26px] items-center justify-center rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-bold text-red-700">
                          {inst.lowCount}
                        </span>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews & Low-Score Alerts Panel */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-3.5">
          <div className="inline-flex rounded-xl bg-gray-100 p-1" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={subTab === 'reviews'}
              onClick={() => setSubTab('reviews')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                subTab === 'reviews'
                  ? 'bg-white text-brand-ink shadow-sm'
                  : 'text-gray-600 hover:text-brand-ink'
              }`}
            >
              Individual Reviews ({data.reviews.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={subTab === 'alerts'}
              onClick={() => setSubTab('alerts')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                subTab === 'alerts'
                  ? 'bg-white text-brand-ink shadow-sm'
                  : 'text-gray-600 hover:text-brand-ink'
              }`}
            >
              Low-Score Alerts ({data.alerts.length})
            </button>
          </div>
          <span className="text-xs text-gray-500">Auto-deduplicated by Appointment ID</span>
        </div>

        {subTab === 'reviews' ? (
          <>
            <div className="grid grid-cols-1 gap-2.5 border-b border-gray-200 bg-gray-50/50 p-4 sm:grid-cols-2 lg:grid-cols-5">
              <select
                aria-label="Filter by Instructor"
                className={selectCls}
                value={fInstructor}
                onChange={(e) => setFInstructor(e.target.value)}
              >
                <option value="all">All Instructors</option>
                {data.instructors.map((i) => (
                  <option key={i.name} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter by Session Type"
                className={selectCls}
                value={fType}
                onChange={(e) => setFType(e.target.value)}
              >
                <option value="all">All Session Types</option>
                {SESSION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter by Date Range"
                className={selectCls}
                value={fDays}
                onChange={(e) => setFDays(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="month">This Month</option>
              </select>

              <select
                aria-label="Filter by Score"
                className={selectCls}
                value={fScore}
                onChange={(e) => setFScore(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="low">Low Only (&lt;= 2 stars)</option>
                <option value="comments">With Comments Only</option>
              </select>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  aria-label="Search reviews"
                  placeholder="Search student, comment..."
                  value={fSearchInput}
                  onChange={(e) => setFSearchInput(e.target.value)}
                  className={`${selectCls} pl-9`}
                />
              </div>
            </div>

            {activeFilterParts.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 bg-blue-50/40 px-4 py-2 text-xs text-gray-700">
                <span>Active filters: {activeFilterParts.join(' · ')}</span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {data.reviews.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-gray-500">
                {activeFilterParts.length > 0
                  ? 'No reviews match these filters.'
                  : 'No student ratings yet. Click "Try Test Rating Link" above to preview the exact student experience.'}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {data.reviews.map((r) => (
                  <article
                    key={r.id}
                    className={`space-y-2.5 px-5 py-4 ${
                      r.is_low ? 'border-l-4 border-l-red-500 bg-red-50/20' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-brand-ink">{r.student_name || 'Student'}</span>
                          {r.student_email && <span className="text-xs text-gray-500">{r.student_email}</span>}
                          {r.is_test === 1 && (
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                              TEST
                            </span>
                          )}
                          {r.is_low === 1 && (
                            <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                              Low Alert (&lt;= 2)
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-brand-blue">
                            {r.instructor}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-700">
                            {r.session_type}
                          </span>
                          <span>Submitted: {r.submitted_toronto} ET</span>
                          {r.session_datetime && <span>· Session: {r.session_datetime}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-xs font-bold ${scorePillClass(
                            r.avg_score
                          )}`}
                        >
                          {Number(r.avg_score).toFixed(2)} / 5
                        </span>
                        {r.is_test === 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteOneTest(r.id)}
                            disabled={deletingId === r.id}
                            className="rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === r.id ? '...' : 'Delete'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: 'Q1 Helped', val: r.q1_helped },
                        { label: 'Q2 Book Again', val: r.q2_book_again },
                        { label: 'Q3 On Time', val: r.q3_on_time },
                      ].map((q) => (
                        <span
                          key={q.label}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                            q.val <= 2
                              ? 'border-red-200 bg-red-50 text-red-700'
                              : 'border-gray-200 bg-gray-50 text-gray-700'
                          }`}
                        >
                          {q.label}: {q.val}/5
                        </span>
                      ))}
                    </div>

                    {r.comment && (
                      <p className="whitespace-pre-wrap rounded-xl border-l-2 border-blue-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
                        {r.comment}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </>
        ) : data.alerts.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            No low-score alerts (&lt;= 2 stars) recorded yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {data.alerts.map((a) => {
              const statusCls =
                a.status === 'sent'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : a.status === 'failed'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : 'border-amber-200 bg-amber-50 text-amber-800';
              const statusLabel =
                a.status === 'sent'
                  ? 'Sent to Vyom'
                  : a.status === 'skipped_test'
                    ? 'Test Dry-Run'
                    : a.status === 'paused_draft'
                      ? 'Paused (Draft)'
                      : 'Failed';
              return (
                <article key={a.id} className="space-y-2.5 border-l-4 border-l-red-500 bg-red-50/20 px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-brand-ink">{a.instructor}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusCls}`}>
                          {statusLabel}
                        </span>
                        {a.is_test === 1 && (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                            TEST
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-600">
                        Student: {a.student_name || 'Student'} ({a.student_email || '-'}) · {a.created_toronto} ET
                      </p>
                    </div>
                    <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 font-display text-xs font-bold text-red-700">
                      Avg {Number(a.avg_score).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Q1', val: a.q1_helped },
                      { label: 'Q2', val: a.q2_book_again },
                      { label: 'Q3', val: a.q3_on_time },
                    ].map((q) => (
                      <span
                        key={q.label}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                          q.val <= 2
                            ? 'border-red-200 bg-red-50 text-red-700'
                            : 'border-gray-200 bg-gray-50 text-gray-700'
                        }`}
                      >
                        {q.label}: {q.val}/5
                      </span>
                    ))}
                  </div>

                  {a.comment && (
                    <p className="whitespace-pre-wrap rounded-xl border-l-2 border-blue-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
                      {a.comment}
                    </p>
                  )}
                  {a.detail && <p className="text-xs text-gray-500">{a.detail}</p>}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Try Test Rating Link Modal */}
      {testModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTestModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-brand-ink">Open a Test Rating Link</h3>
                <p className="mt-1 text-xs text-gray-600">
                  Opens the exact student rating page marked as a test entry. You can wipe test reviews in one click.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTestModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700" htmlFor="test-inst">
                  Instructor
                </label>
                <select
                  id="test-inst"
                  className={selectCls}
                  value={tInstructor}
                  onChange={(e) => setTInstructor(e.target.value)}
                >
                  {data.instructors.map((i) => (
                    <option key={i.name} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700" htmlFor="test-type">
                  Session Type
                </label>
                <select id="test-type" className={selectCls} value={tType} onChange={(e) => setTType(e.target.value)}>
                  {SESSION_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700" htmlFor="test-student">
                  Test Student Name
                </label>
                <input
                  id="test-student"
                  type="text"
                  className={selectCls}
                  value={tStudent}
                  onChange={(e) => setTStudent(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setTestModalOpen(false)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={launchTestLink}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-deep"
              >
                <ExternalLink className="h-4 w-4" />
                Open Rating Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
