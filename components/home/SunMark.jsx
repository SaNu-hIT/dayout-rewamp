import { sunRaysPath } from '@/lib/day';
import ui from './ui.module.css';

const RAYS = sunRaysPath();

/**
 * The sun that stands in for the "O" in DayOut. Decorative only.
 * `spin` adds the slow ray rotation; speed is set through the --spin CSS variable.
 */
export default function SunMark({ className, spin = false, rayWidth = 6, ringWidth = 10 }) {
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden="true" focusable="false">
      <g className={spin ? ui.spin : undefined}>
        <path d={RAYS} stroke="currentColor" strokeWidth={rayWidth} strokeLinecap="round" />
      </g>
      <circle r="21" fill="none" stroke="currentColor" strokeWidth={ringWidth} />
    </svg>
  );
}
