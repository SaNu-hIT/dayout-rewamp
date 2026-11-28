import Image from 'next/image';
import {
  NORTH_NAV, NORTH_METER, DESTINATIONS, NORTH_CAMP, BASECAMP_STACK, HIMALAYA,
  NORTH_NOTES, NORTH_FAQ, NORTH_BY_HEIGHT,
} from '@/data/north';
import { ROUTES } from '@/data/swell';
import {
  ridgePath, snowClip, contourPaths, pinesPath, flagRow, climbOffset, formatNumber,
} from '@/lib/region';
import SunMark from '@/components/home/SunMark';
import RegionHeader from '@/components/region/RegionHeader';
import Meter from '@/components/region/Meter';
import RegionFooter from '@/components/region/RegionFooter';
import { Camp, FieldNotes, Faq, Stats, Stories } from '@/components/region/Sections';
import Grades from './Grades';
import r from '@/components/region/region.module.css';
import n from './north.module.css';

// Geometry is computed once at module load; it never changes between requests.
const HERO_RIDGES = [
  { d: ridgePath({ width: 1440, height: 900, seed: 3.7, base: 800, amp: 120, valley: 0.6 }), fill: 'var(--north-ridge-far)', cls: n.depthMid },
  { d: ridgePath({ width: 1440, height: 900, seed: 5.2, base: 850, amp: 90, valley: 0.4 }), fill: 'var(--north-ridge-near)', cls: n.depthNear },
  { d: ridgePath({ width: 1440, height: 900, seed: 6.9, base: 895, amp: 55 }), fill: 'var(--north-night)', cls: n.depthNear },
];
const CONTOURS = contourPaths();
const TREE_RIDGES = [
  { d: ridgePath({ width: 1440, height: 720, seed: 1.2, base: 420, amp: 120, peak: { x: 1100, w: 240, h: 120 } }), fill: 'var(--north-ridge-snow)', snow: 1 },
  { d: ridgePath({ width: 1440, height: 720, seed: 4.4, base: 500, amp: 100 }), fill: 'var(--north-ridge-mid)', snow: 0 },
  { d: ridgePath({ width: 1440, height: 720, seed: 2.8, base: 580, amp: 70 }), fill: 'var(--north-dusk)', snow: 0 },
];
const TREE_SNOW = snowClip(1440, 400);
const PINES = pinesPath();
const TREE_FRONT = ridgePath({ width: 1440, height: 720, seed: 8.1, base: 700, amp: 40 });
const FLAGS = flagRow({ x1: 0, y1: 4, x2: 1440, y2: 4, sag: 26, gap: 48, w: 20 });
const SUMMIT_FLAGS = flagRow({ x1: 0, y1: 18, x2: 1440, y2: 18, sag: 70, gap: 36, w: 18 });
const REGION_FRONTS = HIMALAYA.map((h) => ridgePath({ width: 300, height: 460, seed: h.seed, base: 420, amp: 70, step: 10 }));
const LADDER = DESTINATIONS.map((d) => ({ ...d, drop: climbOffset(d.alt), altText: `${formatNumber(d.alt)} m` }));

function Flags({ row, className, width, opacity }) {
  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className={n.flagLine} d={row.line} />
      {row.flags.map((f) => (
        <rect
          key={f.x}
          className={n.flag}
          x={f.x}
          y={f.y}
          width={width}
          height="24"
          opacity={opacity}
          style={{ fill: `var(--flag-${f.tone})`, animationDelay: f.delay }}
        />
      ))}
    </svg>
  );
}

