import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about DayOut — Goa\'s premium travel & lifestyle brand dedicated to curating unforgettable beach, nature, and cultural experiences across Goa.',
  alternates: { canonical: 'https://dayoutholidays.com/about' },
  openGraph: {
    title: 'About DayOut – Premium Travel & Lifestyle in Goa',
    description:
      'Meet the team behind DayOut and discover our mission to make every trip to Goa extraordinary.',
    url: 'https://dayoutholidays.com/about',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'About DayOut' }],
  },
};


export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Our Story</div>
          <h1 className={styles.title}>Redefining <span className={styles.accent}>Travel</span></h1>
          <p className={styles.sub}>We believe travel is not just about the destinations, but the memories you create along the way.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.textColumn}>
            <h2 className="section-title">The DayOut Mission</h2>
            <p>
              Founded in 2014, DayOut started with a simple idea: to make extraordinary travel accessible to everyone. We noticed that travelers were often forced to choose between cookie-cutter tour packages or spending countless hours planning trips themselves.
            </p>
            <p>
              Our mission is to bridge that gap. We curate immersive, authentic experiences that connect you with the heart of a destination, all while handling the complex logistics behind the scenes.
            </p>
            
            <h3 className={styles.subtitle}>What We Stand For</h3>
            <ul className={styles.list}>
              <li><strong>Authenticity:</strong> We partner with local experts to give you a genuine taste of the culture.</li>
              <li><strong>Sustainability:</strong> We prioritize eco-friendly practices and support local communities.</li>
              <li><strong>Excellence:</strong> From 24/7 support to premium accommodations, we don't compromise on quality.</li>
            </ul>
          </div>
          
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <Image src="/images/waterfall.jpg" alt="Our team exploring nature" fill className={styles.image} />
            </div>
            <div className={styles.statsBox}>
              <div className={styles.stat}>
                <span className={styles.statNum}>12+</span>
                <span className={styles.statLabel}>Years Active</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>150</span>
                <span className={styles.statLabel}>Local Experts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
