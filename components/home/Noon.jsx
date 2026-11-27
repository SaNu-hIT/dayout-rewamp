import { ITINERARY, STATS } from '@/data/home';
import PalmShadow from './PalmShadow';
import ui from './ui.module.css';
import styles from './Noon.module.css';

/** 12:00 — what DayOut handles, as a day's timeline, plus headline numbers. */
export default function Noon() {
  return (
    <section id="noon" className={`${ui.section} ${styles.section}`} aria-labelledby="noon-title">
      <PalmShadow layout="left" strength="soft" />
      <div className={`${ui.inner} ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={ui.eyebrow}>12:00 — Everything handled</p>
          <h2 id="noon-title" className={ui.h2}>You bring the sunglasses. We do the rest.</h2>
          <p className={`${ui.lead} ${styles.lead}`}>
            Stays, food, cabs and scooters — booked by one team in Kochi, run by our crew in Goa.
          </p>
          <dl className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={ui.reveal}>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statValue}>
                  {s.value}
                  {s.suffix && <span className={styles.suffix}>{s.suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ol className={styles.timeline}>
          {ITINERARY.map((it) => (
            <li key={it.title} className={`${styles.step} ${ui.reveal}`}>
              <span className={styles.time}>{it.t}</span>
              <span className={styles.track} aria-hidden="true"><span className={styles.dot} /></span>
              <span className={styles.text}>
                <span className={styles.stepTitle}>{it.title}</span>
                <span className={styles.desc}>{it.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
