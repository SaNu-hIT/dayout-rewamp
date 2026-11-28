// Pure geometry for the North (altitude) and South (coastline) pages.
// Everything is deterministic so server and client render the same SVG.

const f1 = (n) => n.toFixed(1);

function assertFinite(values) {
  for (const v of values) {
    if (!Number.isFinite(v)) throw new TypeError(`Expected a finite number, got ${v}`);
  }
}

const toPath = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`).join('');

/** Open polyline through points. */
export function openPath(points) {
  if (!Array.isArray(points) || points.length < 2) throw new RangeError('Need at least two points');
  return toPath(points);
}

/** Closed polygon through points. */
export function closedPath(points) {
  return `${openPath(points)}Z`;
}

/**
 * Mountain ridge filled down to `height`. Sharp peaks come from 1-|sin|;
 * `peak` adds one pointed summit, `valley` dips the middle so text stays clear.
 */
export function ridgePath({ width, height, seed, base, amp, peak = null, step = 12, valley = 0 }) {
  assertFinite([width, height, seed, base, amp, step, valley]);
  if (step <= 0 || width <= 0) throw new RangeError('width and step must be positive');
  const pts = [];
  for (let x = 0; x <= width; x += step) {
    const n = (1 - Math.abs(Math.sin(x * 0.0045 + seed))) * 0.6
      + (1 - Math.abs(Math.sin(x * 0.012 + seed * 1.7))) * 0.28
      + (Math.sin(x * 0.037 + seed * 2.3) + 1) * 0.06;
    const v = valley ? 1 - valley * Math.max(0, 1 - Math.abs(x - width / 2) / (width * 0.32)) : 1;
    const g = peak ? peak.h * Math.max(0, 1 - Math.abs(x - peak.x) / peak.w) ** 1.25 : 0;
    pts.push([x, base - amp * n * v - g]);
  }
  return `M0 ${height}${pts.map(([x, y]) => `L${x} ${f1(y)}`).join('')}L${width} ${height}Z`;
}

/** Clip region above a jagged snowline at height y. */
export function snowClip(width, y) {
  assertFinite([width, y]);
  let d = `M0 0H${width}V${y}`;
  for (let x = width; x >= 0; x -= 18) d += `L${x} ${f1(y + ((x / 18) % 2 ? 10 : -6))}`;
  return `${d}Z`;
}

/** Topographic rings around (720, 450) for a 1440x900 box. */
export function contourPaths(count = 11) {
  return Array.from({ length: count }, (_, i) => {
    const r0 = 50 + i * 42;
    const pts = [];
    for (let k = 0; k <= 72; k++) {
      const t = (k / 72) * Math.PI * 2;
      const r = r0 * (1 + 0.09 * Math.sin(3 * t + i * 0.6) + 0.05 * Math.sin(5 * t + i * 1.3));
      pts.push([720 + Math.cos(t) * r * 1.25, 450 + Math.sin(t) * r]);
    }
    return closedPath(pts);
  });
}

/** Pines that thin out and shrink to the right (towards the treeline). */
export function pinesPath(until = 1100) {
  let d = '';
  for (let x = 0; x < until; x += 22) {
    const fade = 1 - x / until;
    if (((x * 7919) % 100) / 100 > fade + 0.15) continue;
    const base = 640 - x * 0.12 + Math.sin(x * 0.02) * 10;
    const h = 30 + 70 * fade * (0.6 + 0.4 * Math.abs(Math.sin(x)));
    const w = h * 0.36;
    d += `M${f1(x)} ${f1(base)}L${f1(x + w / 2)} ${f1(base - h)}L${f1(x + w)} ${f1(base)}Z`;
  }
  return d;
}

export const FLAG_TONES = ['blue', 'white', 'red', 'green', 'yellow'];

/** Prayer flags along a sagging line. Returns the string and each flag's top-left. */
export function flagRow({ x1, y1, x2, y2, sag, gap, w }) {
  assertFinite([x1, y1, x2, y2, sag, gap, w]);
  if (gap <= 0) throw new RangeError('gap must be positive');
  const n = Math.max(1, Math.floor((x2 - x1) / gap));
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + sag * 4 * t * (1 - t)];
  });
  return {
    line: openPath(pts),
    flags: pts.map(([x, y], i) => ({
      x: f1(x - w / 2),
      y: f1(y),
      tone: FLAG_TONES[i % FLAG_TONES.length],
      delay: `${f1(-(i % 7) * 0.3)}s`,
    })),
  };
}

/** How far a destination card drops below the top of the rail: higher place, higher card. */
export function climbOffset(alt, { min = 80, max = 4225, range = 240 } = {}) {
  assertFinite([alt, min, max, range]);
  if (max <= min) throw new RangeError('max must be above min');
  const t = Math.min(1, Math.max(0, (max - alt) / (max - min)));
  return Math.round(t * range);
}

/** Elevation profile for the grade picker; `top` is how far the summit rises. */
export function profilePath(top) {
  assertFinite([top]);
  const pts = [[0, 124], [40, 118], [70, 124 - top * 0.35], [110, 124 - top * 0.55], [140, 124 - top * 0.5], [180, 124 - top], [215, 124 - top * 0.6], [260, 124 - top * 0.7]];
  const line = openPath(pts);
  return { line, area: `${line}L260 130L0 130Z`, sun: { x: 180, y: Number(f1(124 - top - 14)) } };
}

/** One tide layer over a 2880-wide strip (two tiles), filled to the bottom at 120. */
export function tidePath(amp, len, base, phase) {
  assertFinite([amp, len, base, phase]);
  if (len <= 0) throw new RangeError('len must be positive');
  let d = `M0 120L0 ${f1(base)}`;
  for (let x = 0; x <= 2880; x += 24) d += `L${x} ${f1(base + amp * Math.sin((x / len) * Math.PI * 2 + phase))}`;
  return `${d}L2880 120Z`;
}

/** Stylised South India map: 70 px per degree of longitude, 90 per degree of latitude, top at 16.5° N. */
export function project(lon, lat) {
  assertFinite([lon, lat]);
  return [Math.round((lon - 72.5) * 70), Math.round((16.5 - lat) * 90)];
}

/** Gentle curves between consecutive points (control point nudged off the chord). */
export function routePath(points) {
  if (!Array.isArray(points) || points.length < 2) throw new RangeError('Need at least two points');
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2 + (y1 - y0) * 0.18;
    const cy = (y0 + y1) / 2 - (x1 - x0) * 0.18;
    d += `Q${f1(cx)} ${f1(cy)} ${x1} ${y1}`;
  }
  return d;
}

/** Small ellipses for an island chain: [cx, cy, rx, ry]. */
export function islandsPath(list) {
  return list
    .map(([cx, cy, rx, ry]) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0Z`)
    .join('');
}

/** 4225 -> "4,225". Indian grouping matches the rest of the site. */
export function formatNumber(n) {
  assertFinite([n]);
  return n.toLocaleString('en-IN');
}
