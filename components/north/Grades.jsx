'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GRADES, PASSES } from '@/data/north';
import { CONTACT } from '@/data/swell';
import { profilePath } from '@/lib/region';
import { whatsappLink } from '@/lib/waves';
import { sunRaysPath } from '@/lib/day';
import r from '@/components/region/region.module.css';
import n from './north.module.css';

const RAYS = sunRaysPath();
const PROFILES = Object.fromEntries(GRADES.map((g) => [g.id, profilePath(g.top)]));

/** Packages as trail passes. Picking a grade filters the passes and steepens the profile. */
export default function Grades() {
  const [grade, setGrade] = useState('all');
  const current = GRADES.find((g) => g.id === grade) ?? GRADES[0];
  const profile = PROFILES[current.id];
  const passes = current.id === 'all' ? PASSES : PASSES.filter((p) => p.grade === current.id);

  return (
    <section id="grades" className={`${r.section} ${r.sun}`} aria-labelledby="grades-title">
      <div className={r.wrap}>
        <div className={r.head}>
          <div className={r.headCopy}>
            <p className={r.eyebrow}>2,050 m — Pick your grade</p>
            <h2 id="grades-title" className={r.h2}>How high do you want to go?</h2>
            <p className={r.lead}>Every trip has a grade. Easy stays on the plains; high-altitude trips cross 4,000 m with rest days built in.</p>
          </div>
          <div className={n.gradeTop}>
            <svg className={n.profile} viewBox="0 0 260 130" width="260" height="130" aria-hidden="true" focusable="false">
              <path className={n.profileArea} d={profile.area} />
              <path className={n.profileLine} d={profile.line} />
              <g transform={`translate(${profile.sun.x} ${profile.sun.y}) scale(0.5)`}>
                <path d={RAYS} stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <circle r="21" className={n.profileSunCore} strokeWidth="9" />
              </g>
            </svg>
            <p className={n.gradeMax}>Max<span className={n.gradeMaxValue}>{current.max}</span></p>
          </div>
        </div>

        <div className={n.filters} role="group" aria-label="Filter packages by grade">
          {GRADES.map((g) => (
            <button key={g.id} type="button" className={n.filter} aria-pressed={g.id === current.id} onClick={() => setGrade(g.id)}>
              {g.name}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{passes.length} {passes.length === 1 ? 'package' : 'packages'} shown</p>

        <ul className={n.passes}>
          {passes.map((p) => (
            <li key={p.name}>
              <article className={n.pass}>
                <span className={`${n.punch} ${n.punchTop}`} aria-hidden="true" />
                <span className={`${n.punch} ${n.punchBottom}`} aria-hidden="true" />
                <div className={n.passMain}>
                  <p className={n.passTop}>
                    <span className={n.passBrand}>DayOut · Trail pass{p.sample ? ' · Sample' : ''}</span>
                    <span>→ {p.dest}</span>
                  </p>
                  <h3 className={n.passName}>{p.name}</h3>
                  <p className={n.passDesc}>{p.desc}</p>
                  <dl className={n.specs}>
                    <div><dt className={n.specLabel}>Grade</dt><dd className={n.specValue}>{p.gradeName}</dd></div>
                    <div><dt className={n.specLabel}>Max altitude</dt><dd className={n.specValue}>{p.max}</dd></div>
                    <div><dt className={n.specLabel}>Duration</dt><dd className={n.specValue}>{p.dur}</dd></div>
                  </dl>
                </div>
                <div className={n.stub}>
                  <Image src={p.img} alt="" fill sizes="(max-width: 900px) 100vw, 176px" />
                  <span className={n.stubScrim} aria-hidden="true" />
                  <div className={n.stubBody}>
                    <div>
                      <p className={n.specLabel}>Per person</p>
                      <p className={n.price}>{p.price}</p>
                    </div>
                    <a
                      href={whatsappLink(CONTACT.phone, `Hi DayOut, I'd like to know about the ${p.name} trip.`)}
                      className={`${r.pill} ${n.enquire}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enquire<span className="sr-only"> about {p.name} on WhatsApp (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
