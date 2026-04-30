'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Experiences.module.css';

import { EXPERIENCES as EXPS } from '@/data/experiences';

const TABS = ['all','beach','nature','nightlife','festival'];

export default function Experiences() {
  const [active, setActive] = useState('all');
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 100); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els?.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  const filtered = EXPS.filter(e => active === 'all' || e.type === active);

  return (
    <section id="experiences" className={styles.section} ref={ref} aria-labelledby="exp-heading">
      <div className="section-tag">Curated For You</div>
      <h2 className="section-title" id="exp-heading">Experiences Made<br />to Remember</h2>
      <p className="section-sub">Filter by your travel style and discover something extraordinary.</p>
      <div className={styles.tabs} role="tablist">
        {TABS.map(t => (
          <button key={t} role="tab" aria-selected={active===t} className={`${styles.tab} ${active===t ? styles.tabActive : ''}`} onClick={() => setActive(t)}>
            {t === 'all' ? 'All' : t === 'beach' ? '🏖 Beach' : t === 'nature' ? '🌿 Nature' : t === 'nightlife' ? '🌙 Nightlife' : '🎵 Festival'}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map(e => (
          <article key={e.title} className={`${styles.card} reveal`} aria-label={e.title}>
            <div className={styles.imgWrap}>
              <Image src={e.img} alt={e.alt} fill sizes="(max-width:640px) 100vw, 33vw" className={styles.img} />
              <div className={styles.badge}>{e.badge}</div>
            </div>
            <div className={styles.body}>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
              <div className={styles.footer}>
                <div className={styles.price}>{e.price} <span>/ {e.unit}</span></div>
                <Link href={`/experiences/${e.slug}`} className={styles.btn} aria-label={`View details for ${e.title}`}>→</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
