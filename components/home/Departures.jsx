import { DEPARTURES, whatsappLink } from '@/data/home';
import ui from './ui.module.css';
import styles from './Departures.module.css';

const STATUS = {
  open: { text: 'Open', className: styles.open },
  filling: { text: 'Filling', className: styles.filling },
  last: { text: 'Last seats', className: styles.last },
};

/** 22:00 — fixed-date group departures, styled as a split-flap board. Hidden when there are none. */
export default function Departures({ departures = DEPARTURES }) {
  if (departures.length === 0) return null;
  return (
    <section id="departures" className={`${ui.section} ${styles.section}`} aria-labelledby="departures-title">
      <div className={ui.inner}>
        <div className={styles.head}>
          <div className={ui.headStack}>
            <p className={ui.eyebrowNight}>22:00 — Group departures</p>
            <h2 id="departures-title" className={ui.h2Small}>Dates already set. Seats go fast.</h2>
          </div>
          <a
            href={whatsappLink('Hi DayOut, I want to hold a seat on a group departure.')}
            target="_blank"
            rel="noopener noreferrer"
            className={ui.pillGhost}
          >
            Hold my seat<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        </div>
        <div className={styles.board}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Trip</th>
                <th scope="col">Seats</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {departures.map((d) => {
                const status = STATUS[d.status] ?? STATUS.open;
                return (
                  <tr key={`${d.date}-${d.trip}`}>
                    <td><span className={styles.flap}>{d.date}</span></td>
                    <td><span className={styles.flap}>{d.trip}</span></td>
                    <td><span className={styles.flap}>{d.seats}</span></td>
                    <td><span className={`${styles.flap} ${status.className}`}>{status.text}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