function Hero() {
  return (
    <section id="base" className={n.hero} aria-labelledby="north-title">
      <Image
        src="/images/swell/himalaya.jpg"
        alt="Himalayan peaks lit gold at first light"
        fill
        preload
        sizes="100vw"
        className={`${n.heroPhoto} ${n.depthFar}`}
      />
      <span className={n.heroScrim} aria-hidden="true" />
      {HERO_RIDGES.map((ridge, i) => (
        <svg key={i} className={`${n.svg} ${ridge.cls}`} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
          <path d={ridge.d} style={{ fill: ridge.fill }} />
        </svg>
      ))}
      <span className={n.focus} aria-hidden="true" />
      <div className={n.heroCopy}>
        <p className={n.chip}>You boarded North · base 80 m</p>
        <h1 id="north-title" className={n.title}>
          <span className="sr-only">North India — from the Ganga at 80 m to the high passes</span>
          <span aria-hidden="true">N</span>
          <SunMark className={n.titleSun} spin />
          <span aria-hidden="true">rth</span>
        </h1>
        <p className={n.heroLead}>From the Varanasi ghats at 80 m to Pangong at 4,225 m. Forts, rivers and high passes — planned end to end from Kochi.</p>
        <div className={r.ctas}>
          <a href="#grades" className={r.pill}>Plan a North trip</a>
          <a href="#climb" className={r.ghost}>Start the climb ↑</a>
        </div>
      </div>
      <div className={`${n.heroFoot} ${r.mono}`}>
        <p>Kochi → Delhi · ~2,100 km flown</p>
        <p>Summit ahead · 5,359 m</p>
      </div>
    </section>
  );
}

