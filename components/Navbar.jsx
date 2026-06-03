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

  const pageLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
  ];

  const sectionLinks = [
    { name: 'Destinations', id: 'destinations' },
    { name: 'Experiences', id: 'experiences' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <Link href="/" className={styles.logo} aria-label="DayOut Home" onClick={() => setMobileOpen(false)}>
          <Image src="/images/logo.png" alt="DayOut logo" width={36} height={36} className={styles.logoImg} />
          <span>Day<span className={styles.accent}>Out</span></span>
        </Link>
        <ul className={styles.links}>
          {pageLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={true}
                className={`${styles.link} ${isActive(link.href) ? styles.linkActive : ''}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {sectionLinks.map(link => (
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
        <Link
          href="/contact"
          prefetch={true}
          className={`${styles.cta} ${isActive('/contact') ? styles.ctaActive : ''}`}
          aria-current={isActive('/contact') ? 'page' : undefined}
        >
          Plan Your Trip
        </Link>
        <a href="tel:+918848965352" className={styles.callBtn} aria-label="Call us">📞</a>
        <button className={styles.hamburger} id="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span/><span/><span/>
        </button>
      </nav>

      {mobileOpen && (
        <div className={styles.mobileNav} role="dialog" aria-modal="true">
          <button className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
          {pageLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ''}`}
              onClick={() => setMobileOpen(false)}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          {sectionLinks.map(link => (
            <Link
              key={link.id}
              href={isHome ? `#${link.id}` : `/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={styles.mobileLink}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" prefetch={true} className={`${styles.mobileLink} ${isActive('/contact') ? styles.mobileLinkActive : ''}`} onClick={() => setMobileOpen(false)} style={{ color: isActive('/contact') ? '#fff' : 'var(--yellow)', marginTop: '20px' }}>
            Plan Your Trip
          </Link>
        </div>
      )}
    </>
  );
}
