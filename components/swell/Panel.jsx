import s from './swell.module.css';

/**
 * One wave of the stack. Waves 2–5 get a rolling foam crest along the top,
 * and their body is masked to the same wave shape.
 */
export default function Panel({ n, id, label, foam, bodyClassName = '', children }) {
  const crested = n > 1;
  return (
    <section id={id} aria-label={label} className={`${s.panel} ${s[`p${n}`]}`}>
      {crested && <Crest foam={foam} />}
      <div className={`${s.body} ${crested ? s.crested : ''} ${bodyClassName}`}>{children}</div>
    </section>
  );
}

function Crest({ foam }) {
  return (
    <div className={s.crest} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" focusable="false">
        <g className={s.roll} style={{ stroke: foam.color }}>
          <path d={foam.line} fill="none" strokeWidth="6" strokeLinecap="round" />
          <path d={foam.lace} fill="none" strokeOpacity="0.8" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 12" />
        </g>
      </svg>
    </div>
  );
}
