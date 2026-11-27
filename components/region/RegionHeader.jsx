import Image from 'next/image';
import Link from 'next/link';
import r from './region.module.css';
import c from './chrome.module.css';

/**
 * Header for a region page: the site logo lockup, in-page links,
 * a boarding "gate" tag, the switch to the other region and the plan CTA.
 */
export default function RegionHeader({ links, gate, switchTo, planHref }) {
  return (
    <header className={c.header}>
      <div className={c.bar}>
        {/* Same logo lockup as the home page and the site Navbar. */}
        <Link href="/" className={c.logo} aria-label="DayOut Holidays home">
          <Image src="/images/logo.png" alt="" width={36} height={36} className={c.logoImg} />
          <span>Day<span className={c.accent}>Out</span></span>
        </Link>
        <nav className={c.links} aria-label="On this page">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className={c.tools}>
          <span className={c.gate}>{gate}</span>
          <Link href={switchTo.href} className={`${r.ghost} ${c.compact}`}>{switchTo.label}</Link>
          <a href={planHref} className={`${r.pill} ${c.compact} ${c.plan}`}>Plan your trip</a>
        </div>
      </div>
    </header>
  );
}
