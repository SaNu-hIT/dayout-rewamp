'use client';

import { useState } from 'react';
import { MOODS, TICKETS } from '@/data/south';
import { CONTACT } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import r from '@/components/region/region.module.css';
import s from './south.module.css';

const BAND = { beach: 'var(--stamp-beach)', backwaters: 'var(--stamp-water)', hills: 'var(--stamp-hills)', islands: 'var(--stamp-water)' };
const MOOD_NAME = Object.fromEntries(MOODS.map((m) => [m.id, m.name]));
// Ticket numbers stay fixed per package, whatever the filter.
const NUMBERED = TICKETS.map((t, i) => ({ ...t, no: String(41 + i).padStart(4, '0') }));

/** Packages as coast-road tickets, filtered by mood. */
export default function Tickets() {
  const [mood, setMood] = useState('all');
  const shown = mood === 'all' ? NUMBERED : NUMBERED.filter((t) => t.moods.includes(mood));

  return (
    <section id="tickets" className={`${r.section} ${r.teal}`} aria-labelledby="tickets-title">
      <div className={r.wrap}>
        <div className={r.head}>
          <div className={r.headCopy}>
            <p className={r.eyebrow}>1,250 km — Pick your mood</p>
            <h2 id="tickets-title" className={r.h2}>What kind of slow are you after?</h2>
            <p className={r.lead}>Beach, backwater, hill or island. Every ticket is a starting plan — we change it to fit your group.</p>
          </div>
        </div>

        <div className={s.filters} role="group" aria-label="Filter packages by mood">
          {MOODS.map((m) => (
            <button key={m.id} type="button" className={s.filter} aria-pressed={m.id === mood} onClick={() => setMood(m.id)}>
              {m.name}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{shown.length} {shown.length === 1 ? 'package' : 'packages'} shown</p>

        <ul className={s.tickets}>
          {shown.map((t) => (
            <li key={t.name}>
              <article className={s.ticket} style={{ '--band': BAND[t.moods[0]] }}>
                <span className={`${s.punch} ${s.punchTop}`} aria-hidden="true" />
                <span className={`${s.punch} ${s.punchBottom}`} aria-hidden="true" />
                <div className={s.ticketMain}>
                  <div className={s.ticketTop}>
                    <span className={s.ticketNo}>DayOut Coastline · No. {t.no}{t.sample ? ' · Sample' : ''}</span>
                    <span className={s.moodBadge}>{t.moods.map((m) => MOOD_NAME[m]).join(' + ')}</span>
                  </div>
                  <p className={s.fromTo}>
                    <span>{t.from}</span><span className={s.arrow} aria-hidden="true">→</span><span className="sr-only">to</span><span>{t.to}</span>
                  </p>
                  <h3 className={s.ticketName}>{t.name}</h3>
                  <p className={s.ticketDesc}>{t.desc}</p>
                  <dl className={s.specs}>
                    <div><dt className={s.specLabel}>Duration</dt><dd className={s.specValue}>{t.dur}</dd></div>
                    <div><dt className={s.specLabel}>Best season</dt><dd className={s.specValue}>{t.season}</dd></div>
                  </dl>
                </div>
                <div className={s.stub}>
                  <div>
                    <p className={s.specLabel}>Per person</p>
                    <p className={s.price}>{t.price}</p>
                  </div>
                  <a
                    href={whatsappLink(CONTACT.phone, `Hi DayOut, I'd like to know about the ${t.name} trip.`)}
                    className={`${r.pill} ${s.enquire}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enquire<span className="sr-only"> about {t.name} on WhatsApp (opens in a new tab)</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
