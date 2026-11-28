import { FAQS } from '@/data/faqs';
import ui from './ui.module.css';
import styles from './LateFaq.module.css';

/** 02:00 — FAQ. Same source as the FAQPage schema in the layout. */
export default function LateFaq() {
  return (
    <section id="faq" className={`${ui.section} ${styles.section}`} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <div className={`${ui.headStack} ${styles.head}`}>
          <p className={ui.eyebrowNight}>02:00 — Late-night questions</p>
          <h2 id="faq-title" className={ui.h2Small}>Before you pack.</h2>
        </div>
        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <details key={f.q} className={styles.item} open={i === 0}>
              <summary className={styles.q}>
                <span>{f.q}</span>
                <span className={styles.sign} aria-hidden="true" />
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
