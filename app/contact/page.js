import { CONTACT, ROUTES } from '@/data/swell';
import { whatsappLink } from '@/lib/waves';
import ChatIcon from '@/components/swell/ChatIcon';
import { SiteFooter, SiteHeader, SiteHero, TEL } from '@/components/site/SiteChrome';
import c from '@/components/site/site.module.css';
import ContactForm from './ContactForm';
import s from './page.module.css';

export const metadata = {
  title: 'Contact Us',
  description:
    'Plan a trip anywhere in India with DayOut Holidays, Kochi. WhatsApp, call, email or send a trip request and a planner will reply.',
  alternates: { canonical: 'https://dayoutholidays.com/contact' },
  openGraph: {
    title: 'Contact DayOut Holidays – Plan your India trip',
    description: 'Reach the DayOut team in Kochi for trip planning, package bookings and enquiries.',
    url: 'https://dayoutholidays.com/contact',
    images: [{ url: '/images/swell/alleppey.jpg', width: 1200, height: 630, alt: 'Houseboat on the Kerala backwaters' }],
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': 'https://dayoutholidays.com',
  name: 'DayOut Holidays',
  description: 'Kochi travel company planning trips across India: Himalayan passes, Rajasthan forts, Goa beaches, Kerala backwaters and the islands.',
  url: 'https://dayoutholidays.com',
  telephone: '+918848965352',
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, Paikayil Plaza, GAIL Road, Near Kalamassery, HMT Colony, North Kalamassery',
    addressLocality: 'Kalamassery',
    addressRegion: 'Kerala',
    postalCode: '683503',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 10.0519, longitude: 76.3119 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '18:00' },
  ],
  priceRange: '₹₹',
  areaServed: { '@type': 'Country', name: 'India' },
  sameAs: [CONTACT.instagram, CONTACT.facebook],
};
// Escape "<" so the JSON can never close the script tag early.
const SCHEMA_JSON = JSON.stringify(LOCAL_BUSINESS_SCHEMA).replace(/</g, '\\u003c');

const HOURS = [
  { days: 'Mon – Sat', time: '9 am – 8 pm' },
  { days: 'Sunday', time: '10 am – 6 pm' },
];

export default function ContactPage() {
  return (
    <div className={c.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_JSON }} />
      <SiteHeader current={ROUTES.contact} />
      <main>
        <SiteHero
          eyebrow="Let’s talk · Kochi office"
          title="Tell us where. We’ll plan the rest."
          lead="Send your dates and who is coming. A planner from our team replies with a plan, usually the same day."
          img="/images/swell/alleppey.jpg"
          alt="Houseboat on palm-lined Kerala backwaters"
          size="short"
        />

        <section className={`${c.section} ${c.deep}`} aria-label="Contact details and trip request">
          <div className={`${c.wrap} ${s.grid}`}>
            <div className={s.info}>
              <p className={`${c.mono} ${c.kicker}`}>Fastest reply</p>
              <h2 className={s.infoTitle}>WhatsApp is quickest.</h2>
              <a
                href={whatsappLink(CONTACT.phone, "Hi DayOut, I'd like to plan a trip.")}
                target="_blank"
                rel="noopener noreferrer"
                className={c.pill}
              >
                <ChatIcon />WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
              </a>

              <dl className={s.details}>
                <div className={s.detail}>
                  <dt className={`${c.mono} ${s.detailLabel}`}>Call</dt>
                  <dd><a href={TEL}>{CONTACT.phone}</a></dd>
                </div>
                <div className={s.detail}>
                  <dt className={`${c.mono} ${s.detailLabel}`}>Email</dt>
                  <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
                </div>
                <div className={s.detail}>
                  <dt className={`${c.mono} ${s.detailLabel}`}>Office</dt>
                  <dd><address>{CONTACT.address}</address></dd>
                </div>
                <div className={s.detail}>
                  <dt className={`${c.mono} ${s.detailLabel}`}>Hours</dt>
                  <dd>
                    <ul className={s.hours}>
                      {HOURS.map((h) => (
                        <li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>

            <div className={s.formCard}>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
