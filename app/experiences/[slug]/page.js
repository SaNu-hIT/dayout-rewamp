import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EXPERIENCES } from '@/data/experiences';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const exp = EXPERIENCES.find((e) => e.slug === resolvedParams.slug);
  if (!exp) return { title: 'Experience Not Found' };
  
  return {
    title: `${exp.title} | DayOut Goa`,
    description: exp.desc,
  };
}

export default async function ExperienceDetail({ params }) {
  const resolvedParams = await params;
  const exp = EXPERIENCES.find((e) => e.slug === resolvedParams.slug);
  
  if (!exp) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <Navbar />
      
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
              <h2>What's Included</h2>
              <ul className={styles.included}>
                {exp.included.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={styles.sideColumn}>
            <div className={styles.bookingCard}>
              <div className={styles.priceRow}>
                <span className={styles.price}>{exp.price}</span>
                <span className={styles.unit}>/ {exp.unit}</span>
              </div>
              <div className={styles.duration}>⏱ {exp.duration}</div>
              
              <Link href={`/contact?exp=${exp.slug}`} className={styles.bookBtn}>
                Book This Experience
              </Link>
              
              <p className={styles.guarantee}>
                🔒 Secure booking • Free cancellation up to 48 hours before.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </main>
  );
}
