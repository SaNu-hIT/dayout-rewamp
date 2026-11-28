'use client';

import { useRef, useState } from 'react';
import { submitLead } from '../actions';
import styles from './page.module.css';
import { EXPERIENCES } from '@/data/experiences';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [message, setMessage] = useState('');
  const inFlight = useRef(false);

  // onSubmit, not a form action: React resets action forms afterwards, which would wipe the
  // visitor's input when the server rejects one field.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlight.current) return; // a second tap before the first reply sends nothing
    const formData = new FormData(event.currentTarget);
    inFlight.current = true;
    setStatus('submitting');
    try {
      const response = await submitLead(formData);
      if (response.success) {
        setStatus('success');
        setMessage(response.message);
      } else {
        setStatus('error');
        setMessage(response.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    } finally {
      inFlight.current = false;
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage} role="status">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h3 className={styles.formTitle}>Request received</h3>
        <p>{message}</p>
        <button type="button" onClick={() => setStatus('idle')} className={styles.again}>
          Plan another trip
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} aria-labelledby="trip-form-title">
      <h2 id="trip-form-title" className={styles.formTitle}>Trip request</h2>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full name *</label>
          <input type="text" id="name" name="name" autoComplete="name" required placeholder="John Doe" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email address *</label>
          <input type="email" id="email" name="email" autoComplete="email" required placeholder="john@example.com" />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone number *</label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" required placeholder="+91 98765 43210" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="destination">Where to?</label>
          <select id="destination" name="destination">
            <option value="">Select a destination...</option>
            <option value="north_india">North India (Ladakh, Kashmir, Rajasthan)</option>
            <option value="kerala">Kerala (Munnar, Alleppey)</option>
            <option value="goa">Goa</option>
            <option value="south_india">Rest of South India and islands</option>
            <option value="other">Other / Not sure yet</option>
          </select>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="checkIn">Start date</label>
          <input type="date" id="checkIn" name="checkIn" className={styles.dateInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkOut">End date</label>
          <input type="date" id="checkOut" name="checkOut" className={styles.dateInput} />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="package">Package</label>
        <select id="package" name="package">
          <option value="">Choose a package...</option>
          {EXPERIENCES.map((pkg) => (
            <option key={pkg.slug} value={pkg.slug}>
              {pkg.title} — {pkg.price}/{pkg.unit} ({pkg.duration})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Tell us about your trip</label>
        <textarea id="message" name="message" rows="4" placeholder="Any special requests, occasions, or specific experiences you're looking for?" />
      </div>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send trip request'}
      </button>

      <p className={styles.errorMessage} role="alert">{status === 'error' ? message : ''}</p>
    </form>
  );
}
