import Image from 'next/image';
import Link from 'next/link';
import SunMark from '@/components/home/SunMark';
import { HALVES } from '@/data/swell';
import Panel from './Panel';
import s from './swell.module.css';
import c from './Choose.module.css';

/** Wave 2: the waterline splits India. North above it, South below it. */
export default function Choose({ foam, waterline }) {
  return (
    <Panel n={2} id="choose" label="Wave 2: Choose North or South" foam={foam}>
      <h2 className="sr-only">Where to? North India or South India</h2>
      <div className={c.split}>
        {HALVES.map((half) => (
          <Link key={half.key} href={half.href} aria-label={half.aria} className={`${c.half} ${c[half.key]}`}>
            <Image src={half.img} alt="" fill sizes="100vw" className={c.photo} />
            <span aria-hidden="true" className={c.scrim} />
            <span className={c.text}>
              <span className={s.chip}>{half.coord}</span>
              <span aria-hidden="true" className={c.word}>
                {half.pre}
                <SunMark className={c.sun} spin />
                {half.post}
              </span>
              <span className={c.mood}>{half.mood}</span>
              <span className={`${s.mono} ${c.places}`}>{half.places}</span>
              <span className={`${s.pill} ${c.cta}`}>{half.cta}</span>
            </span>
          </Link>
        ))}
      </div>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1440 80" preserveAspectRatio="xMidYMid slice" className={c.waterline}>
        <g className={c.lap}>
          <g className={s.roll}>
            <path d={waterline.line} fill="none" strokeWidth="6" strokeLinecap="round" />
            <path d={waterline.lace} fill="none" strokeOpacity="0.8" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 12" />
          </g>
        </g>
      </svg>
      <p aria-hidden="true" className={`${s.mono} ${c.tag}`}>
        <span className={c.tagWave}>Wave 2 · </span>Above the waterline, or below it?
      </p>
    </Panel>
  );
}
