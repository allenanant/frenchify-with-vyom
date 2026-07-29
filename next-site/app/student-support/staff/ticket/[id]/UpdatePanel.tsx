'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveTicket, type FormState } from '@/lib/tickets/actions';
import { STATUSES, STATUS_LABELS } from '@/lib/tickets/constants';
import { card, field, label, primaryBtn } from '../../ui';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${primaryBtn} w-full`}>
      {pending ? 'Saving…' : 'Save'}
    </button>
  );
}

export default function UpdatePanel({
  id, status, priority, assignedTo, resolutionNote, staff, version,
}: {
  id: number;
  status: string;
  priority: string;
  assignedTo: number | null;
  resolutionNote: string | null;
  staff: { id: number; name: string }[];
  /** The row's version counter when this form was rendered. Guards against
      one agent's save silently overwriting another's. A counter rather than a
      timestamp because the driver drops microseconds. */
  version: string;
}) {
  const [state, action] = useActionState<FormState, FormData>(saveTicket, {});

  return (
    <section className={card}>
      <h2 className="mb-3 text-lg font-extrabold text-gray-900">Update</h2>

      <form action={action} className="space-y-4">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="version" value={version} />

        {state.error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-800">{state.error}</p>
        )}
        {state.ok && (
          <p role="status" className="rounded-lg bg-green-50 px-3.5 py-2.5 text-sm text-green-800">{state.ok}</p>
        )}

        <div>
          <label className={label} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={status} className={field}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="priority">Priority</label>
          <select id="priority" name="priority" defaultValue={priority} className={field}>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="assigned_to">Owner</label>
          <select id="assigned_to" name="assigned_to" defaultValue={assignedTo ?? ''} className={field}>
            <option value="">Unassigned</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="note">Add a note</label>
          <textarea
            id="note" name="note" rows={3} className={`${field} resize-y`}
            placeholder="Called her, portal access restored, asked her to confirm."
          />
        </div>

        <div>
          <label className={label} htmlFor="resolution_note">Resolution summary</label>
          <textarea
            id="resolution_note" name="resolution_note" rows={3} defaultValue={resolutionNote ?? ''}
            className={`${field} resize-y`}
            placeholder="Fill this in when you mark it resolved."
          />
        </div>

        <Submit />
      </form>
    </section>
  );
}
