'use client';
import { useEffect, useState } from 'react';
import { formatClock, goaMinutes, heroLabel } from '@/lib/day';

/** Current Goa minute, starting from the server value so hydration matches. */
export function useGoaMinutes(initialMin) {
  const [min, setMin] = useState(initialMin);
  useEffect(() => {
    const tick = () => setMin(goaMinutes(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return min;
}

/** "07:10 · Morning in Goa" or, with variant="time", "07:10". */
export default function GoaClock({ initialMin, variant = 'label' }) {
  const min = useGoaMinutes(initialMin);
  const time = formatClock(min);
  return <time dateTime={time}>{variant === 'time' ? time : `${time} · ${heroLabel(min)}`}</time>;
}
