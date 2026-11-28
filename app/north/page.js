import { mono } from '@/lib/fonts';
import NorthPage from '@/components/north/NorthPage';

export const metadata = {
  // Absolute: the root layout template still appends 'DayOut Goa'.
  title: { absolute: 'North India Tours from Kochi — Ladakh, Kashmir, Rajasthan | DayOut Holidays' },
  description: 'From the Varanasi ghats at 80 m to Pangong at 4,225 m. Ladakh, Spiti, Kashmir, Sikkim, Rajasthan and the Golden Triangle — planned end to end from Kochi.',
  alternates: { canonical: '/north' },
};

export default function North() {
  return (
    <div className={mono.variable}>
      <NorthPage />
    </div>
  );
}
