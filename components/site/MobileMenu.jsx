'use client';

import Link from 'next/link';
import { CONTACT } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import { MAIN_NAV } from './nav';
import m from './menu.module.css';

const MENU_ID = 'site-menu';
const WHATSAPP = whatsappLink(CONTACT.phone, "Hi DayOut, I'd like to plan a trip.");

/**
 * Menu button and sheet for narrow screens, built on the native popover:
 * Esc and outside clicks close it, and the browser reports the open state
 * to assistive tech. Links also close it, for same-page targets like /#swell.
 * Hidden on wide screens, where the header shows MAIN_NAV inline.
 * `current` is the href of this page.
 */
export default function MobileMenu({ current, className = '' }) {
  const close = () => document.getElementById(MENU_ID)?.hidePopover();
  return (
    <>
      <button type="button" popoverTarget={MENU_ID} className={`${m.toggle} ${className}`}>
        <span aria-hidden="true" className={m.bars} />
        <span className="sr-only">Menu</span>
      </button>
      <div id={MENU_ID} popover="auto" className={m.sheet}>
        <div className={m.top}>
          <span className={m.brand}>Day<span className={m.accent}>Out</span></span>
          <button type="button" popoverTarget={MENU_ID} popoverTargetAction="hide" className={m.close}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Menu">
          <ul className={m.list}>
            <li><Link href="/" onClick={close} aria-current={current === '/' ? 'page' : undefined}>Home</Link></li>
            {MAIN_NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} aria-current={current === l.href ? 'page' : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={m.foot}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={m.cta}>
            WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className={m.phone}>{CONTACT.phone}</a>
        </div>
      </div>
    </>
  );
}
