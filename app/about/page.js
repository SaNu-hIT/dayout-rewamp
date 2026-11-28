import Image from 'next/image';
import Link from 'next/link';
import { HALVES, ROUTES } from '@/data/swell';
import { SiteCta, SiteFooter, SiteHeader, SiteHero } from '@/components/site/SiteChrome';
import c from '@/components/site/site.module.css';
import s from './page.module.css';

export const metadata = {
  title: 'About Us',
  description:
    'DayOut Holidays is a Kochi travel company planning trips across India, from Himalayan passes in the north to beaches and backwaters in the south.',
  alternates: { canonical: 'https://dayoutholidays.com/about' },
  openGraph: {
    title: 'About DayOut Holidays – Trips across India from Kochi',
    description: 'Meet the Kochi team behind DayOut and how we plan trips across North and South India.',
    url: 'https://dayoutholidays.com/about',
    images: [{ url: '/images/swell/kochi.jpg', width: 1200, height: 630, alt: 'Chinese fishing nets at Fort Kochi' }],
  },
};

const VALUES = [
  { n: '01', title: 'Local first', text: 'We work with guides, drivers and hosts who live where you are going, so you see the place as they do.' },
  { n: '02', title: 'Light footprint', text: 'Small groups, local stays and operators who look after the hills, beaches and towns we bring you to.' },
  { n: '03', title: 'One team, start to end', text: 'The person who plans your trip is the person you message on the road. Support runs the whole trip.' },
];

const STATS = [
  { value: '2014', label: 'Founded in Kochi' },
  { value: '12+', label: 'Years planning trips' },
  { value: '150', label: 'Local experts' },
];

export default function AboutPage() {
  return (
    <div className={c.page}>
      <SiteHeader current={ROUTES.about} />
      <main>
        <SiteHero
          eyebrow="Our story · Kochi since 2014"
          title="Trips across India, planned by people who go."
          lead="Travel is not only the place on the ticket. It is the day you remember afterwards. We plan those days."
          img="/images/swell/kochi.jpg"
          alt="Chinese fishing nets at Fort Kochi at dusk"
        />

        <section className={`${c.section} ${c.sand}`} aria-labelledby="mission-title">
          <div className={`${c.wrap} ${s.mission}`}>
            <div className={s.missionCopy}>
              <p className={`${c.mono} ${c.kicker}`}>The DayOut mission</p>
              <h2 id="mission-title" className={c.h2}>Between the package tour and planning it all yourself.</h2>
              <p className={c.lead}>
                DayOut started in 2014 with one idea: good travel should be easy to reach. Travellers kept choosing between
                cookie-cutter packages and hours of planning on their own.
              </p>
              <p className={c.lead}>
                We close that gap. We plan real, local trips and handle the stays, transfers and permits behind the scenes,
                so you only have to show up.
              </p>
            </div>
            <figure className={s.missionFig}>
              <div className={s.missionImg}>
                <Image src="/images/waterfall.jpg" alt="Palm trees leaning over a curved beach in South Goa" fill sizes="(max-width: 900px) 100vw, 40vw" />
              </div>
              <dl className={s.stats}>
                {STATS.map((st) => (
                  <div key={st.label} className={s.stat}>
                    <dt className={`${c.mono} ${s.statLabel}`}>{st.label}</dt>
                    <dd className={s.statValue}>{st.value}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          </div>
        </section>

        <section className={`${c.section} ${c.deep}`} aria-labelledby="values-title">
          <div className={c.wrap}>
            <p className={`${c.mono} ${c.kicker}`}>What we stand for</p>
            <h2 id="values-title" className={c.h2}>Three rules for every trip.</h2>
            <ul className={s.values}>
              {VALUES.map((v) => (
                <li key={v.n} className={s.value}>
                  <span className={`${c.mono} ${s.valueN}`}>{v.n}</span>
                  <h3 className={s.valueTitle}>{v.title}</h3>
                  <p className={s.valueText}>{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${c.section} ${c.postcard}`} aria-labelledby="where-title">
          <div className={c.wrap}>
            <p className={`${c.mono} ${c.kicker}`}>Where we go</p>
            <h2 id="where-title" className={c.h2}>Pick a half of the map.</h2>
            <ul className={s.halves}>
              {HALVES.map((h) => (
                <li key={h.key} className={s.half}>
                  <Image src={h.img} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className={s.halfImg} />
                  <span aria-hidden="true" className={s.halfScrim} />
                  <div className={s.halfText}>
                    <p className={`${c.mono} ${s.halfCoord}`}>{h.coord}</p>
                    <h3 className={s.halfTitle}>{h.key === 'north' ? 'North India' : 'South India'}</h3>
                    <p className={s.halfPlaces}>{h.places}</p>
                    <Link href={h.href} className={`${c.pill} ${s.halfLink}`} aria-label={h.aria}>{h.cta}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SiteCta
          title="Tell us where. We’ll plan the rest."
          lead="Send one message with your dates and who is coming. A planner from our Kochi team replies with a plan."
          message="Hi DayOut, I read about you and I'd like to plan a trip."
          links={[{ href: ROUTES.contact, label: 'Send an enquiry' }]}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
