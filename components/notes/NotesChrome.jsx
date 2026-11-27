import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, ROUTES } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import ChatIcon from '@/components/swell/ChatIcon';
import s from './notes.module.css';

const NAV = [
  { href: '/', label: 'Home' },
  { href: ROUTES.north, label: 'North' },
  { href: ROUTES.south, label: 'South' },
  { href: ROUTES.notes, label: 'Field notes' },
  { href: '/contact', label: 'Contact' },
];

/** Site header for the notes pages. `current` marks Field notes as the current page on the index only. */
export function NotesHeader({ current = false }) {
  return (
    <header className={s.header}>
      <div className={`${s.wrap} ${s.bar}`}>
        <Link href="/" className={s.logo} aria-label="DayOut Holidays home">
          <Image src="/images/logo.png" alt="" width={36} height={36} className={s.logoImg} />
          <span>Day<span className={s.accent}>Out</span></span>
        </Link>
        <nav className={s.nav} aria-label="Main">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current && l.href === ROUTES.notes ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a href="#plan" className={`${s.pill} ${s.compact}`}>Plan your trip</a>
      </div>
    </header>
  );
}

/** Yellow closing CTA: WhatsApp with a prefilled message, plus region links. */
export function NotesCta({ title, lead, message, links }) {
  return (
    <section id="plan" className={s.sun} aria-labelledby="plan-title">
      <div className={`${s.wrap} ${s.ctaRow}`}>
        <div className={s.ctaCopy}>
          <p className={`${s.mono} ${s.ctaEyebrow}`}>Read it · then go</p>
          <h2 id="plan-title" className={s.ctaTitle}>{title}</h2>
          <p className={s.ctaLead}>{lead}</p>
        </div>
        <div className={s.ctas}>
          <a href={whatsappLink(CONTACT.phone, message)} target="_blank" rel="noopener noreferrer" className={`${s.pill} ${s.pillDark}`}>
            <ChatIcon />WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={s.ghost}>{l.label}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NotesFooter() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footCols}`}>
        <div className={s.footCol}>
          <p className={`${s.mono} ${s.footHead}`}>Kochi office</p>
          <address>{CONTACT.address}</address>
        </div>
        <div className={s.footCol}>
          <p className={`${s.mono} ${s.footHead}`}>Explore</p>
          <Link href={ROUTES.north}>North India</Link>
          <Link href={ROUTES.south}>South India</Link>
          <Link href={ROUTES.notes}>Field notes</Link>
        </div>
        <div className={s.footCol}>
          <p className={`${s.mono} ${s.footHead}`}>Company</p>
          <Link href={ROUTES.about}>About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
      <p className={`${s.wrap} ${s.mono} ${s.fine}`}>© DayOut Holidays · Notes marked sample are placeholders</p>
    </footer>
  );
}
