import Image from 'next/image';
import { DESTINATIONS } from '@/data/home';
import PalmShadow from './PalmShadow';
import ui from './ui.module.css';
import styles from './Destinations.module.css';

/** 08:00 — destinations, each tagged with the hour it is at its best. */
export default function Destinations() {
  return (
    <section id="destinations" className={styles.section} aria-labelledby="destinations-title">
      <PalmShadow layout="right" />
      <div className={styles.head}>
        <div className={ui.headStack}>
          <p className={ui.eyebrow}>08:00 — Where the day takes you</p>
          <h2 id="destinations-title" className={ui.h2}>
            Every beach has its <mark className={styles.mark}>hour</mark>.
          </h2>
        </div>
        <p className={`${ui.lead} ${styles.aside}`}>
          We time your day so you&apos;re at each spot when it&apos;s at its best.
        </p>
      </div>
      <ul className={styles.rail}>
        {DESTINATIONS.map((d) => (
          <li key={d.name} className={styles.item} style={{ '--offset': `${d.offset}px` }}>
            <a href="#packages" className={styles.card}>
              <Image src={d.img} alt={d.alt} fill sizes="340px" className={styles.photo} />
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.best}>Best at {d.best}</span>
              <span className={styles.body}>
                <span className={styles.region}>{d.region}</span>
                <span className={styles.name}>{d.name}</span>
                <span className={styles.blurb}>{d.blurb}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
