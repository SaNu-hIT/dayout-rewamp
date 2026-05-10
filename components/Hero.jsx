'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const SLIDES = [
  { img: '/images/hero-bg.jpg', title1: 'Live Every', title2: 'Moment', sub: 'Your premium travel guide to Goa\'s most unforgettable experiences.' },
  { img: '/images/sunset-beach.jpg', title1: 'Golden', title2: 'Sunsets', sub: 'Sail the Mandovi River as the sky turns into a masterpiece.' },
  { img: '/images/waterfall.jpg', title1: 'Jungle', title2: 'Adventures', sub: 'Trek deep into the wild to witness spectacular waterfalls.' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className={styles.hero} aria-label="Hero slider">
      {SLIDES.map((slide, i) => (
        <div key={i} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
          <div className={styles.bgWrap}>
             <Image src={slide.img} alt="Background" fill priority={i === 0} className={styles.bgImg} sizes="100vw" />
          </div>
          <div className={styles.overlay} />
        </div>
      ))}
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>🏖 The Ultimate Goa Experience</div>
          <h1 className={styles.title}>
            {SLIDES[current].title1} <br />
            <span className={styles.accent}>{SLIDES[current].title2}</span>
          </h1>
          <p className={styles.sub}>{SLIDES[current].sub}</p>
          <div className={styles.btns}>
            <Link href="/contact" className={styles.btnPrimary}>Plan Your Trip</Link>
            <a href="#destinations" className={styles.btnSecondary}>Explore <span>↓</span></a>
          </div>
        </div>

        <div className={styles.statsCard}>
          <div className={styles.stat}>
            <span className={styles.num}>50K+</span>
            <span className={styles.label}>Happy Travelers</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <span className={styles.num}>200+</span>
            <span className={styles.label}>Curated Escapes</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <span className={styles.num}>4.9/5</span>
            <span className={styles.label}>Average Rating</span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        {SLIDES.map((_, i) => (
          <button 
            key={i} 
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} 
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
