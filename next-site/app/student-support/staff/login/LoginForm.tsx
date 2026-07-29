'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signIn, type FormState } from '@/lib/tickets/actions';
import { field, label, primaryBtn } from '../ui';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${primaryBtn} w-full`}>
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

export default function LoginForm() {
  const [state, action] = useActionState<FormState, FormData>(signIn, {});

  return (
    <form action={action} className="space-y-4">
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
  );
}
