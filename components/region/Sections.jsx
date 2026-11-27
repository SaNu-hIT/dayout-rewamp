import Image from 'next/image';
import Link from 'next/link';
import { REVIEWS, STATS } from '@/data/region';
import { ROUTES } from '@/data/swell';
import r from './region.module.css';

/** Two-by-two figures (travellers, rating, escapes, support). */
export function Stats() {
  return (
    <ul className={r.stats}>
      {STATS.map((s) => (
        <li key={s.label}>
          <p className={r.statValue}>{s.value}{s.unit && <span className={r.statUnit}>{s.unit}</span>}</p>
          <p className={r.label}>{s.label}</p>
        </li>
      ))}
    </ul>
  );
}

/** "Everything handled" timeline. `marker` is a mountain peak (North) or a dot (South). */
export function Camp({ items, marker }) {
  return (
    <ol className={r.camp}>
      {items.map((it) => (
        <li key={it.t} className={r.campItem}>
          <span className={r.campWhen}>{it.t}</span>
          <span className={r.campTrack} aria-hidden="true">
            {marker === 'peak' ? (
              <svg className={r.campPeak} width="16" height="14" viewBox="0 0 16 14">
                <path d="M8 1L15 13H1Z" style={{ fill: 'var(--yellow)' }} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            ) : <span className={r.campDot} />}
          </span>
          <span className={r.campText}>
            <span className={r.campTitle}>{it.title}</span>
            <span className={r.campDesc}>{it.desc}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Three blog cards with passport stamps. Posts are samples until the client's writers publish. */
export function FieldNotes({ id = 'notes', eyebrow, notes, theme }) {
  return (
    <section id={id} className={`${r.section} ${theme}`} aria-labelledby={`${id}-title`}>
      <div className={r.wrap}>
        <div className={r.head}>
          <div className={r.headCopy}>
            <p className={r.eyebrow}>{eyebrow}</p>
            <h2 id={`${id}-title`} className={r.h2}>Written on the road.</h2>
          </div>
          <Link href={ROUTES.notes} className={r.ghost}>All field notes →</Link>
        </div>
        <div className={r.notes}>
          {notes.map((n, i) => (
            <article key={n.slug} className={`${r.note} ${r.tilt} ${i === 0 ? r.noteFeature : ''}`}>
              <Image src={n.img} alt={n.alt} fill sizes={i === 0 ? '(max-width: 900px) 100vw, 700px' : '(max-width: 900px) 100vw, 500px'} className={r.cardImg} />
              <span className={r.noteScrim} aria-hidden="true" />
              <span className={r.noteStamp} style={{ '--rot': n.rot }} aria-hidden="true">{n.place}<br />{n.coord}</span>
              <div className={r.noteBody}>
                <p className={r.noteKicker}>Field notes · {n.place}{n.sample ? ' · Sample' : ''}</p>
                <h3 className={r.noteTitle}><Link href={`${ROUTES.notes}/${n.slug}`}>{n.title}</Link></h3>
                <p className={r.noteMeta}>{n.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Traveller reviews laid out as a chat thread. */
export function Stories({ eyebrow, theme }) {
  return (
    <section id="stories" className={`${r.section} ${r.ruled} ${theme}`} aria-labelledby="stories-title">
      <div className={`${r.wrap} ${r.stories}`}>
        <div className={r.storiesHead}>
          <p className={r.eyebrow}>{eyebrow}</p>
          <h2 id="stories-title" className={r.h2}>50,000 travellers. Our inbox remembers.</h2>
          <p className={r.rating}><span className={r.stars} aria-hidden="true">★★★★★</span>Rated 4.9 out of 5 by our travellers</p>
        </div>
        <ul className={r.chat}>
          {REVIEWS.map((rv) => (
            <li key={rv.name}>
              <figure className={r.bubble}>
                <figcaption>{rv.name}</figcaption>
                <blockquote>{rv.quote}</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** FAQ as a native exclusive accordion: one answer open at a time, no JS. */
export function Faq({ eyebrow, items, group, theme }) {
  return (
    <section id="faq" className={`${r.section} ${r.ruled} ${theme}`} aria-labelledby="faq-title">
      <div className={r.narrow}>
        <div className={`${r.headCopy} ${r.faqHead}`}>
          <p className={r.eyebrow}>{eyebrow}</p>
          <h2 id="faq-title" className={r.h2s}>Before you pack.</h2>
        </div>
        <div className={r.faqList}>
          {items.map((f, i) => (
            <details key={f.q} name={group} className={r.faqItem} open={i === 0}>
              <summary>{f.q}<span className={r.faqSign} aria-hidden="true" /></summary>
              <p className={r.faqAnswer}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
