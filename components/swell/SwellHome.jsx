import Image from 'next/image';
import { CONTACT, WAVES } from '@/data/swell';
import { MainNav } from '@/components/site/SiteChrome';
import MobileMenu from '@/components/site/MobileMenu';
import { TILE, waveEdge, wavePath, crestMask, whatsappLink } from '@/lib/waves';
import Shore from './Shore';
import Choose from './Choose';
import Boards from './Boards';
import Glow from './Glow';
import Ride from './Ride';
import WaveGlyph from './WaveGlyph';
import ChatIcon from './ChatIcon';
import s from './swell.module.css';
import h from './SwellHome.module.css';

// One crest shape for every wave, so the foam line and the mask edge always agree.
const CREST = waveEdge(46, 22, 0.6);
const CREST_MASK = crestMask(CREST);
const FOAM = { line: wavePath(CREST), lace: wavePath((x) => CREST(x) + 14), color: 'var(--foam)' };
const FOAM_GLOW = { ...FOAM, color: 'var(--glow)' };

const WATER = waveEdge(40, 12, 1.4);
const WATERLINE = { line: wavePath(WATER, TILE * 2), lace: wavePath((x) => WATER(x) + 12, TILE * 2) };

const WHATSAPP = whatsappLink(CONTACT.phone, "Hi DayOut, I'd like to plan a trip.");

export default function SwellHome() {
  return (
    <div className={s.page}>
      <header className={h.header}>
        {/* Same logo lockup as every page header: icon + "DayOut" wordmark. */}
        <a href="#top" className={h.logo} aria-label="DayOut Holidays home">
          <Image src="/images/logo.png" alt="" width={36} height={36} preload className={h.logoImg} />
          <span>Day<span className={h.accent}>Out</span></span>
        </a>
        <MainNav current="/" />
        <div className={h.tools}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${s.ghost} ${h.chat}`}>
            <ChatIcon />WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <MobileMenu current="/" />
        </div>
      </header>

      <nav aria-label="Waves" className={h.counter}>
        {WAVES.map((w) => (
          <a key={w.id} href={`#${w.id}`} title={`Wave ${w.n} ${w.label}`} className={`${s.mono} ${h.wave}`}>
            <span className="sr-only">Wave </span>{w.n}<span className="sr-only"> {w.label}</span>
            <WaveGlyph className={h.waveGlyph} />
          </a>
        ))}
      </nav>

      <main className={s.stack} style={{ '--crest-mask': CREST_MASK }}>
        <Shore whatsapp={WHATSAPP} />
        <Choose foam={FOAM} waterline={WATERLINE} />
        <Boards foam={FOAM} />
        <Glow foam={FOAM_GLOW} />
        <Ride foam={FOAM} whatsapp={WHATSAPP} />
      </main>
    </div>
  );
}

