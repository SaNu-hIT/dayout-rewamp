// Time-of-day logic for the "Day → Out" home page. Pure functions, no DOM.

export const GOA_UTC_OFFSET_MIN = 330; // IST, no daylight saving
const MIN_PER_DAY = 1440;
const DAY_START = 360; // 06:00, where the page's day begins

/** Minutes since midnight in Goa (IST) for a given instant. */
export function goaMinutes(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('goaMinutes expects a valid Date');
  }
  const utc = date.getUTCHours() * 60 + date.getUTCMinutes();
  return (utc + GOA_UTC_OFFSET_MIN) % MIN_PER_DAY;
}

function assertMinutes(min) {
  if (!Number.isInteger(min) || min < 0 || min >= MIN_PER_DAY) {
    throw new RangeError(`Expected whole minutes 0–1439, got ${min}`);
  }
}

/** 'day' 05:00–15:59, 'golden' 16:00–18:59, 'night' 19:00–04:59. */
export function periodFor(min) {
  assertMinutes(min);
  if (min >= 300 && min < 960) return 'day';
  if (min >= 960 && min < 1140) return 'golden';
  return 'night';
}

/** Words after the clock in the hero eyebrow. */
export function heroLabel(min) {
  const period = periodFor(min);
  if (period === 'golden') return 'Golden hour in Goa';
  if (period === 'night') return 'Goa is just getting started';
  return min < 720 ? 'Morning in Goa' : 'Afternoon in Goa';
}

/** 0 → '00:00', 1274 → '21:14'. */
export function formatClock(min) {
  assertMinutes(min);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
}

/** '21:14' → 1274. */
export function parseClock(text) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(text);
  if (!match) throw new RangeError(`Expected HH:MM, got ${text}`);
  return Number(match[1]) * 60 + Number(match[2]);
}

/**
 * Index of the stop the current time falls in. The page's day runs from
 * 06:00 to 05:59, so after midnight the latest evening stop stays current.
 */
export function currentStopIndex(min, stopTimes) {
  assertMinutes(min);
  if (stopTimes.length === 0) return -1;
  const sinceDayStart = (m) => (m - DAY_START + MIN_PER_DAY) % MIN_PER_DAY;
  const now = sinceDayStart(min);
  let best = 0;
  stopTimes.forEach((t, i) => {
    const s = sinceDayStart(parseClock(t));
    if (s <= now && s >= sinceDayStart(parseClock(stopTimes[best]))) best = i;
  });
  return best;
}

/** Packages for a mood id; 'all' (or an unknown id) returns everything. */
export function filterByMood(items, mood) {
  if (mood === 'all') return items;
  const matches = items.filter((item) => item.mood === mood);
  return items.some((item) => item.mood === mood) ? matches : items;
}

/**
 * SVG path for one palm frond: a curved stem with leaflets that shorten
 * toward the tip. Stem base is at 0,0 and points along +x.
 */
export function frondPath() {
  const c = [200, -90];
  const tip = [430, -20];
  const point = (t) => [2 * (1 - t) * t * c[0] + t * t * tip[0], 2 * (1 - t) * t * c[1] + t * t * tip[1]];
  const tangent = (t) => [2 * (1 - t) * c[0] + 2 * t * (tip[0] - c[0]), 2 * (1 - t) * c[1] + 2 * t * (tip[1] - c[1])];
  const f = (n) => n.toFixed(1);
  let d = `M0 0Q${c[0]} ${c[1]} ${tip[0]} ${tip[1]}`;
  for (let i = 2; i < 27; i++) {
    const t = i / 28;
    const [x, y] = point(t);
    const [dx, dy] = tangent(t);
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;
    const L = 150 * (1 - 0.7 * t);
    for (const side of [1, -1]) {
      const cx = x + nx * L * 0.5 * side + ux * L * 0.1;
      const cy = y + ny * L * 0.5 * side + uy * L * 0.1;
      const ex = x + nx * L * side + ux * L * 0.55;
      const ey = y + ny * L * side + uy * L * 0.55;
      d += `M${f(x)} ${f(y)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`;
    }
  }
  return d;
}

/** Sun rays: 12 strokes from r=32 to r=45 around 0,0 (viewBox -50 -50 100 100). */
export function sunRaysPath() {
  return Array.from({ length: 12 }, (_, k) => {
    const a = (k * 30 * Math.PI) / 180;
    const p = (r) => `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
    return `M${p(32)}L${p(45)}`;
  }).join('');
}
