import { EXPERIENCES } from '@/data/experiences';
import { NOTES } from '@/data/notes';

const BASE_URL = 'https://dayoutholidays.com';

export default function sitemap() {
  const experienceUrls = EXPERIENCES.map((exp) => ({
    url: `${BASE_URL}/experiences/${exp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Sample notes are noindex, so they stay out until DayOut publishes real ones.
  const published = NOTES.filter((n) => !n.sample);
  const noteUrls = published.length === 0 ? [] : [
    { url: `${BASE_URL}/field-notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...published.map((n) => ({ url: `${BASE_URL}/field-notes/${n.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 })),
  ];

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/north`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/south`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...noteUrls,
    ...experienceUrls,
  ];
}
