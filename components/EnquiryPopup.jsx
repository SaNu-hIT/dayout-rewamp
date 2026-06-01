'use client';

import { useEffect, useState } from 'react';
import { submitLead } from '@/app/actions';
import styles from './EnquiryPopup.module.css';

export default function EnquiryPopup() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  useEffect(() => {
    // Show popup after a short delay on every load
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setVisible(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const formData = new FormData(e.target);
      const res = await submitLead(formData);
      if (res.success) {
        setStatus('success');
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className={styles.popup} role="dialog" aria-modal="true" aria-label="Quick Enquiry">
        {status === 'success' ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3>We got your enquiry!</h3>
            <p>Our team will reach out to you shortly. Get ready for an unforgettable Goa experience.</p>
            <button className={styles.closeSuccessBtn} onClick={close}>
              Explore DayOut
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <button className={styles.closeBtn} onClick={close} aria-label="Close">×</button>
              <div className={styles.badge}>Limited Slots Available</div>
              <h2>Plan Your Goa Getaway</h2>
              <p>Tell us what you're looking for and we'll craft the perfect trip for you.</p>
            </div>
            <div className={styles.body}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="eq-name">Your Name *</label>
                    <input id="eq-name" name="name" type="text" required placeholder="John Doe" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="eq-phone">Phone *</label>
                    <input id="eq-phone" name="phone" type="tel" required placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="eq-destination">Where do you want to go?</label>
                  <select id="eq-destination" name="destination">
                    <option value="">Select a destination...</option>
                    <option value="north_goa">North Goa (Baga, Calangute)</option>
                    <option value="south_goa">South Goa (Palolem, Colva)</option>
                    <option value="central_goa">Central Goa (Panaji, Old Goa)</option>
                    <option value="dudhsagar">Dudhsagar / Wildlife</option>
                    <option value="other">Not sure yet — surprise me!</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="eq-email">Email Address</label>
                  <input id="eq-email" name="email" type="email" placeholder="john@example.com" />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Get a Free Quote →'}
                </button>
              </form>
              <span className={styles.skipLink} onClick={close}>
                No thanks, I'll browse on my own
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
