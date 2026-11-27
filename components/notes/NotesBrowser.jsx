'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NOTES, REGION_LABEL } from '@/data/notes';
import { ROUTES } from '@/data/swell';
import { notesByRegion, parseRegion } from '@/lib/notes';
import { sparks } from '@/lib/waves';
import s from './notes.module.css';

const FILTERS = [
  { id: 'all', label: 'All notes' },
  { id: 'north', label: 'North' },
  { id: 'south', label: 'South' },
];
const COUNTS = Object.fromEntries(FILTERS.map((f) => [f.id, notesByRegion(NOTES, f.id).length]));

const SPARKS = sparks(34);

/**
 * Hero filter + notes list, with the region kept in `?region=` so a filtered list can be shared.
 * `children` is the hero copy (eyebrow, h1, lead), rendered on the server.
 */
export default function NotesBrowser({ children }) {
  const region = parseRegion(useSearchParams().get('region'));
  const pick = (id) => {
    // Native history update: Next syncs useSearchParams with it, so no request and no scroll jump.
    const url = id === 'all' ? window.location.pathname : `${window.location.pathname}?region=${id}`;
    window.history.replaceState(null, '', url);
  };
  return <NotesView region={region} onPick={pick}>{children}</NotesView>;
}

/** The hero and list for one region. Also the prerendered fallback (all notes) before search params are known. */
export function NotesView({ region = 'all', onPick, children }) {
  const shown = notesByRegion(NOTES, region);
  const [feature, ...rest] = shown;
  return (
    <>
      <section className={s.hero} aria-labelledby="notes-title">
        {SPARKS.map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={s.spark}
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, animationDelay: `${d.delay}s` }}
          />
        ))}
        <div className={`${s.wrap} ${s.heroInner}`}>
          {children}
          <div className={s.filters} role="group" aria-label="Filter notes by region">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={s.chip}
                aria-pressed={f.id === region}
                onClick={onPick ? () => onPick(f.id) : undefined}
              >
                {f.label} <span className={s.chipCount}>{COUNTS[f.id]}</span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{`${shown.length} ${shown.length === 1 ? 'note' : 'notes'} shown`}</p>
        </div>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 1440 60" preserveAspectRatio="none" className={s.foam}>
          <path d={FOAM} style={{ fill: 'var(--notes-sea)' }} />
          <path d={FOAM_LINE} style={{ fill: 'none', stroke: 'var(--glow)', strokeOpacity: 0.7, strokeWidth: 2, strokeDasharray: '1 10', strokeLinecap: 'round' }} />
        </svg>
      </section>
      <section className={s.notes} aria-label="Notes">
        <div className={`${s.wrap} ${s.notesInner}`}>
          <NotesList feature={feature} rest={rest} />
        </div>
      </section>
    </>
  );
}

const FOAM_LINE = 'M0 30 C 120 6 240 6 360 30 S 600 54 720 30 S 960 6 1080 30 S 1320 54 1440 30';
const FOAM = `${FOAM_LINE} L1440 60 L0 60 Z`;

function NotesList({ feature, rest }) {
  if (!feature) return <p className={s.empty}>No notes in this region yet.</p>;
  return (
    <>
      <article className={`${s.card} ${s.feature}`}>
        <div className={s.featureImg}>
          <Image src={feature.img} alt={feature.alt} fill preload sizes="(max-width: 760px) 100vw, 60vw" className={s.cardImg} />
          <Stamp note={feature} rot="-10deg" />
        </div>
        <div className={s.featureText}>
          <p className={`${s.mono} ${s.kicker}`}>Latest · {REGION_LABEL[feature.region]} · {feature.place}{feature.sample && ' · Sample'}</p>
          <h2 className={s.featureTitle}>
            <Link href={`${ROUTES.notes}/${feature.slug}`} className={s.cardLink}>{feature.title}</Link>
          </h2>
          <p className={s.dek}>{feature.cardDek ?? feature.dek}</p>
          <p className={`${s.mono} ${s.meta}`}>{feature.meta} · [Author] · [Date]</p>
          <Link href={`${ROUTES.notes}/${feature.slug}`} className={`${s.ghost} ${s.readMore}`} tabIndex={-1} aria-hidden="true">
            Read the note →
          </Link>
        </div>
      </article>
      {rest.length > 0 && (
        <ul className={s.grid}>
          {rest.map((n) => (
            <li key={n.slug}>
              <article className={`${s.card} ${s.gridCard}`}>
                <div className={s.gridImg}>
                  <Image src={n.img} alt={n.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 420px" className={s.cardImg} />
                  <Stamp note={n} small />
                </div>
                <div className={s.gridText}>
                  <p className={`${s.mono} ${s.kicker}`}>{REGION_LABEL[n.region]} · {n.place}{n.sample && ' · Sample'}</p>
                  <h3 className={s.cardTitle}>
                    <Link href={`${ROUTES.notes}/${n.slug}`} className={s.cardLink}>{n.title}</Link>
                  </h3>
                  <p className={s.dek}>{n.cardDek ?? n.dek}</p>
                  <p className={`${s.mono} ${s.meta}`}>{n.meta}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Stamp({ note, rot, small = false }) {
  return (
    <span aria-hidden="true" className={`${s.stamp} ${small ? s.stampSmall : ''}`} style={{ '--rot': rot ?? note.rot }}>
      {note.place}<span>{note.coord}</span>
    </span>
  );
}
