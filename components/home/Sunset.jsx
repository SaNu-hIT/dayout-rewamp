import styles from './Sunset.module.css';

/** 18:42 — the sun sinks below the horizon as you scroll, and the page turns to night. */
export default function Sunset() {
  return (
    <section id="sunset" className={styles.sunset} aria-label="Sunset">
      <div className={styles.sky}>
        <p className={styles.eyebrow}>18:42 — Sunset</p>
        <p className={styles.line}>The day&apos;s done.</p>
      </div>
      <div className={styles.sun} aria-hidden="true" />
      <div className={styles.sea}>
        <p className={styles.line}>
          Now go <span className={styles.out}>Out</span>.
        </p>
        <p className={styles.hint} aria-hidden="true">Page turns to night ↓</p>
      </div>
    </section>
  );
}
