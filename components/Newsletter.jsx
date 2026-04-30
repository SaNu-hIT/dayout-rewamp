'use client';
import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('success');
    e.target.reset();
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="newsletter" className={styles.section} aria-labelledby="newsletter-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Stay In The Loop</div>
        <h2 className="section-title" id="newsletter-heading">Get Exclusive<br />Travel Deals</h2>
        <p className={styles.sub}>Subscribe and be the first to get curated destination guides, festival alerts, and limited-time offers.</p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            type="email" id="newsletter-email" name="email"
            placeholder="Enter your email address"
            required autoComplete="email"
            className={styles.input}
          />
          <button type="submit" className={styles.btn} id="newsletter-btn">
            {status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
          </button>
        </form>
        <p className={styles.note}>No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
