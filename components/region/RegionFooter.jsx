import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, ROUTES } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import ChatIcon from '@/components/swell/ChatIcon';
import r from './region.module.css';

const WHATSAPP = whatsappLink(CONTACT.phone, "Hi DayOut, I'd like to plan a trip.");
const TEL = `tel:${CONTACT.phone.replace(/\s/g, '')}`;

/**
 * End of a region page: a full-bleed photo (the summit, or land's end),
 * contact CTAs, the switch to the other region, and the site links.
 */
export default function RegionFooter({ id, theme, photo, scrim, overlay, eyebrow, title, switchTo, byTitle, byLinks }) {
  return (
    <footer id={id} className={`${r.footer} ${theme}`}>
      <div className={r.footPhoto}>
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className={r.cardImg} style={{ objectPosition: photo.position }} />
        <span className={r.footScrim} style={{ background: scrim }} aria-hidden="true" />
        {overlay}
      </div>
      <div className={`${r.wrap} ${r.footMain}`}>
        <div className={r.head}>
          <div className={r.headCopy}>
            <p className={r.eyebrow}>{eyebrow}</p>
            <h2 className={r.h2}>{title}</h2>
          </div>
          <div className={r.ctas}>
            <a href={WHATSAPP} className={r.pill} target="_blank" rel="noopener noreferrer">
              <ChatIcon />WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={TEL} className={r.ghost}>{CONTACT.phone}</a>
            <Link href={switchTo.href} className={r.ghost}>{switchTo.label}</Link>
          </div>
        </div>
        <div className={r.footCols}>
          <div className={r.footCol}>
            <p className={r.footHead}>Kochi office</p>
            <address>{CONTACT.address}</address>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <nav className={r.footCol} aria-label={byTitle}>
            <p className={r.footHead}>{byTitle}</p>
            {byLinks.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
          </nav>
          <nav className={r.footCol} aria-label="Company">
            <p className={r.footHead}>Company</p>
            <Link href={ROUTES.notes}>Field notes</Link>
            <Link href={switchTo.href}>{switchTo.region}</Link>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
          <nav className={r.footCol} aria-label="Follow">
            <p className={r.footHead}>Follow</p>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram<span className="sr-only"> (opens in a new tab)</span></a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook<span className="sr-only"> (opens in a new tab)</span></a>
          </nav>
        </div>
        <div className={r.fine}>
          <p className={r.label}>© DayOut Holidays · Prices marked sample are placeholders</p>
          <p className={r.label}>Advance payments are non-refundable</p>
        </div>
      </div>
    </footer>
  );
}
