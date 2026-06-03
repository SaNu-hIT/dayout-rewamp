import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with DayOut. Plan your perfect Goa trip, enquire about our premium travel experiences, or simply say hello.',
  alternates: { canonical: 'https://dayoutholidays.com/contact' },
  openGraph: {
    title: 'Contact DayOut – Plan Your Goa Trip',
    description:
      'Reach out to DayOut for personalised travel planning, experience bookings, and enquiries.',
    url: 'https://dayoutholidays.com/contact',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'Contact DayOut' }],
  },
};


const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://dayoutholidays.com',
  name: 'DayOut Holidays',
  description: 'Premium Goa travel packages — beaches, waterfalls, adventures, and festivals.',
  url: 'https://dayoutholidays.com',
  telephone: '+918848965352',
  email: 'dayoutholidays@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, Paikayil Plaza, GAIL Road, Near Kalamassery, HMT Colony, North Kalamassery',
    addressLocality: 'Kalamassery',
    addressRegion: 'Kerala',
    postalCode: '683503',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.0519,
    longitude: 76.3119,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '18:00' },
  ],
  priceRange: '₹₹',
  areaServed: 'Goa, India',
  sameAs: [
    'https://www.instagram.com/dayout_holidays/',
    'https://www.facebook.com/p/Dayout-Holidays-100087241266220/',
  ],
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(LOCAL_BUSINESS_SCHEMA)}} />
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Let's Talk</div>
          <h1 className={styles.title}>Plan Your <span className={styles.accent}>Dream Trip</span></h1>
          <p className={styles.sub}>Tell us where you want to go, and our travel experts will craft the perfect itinerary for you.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-sub" style={{ marginBottom: '32px' }}>
              Whether you have a specific destination in mind or need inspiration, we're here to help make your dream vacation a reality.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <h4>Headquarters</h4>
                  <p>1st Floor, Paikayil Plaza, GAIL Road, Near Kalamassery, HMT Colony, North Kalamassery, Kalamassery, Ernakulam, Kochi, Kerala 683503</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 8848965352</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>✉️</div>
                <div>
                  <h4>Email Us</h4>
                  <p>dayoutholidays@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
