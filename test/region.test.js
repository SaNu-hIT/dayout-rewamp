import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  openPath, closedPath, ridgePath, snowClip, contourPaths, pinesPath, flagRow,
  climbOffset, profilePath, tidePath, project, routePath, islandsPath, formatNumber,
} from '../lib/region.js';

test('openPath and closedPath draw through every point', () => {
  assert.equal(openPath([[0, 0], [10, 5]]), 'M0.0 0.0L10.0 5.0');
  assert.equal(closedPath([[0, 0], [10, 5], [0, 5]]), 'M0.0 0.0L10.0 5.0L0.0 5.0Z');
  assert.throws(() => openPath([[0, 0]]), RangeError);
});

test('ridgePath is closed to the bottom edge and stays above base', () => {
  const d = ridgePath({ width: 120, height: 900, seed: 1, base: 800, amp: 100 });
  assert.match(d, /^M0 900L0 /);
  assert.match(d, /L120 900Z$/);
  const ys = [...d.matchAll(/L\d+ (-?[\d.]+)/g)].map((m) => Number(m[1])).filter((y) => y !== 900);
  assert.ok(ys.every((y) => y <= 800 && y >= 700), 'ridge stays within base - amp');
});

test('ridgePath peak raises the summit and rejects bad input', () => {
  const flat = ridgePath({ width: 240, height: 500, seed: 2, base: 400, amp: 50 });
  const peaked = ridgePath({ width: 240, height: 500, seed: 2, base: 400, amp: 50, peak: { x: 120, w: 60, h: 100 } });
  const min = (d) => Math.min(...[...d.matchAll(/L\d+ (-?[\d.]+)/g)].map((m) => Number(m[1])));
  assert.ok(min(peaked) < min(flat) - 50);
  assert.throws(() => ridgePath({ width: 100, height: 1, seed: NaN, base: 1, amp: 1 }), TypeError);
  assert.throws(() => ridgePath({ width: 100, height: 1, seed: 1, base: 1, amp: 1, step: 0 }), RangeError);
});

test('snowClip, contours and pines are deterministic closed shapes', () => {
  assert.match(snowClip(36, 400), /^M0 0H36V400.*Z$/);
  const rings = contourPaths(3);
  assert.equal(rings.length, 3);
  assert.ok(rings.every((d) => d.endsWith('Z')));
  assert.deepEqual(contourPaths(3), rings);
  assert.equal(pinesPath(), pinesPath());
  assert.ok(pinesPath().length > 0);
});

test('flagRow spaces flags evenly, cycles colours and sags in the middle', () => {
  const { flags, line } = flagRow({ x1: 0, y1: 0, x2: 480, y2: 0, sag: 20, gap: 48, w: 20 });
  assert.equal(flags.length, 11);
  assert.equal(flags[0].tone, 'blue');
  assert.equal(flags[5].tone, 'blue');
  assert.equal(Number(flags[5].y), 20);
  assert.equal(Number(flags[0].x), -10);
  assert.match(line, /^M0\.0 0\.0/);
  assert.throws(() => flagRow({ x1: 0, y1: 0, x2: 10, y2: 0, sag: 0, gap: 0, w: 1 }), RangeError);
});

test('climbOffset maps altitude to a clamped drop', () => {
  assert.equal(climbOffset(80), 240);
  assert.equal(climbOffset(4225), 0);
  assert.equal(climbOffset(9000), 0);
  assert.equal(climbOffset(0), 240);
  assert.equal(climbOffset(2152.5), 120);
  assert.throws(() => climbOffset(100, { min: 10, max: 10 }), RangeError);
  assert.throws(() => climbOffset(undefined), TypeError);
});

test('profilePath puts the sun above the summit', () => {
  const p = profilePath(70);
  assert.equal(p.sun.x, 180);
  assert.equal(p.sun.y, 40);
  assert.ok(p.area.startsWith(p.line) && p.area.endsWith('Z'));
});

test('tidePath spans two tiles and closes at the bottom', () => {
  const d = tidePath(10, 480, 74, 0);
  assert.match(d, /^M0 120L0 74\.0/);
  assert.match(d, /L2880 120Z$/);
  assert.throws(() => tidePath(1, 0, 1, 0), RangeError);
});

test('project places Kochi and Goa on the stylised map', () => {
  assert.deepEqual(project(73.83, 15.49), [93, 91]);
  assert.deepEqual(project(76.27, 9.93), [264, 591]);
  assert.throws(() => project(null, 10), TypeError);
});

test('routePath starts at the first stop and ends at the last', () => {
  const d = routePath([[0, 0], [100, 100], [50, 200]]);
  assert.match(d, /^M0 0Q/);
  assert.match(d, / 50 200$/);
  assert.equal((d.match(/Q/g) || []).length, 2);
  assert.throws(() => routePath([]), RangeError);
});

test('islandsPath draws one closed ellipse per island', () => {
  const d = islandsPath([[10, 10, 2, 4], [20, 20, 3, 5]]);
  assert.equal((d.match(/Z/g) || []).length, 2);
  assert.ok(d.startsWith('M8 10a2 4'));
});

test('formatNumber uses Indian grouping', () => {
  assert.equal(formatNumber(4225), '4,225');
  assert.equal(formatNumber(80), '80');
  assert.throws(() => formatNumber(Infinity), TypeError);
});
