'use client';
import { useState } from 'react';
import { subscribeNewsletter } from '@/app/actions';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return;
    setStatus('submitting');
    try {
      const res = await subscribeNewsletter(email);
      setStatus(res.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className={styles.section} aria-labelledby="newsletter-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Stay In The Loop</div>
        <h2 className="section-title" id="newsletter-heading">Get Exclusive<br />Travel Deals</h2>
        <p className={styles.sub}>Subscribe and be the first to get curated destination guides, festival alerts, and limited-time offers.</p>
        {status === 'success' ? (
          <div className={styles.successMsg}>
            ✓ You&rsquo;re in! Check your inbox for a welcome message from DayOut.
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              type="email" id="newsletter-email" name="email"
              placeholder="Enter your email address"
              required autoComplete="email"
              className={styles.input}
              disabled={status === 'submitting'}
            />
            <button type="submit" className={styles.btn} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className={styles.errorMsg}>Something went wrong. Please try again or WhatsApp us.</p>
        )}
        <p className={styles.note}>No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
