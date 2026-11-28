import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  goaMinutes, periodFor, heroLabel, formatClock, parseClock,
  currentStopIndex, filterByMood, frondPath, sunRaysPath,
} from '../lib/day.js';

test('goaMinutes converts UTC to IST', () => {
  assert.equal(goaMinutes(new Date('2026-11-27T00:00:00Z')), 330);      // 05:30
  assert.equal(goaMinutes(new Date('2026-11-27T18:30:00Z')), 0);        // midnight wraps
  assert.equal(goaMinutes(new Date('2026-11-27T15:44:59Z')), 1274);     // 21:14, seconds dropped
});

test('goaMinutes rejects invalid input', () => {
  assert.throws(() => goaMinutes(new Date('nope')), TypeError);
  assert.throws(() => goaMinutes('2026-11-27'), TypeError);
});

test('periodFor boundaries', () => {
  assert.equal(periodFor(299), 'night');
  assert.equal(periodFor(300), 'day');
  assert.equal(periodFor(959), 'day');
  assert.equal(periodFor(960), 'golden');
  assert.equal(periodFor(1139), 'golden');
  assert.equal(periodFor(1140), 'night');
  assert.equal(periodFor(0), 'night');
});

test('periodFor rejects out-of-range minutes', () => {
  assert.throws(() => periodFor(-1), RangeError);
  assert.throws(() => periodFor(1440), RangeError);
  assert.throws(() => periodFor(12.5), RangeError);
});

test('heroLabel', () => {
  assert.equal(heroLabel(parseClock('07:10')), 'Morning in Goa');
  assert.equal(heroLabel(parseClock('12:00')), 'Afternoon in Goa');
  assert.equal(heroLabel(parseClock('17:48')), 'Golden hour in Goa');
  assert.equal(heroLabel(parseClock('02:00')), 'Goa is just getting started');
  assert.throws(() => heroLabel(2000), RangeError);
});

test('formatClock and parseClock round-trip', () => {
  assert.equal(formatClock(0), '00:00');
  assert.equal(formatClock(1439), '23:59');
  assert.equal(formatClock(1274), '21:14');
  for (const m of [0, 59, 360, 1122, 1439]) assert.equal(parseClock(formatClock(m)), m);
});

test('parseClock rejects malformed text', () => {
  for (const bad of ['24:00', '9:00', '12:60', '', 'noon']) {
    assert.throws(() => parseClock(bad), RangeError, bad);
  }
});

const STOPS = ['06:00', '08:00', '12:00', '17:30', '18:42', '21:00', '23:30', '05:59'];

test('currentStopIndex follows the page day (06:00 → 05:59)', () => {
  assert.equal(currentStopIndex(parseClock('06:00'), STOPS), 0);
  assert.equal(currentStopIndex(parseClock('07:10'), STOPS), 0);
  assert.equal(currentStopIndex(parseClock('14:45'), STOPS), 2);
  assert.equal(currentStopIndex(parseClock('18:42'), STOPS), 4);
  assert.equal(currentStopIndex(parseClock('21:14'), STOPS), 5);
  assert.equal(currentStopIndex(parseClock('02:00'), STOPS), 6);   // after midnight stays on 23:30
  assert.equal(currentStopIndex(parseClock('05:59'), STOPS), 7);
});

test('currentStopIndex handles an empty list', () => {
  assert.equal(currentStopIndex(600, []), -1);
});

const ITEMS = [{ id: 1, mood: 'wild' }, { id: 2, mood: 'easy' }, { id: 3, mood: 'wild' }];

test('filterByMood', () => {
  assert.deepEqual(filterByMood(ITEMS, 'all'), ITEMS);
  assert.deepEqual(filterByMood(ITEMS, 'wild').map((i) => i.id), [1, 3]);
  assert.deepEqual(filterByMood(ITEMS, 'unknown'), ITEMS);
  assert.deepEqual(filterByMood([], 'wild'), []);
});

test('frondPath and sunRaysPath are deterministic SVG paths', () => {
  assert.equal(frondPath(), frondPath());
  assert.match(frondPath(), /^M0 0Q200 -90 430 -20/);
  assert.doesNotMatch(frondPath(), /NaN/);
  const rays = sunRaysPath();
  assert.equal((rays.match(/M/g) || []).length, 12);
  assert.doesNotMatch(rays, /NaN/);
});
