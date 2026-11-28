import Image from 'next/image';
import Link from 'next/link';
import { NOTES, ROUTES } from '@/data/swell';
import { sparks } from '@/lib/waves';
import Panel from './Panel';
import s from './swell.module.css';
import c from './Glow.module.css';

const SPARKS = sparks(46);

/** Wave 4: night sea with bioluminescence. Field notes (blog). */
export default function Glow({ foam }) {
  const [feature, ...more] = NOTES;
  return (
    <Panel n={4} id="glow" label="Wave 4: Field notes" foam={foam} bodyClassName={c.body}>
      {SPARKS.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={c.spark}
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, animationDelay: `${d.delay}s` }}
        />
      ))}
      <div className={c.inner}>
        <p className={`${s.mono} ${c.eyebrow}`}>Wave 4 · Field notes</p>
        <h2 className={`${s.h2} ${c.title}`}>Stories that glow after dark.</h2>
        <div className={c.notes}>
          <Link href={`${ROUTES.notes}/${feature.slug}`} className={c.feat}>
            <Image src={feature.img} alt={feature.alt} fill sizes="(max-width: 900px) 100vw, 700px" className={c.photo} />
            <span aria-hidden="true" className={c.scrim} />
            <span className={c.featText}>
              <span className={`${s.mono} ${c.kicker}`}>
                {feature.place} · {feature.coord}{feature.sample && ' · Sample'}
              </span>
              <span className={c.featTitle}>{feature.title}</span>
              <span className={c.metaText}>{feature.meta}</span>
            </span>
          </Link>
          <div className={c.list}>
            {more.map((n) => (
              <Link key={n.slug} href={`${ROUTES.notes}/${n.slug}`} className={c.item}>
                <Image src={n.img} alt={n.alt} width={132} height={120} sizes="132px" className={c.thumb} />
                <span className={c.itemText}>
                  <span className={`${s.mono} ${c.kicker}`}>{n.place}{n.sample && ' · Sample'}</span>
                  <span className={c.itemTitle}>{n.title}</span>
                  <span className={c.metaText}>{n.meta}</span>
                </span>
              </Link>
            ))}
            <Link href={ROUTES.notes} className={`${s.ghost} ${c.all}`}>All field notes →</Link>
          </div>
        </div>
      </div>
    </Panel>
  );
}
