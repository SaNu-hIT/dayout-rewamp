'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

const IMGS = [
  { src:'/images/goa-beach.jpg',    alt:'Aerial view of Palolem beach Goa with palm trees',       label:'Palolem Beach' },
  { src:'/images/sunset-beach.jpg', alt:'Magical Vagator beach sunset with golden sky',           label:'Vagator Beach' },
  { src:'/images/concert.jpg',      alt:'Fireworks burst over festival concert stage in Anjuna',  label:'Anjuna Beach' },
  { src:'/images/waterfall.jpg',    alt:'Dudhsagar waterfalls surrounded by jungle',              label:'Dudhsagar Falls' },
  { src:'/images/beach-night.jpg',  alt:'Lit beach cabanas glowing at night on Baga beach',       label:'Baga Beach' },
  { src:'/images/hero-bg.jpg',      alt:'South Goa resort beach at golden sunset',                label:'South Goa Resort' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els?.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className={styles.section} ref={ref} aria-labelledby="gallery-heading">
      <div className="section-tag">Moments Captured</div>
      <h2 className="section-title" id="gallery-heading">Your Trip in<br />Every Frame</h2>
      <p className="section-sub">A visual journey through the destinations and experiences that await you.</p>
      <div className={styles.grid}>
        {IMGS.map((img, i) => (
          <div key={i} className={`${styles.item} reveal`} onClick={() => setLightbox(img)} role="button" tabIndex={0} aria-label={`View ${img.label}`} onKeyDown={e => e.key==='Enter' && setLightbox(img)}>
            <div className={styles.imgWrap}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width:640px) 100vw, 33vw" className={styles.img} />
            </div>
            <div className={styles.overlay}><span className={styles.overlayText}>{img.label}</span></div>
          </div>
        ))}
      </div>
      {lightbox && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <Image src={lightbox.src} alt={lightbox.alt} width={1200} height={800} className={styles.lightboxImg} />
          </div>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close">✕</button>
        </div>
      )}
    </section>
  );
}
