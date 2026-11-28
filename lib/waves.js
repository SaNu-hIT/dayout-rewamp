// Geometry for the Swell home: wave edges, the crest mask, and the night-sea sparks.
// Everything here is pure so the server can render it once and the tests can pin it.

/** Width of one wave tile in SVG units. The foam path is two tiles wide so it can roll with no seam. */
export const TILE = 1440;

/**
 * A wave edge as y = f(x). The three sine terms have periods 720, 360 and 240,
 * which all divide TILE, so f(x) === f(x + TILE) and the edge tiles seamlessly.
 */
export function waveEdge(base, amp, phase) {
  if (![base, amp, phase].every(Number.isFinite)) {
    throw new TypeError('waveEdge expects finite numbers');
  }
  return (x) =>
    base
    + amp * Math.sin((2 * Math.PI * x) / 720 + phase)
    + amp * 0.5 * Math.sin((2 * Math.PI * x) / 360 + phase * 2 + 1)
    + amp * 0.25 * Math.sin((2 * Math.PI * x) / 240 + phase * 3 + 2);
}

/** An SVG path that follows `edge` from x = 0 to x = width, sampled every `step` units. */
export function wavePath(edge, width = TILE * 2, step = 16) {
  if (!(width > 0) || !(step > 0)) throw new RangeError('width and step must be positive');
  let d = '';
  for (let x = 0; x <= width; x += step) d += `${x ? 'L' : 'M'}${x} ${edge(x).toFixed(1)}`;
  return d;
}

/**
 * CSS mask-image value for a panel whose top edge is a wave.
 * Layer 1: one tile, filled below the edge. Layer 2: solid, covering the rest of the panel.
 */
export function crestMask(edge, height = 120) {
  const tile = `${wavePath(edge, TILE)}L${TILE} ${height}L0 ${height}Z`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${height}" width="${TILE}" height="${height}" preserveAspectRatio="none"><path d="${tile}" fill="#000"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}"), linear-gradient(#000, #000)`;
}

/**
 * Fixed pseudo-random sparks for the night sea, so server and client render the same layout.
 * x, y are percentages (y kept in the lower half, where the water is); s is the size in px.
 */
export function sparks(count) {
  if (!Number.isInteger(count) || count < 0) throw new RangeError('count must be a non-negative integer');
  return Array.from({ length: count }, (_, i) => {
    const r = (n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
    return {
      x: Number((r(1) * 100).toFixed(1)),
      y: Number((55 + r(2) * 44).toFixed(1)),
      s: Number((2 + r(3) * 4).toFixed(1)),
      delay: Number((r(4) * 3.6).toFixed(2)),
    };
  });
}

/** WhatsApp chat link with a prefilled message. */
export function whatsappLink(phone, message) {
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length < 10) throw new RangeError('phone needs at least 10 digits');
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
