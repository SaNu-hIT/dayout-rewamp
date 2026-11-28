import { Suspense } from 'react';
import { mono } from '@/lib/fonts';
import { NOTES_ALL_SAMPLE } from '@/data/notes';
import { ROUTES } from '@/data/swell';
import NotesBrowser, { NotesView } from '@/components/notes/NotesBrowser';
import { NotesCta, NotesFooter, NotesHeader } from '@/components/notes/NotesChrome';
import s from '@/components/notes/notes.module.css';

export const metadata = {
  // Absolute: the root layout template still appends 'DayOut Goa'.
  title: { absolute: 'Field notes — travel notes from across India | DayOut Holidays' },
  description: 'Short notes from trips across India: how to pace the climb, when the coast is at its best, and what we tell travellers before they go. From our team in Kochi.',
  alternates: { canonical: ROUTES.notes },
  // Sample copy stays out of search until DayOut publishes real notes.
  robots: NOTES_ALL_SAMPLE ? { index: false, follow: true } : undefined,
};

function Intro() {
  return (
    <>
      <p className={`${s.mono} ${s.eyebrow}`}>Field notes · the DayOut logbook</p>
      <h1 id="notes-title" className={s.heroTitle}>Written on the road.</h1>
      <p className={s.heroLead}>
        Short notes from trips across India — how to pace the climb, when the coast is at its best,
        and what we tell travellers before they go. From our team in Kochi.
      </p>
    </>
  );
}

export default function FieldNotes() {
  return (
    <div className={`${mono.variable} ${s.page} ${s.index}`}>
      <NotesHeader current />
      <main>
        {/* useSearchParams needs a Suspense boundary; the fallback prerenders the full list. */}
        <Suspense fallback={<NotesView><Intro /></NotesView>}>
          <NotesBrowser><Intro /></NotesBrowser>
        </Suspense>
        <NotesCta
          title="Every note is a trip we can plan."
          lead="Tell us which one caught you. One message on WhatsApp and our Kochi team sends a plan."
          message="Hi DayOut, I was reading your field notes and would like to plan a trip."
          links={[
            { href: ROUTES.north, label: 'North trips ↑' },
            { href: ROUTES.south, label: 'South trips ↓' },
          ]}
        />
      </main>
      <NotesFooter />
    </div>
  );
}
