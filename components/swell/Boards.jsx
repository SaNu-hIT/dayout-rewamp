import Image from 'next/image';
import { BOARDS, CONTACT } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import Panel from './Panel';
import s from './swell.module.css';
import c from './Boards.module.css';

/** Wave 3: packages as surfboards on a sandy swell. The row scrolls sideways. */
export default function Boards({ foam }) {
  return (
    <Panel n={3} id="swell" label="Wave 3: Packages" foam={foam} bodyClassName={c.body}>
      <div className={c.inner}>
        <p className={`${s.mono} ${c.eyebrow}`}>Wave 3 · This season&apos;s swell</p>
        <div className={c.head}>
          <h2 className={`${s.h2} ${c.title}`}>Pick a board. Ride it.</h2>
          <p className={`${s.mono} ${c.eyebrow}`}>Scroll sideways → · {BOARDS.length} packages</p>
        </div>
        {/* Focusable so keyboard users can scroll the row with arrow keys. */}
        <div className={c.row} tabIndex={0} role="region" aria-label="Packages, scroll sideways">
          {BOARDS.map((b) => (
            <article key={b.name} className={c.board}>
              <span className={c.top}>
                <Image src={b.img} alt={b.alt} fill sizes="290px" className={c.photo} />
                <span aria-hidden="true" className={c.seam} />
                {b.sample && <span className={`${s.mono} ${c.sample}`}>Sample</span>}
              </span>
              <div className={c.info}>
                <p className={`${s.mono} ${c.meta}`}>{b.region} · {b.season}</p>
                <h3 className={c.name}>{b.name}</h3>
                <p className={c.dur}>{b.dur}</p>
                <p className={c.price}>{b.price}</p>
                <a
                  href={whatsappLink(CONTACT.phone, `Hi DayOut, I'd like to know about the ${b.name} package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.pill} ${c.enquire}`}
                >
                  Enquire<span className="sr-only"> about {b.name} on WhatsApp (opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Panel>
  );
}
