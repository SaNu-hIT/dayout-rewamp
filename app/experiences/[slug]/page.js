import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EXPERIENCES } from '@/data/experiences';
import { CONTACT, ROUTES } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import ChatIcon from '@/components/swell/ChatIcon';
import { SiteCta, SiteFooter, SiteHeader, SiteHero } from '@/components/site/SiteChrome';
import c from '@/components/site/site.module.css';
import s from './page.module.css';

const BASE_URL = 'https://dayoutholidays.com';

export async function generateStaticParams() {
  return EXPERIENCES.map((exp) => ({ slug: exp.slug }));
}

const findExperience = async (params) => {
  const { slug } = await params;
  return EXPERIENCES.find((e) => e.slug === slug);
};

export async function generateMetadata({ params }) {
  const exp = await findExperience(params);
  if (!exp) return { title: 'Package not found' };

  const title = `${exp.title} – Goa`;
  return {
    title,
    description: exp.desc,
    alternates: { canonical: `${BASE_URL}/experiences/${exp.slug}` },
    openGraph: {
      title,
      description: exp.desc,
      url: `${BASE_URL}/experiences/${exp.slug}`,
      type: 'article',
      images: [{ url: exp.img, width: 1200, height: 630, alt: exp.alt }],
    },
    twitter: { card: 'summary_large_image', title, description: exp.desc, images: [exp.img] },
  };
}

export default async function ExperienceDetail({ params }) {
  const exp = await findExperience(params);
  if (!exp) notFound();

  // Same kind of trip first, then the rest, three in all.
  const others = EXPERIENCES.filter((e) => e.slug !== exp.slug);
  const more = [...others.filter((e) => e.type === exp.type), ...others.filter((e) => e.type !== exp.type)].slice(0, 3);
  const url = `${BASE_URL}/experiences/${exp.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'South India', item: `${BASE_URL}${ROUTES.south}` },
      { '@type': 'ListItem', position: 3, name: exp.title, item: url },
    ],
  };
  // Escape "<" so the JSON can never close the script tag early.
  const schemaJson = JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c');

  const enquire = whatsappLink(CONTACT.phone, `Hi DayOut, I'm interested in the ${exp.title} (${exp.duration}, ${exp.price}/${exp.unit}).`);
  const share = `https://wa.me/?text=${encodeURIComponent(`${exp.title} with DayOut Holidays: ${url}`)}`;

  return (
    <div className={c.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <SiteHeader />
      <main>
        <SiteHero eyebrow={`${exp.badge} · ${exp.location}`} title={exp.title} lead={exp.desc} img={exp.img} alt={exp.alt} size="short">
          <nav aria-label="Breadcrumb" className={s.crumbs}>
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href={ROUTES.south}>South India</Link></li>
              <li aria-current="page">{exp.title}</li>
            </ol>
          </nav>
        </SiteHero>

        <section className={`${c.section} ${c.postcard}`} aria-label="Package details">
          <div className={`${c.wrap} ${s.layout}`}>
            <div className={s.main}>
              <div className={s.block}>
                <p className={`${c.mono} ${c.kicker}`}>Day by day</p>
                <h2 className={s.h2}>Itinerary</h2>
                <ol className={s.days}>
                  {exp.itinerary.map((day) => (
                    <li key={day.time} className={s.day}>
                      <span className={`${c.mono} ${s.dayLabel}`}>{day.time}</span>
                      <p>{day.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={s.block}>
                <p className={`${c.mono} ${c.kicker}`}>In the price</p>
                <h2 className={s.h2}>What’s included</h2>
                <ul className={s.included}>
                  {exp.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <a href={share} target="_blank" rel="noopener noreferrer" className={s.share}>
                Share this package on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <aside className={s.card} aria-label="Price and booking">
              <p className={`${c.mono} ${s.cardLabel}`}>From</p>
              <p className={s.price}>{exp.price}<span className={s.unit}> / {exp.unit}</span></p>
              <dl className={s.facts}>
                <div><dt className={c.mono}>Duration</dt><dd>{exp.duration}</dd></div>
                <div><dt className={c.mono}>Where</dt><dd>{exp.location}</dd></div>
              </dl>
              <a href={enquire} target="_blank" rel="noopener noreferrer" className={`${c.pill} ${c.pillDark} ${s.cardCta}`}>
                <ChatIcon />Enquire on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link href={ROUTES.contact} className={s.cardLink}>Or send a trip request</Link>
              <p className={s.note}>Advance payments are non-refundable.</p>
            </aside>
          </div>
        </section>

        {more.length > 0 && (
          <section className={`${c.section} ${c.sand}`} aria-labelledby="more-title">
            <div className={c.wrap}>
              <p className={`${c.mono} ${c.kicker}`}>Also in Goa</p>
              <h2 id="more-title" className={c.h2}>More Goa packages</h2>
              <ul className={s.more}>
                {more.map((m) => (
                  <li key={m.slug} className={s.moreCard}>
                    <div className={s.moreImg}>
                      <Image src={m.img} alt={m.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                    </div>
                    <div className={s.moreText}>
                      <p className={`${c.mono} ${s.moreKicker}`}>{m.badge} · {m.duration}</p>
                      <h3 className={s.moreTitle}>
                        <Link href={ROUTES.experience(m.slug)} className={s.moreLink}>{m.title}</Link>
                      </h3>
                      <p className={s.morePrice}>{m.price} / {m.unit}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <SiteCta
          eyebrow="Goa · one message"
          title="Want it changed? Just ask."
          lead="Dates, hotels and activities can all move. Tell us what you want and we will shape the package around it."
          message={`Hi DayOut, I'd like a custom version of the ${exp.title}.`}
          links={[{ href: ROUTES.south, label: 'See all of South India' }]}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
