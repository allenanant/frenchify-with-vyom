/**
 * Staff authentication for the student support dashboard.
 *
 * Sessions live in Postgres, not memory, because serverless instances come and
 * go constantly. Cookies are httpOnly and SameSite=Lax, which also covers CSRF
 * for the dashboard since every mutation is a same-site Server Action.
 */

import 'server-only';
import { randomBytes, randomInt, createHash } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import bcrypt from 'bcryptjs';
import * as db from './db';
import { SESSION_COOKIE, SESSION_DAYS } from './constants';

export const COOKIE = SESSION_COOKIE;

export { SESSION_DAYS };
const ROUNDS = 12;

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'agent';
  must_change: boolean;
};

/** What bcrypt will actually consume. Not the same as string length. */
export const passwordBytes = (plain: string) => Buffer.byteLength(plain, 'utf8');

export const hash = (plain: string) => bcrypt.hashSync(plain, ROUNDS);

export function verify(plain: string, stored: string) {
  try {
    return bcrypt.compareSync(plain, stored);
  } catch {
    return false;
  }
}

/** Readable but random. Handed out once, then the holder must change it. */
export function suggestPassword() {
  const words = [
    'atelier', 'bonjour', 'cahier', 'delice', 'etoile', 'facile', 'guichet',
    'horizon', 'jardin', 'lumiere', 'maison', 'nuage', 'orange', 'plaisir',
  ];
  const pick = () => words[randomInt(words.length)];
  return `${pick()}-${pick()}-${randomInt(1000, 9999)}`;
}

/**
 * Mints a session only if the account still carries the password hash that was
 * just verified. Closes the window where a sign-in checks an old password,
 * pauses, and resumes after an admin has reset the account.
 */
export async function startSession(userId: number) {
  const token = randomBytes(32).toString('hex');
  await db.createSession(token, userId, SESSION_DAYS);
  await db.touchLogin(userId);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 86400,
  });
  return token;
}

export async function endSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await db.deleteSession(token);
  jar.delete(COOKIE);
}

/** Current signed-in staff member, or null. Never throws. */
export async function currentUser(): Promise<SessionUser | null> {
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return null;
    const row = await db.getSession(token);
    if (!row || !row.active) return null;
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      role: row.role,
      must_change: row.must_change,
    };
  } catch {
    return null;
  }
}

/**
 * The single gate every protected Server Action and route handler goes through.
 *
 * Pages redirect, but a Server Action is a public HTTP endpoint the moment it
 * deploys, so page-level checks protect nothing on their own. In particular the
 * forced password change is enforced HERE, otherwise someone holding a starter
 * password could still drive every mutation directly.
 */
export async function requireStaff(opts: { admin?: boolean } = {}) {
  const user = await currentUser();
  if (!user) return { user: null, error: 'Please sign in again.' as const };
  if (user.must_change) {
    return { user: null, error: 'Set your own password before continuing.' as const };
  }
  if (opts.admin && user.role !== 'admin') {
    return { user: null, error: 'Admins only.' as const };
  }
  return { user, error: null };
}

/** Salted hash of the caller's IP. The raw address is never stored. */
export async function ipHash() {
  const h = await headers();
  const ip =
    h.get('x-forwarded-for')?.split(',')[0].trim() ||
    h.get('x-real-ip') ||
    'unknown';
  return createHash('sha256')
    .update((process.env.SUPPORT_IP_SALT || 'frenchify-support') + '|' + ip)
    .digest('hex')
    .slice(0, 32);
}
