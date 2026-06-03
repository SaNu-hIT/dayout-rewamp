import styles from './Trust.module.css';

const STATS = [
  { value: '50K+', label: 'Happy Travelers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '4+', label: 'Years Experience' },
  { value: '200+', label: 'Curated Escapes' },
];

const BADGES = [
  { icon: '🛡️', text: '100% Secure Booking' },
  { icon: '📋', text: 'Advance Non-Refundable' },
  { icon: '🏆', text: 'Award-Winning Service' },
  { icon: '📞', text: '24/7 Support' },
];

export default function Trust() {
  return (
    <section className={styles.section} aria-label="Trust indicators">
      <div className={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.badges}>
        {BADGES.map((b) => (
          <div key={b.text} className={styles.badge}>
            <span className={styles.badgeIcon}>{b.icon}</span>
            <span className={styles.badgeText}>{b.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
