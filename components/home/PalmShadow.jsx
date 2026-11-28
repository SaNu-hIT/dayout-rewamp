import { frondPath } from '@/lib/day';
import styles from './PalmShadow.module.css';

const FROND = frondPath();

/** Frond placements per section, in the 1000×800 shadow box. */
const LAYOUTS = {
  right: [
    { transform: 'translate(1000 -20) rotate(155) scale(1.45)', delay: '0s' },
    { transform: 'translate(1000 160) rotate(185) scale(1.1)', delay: '-3s' },
  ],
  left: [
    { transform: 'translate(1000 -40) rotate(130) scale(1.35)', delay: '-1.5s' },
    { transform: 'translate(1000 80) rotate(165) scale(1.3)', delay: '-4s' },
  ],
  golden: [
    { transform: 'translate(1000 -30) rotate(150) scale(1.5)', delay: '-2s' },
    { transform: 'translate(940 -80) rotate(118) scale(1.15)', delay: '-5s' },
  ],
};

/**
 * Blurred palm-frond shadow over a day section. Decorative.
 * The sway animates a wrapping <g>, so the blur filter is not re-rasterised per frame
 * on the path itself.
 */
export default function PalmShadow({ layout = 'right', strength = 'normal' }) {
  const fronds = LAYOUTS[layout];
  return (
    <div className={`${styles.palm} ${styles[strength]}`} aria-hidden="true">
      <svg viewBox="0 0 1000 800" className={layout === 'left' ? styles.flipped : styles.svg}>
        {fronds.map((f) => (
          <g key={f.transform} transform={f.transform}>
            <g className={styles.sway} style={{ animationDelay: f.delay }}>
              <path d={FROND} className={styles.frond} />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
