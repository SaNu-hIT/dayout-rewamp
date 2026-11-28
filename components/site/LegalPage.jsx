import Link from 'next/link';
import { ROUTES } from '@/data/swell';
import { SiteFooter, SiteHeader, SiteHero } from './SiteChrome';
import c from './site.module.css';
import l from './legal.module.css';

const POLICIES = [
  { href: ROUTES.privacy, label: 'Privacy policy' },
  { href: ROUTES.terms, label: 'Terms of service' },
];

/** Privacy and Terms: a plain night-sea hero and the text on a postcard sheet. `current` is this page's href. */
export default function LegalPage({ current, eyebrow, title, updated, children }) {
  return (
    <div className={c.page}>
      <SiteHeader />
      <main>
        <SiteHero eyebrow={eyebrow} title={title} lead={`Last updated: ${updated}`} size="short" />
        <section className={c.postcard}>
          <div className={`${c.wrap} ${l.layout}`}>
            <article className={l.prose}>{children}</article>
            <aside className={l.aside} aria-label="Other policies">
              <p className={`${c.mono} ${l.asideHead}`}>Policies</p>
              {POLICIES.map((p) => (
                <Link key={p.href} href={p.href} aria-current={current === p.href ? 'page' : undefined}>{p.label}</Link>
              ))}
              <Link href={ROUTES.contact}>Questions? Contact us</Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
