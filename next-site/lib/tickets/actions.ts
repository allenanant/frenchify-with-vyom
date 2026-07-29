'use server';

/**
 * Server Actions for the student support system.
 *
 * Every action here is a public HTTP endpoint once deployed, so each one
 * re-checks the caller through auth.requireStaff rather than trusting that a
 * page-level redirect kept them out.
 *
 * Public:  submitTicket
 * Staff:   signIn, signOut, changePassword, saveTicket
 * Admin:   addTeamMember, resetTeamMember, toggleTeamMember, claimFirstAdmin
 */

import { createHash, timingSafeEqual } from 'node:crypto';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as db from './db';
import * as auth from './auth';
import {
  CATEGORIES, MAX_IMAGES, MAX_IMAGE_BYTES, STORAGE_CEILING_BYTES,
  RATE_MAX, RATE_WINDOW_MIN, SUPPORT_EMAIL,
} from './constants';

export type FormState = {
  error?: string;
  ok?: string;
  created?: { name: string; email: string; password: string };
};

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim();

/**
 * Magic-byte check plus a real dimension read, so a 13-byte file that merely
 * starts with the right header cannot pass as a screenshot.
 */
function inspect(buf: Buffer): { mime: string; width: number; height: number } | null {
  // PNG
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    if (buf.toString('ascii', 12, 16) !== 'IHDR') return null;
    return { mime: 'image/png', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: walk the segment markers to the frame header that carries the size.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { mime: 'image/jpeg', height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      const len = buf.readUInt16BE(i + 2);
      if (len < 2) return null;
      i += 2 + len;
    }
    return null;
  }

  // WebP, lossy / lossless / extended
  if (
    buf.length > 30 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') {
      if ((buf[20] & 0x02) !== 0) return null; // animated, which is a recording
      return {
        mime: 'image/webp',
        width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
    if (chunk === 'VP8 ') {
      return {
        mime: 'image/webp',
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { mime: 'image/webp', width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    return null;
  }

  return null;
}

// --- public ----------------------------------------------------------------

export async function submitTicket(_prev: FormState, fd: FormData): Promise<FormState> {
  if (str(fd, 'website')) return { error: 'Submission blocked.' }; // honeypot

  const name = str(fd, 'student_name');
  const email = str(fd, 'student_email');
  const phone = str(fd, 'student_phone');
  const course = str(fd, 'course');
  const category = str(fd, 'category');
  const subject = str(fd, 'subject');
  const description = str(fd, 'description');

  if (name.length < 2) return { error: 'Please enter your full name.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return { error: 'Please enter a valid email address.' };
  if (!(CATEGORIES as readonly string[]).includes(category)) return { error: 'Please choose what the issue is about.' };
  if (subject.length < 5) return { error: 'Give the issue a short title, at least 5 characters.' };
  if (description.length < 20) return { error: 'Please describe the issue in a bit more detail, at least 20 characters.' };

  const blobs = fd.getAll('screenshots').filter((f): f is File => f instanceof File && f.size > 0);
  if (!blobs.length) return { error: 'A screenshot is required so the team can see exactly what you are seeing.' };
  if (blobs.length > MAX_IMAGES) return { error: `Attach at most ${MAX_IMAGES} screenshots.` };

  const files: db.NewAttachment[] = [];
  for (const f of blobs) {
    const buf = Buffer.from(await f.arrayBuffer());
    if (buf.length > MAX_IMAGE_BYTES) {
      return { error: `"${f.name}" is still too large after compression. Try a smaller screenshot.` };
    }
    const img = inspect(buf);
    if (!img) return { error: `"${f.name}" is not a still screenshot. Send a PNG, JPG or WebP image.` };
    if (img.width < 40 || img.height < 40) {
      return { error: `"${f.name}" is too small to show anything. Send the actual screenshot.` };
    }
    files.push({
      original_name: (f.name || 'screenshot').slice(0, 180),
      mime: img.mime,
      bytes: buf.length,
      sha256: createHash('sha256').update(buf).digest('hex'),
      data: buf,
    });
  }

  let result: Awaited<ReturnType<typeof db.createTicket>>;
  try {
    result = await db.createTicket(
      {
        student_name: name.slice(0, 120),
        student_email: email.slice(0, 180),
        student_phone: phone.slice(0, 40) || null,
        course: course.slice(0, 120) || null,
        category,
        subject: subject.slice(0, 200),
        description: description.slice(0, 8000),
        ip_hash: await auth.ipHash(),
      },
      files,
      { rateWindowMin: RATE_WINDOW_MIN, rateMax: RATE_MAX, storageCeiling: STORAGE_CEILING_BYTES }
    );
  } catch (err) {
    console.error('[submitTicket]', err);
    return { error: `Something broke on our side and nothing was saved. Please try again, or email ${SUPPORT_EMAIL}.` };
  }

  if ('refused' in result) {
    return {
      error: result.refused === 'rate'
        ? `That is a lot of tickets in a short time. Please wait a few minutes, or email ${SUPPORT_EMAIL}.`
        : `Our screenshot storage is full. Please email ${SUPPORT_EMAIL} and we will sort it.`,
    };
  }

  redirect(`/student-support/thanks/?ref=${encodeURIComponent(result.ref)}`);
}

// --- staff -----------------------------------------------------------------

/** Constant work whether or not the account exists, so timing says nothing. */
const DUMMY_HASH = '$2a$12$C6UzMDM.H6dfI/f/IKcEe.7oQ4Nq0BOhVvJZ0aTfLRy0oPPQFOa9K';

export async function signIn(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, 'email').toLowerCase();
  const password = String(fd.get('password') ?? '');
  const key = `${await auth.ipHash()}|${email}`;

  const locked = await db.loginLockedFor(key);
  if (locked > 0) {
    return { error: `Too many attempts. Try again in about ${Math.ceil(locked / 60)} minutes.` };
  }

  const user = await db.getUserByEmail(email);
  const ok = auth.verify(password, user?.password_hash ?? DUMMY_HASH) && !!user && user.active;

  if (!ok) {
    await db.noteLoginFailure(key);
    return { error: 'That email and password did not match.' };
  }

  await db.clearLoginFailures(key);
  await auth.startSession(user.id);
  redirect(user.must_change ? '/student-support/staff/password/' : '/student-support/staff/');
}

export async function signOut() {
  await auth.endSession();
  redirect('/student-support/staff/login/');
}

export async function changePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  // Deliberately NOT requireStaff: this is the one page a must_change user reaches.
  const me = await auth.currentUser();
  if (!me) return { error: 'Please sign in again.' };

  const current = String(fd.get('current') ?? '');
  const next = String(fd.get('next') ?? '');
  const confirm = String(fd.get('confirm') ?? '');

  const row = await db.getUserById(me.id);
  if (!row || !auth.verify(current, row.password_hash)) return { error: 'Current password is wrong.' };
  if (next.length < 10) return { error: 'New password must be at least 10 characters.' };
  if (next !== confirm) return { error: 'The two new passwords do not match.' };
  if (next === current) return { error: 'Pick a password different from the current one.' };

  await db.setPassword(me.id, auth.hash(next), false);
  await db.deleteUserSessions(me.id);
  await auth.startSession(me.id);
  redirect('/student-support/staff/');
}

export async function saveTicket(_prev: FormState, fd: FormData): Promise<FormState> {
  const { user, error } = await auth.requireStaff();
  if (!user) return { error: error! };

  const id = Number(fd.get('id'));
  if (!Number.isInteger(id) || id < 1) return { error: 'That ticket does not exist.' };

  let result: Awaited<ReturnType<typeof db.updateTicket>>;
  try {
    result = await db.updateTicket(id, user.id, {
      status: str(fd, 'status'),
      priority: str(fd, 'priority'),
      assigned_to: str(fd, 'assigned_to'),
      note: str(fd, 'note'),
      resolution_note: fd.has('resolution_note') ? String(fd.get('resolution_note')) : undefined,
      expectedVersion: str(fd, 'version') || undefined,
    });
  } catch (err) {
    console.error('[saveTicket]', err);
    return { error: 'Could not save that. Nothing was changed.' };
  }

  if (!result.ok) {
    return {
      error: result.reason === 'conflict'
        ? 'Someone else updated this ticket while you had it open. Reload to see their changes, then redo yours.'
        : 'That ticket does not exist.',
    };
  }

  revalidatePath('/student-support/staff');
  revalidatePath(`/student-support/staff/ticket/${id}`);
  return { ok: 'Ticket updated.' };
}

// --- admin -----------------------------------------------------------------

/**
 * One-time setup for the very first admin.
 *
 * Guarded by SUPPORT_SETUP_SECRET so a stranger cannot claim the desk in the
 * window between deploy and Vyom's first sign-in, and the insert itself is
 * conditional on the table still being empty so two people racing cannot both
 * become admin.
 */
export async function claimFirstAdmin(_prev: FormState, fd: FormData): Promise<FormState> {
  const expected = process.env.SUPPORT_SETUP_SECRET || '';
  if (!expected) {
    return { error: 'Setup is not enabled. Add SUPPORT_SETUP_SECRET in the Vercel project settings first.' };
  }

  const given = String(fd.get('secret') ?? '');
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { error: 'That setup key is wrong.' };
  }

  const name = str(fd, 'name');
  const email = str(fd, 'email').toLowerCase();
  const password = String(fd.get('password') ?? '');

  if (name.length < 2) return { error: 'Enter a name.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return { error: 'Enter a valid email address.' };
  if (password.length < 10) return { error: 'Password must be at least 10 characters.' };

  const id = await db.claimFirstAdminAtomic({ email, name, password_hash: auth.hash(password) });
  if (id === null) return { error: 'Someone already set this up. Sign in instead.' };

  await auth.startSession(id);
  redirect('/student-support/staff/');
}

export async function addTeamMember(_prev: FormState, fd: FormData): Promise<FormState> {
  const { user, error } = await auth.requireStaff({ admin: true });
  if (!user) return { error: error! };

  const name = str(fd, 'name');
  const email = str(fd, 'email').toLowerCase();
  const role = fd.get('role') === 'admin' ? 'admin' : 'agent';

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return { error: 'Need a name and a valid email.' };
  if (await db.getUserByEmail(email)) return { error: 'Someone already uses that email.' };

  const password = auth.suggestPassword();
  await db.createUser({ email, name, password_hash: auth.hash(password), role });
  revalidatePath('/student-support/staff/team');
  return { ok: `${name} can now sign in.`, created: { name, email, password } };
}

export async function resetTeamMember(_prev: FormState, fd: FormData): Promise<FormState> {
  const { user, error } = await auth.requireStaff({ admin: true });
  if (!user) return { error: error! };

  const target = await db.getUserById(Number(fd.get('id')));
  if (!target) return { error: 'No such account.' };

  const password = auth.suggestPassword();
  // Sessions go first. If the second call fails the account is merely locked
  // out, which is recoverable; the reverse would leave stolen sessions live.
  await db.deleteUserSessions(target.id);
  await db.setPassword(target.id, auth.hash(password), true);
  revalidatePath('/student-support/staff/team');
  return {
    ok: `Password reset. ${target.name} is signed out everywhere.`,
    created: { name: target.name, email: target.email, password },
  };
}

export async function toggleTeamMember(_prev: FormState, fd: FormData): Promise<FormState> {
  const { user, error } = await auth.requireStaff({ admin: true });
  if (!user) return { error: error! };

  const target = await db.getUserById(Number(fd.get('id')));
  if (!target) return { error: 'No such account.' };
  if (target.id === user.id) return { error: 'You cannot disable your own account.' };

  await db.setUserActive(target.id, !target.active);
  if (target.active) await db.deleteUserSessions(target.id);
  revalidatePath('/student-support/staff/team');
  return { ok: `${target.name} ${target.active ? 'disabled' : 'enabled'}.` };
}
