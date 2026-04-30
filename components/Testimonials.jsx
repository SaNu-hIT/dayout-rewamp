'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Testimonials.module.css';

const TESTIS = [
  { name:'Albert Baby',       loc:'Verified Traveler',    init:'A', text:'"Very good service and full time supportive. They made our trip into an unforgettable experience. Enjoyed a lot. Thank you Dayout Holidays."' },
  { name:'Anandhu S',         loc:'Verified Traveler',    init:'A', text:'"Suddenly we planned a trip to Goa... Dayout holidays surprised me with the arrangements of our trips like hotel, rental scooter, and guides. I personally suggest Dayout holidays for everyone."' },
  { name:'Sarath Chandran C', loc:'Verified Traveler',    init:'S', text:'"Onnum parayanilla pilleru poliyanu. It\'s a great experience with their service. From the beginning to the end they were supportive for every aspects. You can trust them and choose the packages."' },
  { name:'Sneha Soman',       loc:'Verified Traveler',    init:'S', text:'"We recently returned from our second trip to Goa with dayout holidays and it was just as amazing as the first! The team\'s attention to detail and knowledge of Goa\'s hidden gems made our trip truly unforgettable."' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % TESTIS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els?.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="testimonials" className={styles.section} ref={ref} aria-labelledby="testi-heading">
      <div className="section-tag">Real Stories</div>
      <h2 className="section-title" id="testi-heading">What Our Travelers Say</h2>
      <p className="section-sub">Don't take our word for it — here's what 50,000+ happy adventurers have shared.</p>
      <div className={styles.slider}>
        <div className={styles.track} style={{ transform: `translateX(-${current * (360 + 24)}px)` }}>
          {TESTIS.map((t, i) => (
            <article key={i} className={`${styles.card} reveal`}>
              <div className={styles.stars} aria-label="5 stars">★★★★★</div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar} aria-hidden="true">{t.init}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.loc}>📍 {t.loc}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.dots} role="tablist">
        {TESTIS.map((_, i) => (
          <button key={i} role="tab" aria-selected={i===current} aria-label={`Slide ${i+1}`}
            className={`${styles.dot} ${i===current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)} />
        ))}
      </div>
    </section>
  );
}
