'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Download, Loader2, RefreshCw, Search } from 'lucide-react';
import { QUIZ_QUESTIONS, quizSequence, type QuizAnswerIndexes } from '@/lib/webinar-quiz';

/**
 * Website Admin → Quiz. Every visit to /webinar-quiz/, newest first: the
 * answers, how far the person got, and whether the answers reached their GHL
 * contact. Admins only (the API checks), because rows hold contact details.
 */

type Row = {
  id: number;
  answers: QuizAnswerIndexes;
  goal: string | null;
  level: string | null;
  permit: string | null;
  learning: string | null;
  exam: string | null;
  quiz_completed_at: string | null;
  registered_at: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  ghl_status: string;
  ghl_last_error: string | null;
  tracking: Record<string, string>;
  is_test: boolean;
  created_at: string;
};

type Filter = 'all' | 'registered' | 'not-registered';

const fmt = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('en-CA', {
        timeZone: 'America/Toronto',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '';

function progress(r: Row) {
  if (r.registered_at) return 'Registered';
  if (r.quiz_completed_at) return 'Quiz done, no sign-up';
  const answered = Object.keys(r.answers || {}).length;
  return `Stopped at ${answered} of ${quizSequence(r.answers || {}).length}`;
}

function ghlLabel(r: Row) {
  if (!r.registered_at) return '';
  if (r.ghl_status === 'synced') return 'On contact';
  if (r.ghl_status === 'failed') return 'Failed';
  return 'Waiting';
}

const name = (r: Row) => [r.first_name, r.last_name].filter(Boolean).join(' ');

function csv(rows: Row[]) {
  const head = ['Date (Toronto)', 'Name', 'Email', 'Phone', ...QUIZ_QUESTIONS.map((q) => q.short), 'Progress', 'GHL', 'utm_source', 'utm_campaign', 'utm_content'];
  const cell = (v: string) => `"${(v || '').replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      fmt(r.created_at),
      name(r),
      r.email || '',
      r.phone || '',
      r.goal || '',
      r.level || '',
      r.permit || '',
      r.learning || '',
      r.exam || '',
      progress(r),
      ghlLabel(r),
      r.tracking?.utm_source || '',
      r.tracking?.utm_campaign || '',
      r.tracking?.utm_content || '',
    ]
      .map(cell)
      .join(',')
  );
  return [head.map(cell).join(','), ...lines].join('\n');
}

export default function WebinarQuizTab({ onError }: { onError: (text: string) => void }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [showTest, setShowTest] = useState(false);
  // The shell makes a new onError on every render. Holding it in a ref stops
  // an error banner from re-running the load in a loop.
  const errorRef = useRef(onError);
  errorRef.current = onError;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/webinar-quiz/', { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not load the quiz answers.');
      setRows(data.rows as Row[]);
    } catch (e) {
      errorRef.current(e instanceof Error ? e.message : 'Could not load the quiz answers.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows || []).filter((r) => {
      if (!showTest && r.is_test) return false;
      if (filter === 'registered' && !r.registered_at) return false;
      if (filter === 'not-registered' && r.registered_at) return false;
      if (q && ![name(r), r.email, r.phone].some((v) => (v || '').toLowerCase().includes(q))) return false;
      return true;
    });
  }, [rows, filter, query, showTest]);

  const counts = useMemo(() => {
    const real = (rows || []).filter((r) => !r.is_test);
    return {
      started: real.length,
      finished: real.filter((r) => r.quiz_completed_at).length,
      registered: real.filter((r) => r.registered_at).length,
      onContact: real.filter((r) => r.ghl_status === 'synced').length,
    };
  }, [rows]);

  const download = () => {
    const blob = new Blob([csv(visible)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `webinar-quiz-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const pill = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      active ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-blue-50'
    }`;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-display text-lg font-bold text-brand-ink">Webinar quiz answers</h2>
        <p className="mt-1 text-sm text-gray-600">
          From <a className="font-semibold text-brand-blue underline" href="/webinar-quiz/" target="_blank" rel="noopener">/webinar-quiz/</a>.
          Each row is one visit. People who sign up also get their answers as a note and tags (wq-…) on their GHL contact.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Started', counts.started],
            ['Finished quiz', counts.finished],
            ['Registered', counts.registered],
            ['Answers on GHL contact', counts.onContact],
          ].map(([label, n]) => (
            <div key={label as string} className="rounded-xl bg-gray-50 p-3">
              <div className="text-2xl font-bold text-brand-ink">{n as number}</div>
              <div className="text-xs font-medium text-gray-600">{label as string}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1">
          <button className={pill(filter === 'all')} onClick={() => setFilter('all')}>All</button>
          <button className={pill(filter === 'registered')} onClick={() => setFilter('registered')}>Registered</button>
          <button className={pill(filter === 'not-registered')} onClick={() => setFilter('not-registered')}>Not registered</button>
        </div>
        <label className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email or phone"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm"
          />
        </label>
        <label className="flex items-center gap-1.5 text-sm text-gray-600">
          <input type="checkbox" checked={showTest} onChange={(e) => setShowTest(e.target.checked)} /> Show test rows
        </label>
        <button onClick={load} disabled={loading} className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Refresh
        </button>
        <button onClick={download} disabled={!visible.length} className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40">
          <Download className="h-4 w-4" /> CSV
        </button>
      </div>

      {rows === null ? (
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">No answers yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="min-w-[1100px] w-full text-left text-[13px]">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-3 py-2.5">Date</th>
                <th className="px-3 py-2.5">Person</th>
                {QUIZ_QUESTIONS.map((q) => (
                  <th key={q.id} className="px-3 py-2.5">{q.short}</th>
                ))}
                <th className="px-3 py-2.5">Progress</th>
                <th className="px-3 py-2.5">GHL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 align-top">
              {visible.map((r) => (
                <tr key={r.id} className={r.is_test ? 'bg-amber-50/60' : ''}>
                  <td className="whitespace-nowrap px-3 py-2.5 text-gray-600">
                    {fmt(r.created_at)}
                    {r.is_test && <span className="ml-1 rounded bg-amber-200 px-1 text-[10px] font-bold text-amber-900">TEST</span>}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="font-semibold text-brand-ink">{name(r) || <span className="text-gray-400">Not registered</span>}</div>
                    {r.email && <div className="text-gray-600">{r.email}</div>}
                    {r.phone && <div className="text-gray-600">{r.phone}</div>}
                    {r.tracking?.utm_campaign && <div className="text-[11px] text-gray-400">{r.tracking.utm_campaign}</div>}
                  </td>
                  <td className="max-w-[160px] px-3 py-2.5">{r.goal}</td>
                  <td className="max-w-[220px] px-3 py-2.5">{r.level}</td>
                  <td className="max-w-[130px] px-3 py-2.5">{r.permit || (r.goal ? <span className="text-gray-400">Not asked</span> : '')}</td>
                  <td className="max-w-[200px] px-3 py-2.5">{r.learning}</td>
                  <td className="max-w-[130px] px-3 py-2.5">{r.exam}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-medium">{progress(r)}</td>
                  <td className="whitespace-nowrap px-3 py-2.5" title={r.ghl_last_error || ''}>{ghlLabel(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
