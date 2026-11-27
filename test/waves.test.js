import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TILE, waveEdge, wavePath, crestMask, sparks, whatsappLink } from '../lib/waves.js';

test('waveEdge repeats every tile, so the rolled path has no seam', () => {
  const f = waveEdge(46, 22, 0.6);
  for (const x of [0, 17, 360, 999, 1439]) {
    assert.ok(Math.abs(f(x) - f(x + TILE)) < 1e-9, `seam at x=${x}`);
  }
});

test('waveEdge stays within base ± 1.75 × amp', () => {
  const f = waveEdge(46, 22, 0.6);
  for (let x = 0; x <= TILE; x += 8) {
    assert.ok(f(x) >= 46 - 22 * 1.75 && f(x) <= 46 + 22 * 1.75);
  }
});

test('waveEdge rejects non-numbers', () => {
  assert.throws(() => waveEdge('46', 22, 0), TypeError);
  assert.throws(() => waveEdge(46, NaN, 0), TypeError);
});

test('wavePath samples from 0 to width', () => {
  const d = wavePath(() => 10, 32, 16);
  assert.equal(d, 'M0 10.0L16 10.0L32 10.0');
});

test('wavePath defaults to two tiles wide', () => {
  const d = wavePath(() => 0);
  assert.ok(d.startsWith('M0 0.0'));
  assert.ok(d.endsWith(`L${TILE * 2} 0.0`));
});

test('wavePath rejects bad sizes', () => {
  assert.throws(() => wavePath(() => 0, 0), RangeError);
  assert.throws(() => wavePath(() => 0, 100, -1), RangeError);
});

test('crestMask is two layers: the wave tile, then a solid fill', () => {
  const m = crestMask(waveEdge(46, 22, 0.6));
  assert.match(m, /^url\("data:image\/svg\+xml,%3Csvg/);
  assert.ok(m.endsWith(', linear-gradient(#000, #000)'));
  // The encoded SVG must not break out of the url("…") wrapper.
  const inner = m.slice(5, m.indexOf('"),'));
  assert.ok(!inner.includes('"'));
  assert.ok(decodeURIComponent(inner).includes(`L${TILE} 120L0 120Z`));
});

test('sparks are stable and inside their bounds', () => {
  const a = sparks(46);
  assert.equal(a.length, 46);
  assert.deepEqual(a, sparks(46));
  for (const s of a) {
    assert.ok(s.x >= 0 && s.x <= 100);
    assert.ok(s.y >= 55 && s.y <= 99);
    assert.ok(s.s >= 2 && s.s <= 6);
    assert.ok(s.delay >= 0 && s.delay <= 3.6);
  }
});

test('sparks handles zero and rejects bad counts', () => {
  assert.deepEqual(sparks(0), []);
  assert.throws(() => sparks(-1), RangeError);
  assert.throws(() => sparks(2.5), RangeError);
});

test('whatsappLink strips formatting and encodes the message', () => {
  assert.equal(whatsappLink('+91 88489 65352'), 'https://wa.me/918848965352');
  assert.equal(
    whatsappLink('+91 88489 65352', "Hi DayOut, I'd like Goa & more"),
    'https://wa.me/918848965352?text=Hi%20DayOut%2C%20I\'d%20like%20Goa%20%26%20more',
  );
});

test('whatsappLink rejects short numbers', () => {
  assert.throws(() => whatsappLink('12345'), RangeError);
});
