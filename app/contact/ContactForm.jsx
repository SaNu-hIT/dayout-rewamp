'use client';

import { useState } from 'react';
import { submitLead } from '../actions';
import styles from './page.module.css';
import { EXPERIENCES } from '@/data/experiences';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData) => {
    setStatus('submitting');
    try {
      const response = await submitLead(formData);
      if (response.success) {
        setStatus('success');
        setMessage(response.message);
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>Request Received!</h3>
        <p>{message}</p>
        <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: '24px' }}>
          Plan Another Trip
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: 800 }}>Trip Request Form</h3>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name *</label>
          <input type="text" id="name" name="name" required placeholder="John Doe" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address *</label>
          <input type="email" id="email" name="email" required placeholder="john@example.com" />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="destination">Destination Interest</label>
          <select id="destination" name="destination">
            <option value="">Select a destination...</option>
            <option value="north_goa">North Goa (Baga, Calangute)</option>
            <option value="south_goa">South Goa (Palolem, Colva)</option>
            <option value="central_goa">Central Goa (Panaji, Old Goa)</option>
            <option value="dudhsagar">Dudhsagar / Wildlife</option>
            <option value="other">Other / Not sure yet</option>
          </select>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="checkIn">Check-In Date</label>
          <input type="date" id="checkIn" name="checkIn" className={styles.dateInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkOut">Check-Out Date</label>
          <input type="date" id="checkOut" name="checkOut" className={styles.dateInput} />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="package">Select Package</label>
          <select id="package" name="package">
            <option value="">Choose a package...</option>
            {EXPERIENCES.map((pkg) => (
              <option key={pkg.slug} value={pkg.slug}>
                {pkg.title} — {pkg.price}/{pkg.unit} ({pkg.duration})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Tell us about your trip</label>
        <textarea id="message" name="message" rows="4" placeholder="Any special requests, occasions, or specific experiences you're looking for?" />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Submit Request'}
      </button>

      {status === 'error' && <p className={styles.errorMessage}>{message}</p>}
    </form>
  );
}
