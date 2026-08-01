'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signIn, type FormState } from '@/lib/tickets/actions';
import { field, label, primaryBtn, card } from '@/app/student-support/staff/ui';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${primaryBtn} w-full`}>
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

export default function AdminLogin({ mustChange }: { mustChange: boolean }) {
  const [state, action] = useActionState<FormState, FormData>(signIn, {});

  return (
    <main className="min-h-screen bg-gray-50 px-4 pt-28 pb-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-brand-ink">Website Admin</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update announcements and results on the website. Sign in with the same
            email and password you use for the Student Support dashboard.
          </p>
        </div>
        <div className={card}>
          {mustChange ? (
            <p className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
              Your account still has its starter password.{' '}
              <a className="font-semibold underline" href="/student-support/staff/password/">
                Set your own password first
              </a>
              , then come back here.
            </p>
          ) : (
            <form action={action} className="space-y-4">
              <input type="hidden" name="next" value="/admin/" />
              {state.error && (
                <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
                  {state.error}
                </p>
              )}
              <div>
                <label className={label} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="username" autoFocus className={field} />
              </div>
              <div>
                <label className={label} htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required autoComplete="current-password" className={field} />
              </div>
              <Submit />
            </form>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">
          No account yet? Ask Vyom to add you from the Support dashboard&apos;s Team page.
        </p>
      </div>
    </main>
  );
}
