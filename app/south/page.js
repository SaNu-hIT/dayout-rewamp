import { mono } from '@/lib/fonts';
import SouthPage from '@/components/south/SouthPage';

export const metadata = {
  // Absolute: the root layout template still appends 'DayOut Goa'.
  title: { absolute: 'South India Tours from Kochi — Goa, Kerala, Coorg, Andaman | DayOut Holidays' },
  description: 'About 1,650 km of coast from Goa to Kanyakumari: Gokarna, Hampi, Coorg, Kochi, Munnar, Alleppey houseboats, Pondicherry and the Andaman Islands — planned from our Kochi office.',
  alternates: { canonical: '/south' },
};

export default function South() {
  return (
    <div className={mono.variable}>
      <SouthPage />
    </div>
  );
}
