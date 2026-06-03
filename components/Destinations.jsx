'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Destinations.module.css';

const DESTS = [
  { img:'/images/goa-beach.jpg',    alt:'Palolem beach South Goa — pristine white sand and turquoise sea',        tag:'🇮🇳 Trending',  name:'Palolem, Goa',    meta:'Pristine beaches · Nightlife · Water sports', featured:true },
  { img:'/images/sunset-beach.jpg', alt:'Vagator sunset beach Goa with dramatic cliff views',                      tag:'🌅 Sunset',    name:'Vagator, Goa',    meta:'Sunset bars · Cliff views · Luxury resorts' },
  { img:'/images/waterfall.jpg',    alt:'Dudhsagar waterfalls cascading through Goa jungle',                       tag:'🌿 Adventure',  name:'Dudhsagar Falls', meta:'Spectacular falls · Jungle trek · Nature' },
  { img:'/images/beach-night.jpg',  alt:'Baga Beach nightlife cabanas lit up on sandy shore',                      tag:'🌙 Nightlife',  name:'Baga Beach',      meta:'Candlelit dining · Night markets · Live music' },
  { img:'/images/concert.jpg',      alt:'Anjuna Beach festival with fireworks over the stage',                     tag:'🎵 Festivals',  name:'Anjuna Beach',    meta:'Trance festivals · Fireworks · Crowd energy' },
];

export default function Destinations() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 100); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els?.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="destinations" className={styles.section} ref={ref} aria-labelledby="dest-heading">
      <div className="section-tag">Top Picks</div>
      <h2 className="section-title" id="dest-heading">Destinations That<br />Take Your Breath Away</h2>
      <p className="section-sub">From sun-kissed shores to lush rainforests — discover the most breathtaking escapes Goa has to offer.</p>
      <div className={styles.grid}>
        {DESTS.map(d => (
          <Link
            key={d.name}
            href="/#experiences"
            className={`${styles.card} ${d.featured ? styles.featured : ''} reveal`}
            aria-label={`View packages for ${d.name}`}
          >
            <div className={styles.imgWrap}>
              <Image src={d.img} alt={d.alt} fill sizes="(max-width:640px) 100vw, 50vw" className={styles.img} />
            </div>
            <div className={styles.info}>
              <span className={styles.tag}>{d.tag}</span>
              <h3 className={styles.name}>{d.name}</h3>
              <p className={styles.meta}>{d.meta}</p>
              <span className={styles.ctaBtn}>View Packages →</span>
            </div>
            <div className={styles.arrow} aria-hidden="true">→</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
