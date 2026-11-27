'use client';
import { useEffect, useState } from 'react';
import { currentStopIndex } from '@/lib/day';
import { useGoaMinutes } from './GoaClock';
import styles from './DayRail.module.css';

/**
 * Fixed clock down the left edge. Highlights the section in view and marks
 * the stop that matches the current time in Goa.
 */
export default function DayRail({ stops, initialMin }) {
  const min = useGoaMinutes(initialMin);
  const nowIndex = currentStopIndex(min, stops.map((s) => s.t));
  const [inView, setInView] = useState(stops[0]?.id);

  useEffect(() => {
    const sections = stops.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (sections.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setInView(hit.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stops]);

  return (
    <nav className={styles.rail} aria-label="Time of day">
      <ol>
        {stops.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`${styles.stop} ${s.id === inView ? styles.active : ''}`}
              aria-current={s.id === inView ? 'location' : undefined}
            >
              <span className={`${styles.dot} ${i === nowIndex ? styles.dotNow : ''}`} aria-hidden="true" />
              <span>{s.t}</span>
              <span className="sr-only"> {s.label}</span>
              {i === nowIndex && <span className={styles.now}>now</span>}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
