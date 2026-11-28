import Link from 'next/link';
import SunMark from '@/components/home/SunMark';
import { CONTACT, ROUTES } from '@/data/swell';
import ChatIcon from './ChatIcon';
import Panel from './Panel';
import s from './swell.module.css';
import c from './Ride.module.css';

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/** Wave 5: the sun comes up. Contact and footer. */
export default function Ride({ foam, whatsapp }) {
  const tel = `tel:${CONTACT.phone.replace(/\s/g, '')}`;
  return (
    <Panel n={5} id="ride" label="Wave 5: Contact" foam={foam} bodyClassName={c.body}>
      <SunMark className={c.bigSun} spin rayWidth={5} ringWidth={9} />
      <div className={c.inner}>
        <p className={`${s.mono} ${c.eyebrow}`}>Wave 5 · Sunrise</p>
        <h2 className={c.big}>Ride with us.</h2>
        <p className={c.lead}>One WhatsApp, and our Kochi crew plans the rest. North, South, or both.</p>
        <div className={c.ctas}>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${s.pill} ${c.dark}`}>
            <ChatIcon />WhatsApp us{NEW_TAB}
          </a>
          <a href={tel} className={`${s.ghost} ${c.line}`}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className={`${s.ghost} ${c.line}`}>{CONTACT.email}</a>
        </div>
        <footer className={c.cols}>
          <div className={c.col}>
            <span className={`${s.mono} ${c.colHead}`}>Office</span>
            <address className={c.address}>
              {CONTACT.city}
              {CONTACT.address && <><br />{CONTACT.address}</>}
            </address>
          </div>
          <nav className={c.col} aria-label="Destinations">
            <span className={`${s.mono} ${c.colHead}`}>Go</span>
            <Link href={ROUTES.north}>North India</Link>
            <Link href={ROUTES.south}>South India</Link>
          </nav>
          <nav className={c.col} aria-label="Read">
            <span className={`${s.mono} ${c.colHead}`}>Read</span>
            <Link href={ROUTES.notes}>Field notes</Link>
            <Link href={ROUTES.about}>About us</Link>
          </nav>
          <nav className={c.col} aria-label="Follow">
            <span className={`${s.mono} ${c.colHead}`}>Follow</span>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram{NEW_TAB}</a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook{NEW_TAB}</a>
          </nav>
        </footer>
        <p className={`${s.mono} ${c.fine}`}>
          © DayOut Holidays · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · Prices marked sample are placeholders
        </p>
      </div>
    </Panel>
  );
}
