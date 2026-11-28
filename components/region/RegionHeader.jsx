import Image from 'next/image';
import Link from 'next/link';
import { MainNav } from '@/components/site/SiteChrome';
import MobileMenu from '@/components/site/MobileMenu';
import r from './region.module.css';
import c from './chrome.module.css';

/**
 * Header for a region page: the site logo lockup, the main menu,
 * a boarding "gate" tag and the plan CTA. `current` is this page's href.
 */
export default function RegionHeader({ current, gate, planHref }) {
  return (
    <header className={c.header}>
      <div className={c.bar}>
        {/* Same logo lockup as the home page. */}
        <Link href="/" className={c.logo} aria-label="DayOut Holidays home">
          <Image src="/images/logo.png" alt="" width={36} height={36} className={c.logoImg} />
          <span>Day<span className={c.accent}>Out</span></span>
        </Link>
        <MainNav current={current} />
        <div className={c.tools}>
          <span className={c.gate}>{gate}</span>
          <a href={planHref} className={`${r.pill} ${c.compact} ${c.plan}`}>Plan your trip</a>
          <MobileMenu current={current} />
        </div>
      </div>
    </header>
  );
}
