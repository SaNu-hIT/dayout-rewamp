import { ROUTES } from '@/data/swell';

/** The one main menu, used by every page header and the mobile menu. */
export const MAIN_NAV = [
  { href: ROUTES.north, label: 'North' },
  { href: ROUTES.south, label: 'South' },
  { href: ROUTES.packages, label: 'Packages' },
  { href: ROUTES.notes, label: 'Field notes' },
  { href: ROUTES.about, label: 'About' },
  { href: ROUTES.contact, label: 'Contact' },
];
