import c from './chrome.module.css';

/**
 * Fixed meter down the left edge: each mark jumps to its section.
 * `direction="up"` stacks marks bottom-to-top (altitude), "down" top-to-bottom (km).
 */
export default function Meter({ label, marks, direction }) {
  return (
    <nav className={c.meter} aria-label={label}>
      <ol className={`${c.meterList} ${direction === 'up' ? c.up : c.down}`}>
        {marks.map((m, i) => (
          <li key={m.href}>
            <a href={m.href} className={i === 0 ? c.here : undefined}>{m.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
