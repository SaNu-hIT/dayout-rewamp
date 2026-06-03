import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

const DESTS = [
  { name: 'North Goa', id: 'destinations' },
  { name: 'South Goa', id: 'destinations' },
  { name: 'Panaji', id: 'destinations' },
  { name: 'Old Goa', id: 'destinations' },
  { name: 'Dudhsagar', id: 'destinations' },
];

const EXPS = [
  { name: 'Beach Getaways', id: 'experiences' },
  { name: 'Nature Treks', id: 'experiences' },
  { name: 'Night Experiences', id: 'experiences' },
  { name: 'Music Festivals', id: 'experiences' },
  { name: 'Eco Camping', id: 'experiences' },
];

const COMP = [
  { name: 'About Us', href: '/about' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Contact', href: '/contact' },
];

const SOCIALS = [
  { icon: 'FB', label: 'Facebook', href: 'https://www.facebook.com/p/Dayout-Holidays-100087241266220/' },
  { icon: 'IG', label: 'Instagram', href: 'https://www.instagram.com/dayout_holidays/' },
  { icon: 'WA', label: 'WhatsApp', href: 'https://wa.me/918848965352' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image src="/images/logo.png" alt="DayOut logo" width={32} height={32} className={styles.logoImg} />
            <span>Day<span className={styles.accent}>Out</span></span>
          </Link>
          <p>At Dayout Holidays, we bring you the best of Goa with tailor-made packages that combine adventure, relaxation, and unmatched service.</p>
          <div className={styles.contactInfo}>
            <a href="tel:+918848965352">📞 +91 8848965352</a>
            <a href="mailto:dayoutholidays@gmail.com">✉️ dayoutholidays@gmail.com</a>
            <p>📍 Rajakumary, Kerala 685619</p>
          </div>
          <div className={styles.socials} aria-label="Social media links">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                className={styles.social}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.col}>
          <h4>Destinations</h4>
          <ul>{DESTS.map(d => <li key={d.name}><Link href={`/#${d.id}`}>{d.name}</Link></li>)}</ul>
        </div>
        <div className={styles.col}>
          <h4>Experiences</h4>
          <ul>{EXPS.map(e => <li key={e.name}><Link href={`/#${e.id}`}>{e.name}</Link></li>)}</ul>
        </div>
        <div className={styles.col}>
          <h4>Company</h4>
          <ul>{COMP.map(c => <li key={c.name}><Link href={c.href}>{c.name}</Link></li>)}</ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2026 DayOut Holidays. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
