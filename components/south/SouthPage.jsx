import Image from 'next/image';
import {
  SOUTH_NAV, SOUTH_METER, FILM, STOPS, COAST, ANDAMAN_ISLANDS, SOUTH_CAMP,
  SOUTH_NOTES, SOUTH_FAQ, SOUTH_BY_COAST,
} from '@/data/south';
import { ROUTES } from '@/data/swell';
import { tidePath, project, routePath, closedPath, openPath, islandsPath, formatNumber } from '@/lib/region';
import SunMark from '@/components/home/SunMark';
import RegionHeader from '@/components/region/RegionHeader';
import Meter from '@/components/region/Meter';
import RegionFooter from '@/components/region/RegionFooter';
import { Camp, FieldNotes, Faq, Stats, Stories } from '@/components/region/Sections';
import Tickets from './Tickets';
import r from '@/components/region/region.module.css';
import s from './south.module.css';

// Geometry is computed once at module load.
const TIDE_BACK = tidePath(14, 360, 52, 1.2);
const TIDE_FRONT = tidePath(10, 480, 74, 0);

const COAST_D = closedPath(COAST);
// Shoreline without the cropped top edge, so the land reads as continuing north.
const SHORE_D = openPath(COAST.slice(1, -1));
// Western Ghats: a soft band just inland of the west coast.
const GHATS_W = [[88, 0], ...COAST.slice(2, 17).map(([x, y]) => [x + 34, y])];
const HILLS_D = closedPath([...GHATS_W, ...GHATS_W.slice().reverse().map(([x, y]) => [x + 30, y - 4])]);
const LATS = [15, 12, 9].map((lat) => ({ lat, y: project(72.5, lat)[1] }));

const MAIN = STOPS.filter((st) => st.km !== null);
const ROUTE_D = routePath(MAIN.map((st) => project(st.lon, st.lat)));
const [MX, MY] = project(STOPS[5].lon, STOPS[5].lat); // Munnar
const [PX, PY] = project(STOPS[8].lon, STOPS[8].lat); // Pondicherry
const DETOUR_SEA = `M${MX} ${MY}Q${(MX + PX) / 2 + 40} ${(MY + PY) / 2 + 40} ${PX} ${PY}`;
const DETOUR_AIR = `M${PX} ${PY}Q575 470 583 600`;
const ANDAMAN_D = islandsPath(ANDAMAN_ISLANDS);
const PINS = STOPS.filter((st) => st.lon !== null).map((st) => {
  const [x, y] = project(st.lon, st.lat);
  const left = st.side === 'end';
  return {
    id: st.id,
    x,
    y,
    detour: st.km === null,
    lx: left ? x - 12 : x + 12,
    anchor: left ? 'end' : 'start',
    label: st.km === null ? st.name.toUpperCase() : `${st.name.toUpperCase()} · ${formatNumber(st.km)}`,
  };
});
const POSTCARDS = STOPS.map((st, i) => ({
  ...st,
  kmText: st.km === null ? st.detour : `km ${formatNumber(st.km)}`,
  postName: st.name.length > 9 ? st.code : st.name,
  latText: `${st.lat.toFixed(2)}° N`,
  rot: ['-1.5deg', '1.2deg', '0.8deg', '-1deg'][i % 4],
  shift: i % 2 ? '80px' : '0px',
}));

function Tide({ fill, low }) {
  return (
    <svg className={`${s.tide} ${low ? s.tideLow : ''}`} viewBox="0 0 2880 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className={`${fill} ${s.tideBack}`} d={TIDE_BACK} />
      <path className={fill} d={TIDE_FRONT} />
    </svg>
  );
}

function Hero() {
  return (
    <section id="goa" className={s.hero} aria-labelledby="south-title">
      <Image
        src="/images/waterfall.jpg"
        alt="Palm trees leaning over a calm Goa bay"
        fill
        preload
        sizes="100vw"
        className={`${s.heroPhoto} ${s.depthFar}`}
      />
      <span className={s.heroScrim} aria-hidden="true" />
      <span className={s.focus} aria-hidden="true" />
      <div className={s.heroCopy}>
        <p className={s.chip}>You boarded South · km 0, Goa</p>
        <h1 id="south-title" className={s.title}>
          <span className="sr-only">South India — the coast road from Goa to Kanyakumari</span>
          <span aria-hidden="true">S</span>
          <SunMark className={s.titleSun} spin />
          <span aria-hidden="true">uth</span>
        </h1>
        <p className={s.heroLead}>About 1,650 km of beach, backwater and tea hill — from Goa&apos;s shacks to the tip of India. Stop anywhere; we plan the road.</p>
        <div className={r.ctas}>
          <a href="#tickets" className={r.pill}>Plan a South trip</a>
          <a href="#route" className={r.ghost}>Start the drive ↓</a>
        </div>
      </div>
      <div className={s.heroFoot}>
        <p>Goa · 15.49° N 73.83° E</p>
        <p>Land&apos;s end ahead · ~1,650 km</p>
      </div>
      <Tide fill={s.fillSea} />
    </section>
  );
}

