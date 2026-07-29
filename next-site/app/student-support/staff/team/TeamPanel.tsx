'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  addTeamMember, resetTeamMember, toggleTeamMember, type FormState,
} from '@/lib/tickets/actions';
import { card, field, ghostBtn, label, primaryBtn } from '../ui';

type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  lastLogin: string | null;
  isMe: boolean;
};

function Pending({ children }: { children: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={ghostBtn}>
      {pending ? '…' : children}
    </button>
  );
}

function AddSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${primaryBtn} w-full sm:w-auto`}>
      {pending ? 'Creating…' : 'Create'}
    </button>
  );
}

export default function TeamPanel({ users }: { users: Row[] }) {
  const [addState, addAction] = useActionState<FormState, FormData>(addTeamMember, {});
  const [resetState, resetAction] = useActionState<FormState, FormData>(resetTeamMember, {});
  const [toggleState, toggleAction] = useActionState<FormState, FormData>(toggleTeamMember, {});

  const created = addState.created || resetState.created;
  const error = addState.error || resetState.error || toggleState.error;
  const ok = toggleState.ok && !created ? toggleState.ok : null;

  return (
    <>
      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-800">{error}</p>
      )}
      {ok && (
        <p role="status" className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-[15px] text-green-800">{ok}</p>
      )}

      {created && (
        <section className="mt-5 rounded-2xl border-2 border-brand-blue bg-blue-50/60 p-5">
          <h2 className="text-lg font-extrabold text-gray-900">Starter password for {created.name}</h2>
          <p className="mt-1.5 text-[15px] text-gray-700">
            Send these once, over WhatsApp or a call. They will be forced to change the password on first sign in.
          </p>
          <dl className="mt-3 space-y-1.5 text-[15px]">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-gray-500">Email</dt>
              <dd className="break-all font-medium">{created.email}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-gray-500">Password</dt>
              <dd className="font-mono text-base font-semibold">{created.password}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[13px] text-gray-500">
            Shown once and never stored readably. Reset it if it gets lost.
          </p>
        </section>
      )}

      <section className={`${card} mt-5`}>
        <ul className="divide-y divide-gray-100">
          {users.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">
                  {u.name}
                  {!u.active && <span className="ml-1.5 text-[12px] font-normal text-gray-400">(disabled)</span>}
                </p>
                <p className="truncate text-[13px] text-gray-500">
                  {u.email} · {u.role}
                  {u.lastLogin ? ` · last in ${u.lastLogin}` : ' · never signed in'}
                </p>
              </div>

              <div className="flex gap-2">
                <form action={resetAction}>
                  <input type="hidden" name="id" value={u.id} />
                  <Pending>Reset password</Pending>
                </form>
                {!u.isMe && (
                  <form action={toggleAction}>
                    <input type="hidden" name="id" value={u.id} />
                    <Pending>{u.active ? 'Disable' : 'Enable'}</Pending>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${card} mt-5`}>
        <h2 className="mb-4 text-lg font-extrabold text-gray-900">Add a team member</h2>
        <form action={addAction} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
          <div>
            <label className={label} htmlFor="name">Name</label>
            <input id="name" name="name" required className={field} />
          </div>
          <div>
            <label className={label} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className={field} />
          </div>
          <div>
            <label className={label} htmlFor="role">Role</label>
            <select id="role" name="role" className={field} defaultValue="agent">
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <AddSubmit />
        </form>
        <p className="mt-3 text-[13px] text-gray-500">Agents work tickets. Admins also manage this page.</p>
      </section>
    </>
  );
}
