import SunMark from './SunMark';
import styles from './Preloader.module.css';

/*
 * Runs during HTML parse, right after the overlay. Static string with no user or
 * request data, so rendering it with dangerouslySetInnerHTML is safe.
 * The overlay is hidden by default; this opts it in on the first full page load
 * of a browser session. Client-side navigation never runs it, so the overlay
 * stays hidden there too.
 */
const ONCE_PER_SESSION = `try{var k='dayout_preloader';if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,'1');document.getElementById('dy-pre').setAttribute('data-play','')}}catch(e){}`;

/**
 * Sun-O preloader: the sun rises through the horizon and the wordmark lands.
 * Pure CSS, 1.2 s, then fades out. The hero renders underneath, so LCP is not delayed.
 * Hidden from assistive tech; skipped entirely under reduced motion.
 */
export default function Preloader() {
  return (
    <>
      <div id="dy-pre" className={styles.pre} aria-hidden="true" suppressHydrationWarning>
        <div className={styles.mark}>
          <span className={styles.word}>Day</span>
          <span className={styles.window}>
            <SunMark className={styles.sun} spin />
            <span className={styles.horizon} />
          </span>
          <span className={styles.word}>ut</span>
        </div>
        <p className={styles.caption}>
          <span className={styles.t1}>05:59 · Loading the day</span>
          <span className={styles.t2}>06:00 · Good morning, Goa</span>
        </p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: ONCE_PER_SESSION }} />
    </>
  );
}
