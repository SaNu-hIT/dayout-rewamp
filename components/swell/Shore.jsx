import Image from 'next/image';
import Panel from './Panel';
import WaveGlyph from './WaveGlyph';
import s from './swell.module.css';
import c from './Shore.module.css';

/** Wave 1: the sea from above. */
export default function Shore({ whatsapp }) {
  return (
    <Panel n={1} id="top" label="Wave 1: Shore" bodyClassName={c.body}>
      <Image
        src="/images/swell/topwaves.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className={c.photo}
      />
      <span aria-hidden="true" className={c.scrim} />
      <div className={c.copy}>
        <span className={s.chip}>Wave 1 of 5 · From Kochi, all of India</span>
        <h1 className={c.title}>Catch the next wave.</h1>
        <p className={c.lead}>Kerala to Kashmir, one swell at a time. Every scroll rolls a new page in over the last.</p>
        <div className={c.ctas}>
          <a href="#choose" className={s.pill}>Plan my trip</a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={s.ghost}>
            Talk to us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <p aria-hidden="true" className={`${s.mono} ${c.cue}`}>
        Scroll · wave 2 is coming<WaveGlyph className={c.cueGlyph} />
      </p>
    </Panel>
  );
}
