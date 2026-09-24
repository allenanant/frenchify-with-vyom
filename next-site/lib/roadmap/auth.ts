import 'server-only';

import { createHash, randomBytes } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import bcrypt from 'bcryptjs';
import * as db from './db';
import { ROADMAP_COOKIE, ROADMAP_SESSION_DAYS } from './constants';

const BCRYPT_ROUNDS = 12;

export const passwordBytes = (plain: string) => Buffer.byteLength(plain, 'utf8');

export function hashPassword(plain: string) {
  return bcrypt.hashSync(plain, BCRYPT_ROUNDS);
}
export function verifyPassword(plain: string, stored: string) {
  try {
    return bcrypt.compareSync(plain, stored);
  } catch {
    return false;
  }
}

function tokenHash(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function startRoadmapSession(accountId: number) {
  const token = randomBytes(32).toString('base64url');
  await db.createSession(tokenHash(token), accountId, ROADMAP_SESSION_DAYS);
  (await cookies()).set(ROADMAP_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ROADMAP_SESSION_DAYS * 86400,
  });
}

export async function endRoadmapSession() {
  const jar = await cookies();
  const token = jar.get(ROADMAP_COOKIE)?.value;
  if (token) await db.deleteSession(tokenHash(token));
  jar.delete(ROADMAP_COOKIE);
}

export async function currentRoadmapAccount() {
  try {
    const token = (await cookies()).get(ROADMAP_COOKIE)?.value;
    return token ? await db.getAccountBySession(tokenHash(token)) : null;
  } catch {
    return null;
  }
}

/** Salted one-way address fingerprint; the visitor's raw IP is never stored. */
export async function roadmapIpHash() {
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0].trim() || h.get('x-real-ip') || 'unknown';
  return createHash('sha256')
    .update((process.env.SUPPORT_IP_SALT || 'frenchify-roadmap') + '|' + ip)
    .digest('hex')
    .slice(0, 32);
}
