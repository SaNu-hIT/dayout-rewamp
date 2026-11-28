import { REVIEWS } from '@/data/home';
import ui from './ui.module.css';
import styles from './Stories.module.css';

/** 23:30 — guest reviews, shown as messages in a chat thread. */
export default function Stories() {
  return (
    <section id="stories" className={`${ui.section} ${styles.section}`} aria-labelledby="stories-title">
      <div className={`${ui.inner} ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={ui.eyebrowNight}>23:30 — Messages we got back</p>
          <h2 id="stories-title" className={ui.h2}>50,000 travellers. Our inbox remembers.</h2>
          <p className={styles.rating}>
            <span className={styles.stars} aria-hidden="true">★★★★★</span>
            Rated 4.9 out of 5 by our travellers
          </p>
        </div>
        <ul className={styles.thread}>
          {REVIEWS.map((r) => (
            <li key={r.name} className={ui.reveal}>
              <figure className={styles.message}>
                <figcaption className={styles.name}>{r.name}</figcaption>
                <blockquote className={styles.bubble}>{r.quote}</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
