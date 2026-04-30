'use client';
import { useEffect, useRef } from 'react';
import styles from './Features.module.css';

const FEATURES = [
  { icon:'🏨', title:'Accommodation', desc:'Stay in handpicked hotels and resorts offering comfort, convenience, and quality.' },
  { icon:'🍽️', title:'Food', desc:'Enjoy delicious and diverse culinary experiences tailored to your preferences.' },
  { icon:'🚕', title:'Taxi Services', desc:'Reliable and comfortable transportation to get you wherever you need to go.' },
  { icon:'🛵', title:'Rental Vehicles', desc:'Flexible vehicle rentals, including two-wheelers and cars, for your convenience.' },
];

export default function Features() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 100); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els?.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" className={styles.section} ref={ref} aria-labelledby="features-heading">
      <div className="section-tag">Our Services</div>
      <h2 className="section-title" id="features-heading">We Have the Best Services<br />Available For You!</h2>
      <p className="section-sub">Dayout Holidays provides end-to-end solutions to ensure your Goa trip is entirely hassle-free.</p>
      <div className={styles.grid}>
        {FEATURES.map(f => (
          <article key={f.title} className={`${styles.card} reveal`}>
            <div className={styles.icon}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
