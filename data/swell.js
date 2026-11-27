// Content for the Swell home. Items with `sample: true` are layout placeholders
// until DayOut confirms the real package, price or post.

export const CONTACT = {
  phone: '+91 88489 65352',
  email: 'dayoutholidays@gmail.com',
  city: 'Kochi, Kerala',
  // From the current site footer and /contact page.
  address: '1st Floor, Paikayil Plaza, GAIL Road, North Kalamassery, Kochi 683503',
  instagram: 'https://www.instagram.com/dayout_holidays/',
  facebook: 'https://www.facebook.com/p/Dayout-Holidays-100087241266220/',
};

// Planned routes. North, South and Field notes pages are the next build step.
export const ROUTES = {
  north: '/north',
  south: '/south',
  notes: '/field-notes',
  about: '/about',
};

export const WAVES = [
  { id: 'top', n: '1', label: 'Shore' },
  { id: 'choose', n: '2', label: 'Choose' },
  { id: 'swell', n: '3', label: 'Packages' },
  { id: 'glow', n: '4', label: 'Field notes' },
  { id: 'ride', n: '5', label: 'Ride' },
];

export const HALVES = [
  {
    key: 'north',
    pre: 'N',
    post: 'RTH',
    href: ROUTES.north,
    img: '/images/swell/himalaya.jpg',
    coord: 'Above the waterline · up to 5,359 m',
    mood: 'Snow passes, desert forts and river ghats.',
    places: 'Ladakh · Kashmir · Spiti · Manali · Rishikesh · Varanasi · Agra · Jaipur · Udaipur',
    cta: '↑ Head north',
    aria: 'Head north: Ladakh, Kashmir, Spiti, Manali, Rishikesh and more',
  },
  {
    key: 'south',
    pre: 'S',
    post: 'UTH',
    href: ROUTES.south,
    img: '/images/swell/kanyakumari.jpg',
    coord: 'Below the waterline · 1,650 km of coast',
    mood: 'Beaches, backwaters, tea hills and islands.',
    places: 'Goa · Gokarna · Hampi · Coorg · Kochi · Munnar · Alleppey · Kanyakumari · Andaman',
    cta: 'Head south ↓',
    aria: 'Head south: Goa, Gokarna, Hampi, Coorg, Kochi and more',
  },
];

export const BOARDS = [
  { region: 'South', name: 'Goa Couples', season: 'Oct–Mar', dur: '4 Days, 3 Nights', price: '₹7,000', img: '/images/hero-bg.jpg', alt: 'Sunset over a beach lined with water villas' },
  { region: 'South', name: "Goa Bachelor's", season: 'Oct–Mar', dur: '3 Days, 2 Nights', price: '₹3,750', img: '/images/concert.jpg', alt: 'Fireworks over a crowd at a Goa beach party' },
  { region: 'South', name: 'Alleppey Houseboat', season: 'Oct–Mar', dur: '[N] Days, [N] Nights', price: '₹[price]', sample: true, img: '/images/swell/alleppey.jpg', alt: 'Houseboat on palm-lined backwaters' },
  { region: 'North', name: 'Golden Triangle', season: 'Oct–Mar', dur: '[N] Days, [N] Nights', price: '₹[price]', sample: true, img: '/images/swell/taj.jpg', alt: 'Taj Mahal at sunset' },
  { region: 'North', name: 'Kashmir Valleys', season: 'Apr–Oct', dur: '[N] Days, [N] Nights', price: '₹[price]', sample: true, img: '/images/swell/kashmir.jpg', alt: 'Shikaras on Dal Lake, Kashmir' },
  { region: 'North', name: 'Ladakh Road Trip', season: 'Jun–Sep', dur: '[N] Days, [N] Nights', price: '₹[price]', sample: true, img: '/images/swell/ladakh.jpg', alt: 'Motorcycle on a mountain road in Ladakh' },
  { region: 'South', name: 'Andaman Islands', season: 'Nov–May', dur: '[N] Days, [N] Nights', price: '₹[price]', sample: true, img: '/images/swell/andaman.jpg', alt: 'Boat on a white beach in the Andaman Islands' },
];

// Field notes (blog). Sample titles for layout; real posts come from the CMS.
export const NOTES = [
  { slug: 'vembanad-houseboat-night', place: 'Alleppey', coord: '9.50° N', title: 'A night on a Vembanad houseboat, hour by hour', meta: '7 min read', img: '/images/swell/alleppey.jpg', alt: 'Houseboat on palm-lined backwaters', sample: true },
  { slug: 'leh-first-48-hours', place: 'Leh', coord: '34.16° N', title: 'Leh in 48 hours: how we pace the first two days', meta: '6 min read', img: '/images/swell/leh.jpg', alt: 'Leh town below snow-capped mountains', sample: true },
  { slug: 'gokarna-cliff-trail', place: 'Gokarna', coord: '14.55° N', title: 'The cliff trail, one cove at a time', meta: '5 min read', img: '/images/swell/gokarna.jpg', alt: 'People walking along the shore at Gokarna', sample: true },
];
