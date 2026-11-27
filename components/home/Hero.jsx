import Image from 'next/image';
import { HERO_BY_PERIOD } from '@/data/home';
import GoaClock from './GoaClock';
import SunMark from './SunMark';
import ui from './ui.module.css';
import styles from './Hero.module.css';

/** 06:00 — the hero. Photo and copy follow the period of the Goa day. */
export default function Hero({ period, minutes }) {
  const hero = HERO_BY_PERIOD[period];
  return (
    <section id="sunrise" className={`${styles.hero} ${period === 'night' ? styles.night : ''}`}>
      <Image src={hero.img} alt={hero.alt} fill sizes="100vw" preload className={styles.photo} />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.label}>
          <GoaClock initialMin={minutes} />
        </p>
        <h1 className={styles.title}>
          <span className="sr-only">DayOut Holidays — Goa trips from first light to last call</span>
          <span aria-hidden="true">Day</span>
          <SunMark className={styles.sun} spin />
          <span aria-hidden="true">ut</span>
        </h1>
        <p className={styles.sub}>{hero.sub}</p>
        <div className={styles.actions}>
          <a href="#packages" className={ui.pillSun}>Plan Your Trip</a>
          <a href={hero.href} className={ui.pillGhost}>{hero.cta}</a>
        </div>
      </div>
      <div className={styles.foot}>
        <p className={ui.mono}>15.29° N · 74.12° E</p>
        <p className={ui.mono}>
          Now in Goa · <GoaClock initialMin={minutes} variant="time" /> IST
        </p>
      </div>
    </section>
  );
}
