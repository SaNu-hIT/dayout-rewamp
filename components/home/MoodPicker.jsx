'use client';
import { useState } from 'react';
import Link from 'next/link';
import { filterByMood } from '@/lib/day';
import SunMark from './SunMark';
import ui from './ui.module.css';
import styles from './GoldenHour.module.css';

/** Mood buttons, the pace sun and the filtered boarding passes. `children` is the section heading. */
export default function MoodPicker({ moods, passes, children }) {
  const [moodId, setMoodId] = useState('all');
  const mood = moods.find((m) => m.id === moodId) ?? moods[0];
  const shown = filterByMood(passes, mood.id);

  return (
    <>
      <div className={styles.head}>
        {children}
        <div className={styles.pace} style={{ '--spin': `${mood.speed}s` }}>
          <SunMark className={styles.paceSun} spin rayWidth={5} ringWidth={9} />
          <p className={ui.mono}>
            Pace<br /><span className={styles.paceName}>{mood.name}</span>
          </p>
        </div>
      </div>

      <div role="group" aria-label="Filter packages by mood" className={styles.moods}>
        {moods.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={m.id === mood.id}
            className={styles.mood}
            onClick={() => setMoodId(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length === 1 ? '1 package shown' : `${shown.length} packages shown`}
      </p>

      <ul className={styles.passes}>
        {shown.map((p) => (
          <li key={p.slug}>
            <article className={styles.pass} aria-labelledby={`pass-${p.slug}`}>
              <div className={styles.stub}>
                <div className={styles.passTop}>
                  <span className={styles.brand}>DayOut · Boarding pass</span>
                  <span className={styles.dest}>→ GOA</span>
                </div>
                <h3 id={`pass-${p.slug}`} className={styles.passTitle}>{p.title}</h3>
                <p className={styles.blurb}>{p.blurb}</p>
                <dl className={styles.fields}>
                  <div><dt>Mood</dt><dd>{p.moodName}</dd></div>
                  <div><dt>For</dt><dd>{p.who}</dd></div>
                  <div><dt>Duration</dt><dd>{p.duration}</dd></div>
                </dl>
              </div>
              <div className={styles.tear}>
                <span className={styles.notchTop} aria-hidden="true" />
                <span className={styles.notchBottom} aria-hidden="true" />
                <div>
                  <p className={styles.fieldLabel}>Per {p.unit}</p>
                  <p className={styles.price}>{p.price}</p>
                </div>
                <div className={styles.passActions}>
                  <a
                    href={p.enquireHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.enquire}
                    aria-label={`Enquire about the ${p.title} on WhatsApp (opens in a new tab)`}
                  >
                    Enquire
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                  <Link href={`/experiences/${p.slug}`} className={styles.details}>
                    Details<span className="sr-only"> of the {p.title}</span>
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
