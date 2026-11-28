import { EXPERIENCES } from '@/data/experiences';
import { MOODS, PASS_META, whatsappLink } from '@/data/home';
import MoodPicker from './MoodPicker';
import PalmShadow from './PalmShadow';
import ui from './ui.module.css';
import styles from './GoldenHour.module.css';

const MOOD_NAMES = Object.fromEntries(MOODS.map((m) => [m.id, m.name]));

/** Joins package data with its pass copy. Packages without pass copy are left out. */
function buildPasses() {
  return EXPERIENCES.filter((e) => PASS_META[e.slug]).map((e) => {
    const meta = PASS_META[e.slug];
    return {
      slug: e.slug,
      title: e.title,
      blurb: meta.blurb,
      mood: meta.mood,
      moodName: MOOD_NAMES[meta.mood],
      who: meta.who,
      duration: e.duration,
      price: e.price,
      unit: e.unit,
      enquireHref: whatsappLink(`Hi DayOut, I'd like to know more about the ${e.title}.`),
    };
  });
}

/** 17:30 — golden hour. Packages as boarding passes, filtered by mood. */
export default function GoldenHour() {
  return (
    <section id="packages" className={`${ui.section} ${styles.section}`} aria-labelledby="packages-title">
      <PalmShadow layout="golden" />
      <div className={`${ui.inner} ${styles.inner}`}>
        <MoodPicker moods={MOODS} passes={buildPasses()}>
          <div className={ui.headStack}>
            <p className={`${ui.mono} ${styles.eyebrow}`}>17:30 — Golden hour</p>
            <h2 id="packages-title" className={ui.h2}>Pick your pace.</h2>
            <p className={styles.lead}>The sun turns at the speed of your trip. Choose a mood, get your pass.</p>
          </div>
        </MoodPicker>
      </div>
    </section>
  );
}
