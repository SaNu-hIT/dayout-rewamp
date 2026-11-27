import Link from 'next/link';
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_TEL, SOCIAL, whatsappLink } from '@/data/home';
import NewsletterForm from './NewsletterForm';
import ui from './ui.module.css';
import styles from './Dawn.module.css';

const GOA_LINKS = [
  { name: 'North Goa', href: '#destinations' },
  { name: 'South Goa', href: '#destinations' },
  { name: 'Dudhsagar', href: '#destinations' },
];

const COMPANY_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

/** 05:59 — the footer. The sun comes back up, and the day starts again. */
export default function Dawn() {
  return (
    <footer id="dawn" className={styles.dawn}>
      <div className={styles.rise} aria-hidden="true"><div className={styles.sun} /></div>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={ui.headStack}>
            <p className={ui.eyebrowNight}>05:59 — See you at sunrise</p>
            <h2 className={ui.h2}>Tell us your dates. We&apos;ll plan the day.</h2>
          </div>
          <div className={styles.contact}>
            <a
              href={whatsappLink('Hi DayOut, I want to plan a Goa trip.')}
              target="_blank"
              rel="noopener noreferrer"
              className={ui.pillSun}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 20l1.5-4A8 8 0 1 1 8 18.5z" />
              </svg>
              WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`tel:${PHONE_TEL}`} className={ui.pillGhost}>{PHONE_DISPLAY}</a>
          </div>
        </div>

        <NewsletterForm />

        <div className={styles.cols}>
          <div className={styles.col}>
            <p className={styles.colTitle}>Kochi office</p>
            <address className={styles.address}>{ADDRESS}</address>
            <a href={`mailto:${EMAIL}`} className={styles.link}>{EMAIL}</a>
          </div>
          <nav className={styles.col} aria-label="Goa">
            <p className={styles.colTitle}>Goa</p>
            {GOA_LINKS.map((l) => <a key={l.name} href={l.href} className={styles.link}>{l.name}</a>)}
          </nav>
          <nav className={styles.col} aria-label="Company">
            <p className={styles.colTitle}>Company</p>
            {COMPANY_LINKS.map((l) => <Link key={l.name} href={l.href} className={styles.link}>{l.name}</Link>)}
          </nav>
          <nav className={styles.col} aria-label="Follow DayOut">
            <p className={styles.colTitle}>Follow</p>
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {s.name}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} DayOut Holidays</p>
          <p>Advance payments are non-refundable</p>
        </div>
      </div>
    </footer>
  );
}
