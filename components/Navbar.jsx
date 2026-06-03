'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, target) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Destinations', id: 'destinations' },
    { name: 'Experiences', id: 'experiences' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <Link href="/" className={styles.logo} aria-label="DayOut Home" onClick={() => setMobileOpen(false)}>
          <Image src="/images/logo.png" alt="DayOut logo" width={36} height={36} className={styles.logoImg} />
          <span>Day<span className={styles.accent}>Out</span></span>
        </Link>
        <ul className={styles.links}>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link 
                href={isHome ? `#${link.id}` : `/#${link.id}`} 
                onClick={(e) => handleNavClick(e, link.id)} 
                className={styles.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" prefetch={true} className={styles.cta}>Plan Your Trip</Link>
        <button className={styles.hamburger} id="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span/><span/><span/>
        </button>
      </nav>

      {mobileOpen && (
        <div className={styles.mobileNav} role="dialog" aria-modal="true">
          <button className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
          <Link href="/" prefetch={true} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/about" prefetch={true} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About Us</Link>
          {navLinks.map(link => (
            <Link 
              key={link.id}
              href={isHome ? `#${link.id}` : `/#${link.id}`} 
              onClick={(e) => handleNavClick(e, link.id)} 
              className={styles.mobileLink}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" prefetch={true} className={styles.mobileLink} onClick={() => setMobileOpen(false)} style={{ color: 'var(--yellow)', marginTop: '20px' }}>
            Plan Your Trip
          </Link>
        </div>
      )}
    </>
  );
}
