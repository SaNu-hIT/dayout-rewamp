'use client';
import { useRef, useState } from 'react';
import { subscribeNewsletter } from '@/app/actions';
import styles from './Dawn.module.css';

const FALLBACK_ERROR = 'Unable to subscribe. Please try again later.';

/** Season deals sign-up. One submit = one request; repeat submits are ignored while one is in flight. */
export default function NewsletterForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const inFlight = useRef(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus('pending');
    setMessage('');

    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    try {
      const result = await subscribeNewsletter(email);
      if (result?.success) {
        setStatus('success');
        setMessage("You're on the list. Deals land before the season does.");
        form.reset();
      } else {
        setStatus('error');
        setMessage(result?.message || FALLBACK_ERROR);
      }
    } catch {
      setStatus('error');
      setMessage(FALLBACK_ERROR);
    } finally {
      inFlight.current = false;
    }
  }

  const pending = status === 'pending';
  return (
    <form className={styles.form} onSubmit={onSubmit} aria-busy={pending}>
      <label htmlFor="dawn-email" className={styles.formLabel}>Season deals &amp; festival alerts</label>
      <input
        id="dawn-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@email.com"
        className={styles.input}
        aria-describedby="dawn-email-status"
        disabled={pending}
      />
      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? <><span className={styles.spinner} aria-hidden="true" />Subscribing…</> : 'Subscribe'}
      </button>
      <p
        id="dawn-email-status"
        role={status === 'error' ? 'alert' : 'status'}
        className={`${styles.formMessage} ${status === 'error' ? styles.formError : ''}`}
      >
        {message}
      </p>
    </form>
  );
}
