'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SunMark from './SunMark';
import styles from './HomeHeader.module.css';

const SOLID_AFTER_PX = 80;

/** Home page header: clear over the hero, solid once you scroll. */
export default function HomeHeader({ showDepartures = false }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  const links = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Packages', href: '#packages' },
    ...(showDepartures ? [{ name: 'Departures', href: '#departures' }] : []),
    { name: 'Stories', href: '#stories' },
    { name: 'FAQ', href: '#faq' },
    { name: 'About', href: '/about' },
  ];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${solid || open ? styles.solid : ''}`}>
      <div className={styles.bar}>
        <a href="#sunrise" className={styles.logo} onClick={close}>
          <span className="sr-only">DayOut Holidays, back to top</span>
          <span aria-hidden="true" className={styles.word}>
            Day<SunMark className={styles.logoSun} rayWidth={7} />ut
          </span>
        </a>

        <nav aria-label="Main" className={styles.nav}>
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.name}>
                {l.href.startsWith('/') ? (
                  <Link href={l.href} className={styles.link}>{l.name}</Link>
                ) : (
                  <a href={l.href} className={styles.link}>{l.name}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.end}>
          <a href="#packages" className={styles.cta}>Plan Your Trip</a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="home-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id="home-menu" aria-label="Main menu" className={styles.menu} hidden={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.name}>
              {l.href.startsWith('/') ? (
                <Link href={l.href} className={styles.menuLink} onClick={close}>{l.name}</Link>
              ) : (
                <a href={l.href} className={styles.menuLink} onClick={close}>{l.name}</a>
              )}
            </li>
          ))}
          <li>
            <a href="#packages" className={styles.menuCta} onClick={close}>Plan Your Trip</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
