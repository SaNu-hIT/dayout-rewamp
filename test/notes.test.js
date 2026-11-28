import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseRegion, notesByRegion, findNote, neighbours, moreNotes, findTrip } from '../lib/notes.js';
import { NOTES } from '../data/notes.js';

const LIST = [
  { slug: 'a', region: 'south' },
  { slug: 'b', region: 'north' },
  { slug: 'c', region: 'south' },
  { slug: 'd', region: 'north' },
  { slug: 'e', region: 'south' },
  { slug: 'f', region: 'north' },
];
const slugs = (list) => list.map((n) => n.slug);

test('parseRegion accepts only known regions', () => {
  assert.equal(parseRegion('north'), 'north');
  assert.equal(parseRegion(' SOUTH '), 'south');
  for (const bad of [null, undefined, '', 'east', '<script>', 42, ['north']]) {
    assert.equal(parseRegion(bad), 'all');
  }
});

test('notesByRegion filters and keeps order', () => {
  assert.deepEqual(slugs(notesByRegion(LIST, 'north')), ['b', 'd', 'f']);
  assert.deepEqual(slugs(notesByRegion(LIST, 'south')), ['a', 'c', 'e']);
  assert.equal(notesByRegion(LIST, 'all'), LIST);
});

test('findNote returns the note or undefined', () => {
  assert.equal(findNote(LIST, 'c').slug, 'c');
  assert.equal(findNote(LIST, 'zzz'), undefined);
});

test('neighbours has no wrap-around and rejects unknown slugs', () => {
  assert.deepEqual(neighbours(LIST, 'a'), { prev: null, next: LIST[1] });
  assert.deepEqual(neighbours(LIST, 'c'), { prev: LIST[1], next: LIST[3] });
  assert.deepEqual(neighbours(LIST, 'f'), { prev: LIST[4], next: null });
  assert.throws(() => neighbours(LIST, 'zzz'), RangeError);
});

test('moreNotes skips self and neighbours, same region first', () => {
  // b: prev a, next c. Pool d, e, f. Same region (north): d, f; then e.
  assert.deepEqual(slugs(moreNotes(LIST, 'b', 3)), ['d', 'f', 'e']);
  assert.deepEqual(slugs(moreNotes(LIST, 'b', 1)), ['d']);
  assert.deepEqual(moreNotes(LIST, 'b', 0), []);
  // Fewer candidates than asked for: returns what exists.
  assert.equal(moreNotes(LIST.slice(0, 3), 'b', 3).length, 0);
  assert.throws(() => moreNotes(LIST, 'b', -1), RangeError);
  assert.throws(() => moreNotes(LIST, 'b', 1.5), RangeError);
  assert.throws(() => moreNotes(LIST, 'zzz', 3), RangeError);
});

test('findTrip looks up by exact name', () => {
  const trips = [{ name: 'Ladakh Road Trip' }];
  assert.equal(findTrip(trips, 'Ladakh Road Trip'), trips[0]);
  assert.equal(findTrip(trips, 'ladakh road trip'), null);
  assert.equal(findTrip(trips, null), null);
});

// Trip names are checked against PASSES/TICKETS at build time in the note page
// (those data files use extensionless imports that plain Node cannot resolve).
test('notes data: unique URL-safe slugs, known regions, required fields', () => {
  const seen = new Set();
  for (const n of NOTES) {
    assert.match(n.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, n.slug);
    assert.ok(!seen.has(n.slug), `duplicate slug ${n.slug}`);
    seen.add(n.slug);
    assert.ok(['north', 'south'].includes(n.region), n.slug);
    assert.ok(n.title && n.dek && n.alt && n.img && n.body.length > 0, n.slug);
  }
});
