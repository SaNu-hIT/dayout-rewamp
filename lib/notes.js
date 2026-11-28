// Pure helpers for the field notes (blog). Kept free of React so they can be unit tested.

export const REGIONS = ['north', 'south'];

/** Region filter value from untrusted input (a URL param): 'north', 'south' or 'all'. */
export function parseRegion(value) {
  const v = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return REGIONS.includes(v) ? v : 'all';
}

/** Notes in one region, or all of them, keeping the given order. */
export function notesByRegion(notes, region) {
  return region === 'all' ? notes : notes.filter((n) => n.region === region);
}

/** The note with this slug, or undefined. */
export function findNote(notes, slug) {
  return notes.find((n) => n.slug === slug);
}

/** Previous and next notes in list order. No wrap-around: the ends return null. */
export function neighbours(notes, slug) {
  const i = notes.findIndex((n) => n.slug === slug);
  if (i === -1) throw new RangeError(`unknown note: ${slug}`);
  return { prev: notes[i - 1] ?? null, next: notes[i + 1] ?? null };
}

/**
 * Up to `count` other notes for the "more" row: skips the note itself and its
 * previous/next links (already shown), same region first, then the rest in list order.
 */
export function moreNotes(notes, slug, count) {
  if (!Number.isInteger(count) || count < 0) throw new RangeError('count must be a non-negative integer');
  const note = findNote(notes, slug);
  if (!note) throw new RangeError(`unknown note: ${slug}`);
  const { prev, next } = neighbours(notes, slug);
  const skip = new Set([slug, prev?.slug, next?.slug]);
  const pool = notes.filter((n) => !skip.has(n.slug));
  const same = pool.filter((n) => n.region === note.region);
  const other = pool.filter((n) => n.region !== note.region);
  return [...same, ...other].slice(0, count);
}

/** The package a note points to, looked up by name, or null. */
export function findTrip(trips, name) {
  if (!name) return null;
  return trips.find((t) => t.name === name) ?? null;
}