function Climb() {
  return (
    <section id="climb" className={`${r.section} ${r.sand} ${n.climb}`} aria-labelledby="climb-title">
      <svg className={n.contours} viewBox="0 0 1440 900" aria-hidden="true" focusable="false">
        {CONTOURS.map((d) => <path key={d} d={d} fill="none" strokeWidth="1.5" />)}
      </svg>
      <div className={`${r.head} ${n.climbHead}`}>
        <div className={r.headCopy}>
          <p className={r.eyebrow}>80 m → 4,225 m — Pick a height</p>
          <h2 id="climb-title" className={r.h2}>The North, <span className={r.mark}>one climb</span>.</h2>
        </div>
        <p className={r.lead}>River towns, desert forts, hill stations, the high Himalaya. Scroll sideways and the cards climb with real altitude.</p>
      </div>
      <ol className={`${n.cards} ${r.rail}`} tabIndex={0} aria-label="Destinations from lowest to highest">
        {LADDER.map((d) => (
          <li key={d.name} className={`${n.card} ${r.tilt}`} style={{ '--drop': `${d.drop}px` }}>
            <Image src={d.img} alt={d.imgAlt} fill sizes="290px" className={r.cardImg} />
            <span className={n.cardScrim} aria-hidden="true" />
            <span className={n.altChip}>▲ {d.altText}</span>
            <span className={n.cardText}>
              <span className={n.cardRegion}>{d.region}</span>
              <span className={n.cardName}>{d.name}</span>
              <span className={n.cardBlurb}>{d.blurb}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className={`${n.scale} ${r.mono}`} aria-hidden="true">
        <span>The plains</span>
        <span className={n.scaleLine} />
        <span>Snowline</span>
      </div>
    </section>
  );
}

function BaseCamp() {
  return (
    <section id="basecamp" className={`${r.section} ${r.paper}`} aria-labelledby="basecamp-title">
      <div className={`${r.wrap} ${n.split}`}>
        <div className={n.splitCopy}>
          <p className={r.eyebrow}>431 m — Base camp</p>
          <h2 id="basecamp-title" className={r.h2}>You pick the height. We carry the rest.</h2>
          <p className={r.lead}>Flights from Kochi, stays, cabs, guides and permits — planned by one team in Kochi, run by local crews where you land.</p>
          <Stats />
          <div className={n.stack}>
            {BASECAMP_STACK.map((p) => (
              <span key={p.img} className={n.stackItem}>
                <Image src={p.img} alt={p.alt} fill sizes="220px" />
              </span>
            ))}
          </div>
        </div>
        <Camp items={NORTH_CAMP} marker="peak" />
      </div>
    </section>
  );
}

function Treeline() {
  return (
    <section id="treeline" className={n.treeline} aria-label="Treeline">
      <div className={n.treeTop}>
        <p className={n.treeEyebrow}>3,000 m — Treeline</p>
        <p className={n.treeWord}>Trees stop here.</p>
      </div>
      <svg className={n.svg} viewBox="0 0 1440 720" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
        <defs><clipPath id="north-snow"><path d={TREE_SNOW} /></clipPath></defs>
        {TREE_RIDGES.map((t, i) => (
          <g key={i}>
            <path d={t.d} style={{ fill: t.fill }} />
            {t.snow > 0 && <path d={t.d} style={{ fill: 'var(--snow)' }} clipPath="url(#north-snow)" />}
          </g>
        ))}
        <path d={PINES} style={{ fill: 'var(--pine)' }} />
        <path d={TREE_FRONT} style={{ fill: 'var(--north-night)' }} />
      </svg>
      <div className={n.treeBottom}>
        <p className={n.treeWord}>The <span className={n.yellow}>Himalaya</span> starts.</p>
        <p className={n.treeNote}>Air thins ↓ views don&apos;t</p>
      </div>
    </section>
  );
}

function Himalaya() {
  return (
    <section id="himalaya" className={`${r.section} ${r.night}`} aria-labelledby="himalaya-title">
      <Flags row={FLAGS} className={n.flagsTop} width={20} opacity={0.85} />
      <div className={r.wrap}>
        <div className={r.head}>
          <div className={r.headCopy}>
            <p className={r.eyebrow}>3,500 m — Up here</p>
            <h2 id="himalaya-title" className={r.h2}>Thin air. Big skies. Slow mornings.</h2>
            <p className={r.lead}>Ladakh, Spiti, Kashmir, Sikkim. Acclimatisation days, oxygen-ready vehicles and local drivers who know the passes.</p>
          </div>
        </div>
        <ul className={n.regions}>
          {HIMALAYA.map((h, i) => (
            <li key={h.name}>
              <figure className={`${n.region} ${r.tilt}`}>
                <Image src={h.img} alt={h.imgAlt} fill sizes="(max-width: 900px) 100vw, 320px" className={r.cardImg} />
                <svg className={n.svg} viewBox="0 0 300 460" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
                  <path className={n.regionFront} d={REGION_FRONTS[i]} />
                </svg>
                <figcaption className={n.regionCap}>
                  <span className={n.regionAlt}>▲ {h.alt}</span>
                  <span className={n.regionName}>{h.name}</span>
                  <span className={n.regionBlurb}>{h.blurb}</span>
                  <span className={n.regionSeason}>Best · {h.season}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function NorthPage() {
  return (
    <div className={r.page}>
      <RegionHeader
        links={NORTH_NAV}
        gate="COK → NTH · Gate N1"
        switchTo={{ href: ROUTES.south, label: 'Switch to South →' }}
        planHref="#grades"
      />
      <Meter label="Altitude" marks={NORTH_METER} direction="up" />
      <main>
        <Hero />
        <Climb />
        <BaseCamp />
        <Grades />
        <Treeline />
        <Himalaya />
        <FieldNotes eyebrow="4,400 m — Field notes" notes={NORTH_NOTES} theme={r.night} />
        <Stories eyebrow="4,500 m — Messages from the top" theme={r.night} />
        <Faq eyebrow="5,000 m — Thin-air questions" items={NORTH_FAQ} group="north-faq" theme={r.night} />
      </main>
      <RegionFooter
        id="summit"
        theme={r.night}
        photo={{ src: '/images/swell/summit.jpg', alt: 'Himalayan summit glowing at sunset', position: 'center 60%' }}
        scrim="var(--scrim-north-summit)"
        overlay={<Flags row={SUMMIT_FLAGS} className={n.flagsSummit} width={18} opacity={0.92} />}
        eyebrow="5,359 m — Summit"
        title="You made it up here. Where to next?"
        switchTo={{ href: ROUTES.south, label: 'Now head south →', region: 'South India' }}
        byTitle="By height"
        byLinks={NORTH_BY_HEIGHT}
      />
    </div>
  );
}
