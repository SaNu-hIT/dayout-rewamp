'use client';

import { useEffect, useState } from 'react';
import { submitLead } from '@/app/actions';
import styles from './EnquiryPopup.module.css';

const STORAGE_KEY = 'dayout_enquiry_ts';
const SUPPRESS_HOURS = 24;

function shouldShow() {
  try {
    const ts = localStorage.getItem(STORAGE_KEY);
    if (!ts) return true;
    const elapsed = (Date.now() - parseInt(ts, 10)) / 3600000;
    return elapsed >= SUPPRESS_HOURS;
  } catch {
    return true;
  }
}

function markShown() {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
}

function markDone() {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now() + SUPPRESS_HOURS * 3600000 * 30)); } catch {}
}

export default function EnquiryPopup() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  useEffect(() => {
    if (!shouldShow()) return;
    const timer = setTimeout(() => {
      setVisible(true);
      markShown();
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setVisible(false);

  const handleSubmit = async (formData) => {
    setStatus('submitting');
    try {
      const res = await submitLead(formData);
      if (res.success) {
        setStatus('success');
        markDone();
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
            <p>Our team will reach out to you shortly. We’ll send a plan built around your dates.</p>
            <button className={styles.closeSuccessBtn} onClick={close}>
              Explore DayOut
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <button className={styles.closeBtn} onClick={close} aria-label="Close">×</button>
              <div className={styles.badge}>Limited Slots Available</div>
              <h2>Plan your trip</h2>
              <p>Tell us what you’re looking for and we’ll craft the perfect trip for you.</p>
            </div>
            <div className={styles.body}>
              <form className={styles.form} action={handleSubmit}>
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
                    <option value="north_india">North India (Ladakh, Kashmir, Rajasthan)</option>
                    <option value="kerala">Kerala (Munnar, Alleppey)</option>
                    <option value="goa">Goa</option>
                    <option value="south_india">Rest of South India and islands</option>
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
                No thanks, I’ll browse on my own
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
