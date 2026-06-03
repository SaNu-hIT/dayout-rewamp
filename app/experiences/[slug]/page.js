import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EXPERIENCES } from '@/data/experiences';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const BASE_URL = 'https://dayoutholidays.com';

export async function generateStaticParams() {
  return EXPERIENCES.map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const exp = EXPERIENCES.find((e) => e.slug === resolvedParams.slug);
  if (!exp) return { title: 'Experience Not Found' };

  return {
    title: exp.title,
    description: exp.desc,
    alternates: { canonical: `${BASE_URL}/experiences/${exp.slug}` },
    openGraph: {
      title: `${exp.title} | DayOut Goa`,
      description: exp.desc,
      url: `${BASE_URL}/experiences/${exp.slug}`,
      type: 'article',
      images: exp.img
        ? [{ url: exp.img, width: 1200, height: 630, alt: exp.title }]
        : [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: exp.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${exp.title} | DayOut Goa`,
      description: exp.desc,
      images: exp.img ? [exp.img] : ['/images/hero-bg.jpg'],
    },
  };
}

export default async function ExperienceDetail({ params }) {
  const resolvedParams = await params;
  const exp = EXPERIENCES.find((e) => e.slug === resolvedParams.slug);

  if (!exp) notFound();

  const related = EXPERIENCES.filter((e) => e.slug !== exp.slug && e.type === exp.type).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : EXPERIENCES.filter((e) => e.slug !== exp.slug).slice(0, 3);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Experiences', item: `${BASE_URL}/#experiences` },
      { '@type': 'ListItem', position: 3, name: exp.title, item: `${BASE_URL}/experiences/${exp.slug}` },
    ],
  };

  const waShareText = encodeURIComponent(`Check out ${exp.title} on DayOut Holidays! ${BASE_URL}/experiences/${exp.slug}`);

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}} />
      <Navbar />

      {/* Breadcrumb nav */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/#experiences">Experiences</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{exp.title}</span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src={exp.img} alt={exp.alt} fill priority className={styles.bgImg} />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>{exp.badge}</div>
          <h1 className={styles.title}>{exp.title}</h1>
          <p className={styles.location}>📍 {exp.location}</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.grid}>

          <div className={styles.mainColumn}>
            <div className={styles.block}>
              <h2>Overview</h2>
              <p className={styles.desc}>{exp.desc}</p>
            </div>

            <div className={styles.block}>
              <h2>Itinerary</h2>
              <ul className={styles.itinerary}>
                {exp.itinerary.map((item, idx) => (
                  <li key={idx} className={styles.itineraryItem}>
                    <div className={styles.time}>{item.time}</div>
                    <div className={styles.itDesc}>{item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <h2>What&apos;s Included</h2>
              <ul className={styles.included}>
                {exp.included.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>

            {/* Share */}
            <div className={styles.shareRow}>
              <span>Share this package:</span>
              <a
                href={`https://wa.me/?text=${waShareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                aria-label="Share on WhatsApp"
              >
                📱 Share on WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.sideColumn}>
            <div className={styles.bookingCard}>
              <div className={styles.priceRow}>
                <span className={styles.price}>{exp.price}</span>
                <span className={styles.unit}>/ {exp.unit}</span>
              </div>
              <div className={styles.duration}>⏱ {exp.duration}</div>
              {exp.slotsLeft <= 5 && (
                <div className={styles.slotsWarning}>🔥 Only {exp.slotsLeft} slots left!</div>
              )}
              <Link href={`/contact?exp=${exp.slug}`} className={styles.bookBtn}>
                Book This Experience
              </Link>
              <a
                href={`https://wa.me/918848965352?text=Hi DayOut, I'm interested in the ${exp.title} package!`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waBtn}
              >
                💬 WhatsApp Us
              </a>
              <p className={styles.guarantee}>
                🔒 Secure booking • Advance payment is non-refundable.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Related Experiences */}
      {fallbackRelated.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>You Might Also Like</h2>
          <div className={styles.relatedGrid}>
            {fallbackRelated.map((r) => (
              <Link key={r.slug} href={`/experiences/${r.slug}`} className={styles.relatedCard} prefetch={true}>
                <div className={styles.relatedImg}>
                  <Image src={r.img} alt={r.alt} fill sizes="33vw" className={styles.relatedImgInner} />
                  <span className={styles.relatedBadge}>{r.badge}</span>
                </div>
                <div className={styles.relatedBody}>
                  <h3>{r.title}</h3>
                  <span className={styles.relatedPrice}>{r.price} / {r.unit}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
