/**
 * One place that understands the `createdAt` stamps in content/*.md.
 *
 * Three formats are in the repo and all of them have to keep working:
 *   "2026-08-03T14:22:05.108Z"  — what the admin writes now
 *   "2026-08-01"                — what the admin wrote before that
 *   "Sat Aug 01 2026 00:00:00 GMT+0000 (…)"  — the migrated seed walls
 *
 * The third one is the reason this file exists. Unquoted YAML dates come out
 * of gray-matter as JS Date objects, and `String(date)` gives that long form.
 * Sorting those as plain strings puts "Sat …" above every "2026-…" stamp, so
 * the oldest batch pinned itself to the top of both CLB walls and every new
 * upload landed underneath it. Compare timestamps, never the raw strings.
 */

/** Milliseconds since epoch, or 0 for anything unparseable, so sorts are total. */
export function toTimestamp(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  if (value == null) return 0;
  const ms = new Date(String(value)).getTime();
  return Number.isNaN(ms) ? 0 : ms;
}

/** YYYY-MM-DD for display. Falls back to the raw value if it will not parse. */
export function toDateOnly(value: unknown): string {
  if (value == null) return '';
  const ms = toTimestamp(value);
  if (ms === 0) return String(value);
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Newest first. `id` breaks ties (filename or path) so two entries published on
 * the same day, or two legacy date-only stamps, always come back in the same
 * order instead of leaning on whatever the engine's sort happens to do.
 */
export function newestFirst(
  a: { createdAt: unknown; id: string },
  b: { createdAt: unknown; id: string }
): number {
  const diff = toTimestamp(b.createdAt) - toTimestamp(a.createdAt);
  return diff !== 0 ? diff : b.id.localeCompare(a.id);
}

/** The stamp written on every new publish. Full precision so same-day batches order. */
export function stampNow(): string {
  return new Date().toISOString();
}

/**
 * Normalise an existing stamp to ISO before writing it back. Rewriting an entry
 * (deleting one image from a batch, say) must not put a legacy Date-object
 * string back into the file it just cleaned up.
 */
export function toIsoStamp(value: unknown): string {
  const ms = toTimestamp(value);
  return ms === 0 ? stampNow() : new Date(ms).toISOString();
}
