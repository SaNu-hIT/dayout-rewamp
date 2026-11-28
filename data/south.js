// South India — the coastline route, Goa to Kanyakumari. Distances are approximate road km.
// Items with `sample: true` are layout placeholders until DayOut confirms them.
import { CANCELLATION } from './region';
import { NOTES } from './notes';

const IMG = '/images/swell';

export const SOUTH_METER = [
  { label: '0 km', href: '#goa' },
  { label: '150 km', href: '#route' },
  { label: '1,120 km', href: '#kochi' },
  { label: '1,250 km', href: '#tickets' },
  { label: '1,420 km', href: '#notes' },
  { label: '1,500 km', href: '#stories' },
  { label: '1,600 km', href: '#faq' },
  { label: '1,650 km', href: '#landsend' },
];

// The client's own Goa photos, afternoon to midnight.
export const FILM = [
  { t: '4 PM', what: 'Dudhsagar falls', img: '/images/beach-night.jpg', alt: 'Twin waterfalls pouring down a green cliff' },
  { t: '6 PM', what: 'Sunset by the water', img: '/images/hero-bg.jpg', alt: 'Sunset over a beach lined with water villas' },
  { t: '10 PM', what: 'Tents by the water', img: '/images/goa-beach.jpg', alt: 'Lit tents on a Goa beach at night' },
  { t: '12 AM', what: 'New Year sky', img: '/images/concert.jpg', alt: 'Fireworks over a stage at a Goa beach party' },
];

// `stamp` keys map to --stamp-* tokens. `side` puts the map label left (end) or right (start) of the pin.
export const STOPS = [
  { id: 'goa', name: 'Goa', lon: 73.83, lat: 15.49, km: 0, region: 'Konkan coast', type: 'Beach', stamp: 'beach', blurb: 'Start here: beaches, shacks and long sunsets.', season: 'Oct–Mar', code: 'GOA', img: '/images/sunset-beach.jpg', alt: 'Sunset over a Goa beach with umbrellas on the sand', side: 'end' },
  { id: 'gokarna', name: 'Gokarna', lon: 74.32, lat: 14.55, km: 150, region: 'Karnataka', type: 'Beach', stamp: 'beach', blurb: 'Quiet coves on a cliff-top trail.', season: 'Oct–Mar', code: 'GOK', img: `${IMG}/gokarna.jpg`, alt: 'People walking along the shore at Gokarna', side: 'end' },
  { id: 'hampi', name: 'Hampi', lon: 76.46, lat: 15.33, km: 420, region: 'Karnataka', type: 'Heritage', stamp: 'heritage', blurb: 'Boulder hills and temple ruins at sunset.', season: 'Oct–Feb', code: 'HMP', img: `${IMG}/hampi.jpg`, alt: 'Stone temple complex at Hampi', side: 'start' },
  { id: 'coorg', name: 'Coorg', lon: 75.74, lat: 12.42, km: 820, region: 'Karnataka', type: 'Hills', stamp: 'hills', blurb: 'Coffee estates and misty valleys.', season: 'Oct–May', code: 'CRG', img: `${IMG}/coorg.jpg`, alt: 'Footbridge through misty forest in Coorg', side: 'start' },
  { id: 'kochi', name: 'Kochi', lon: 76.27, lat: 9.93, km: 1120, region: 'Kerala', type: 'Heritage', stamp: 'heritage', blurb: 'Fishing nets, Fort Kochi — and our office.', season: 'Oct–Mar', code: 'COK', img: `${IMG}/kochi.jpg`, alt: 'Chinese fishing net at Fort Kochi', side: 'end' },
  { id: 'munnar', name: 'Munnar', lon: 77.06, lat: 10.09, km: 1250, region: 'Kerala', type: 'Hills', stamp: 'hills', blurb: 'Tea hills in the clouds.', season: 'Sep–May', code: 'MNR', img: `${IMG}/munnar.jpg`, alt: 'Tea gardens on green Munnar hills', side: 'start' },
  { id: 'alleppey', name: 'Alleppey', lon: 76.34, lat: 9.5, km: 1420, region: 'Kerala', type: 'Backwaters', stamp: 'water', blurb: 'A night on a houseboat.', season: 'Oct–Mar', code: 'ALP', img: `${IMG}/alleppey.jpg`, alt: 'Houseboat on palm-lined backwaters', side: 'end' },
  { id: 'kanyakumari', name: 'Kanyakumari', lon: 77.54, lat: 8.08, km: 1650, region: 'Tamil Nadu', type: 'Land’s end', stamp: 'end', blurb: 'Sunrise where three seas meet.', season: 'Oct–Mar', code: 'KNK', img: `${IMG}/kanyakumari.jpg`, alt: 'Rock memorial at Kanyakumari at sunset', side: 'start' },
  { id: 'pondicherry', name: 'Pondicherry', lon: 79.83, lat: 11.93, km: null, detour: '+ ~600 km detour', region: 'Puducherry', type: 'Heritage', stamp: 'heritage', blurb: 'French lanes, cafés and a calm sea.', season: 'Oct–Mar', code: 'PNY', img: `${IMG}/pondicherry.jpg`, alt: 'Red scooter outside a yellow house in Pondicherry', side: 'end' },
  { id: 'andaman', name: 'Andaman', lon: null, lat: 11.62, km: null, detour: 'By air', region: 'Bay of Bengal', type: 'Islands', stamp: 'water', blurb: 'Reefs, white sand, clear water.', season: 'Nov–May', code: 'IXZ', img: `${IMG}/andaman.jpg`, alt: 'Wooden boat on a clear Andaman beach', side: 'start' },
];