function GoaHours() {
  return (
    <section id="goa-hours" className={`${r.section} ${r.sea} ${s.hours}`} aria-labelledby="hours-title">
      <div className={`${r.head} ${s.hoursHead}`}>
        <div className={r.headCopy}>
          <p className={r.eyebrow}>0 km — Goa, after the sun</p>
          <h2 id="hours-title" className={r.h2}>Goa runs on two clocks.</h2>
        </div>
        <p className={r.lead}>Waterfalls by afternoon, sunset by the water, the beach party after. Most trips start here.</p>
      </div>
      <div className={s.film}>
        <div className={`${s.filmStrip} ${r.rail}`} tabIndex={0} role="region" aria-label="Goa, afternoon to midnight">
          <ol className={s.frames}>
            {FILM.map((f) => (
              <li key={f.t}>
                <figure className={s.frame}>
                  <Image src={f.img} alt={f.alt} fill sizes="360px" />
                  <figcaption className={s.frameCap}>
                    <span className={s.frameWhat}>{f.what}</span>
                    <span className={s.frameTime}>{f.t}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className={s.credit}>Client photos · Goa</p>
      <Tide fill={s.fillShell} low />
    </section>
  );
}

function RouteMap() {
  return (
    <figure className={s.map}>
      <svg viewBox="0 0 640 800" role="img" aria-labelledby="map-title">
        <title id="map-title">Route map of South India: Goa, Gokarna, Hampi, Coorg, Kochi, Munnar, Alleppey and Kanyakumari, with detours to Pondicherry and the Andaman Islands.</title>
        <defs>
          <linearGradient id="land-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--shell)', stopOpacity: 0 }} />
            <stop offset="0.09" style={{ stopColor: 'var(--shell)' }} />
          </linearGradient>
          <linearGradient id="hill-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--south-hill)', stopOpacity: 0 }} />
            <stop offset="0.1" style={{ stopColor: 'var(--south-hill)' }} />
          </linearGradient>
        </defs>
        {LATS.map((l) => (
          <g key={l.lat}>
            <line className={s.latLine} x1="0" x2="640" y1={l.y} y2={l.y} />
            <text className={s.mapText} x="632" y={l.y - 6} textAnchor="end">{l.lat}° N</text>
          </g>
        ))}
        <text className={s.mapText} x="24" y="430" transform="rotate(-90 24 430)" textAnchor="middle">Arabian Sea</text>
        <text className={s.mapText} x="610" y="250" transform="rotate(90 610 250)" textAnchor="middle">Bay of Bengal</text>
        <path d={COAST_D} fill="url(#land-fade)" />
        <path d={HILLS_D} fill="url(#hill-fade)" />
        <path className={s.shore} d={SHORE_D} />
        <path className={s.routeGhost} d={ROUTE_D} />
        <path className={s.routeLine} d={ROUTE_D} pathLength="1" />
        <path className={`${s.detour} ${s.detourSea}`} d={DETOUR_SEA} />
        <path className={`${s.detour} ${s.detourAir}`} d={DETOUR_AIR} />
        <rect className={s.inset} x="540" y="590" width="86" height="190" rx="10" />
        <path className={s.island} d={ANDAMAN_D} />
        <text className={s.mapTextLight} x="583" y="610" textAnchor="middle">Andaman</text>
        <text className={s.mapText} x="583" y="770" textAnchor="middle">By air</text>
        {PINS.map((p) => (
          <g key={p.id}>
            <circle className={`${s.pin} ${p.detour ? s.pinDetour : ''}`} cx={p.x} cy={p.y} r={p.detour ? 5 : 7} />
            <text className={s.pinLabel} x={p.lx} y={p.y + 4} textAnchor={p.anchor}>{p.label}</text>
          </g>
        ))}
        <g transform="translate(560 70)">
          <circle className={s.compassRing} r="30" />
          <path className={s.compass} d="M0 -26 L6 0 L0 26 L-6 0 Z" />
          <path className={s.compassTip} d="M0 -26 L6 0 L-6 0 Z" />
          <text className={s.mapTextLight} y="-36" textAnchor="middle">N</text>
        </g>
        <g transform="translate(40 772)">
          <path className={s.scaleBar} d="M0 0H65M0 -5V5M65 -5V5" />
          <text className={s.mapTextLight} x="32" y="-10" textAnchor="middle">~100 km</text>
        </g>
      </svg>
      <figcaption className={s.mapCap}><span>Stylised map · distances approximate</span><span>~1,650 km by road</span></figcaption>
    </figure>
  );
}

function Route() {
  return (
    <section id="route" className={`${r.section} ${r.shell} ${s.route}`} aria-labelledby="route-title">
      <div className={r.head}>
        <div className={r.headCopy}>
          <p className={r.eyebrow}>150 km → 1,650 km — The coast road</p>
          <h2 id="route-title" className={r.h2}>Drive the coast. <span className={r.mark}>Stop anywhere.</span></h2>
        </div>
        <p className={r.lead}>Eight stops from Goa to the tip of India, plus two detours. Scroll and the route draws itself down the map.</p>
      </div>
      <div className={s.routeGrid}>
        <div className={s.mapWrap}><RouteMap /></div>
        <ol className={s.posts}>
          {POSTCARDS.map((p) => (
            <li key={p.id} id={`stop-${p.id}`} className={s.post} style={{ '--rot': p.rot, '--shift': p.shift }}>
              <div className={s.postPhoto}>
                <Image src={p.img} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 380px" />
                <span className={s.km}>{p.kmText}</span>
              </div>
              <span className={s.postmark} aria-hidden="true">{p.postName}<br />{p.latText}</span>
              <div className={s.postBody}>
                <div className={s.postText}>
                  <p className={s.postKicker}>{p.region} · {p.type}</p>
                  <h3 className={s.postName}>{p.name}</h3>
                  <p className={s.postBlurb}>{p.blurb}</p>
                  <p className={s.postSeason}>Best · {p.season}</p>
                </div>
                <span className={s.stamp} style={{ '--stamp': `var(--stamp-${p.stamp})` }} aria-hidden="true">
                  <span>{p.code}</span><span className={s.stampSmall}>India</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Kochi() {
  return (
    <section id="kochi" className={`${r.section} ${r.postcard}`} aria-labelledby="kochi-title">
      <div className={`${r.wrap} ${s.split}`}>
        <div className={s.splitCopy}>
          <p className={r.eyebrow}>1,120 km — Kochi, home base</p>
          <h2 id="kochi-title" className={r.h2}>Our office is on the route.</h2>
          <p className={r.lead}>Every trip is planned from North Kalamassery, Kochi. Tickets, stays, cabs and guides — one team, local crews where you land.</p>
          <Stats />
          <figure className={s.print}>
            <div className={s.printPhoto}>
              <Image src="/images/swell/kochi.jpg" alt="Chinese fishing net against the evening sky at Fort Kochi" fill sizes="(max-width: 900px) 100vw, 440px" />
            </div>
            <figcaption className={s.printCap}>Fort Kochi · 9.96° N · 20 km from our desk</figcaption>
          </figure>
        </div>
        <Camp items={SOUTH_CAMP} marker="dot" />
      </div>
    </section>
  );
}

export default function SouthPage() {
  return (
    <div className={r.page}>
      <RegionHeader
        links={SOUTH_NAV}
        gate="COK → STH · Gate S1"
        switchTo={{ href: ROUTES.north, label: '← Switch to North' }}
        planHref="#tickets"
      />
      <Meter label="Distance along the coast" marks={SOUTH_METER} direction="down" />
      <main>
        <Hero />
        <GoaHours />
        <Route />
        <Kochi />
        <Tickets />
        <FieldNotes eyebrow="1,420 km — Field notes" notes={SOUTH_NOTES} theme={r.sea} />
        <Stories eyebrow="1,500 km — Postcards home" theme={r.shell} />
        <Faq eyebrow="1,600 km — Coast questions" items={SOUTH_FAQ} group="south-faq" theme={r.shell} />
      </main>
      <RegionFooter
        id="landsend"
        theme={r.sea}
        photo={{ src: '/images/swell/kanyakumari.jpg', alt: 'The Vivekananda Rock Memorial at Kanyakumari against a sunset sky', position: 'center 55%' }}
        scrim="var(--scrim-south-end)"
        overlay={(
          <div className={s.endCoords}>
            <p className={s.endChip}>8.08° N 77.54° E</p>
            <p className={s.endChip}>Arabian Sea · Indian Ocean · Bay of Bengal</p>
          </div>
        )}
        eyebrow="~1,650 km — Land's end"
        title="Three seas meet here. Where to next?"
        switchTo={{ href: ROUTES.north, label: 'Now head north ↑', region: 'North India' }}
        byTitle="By the coast"
        byLinks={SOUTH_BY_COAST}
      />
    </div>
  );
}
