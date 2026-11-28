import Image from 'next/image';
import { NIGHT_SCENES } from '@/data/home';
import ui from './ui.module.css';
import styles from './Night.module.css';

/** 21:00 — Goa after dark. */
export default function Night() {
  return (
    <section id="night" className={`${ui.section} ${styles.section}`} aria-labelledby="night-title">
      <div className={ui.inner}>
        <div className={`${ui.headStack} ${styles.head}`}>
          <p className={ui.eyebrowNight}>21:00 — Out</p>
          <h2 id="night-title" className={ui.h2}>Goa after dark.</h2>
          <p className={ui.leadNight}>Beach dinners, live music, festival nights. Cab back to your stay included.</p>
        </div>
        <div className={styles.grid}>
          {NIGHT_SCENES.map((s) => (
            <figure key={s.title} className={`${styles.scene} ${ui.reveal}`}>
              <Image src={s.img} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.photo} />
              <figcaption className={styles.caption}>
                <span className={styles.title}>{s.title}</span>
                <span className={styles.time}>{s.t}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
