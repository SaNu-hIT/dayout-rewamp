import Image from 'next/image';
import Link from 'next/link';
import { REGION_LABEL } from '@/data/notes';
import { CONTACT, ROUTES } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import s from './notes.module.css';

const notesFor = (region) => `${ROUTES.notes}?region=${region}`;

/**
 * One field note. Server component: every string comes from data/notes.js and is
 * rendered as text (no HTML injection).
 */
export default function NoteArticle({ note, trip, prev, next, more }) {
  const region = REGION_LABEL[note.region];
  return (
    <>
      <article aria-labelledby="note-title">
        <header className={s.noteHero}>
          <Image src={note.img} alt={note.alt} fill preload sizes="100vw" className={s.noteHeroImg} />
          <span aria-hidden="true" className={s.noteScrim} />
          <span aria-hidden="true" className={`${s.stamp} ${s.noteStamp}`} style={{ '--rot': '-10deg' }}>
            {note.place}<span>{note.coord}</span>{note.height && <span>{note.height}</span>}
          </span>
          <div className={`${s.wrap} ${s.noteHeroInner}`}>
            <nav aria-label="Breadcrumb">
              <ol className={`${s.mono} ${s.crumbs}`}>
                <li><Link href={ROUTES.notes}>Field notes</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={notesFor(note.region)}>{region}</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{note.place}</li>
              </ol>
            </nav>
            <h1 id="note-title" className={s.noteTitle}>{note.title}</h1>
            <p className={s.noteDek}>{note.dek}</p>
            <p className={`${s.mono} ${s.noteMeta}`}>
              {note.meta} · [Author] · [Date]{note.sample && <> · <span className={s.sampleTag}>Sample</span></>}
            </p>
          </div>
        </header>

        <div className={`${s.wrap} ${s.body}`}>
          <div className={s.layout}>
            <div>
              {note.sample && (
                <p className={`${s.mono} ${s.sampleNote}`}>Sample copy · layout only. DayOut replaces this with the real note.</p>
              )}
              <div className={s.prose}>
                {note.body.map((b, i) => <Block key={i} block={b} />)}
              </div>

              <div className={s.tags}>
                <span className={`${s.mono} ${s.tagsLabel}`}>Filed under</span>
                <Link href={notesFor(note.region)} className={`${s.mono} ${s.tag}`}>{region}</Link>
                {note.tags.map((t) => <span key={t} className={`${s.mono} ${s.tag}`}>{t}</span>)}
              </div>

              {(prev || next) && (
                <nav aria-label="More notes" className={s.pager}>
                  {prev && (
                    <Link href={`${ROUTES.notes}/${prev.slug}`} className={s.pagerLink}>
                      <span className={`${s.mono} ${s.pagerLabel}`}>← Previous note</span>
                      <span className={s.pagerTitle}>{prev.title}</span>
                    </Link>
                  )}
                  {next && (
                    <Link href={`${ROUTES.notes}/${next.slug}`} className={`${s.pagerLink} ${s.pagerNext}`}>
                      <span className={`${s.mono} ${s.pagerLabel}`}>Next note →</span>
                      <span className={s.pagerTitle}>{next.title}</span>
                    </Link>
                  )}
                </nav>
              )}
            </div>

            <aside className={s.aside} aria-labelledby="facts-title">
              <div className={s.facts}>
                <h2 id="facts-title" className={`${s.mono} ${s.factsTitle}`}>Trip facts</h2>
                <dl className={s.factsList}>
                  {note.facts.map((f) => (
                    <div key={f.label}>
                      <dt className={s.mono}>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <TripCard note={note} trip={trip} />
            </aside>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className={s.more} aria-labelledby="more-title">
          <div className={`${s.wrap} ${s.moreInner}`}>
            <div className={s.moreHead}>
              <h2 id="more-title" className={s.moreTitle}>More from the road.</h2>
              <Link href={ROUTES.notes} className={`${s.ghost} ${s.paperGhost}`}>All field notes →</Link>
            </div>
            <ul className={s.grid}>
              {more.map((n) => (
                <li key={n.slug}>
                  <article className={s.moreCard}>
                    <div className={s.moreImg}>
                      <Image src={n.img} alt={n.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 420px" />
                    </div>
                    <div className={s.moreText}>
                      <p className={`${s.mono} ${s.moreKicker}`}>{REGION_LABEL[n.region]} · {n.place}{n.sample && ' · Sample'}</p>
                      <h3 className={s.moreCardTitle}>
                        <Link href={`${ROUTES.notes}/${n.slug}`} className={s.cardLink}>{n.title}</Link>
                      </h3>
                      <p className={`${s.mono} ${s.moreKicker}`}>{n.meta}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'ul':
      return <ul>{block.items.map((t) => <li key={t}>{t}</li>)}</ul>;
    case 'figure':
      return (
        <figure className={s.figure}>
          <div className={s.figureImg}>
            <Image src={block.img} alt={block.alt} fill sizes="(max-width: 760px) 100vw, 680px" />
          </div>
          <figcaption className={`${s.mono} ${s.caption}`}>{block.caption}</figcaption>
        </figure>
      );
    case 'p':
      return <p>{block.text}</p>;
    default:
      throw new Error(`unknown note block type: ${block.type}`);
  }
}

/** The package from this note, or a general "plan a trip here" card when no package fits. */
function TripCard({ note, trip }) {
  const name = trip ? trip.name : `Plan a trip to ${note.place}`;
  const message = trip
    ? `Hi DayOut, I'd like to enquire about the ${trip.name}.`
    : `Hi DayOut, I read your note on ${note.place} and would like to plan a trip.`;
  return (
    <div className={s.trip}>
      <p className={`${s.mono} ${s.tripKicker}`}>
        {trip ? 'The trip from this note' : 'Plan this one'}{(trip?.sample ?? note.sample) && ' · Sample'}
      </p>
      <p className={s.tripName}>{name}</p>
      <p className={s.tripDesc}>
        {trip ? trip.desc : 'Tell us your dates and group size. Our Kochi team sends a plan built around this note.'}
      </p>
      {trip && <p className={`${s.mono} ${s.tripPrice}`}>{trip.dur} · {trip.price} per person</p>}
      <a href={whatsappLink(CONTACT.phone, message)} target="_blank" rel="noopener noreferrer" className={`${s.pill} ${s.pillDark}`}>
        Enquire on WhatsApp<span className="sr-only"> about {trip ? `the ${trip.name}` : `a trip to ${note.place}`} (opens in a new tab)</span>
      </a>
    </div>
  );
}
