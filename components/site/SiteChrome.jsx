import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, ROUTES } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import ChatIcon from '@/components/swell/ChatIcon';
import MobileMenu from './MobileMenu';
import { MAIN_NAV } from './nav';
import c from './site.module.css';

const WHATSAPP = whatsappLink(CONTACT.phone, "Hi DayOut, I'd like to plan a trip.");
export const TEL = `tel:${CONTACT.phone.replace(/\s/g, '')}`;

/** Logo lockup shared by every header: icon + "DayOut" wordmark, linking home. */
export function Logo({ className = '' }) {
  return (
    <Link href="/" className={`${c.logo} ${className}`} aria-label="DayOut Holidays home">
      <Image src="/images/logo.png" alt="" width={36} height={36} className={c.logoImg} />
      <span>Day<span className={c.accent}>Out</span></span>
    </Link>
  );
}

/** Desktop main menu. `current` is this page's href, marked with aria-current. */
export function MainNav({ current, className = '' }) {
  return (
    <nav aria-label="Main" className={`${c.nav} ${className}`}>
      {MAIN_NAV.map((l) => (
        <Link key={l.href} href={l.href} aria-current={current === l.href ? 'page' : undefined}>{l.label}</Link>
      ))}
    </nav>
  );
}

/** Header for content pages; sits over the page hero. */
export function SiteHeader({ current }) {
  return (
    <header className={c.header}>
      <div className={`${c.wrap} ${c.bar}`}>
        <Logo />
        <MainNav current={current} />
        <div className={c.tools}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${c.ghost} ${c.compact} ${c.chat}`}>
            <ChatIcon />WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <MobileMenu current={current} />
        </div>
      </div>
    </header>
  );
}

/**
 * Page hero. With `img` it is a full-bleed photo under a sea scrim; without,
 * a plain night-sea band (legal pages). `children` sits under the lead.
 */
export function SiteHero({ eyebrow, title, lead, img, alt = '', position = 'center', size = 'tall', children }) {
  return (
    <section className={`${c.hero} ${img ? c.photoHero : c.bandHero} ${size === 'short' ? c.short : ''}`} aria-labelledby="page-title">
      {img && (
        <>
          <Image src={img} alt={alt} fill preload sizes="100vw" className={c.heroImg} style={{ objectPosition: position }} />
          <span aria-hidden="true" className={c.heroScrim} />
        </>
      )}
      <div className={`${c.wrap} ${c.heroInner}`}>
        {eyebrow && <p className={`${c.mono} ${c.eyebrow}`}>{eyebrow}</p>}
        <h1 id="page-title" className={c.heroTitle}>{title}</h1>
        {lead && <p className={c.heroLead}>{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Yellow closing band: WhatsApp with a prefilled message, plus page links. */
export function SiteCta({ eyebrow = 'One message · one plan', title, lead, message, links = [] }) {
  return (
    <section className={c.sun} aria-labelledby="cta-title">
      <div className={`${c.wrap} ${c.ctaRow}`}>
        <div className={c.ctaCopy}>
          <p className={`${c.mono} ${c.ctaEyebrow}`}>{eyebrow}</p>
          <h2 id="cta-title" className={c.ctaTitle}>{title}</h2>
          <p className={c.ctaLead}>{lead}</p>
        </div>
        <div className={c.ctas}>
          <a href={whatsappLink(CONTACT.phone, message)} target="_blank" rel="noopener noreferrer" className={`${c.pill} ${c.pillDark}`}>
            <ChatIcon />WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`${c.ghost} ${c.sunGhost}`}>{l.label}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className={c.footer}>
      <div className={`${c.wrap} ${c.footCols}`}>
        <div className={c.footCol}>
          <Logo className={c.footLogo} />
          <address>{CONTACT.address}</address>
          <a href={TEL}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <nav className={c.footCol} aria-label="Explore">
          <p className={`${c.mono} ${c.footHead}`}>Explore</p>
          <Link href={ROUTES.north}>North India</Link>
          <Link href={ROUTES.south}>South India</Link>
          <Link href={ROUTES.packages}>Packages</Link>
          <Link href={ROUTES.notes}>Field notes</Link>
        </nav>
        <nav className={c.footCol} aria-label="Company">
          <p className={`${c.mono} ${c.footHead}`}>Company</p>
          <Link href={ROUTES.about}>About</Link>
          <Link href={ROUTES.contact}>Contact</Link>
          <Link href={ROUTES.privacy}>Privacy policy</Link>
          <Link href={ROUTES.terms}>Terms of service</Link>
        </nav>
        <nav className={c.footCol} aria-label="Follow">
          <p className={`${c.mono} ${c.footHead}`}>Follow</p>
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram<span className="sr-only"> (opens in a new tab)</span></a>
          <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook<span className="sr-only"> (opens in a new tab)</span></a>
        </nav>
      </div>
      <div className={`${c.wrap} ${c.fine}`}>
        <p className={c.mono}>© DayOut Holidays · Kochi, Kerala</p>
        <p className={c.mono}>Advance payments are non-refundable</p>
      </div>
    </footer>
  );
}
