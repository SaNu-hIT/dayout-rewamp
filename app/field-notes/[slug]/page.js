import { notFound } from 'next/navigation';
import { mono } from '@/lib/fonts';
import { NOTES, REGION_LABEL } from '@/data/notes';
import { PASSES } from '@/data/north';
import { TICKETS } from '@/data/south';
import { ROUTES } from '@/data/swell';
import { findNote, findTrip, moreNotes, neighbours } from '@/lib/notes';
import NoteArticle from '@/components/notes/NoteArticle';
import { NotesCta, NotesFooter, NotesHeader } from '@/components/notes/NotesChrome';
import s from '@/components/notes/notes.module.css';

const TRIPS = [...PASSES, ...TICKETS];

// Only the notes in data/notes.js exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const note = findNote(NOTES, (await params).slug);
  if (!note) return {};
  const url = `${ROUTES.notes}/${note.slug}`;
  return {
    title: { absolute: `${note.title} | DayOut Field notes` },
    description: note.dek,
    alternates: { canonical: url },
    robots: note.sample ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'article',
      url,
      title: note.title,
      description: note.dek,
      images: [{ url: note.img, alt: note.alt }],
    },
  };
}

export default async function FieldNote({ params }) {
  const note = findNote(NOTES, (await params).slug);
  if (!note) notFound();

  const trip = findTrip(TRIPS, note.trip);
  // Fail the build, not the reader, when a note names a package that does not exist.
  if (note.trip && !trip) throw new Error(`Field note ${note.slug}: no package named "${note.trip}"`);

  const { prev, next } = neighbours(NOTES, note.slug);
  const region = note.region === 'north' ? s.north : s.south;
  const regionRoute = ROUTES[note.region];

  return (
    <div className={`${mono.variable} ${s.page} ${s.article} ${region}`}>
      <NotesHeader />
      <main>
        <NoteArticle note={note} trip={trip} prev={prev} next={next} more={moreNotes(NOTES, note.slug, 3)} />
        <NotesCta
          title={note.cta.title}
          lead={note.cta.lead}
          message={`Hi DayOut, I read "${note.title}" and would like to plan a trip to ${note.place}.`}
          links={[{ href: regionRoute, label: `See ${REGION_LABEL[note.region]} trips ${note.region === 'north' ? '↑' : '↓'}` }]}
        />
      </main>
      <NotesFooter />
    </div>
  );
}