// Stylised peninsula outline in map pixels (see project() in lib/region.js).
export const COAST = [[80, 0], [84, 45], [91, 90], [114, 153], [126, 175], [143, 228], [157, 288], [164, 324], [175, 360], [201, 417], [229, 472], [239, 516], [264, 591], [268, 630], [287, 685], [311, 720], [353, 758], [394, 693], [448, 657], [476, 650], [515, 558], [514, 516], [513, 411], [544, 308], [532, 180], [567, 45], [575, 0]];
export const ANDAMAN_ISLANDS = [[583, 640, 7, 22], [588, 672, 8, 26], [580, 706, 6, 18], [590, 734, 5, 12]];

export const SOUTH_CAMP = [
  { t: 'Day 0', title: 'Trains and flights, booked', desc: 'Into Goa, Kochi, Bengaluru, Chennai or Port Blair — timed so your first day is not lost.' },
  { t: 'Arrival', title: 'Pickup where you land', desc: 'Private cab from the airport or station, straight to your stay.' },
  { t: 'Stays', title: 'Checked by our team', desc: 'Beach resorts, houseboats, tea estates and homestays in the hills.' },
  { t: 'On the road', title: 'Local drivers for the ghats', desc: 'Hill roads up to Munnar and Coorg with drivers who know them.' },
  { t: '24/7', title: 'Someone always picks up', desc: 'One call or WhatsApp and a local crew is on it, wherever you are on the coast.' },
];

export const MOODS = [
  { id: 'all', name: 'All moods' },
  { id: 'beach', name: 'Beach' },
  { id: 'backwaters', name: 'Backwaters' },
  { id: 'hills', name: 'Hills' },
  { id: 'islands', name: 'Islands' },
];

// Goa Bachelor's and Goa Couples are real (current site); the rest are samples.
export const TICKETS = [
  { moods: ['beach'], name: "Goa Bachelor's", slug: 'bachelors-package', from: 'GOA', to: 'GOA', desc: 'Beaches by day, clubs by night — the full Goa run with your crew.', dur: '3 Days, 2 Nights', season: 'Oct–Mar', price: '₹3,750' },
  { moods: ['beach'], name: 'Goa Couples', slug: 'couples-package', from: 'GOA', to: 'GOA', desc: 'Quiet stays, sunset dinners and time that is just yours.', dur: '4 Days, 3 Nights', season: 'Oct–Mar', price: '₹7,000' },
  { moods: ['hills', 'backwaters'], name: 'Kerala Hills & Backwaters', from: 'COK', to: 'ALP', desc: 'Munnar tea hills, then a houseboat night in Alleppey.', dur: '[N] Days, [N] Nights', season: 'Sep–Mar', price: '₹[price]', sample: true },
  { moods: ['backwaters'], name: 'Alleppey Houseboat Escape', from: 'COK', to: 'ALP', desc: 'A slow day and night on the backwaters, meals cooked on board.', dur: '[N] Days, [N] Nights', season: 'Oct–Mar', price: '₹[price]', sample: true },
  { moods: ['hills'], name: 'Coorg Coffee Trail', from: 'BLR', to: 'CRG', desc: 'Estate stays, a waterfall walk and coffee from the plant up.', dur: '[N] Days, [N] Nights', season: 'Oct–May', price: '₹[price]', sample: true },
  { moods: ['islands', 'beach'], name: 'Andaman Islands', from: 'IXZ', to: 'IXZ', desc: 'Port Blair, then the ferry out to white beaches and clear reefs.', dur: '[N] Days, [N] Nights', season: 'Nov–May', price: '₹[price]', sample: true },
];

// One source for notes: data/notes.js.
export const SOUTH_NOTES = NOTES.filter((n) => n.region === 'south');

export const SOUTH_FAQ = [
  { q: 'When does the monsoon come?', a: 'The south-west monsoon usually reaches Kerala in early June and runs to September. Hills and backwaters turn green and quiet; most Goa water sports pause in these months.' },
  { q: 'When is the best time for the beaches?', a: 'October to March for Goa, Gokarna, the Kerala coast and Pondicherry. The Andaman Islands are best from November to May.' },
  { q: 'Is the houseboat just for us?', a: 'We book a houseboat for your group, with crew and meals on board. Tell us how many are travelling and we match the boat to the group.' },
  { q: 'Can I add the North to the same trip?', a: 'Yes. Fly from Kochi to Delhi, Jaipur or Leh and we plan both halves as one trip.' },
  CANCELLATION,
];

export const SOUTH_BY_COAST = [
  { href: '#route', label: 'Beaches · Goa to Gokarna' },
  { href: '#kochi', label: 'Kerala · Kochi to Alleppey' },
  { href: '#tickets', label: 'Islands · Andaman' },
];
