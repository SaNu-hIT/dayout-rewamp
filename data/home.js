// Content for the "Day → Out" home page.
//
// Image files in /public/images are named after the wrong scenes. They are
// mapped here by what each photo actually shows:
const PHOTO = {
  palmBeach: '/images/waterfall.jpg',      // palm trees over a calm bay
  waterfall: '/images/beach-night.jpg',    // Dudhsagar falls in jungle
  sunsetLamps: '/images/sunset-beach.jpg', // wicker lamps on a beach at sunset
  nightTents: '/images/goa-beach.jpg',     // lit beach tents at night
  festival: '/images/concert.jpg',         // fireworks over a festival stage
  sunsetResort: '/images/hero-bg.jpg',     // resort pool at sunset
};

export const WHATSAPP_NUMBER = '918848965352';
export const PHONE_DISPLAY = '+91 88489 65352';
export const PHONE_TEL = '+918848965352';
export const EMAIL = 'dayoutholidays@gmail.com';

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** The fixed clock on the left. Times label the sections they link to. */
export const DAY_STOPS = [
  { t: '06:00', id: 'sunrise', label: 'Sunrise' },
  { t: '08:00', id: 'destinations', label: 'Destinations' },
  { t: '12:00', id: 'noon', label: 'What we handle' },
  { t: '17:30', id: 'packages', label: 'Packages' },
  { t: '18:42', id: 'sunset', label: 'Sunset' },
  { t: '21:00', id: 'night', label: 'Nightlife' },
  { t: '23:30', id: 'stories', label: 'Stories' },
  { t: '05:59', id: 'dawn', label: 'Contact' },
];

/** Hero variant per period of the Goa day. */
export const HERO_BY_PERIOD = {
  day: {
    img: PHOTO.palmBeach,
    alt: 'Palm trees leaning over a calm bay in South Goa',
    sub: 'From first light to last call. Goa trips for friends, couples, families and college groups — planned end to end.',
    cta: 'Start the day',
    href: '#destinations',
  },
  golden: {
    img: PHOTO.sunsetResort,
    alt: 'A Goa resort pool glowing at sunset',
    sub: "The sun's going down over Goa right now. Your trip can start with the next one.",
    cta: 'See packages',
    href: '#packages',
  },
  night: {
    img: PHOTO.nightTents,
    alt: 'Lit beach tents on the sand at night',
    sub: "The shacks are lit and the music's on. Plan tonight, land tomorrow.",
    cta: 'Go Out tonight',
    href: '#night',
  },
};

export const DESTINATIONS = [
  { name: 'Palolem', region: 'South Goa', best: '07:30', blurb: 'Calm bay, kayaks, palm shade', img: PHOTO.palmBeach, alt: "Palm trees over Palolem's calm bay", offset: 0 },
  { name: 'Dudhsagar Falls', region: 'East Goa', best: '10:00', blurb: 'Jungle trek to the falls', img: PHOTO.waterfall, alt: 'Dudhsagar waterfall in green jungle', offset: 56 },
  { name: 'Vagator', region: 'North Goa', best: '17:30', blurb: 'Cliff views, sunset bars', img: PHOTO.sunsetLamps, alt: 'Wicker lamps over a beach at sunset', offset: 16 },
  { name: 'Baga', region: 'North Goa', best: '21:00', blurb: 'Shacks, night markets, live music', img: PHOTO.nightTents, alt: 'Lit beach tents on the sand at night', offset: 72 },
  { name: 'Anjuna', region: 'North Goa', best: '23:30', blurb: 'Festivals and late nights', img: PHOTO.festival, alt: 'Fireworks over a festival stage', offset: 28 },
];

export const STATS = [
  { value: '50K+', label: 'Happy travellers' },
  { value: '4.9', suffix: '/5', label: 'Average rating' },
  { value: '200+', label: 'Curated escapes' },
  { value: '4+', label: 'Years in Goa' },
];

export const ITINERARY = [
  { t: '09:30', title: 'Airport pickup', desc: 'Private AC cab from Dabolim or Mopa, straight to your stay.' },
  { t: '12:30', title: 'Check in', desc: 'Handpicked hotels and resorts our Goa team has stayed in.' },
  { t: '13:30', title: 'Lunch, sorted', desc: 'Seafood shacks to candlelit dinners, planned to your taste.' },
  { t: '15:00', title: 'Scooter at the door', desc: 'Two-wheelers and self-drive cars delivered to your hotel.' },
  { t: '24/7', title: 'Someone always picks up', desc: 'One call or WhatsApp and our local crew is on it.' },
];

/** Speed is the sun's rotation period in seconds: faster trip, faster sun. */
export const MOODS = [
  { id: 'all', name: 'All', speed: 12 },
  { id: 'easy', name: 'Easy', speed: 16 },
  { id: 'slow', name: 'Slow burn', speed: 28 },
  { id: 'squad', name: 'Squad', speed: 8 },
  { id: 'wild', name: 'Wild', speed: 5 },
  { id: 'full', name: 'Full send', speed: 3 },
];

/** Mood, audience and short pass copy per package slug in data/experiences.js. */
export const PASS_META = {
  'bachelors-package': { mood: 'full', who: 'Friends', blurb: 'Beaches by day, clubs by night — the full Goa run with your crew.' },
  'couples-package': { mood: 'slow', who: 'Couples', blurb: 'Quiet stays, sunset dinners and time that is just yours.' },
  'family-package': { mood: 'easy', who: 'Families', blurb: 'Kid-friendly stays and an easy pace everyone enjoys.' },
  'student-group-package': { mood: 'squad', who: 'School groups', blurb: 'Fun with a little learning, built for class trips.' },
  'goa-college-package': { mood: 'squad', who: 'College groups', blurb: 'Stays, food and transfers on a college budget.' },
  'adventure-activities': { mood: 'wild', who: 'Thrill seekers', blurb: 'Water sports, jungle treks and Dudhsagar, back to back.' },
};

export const NIGHT_SCENES = [
  { title: 'Shacks & beach dinners', t: '21:00', img: PHOTO.nightTents, alt: 'Lit beach tents set up for dinner on the sand' },
  { title: 'Festivals & clubs', t: '23:30', img: PHOTO.festival, alt: 'Fireworks over a crowd at a music festival' },
];

/**
 * Fixed-date group departures. The board is hidden while this list is empty.
 * Shape: { date: '14 DEC', trip: 'NORTH GOA GROUP', seats: 12, status: 'open' | 'filling' | 'last' }
 */
export const DEPARTURES = [];

/** Real Google reviews, quoted as written. */
export const REVIEWS = [
  { name: 'Albert Baby', quote: 'Very good service and full time supportive. They made our trip into an unforgettable experience. Enjoyed a lot. Thank you Dayout Holidays.' },
  { name: 'Anandhu S', quote: 'Suddenly we planned a trip to Goa... Dayout holidays surprised me with the arrangements of our trips like hotel, rental scooter, and guides. I personally suggest Dayout holidays for everyone.' },
  { name: 'Sarath Chandran C', quote: "Onnum parayanilla pilleru poliyanu. It's a great experience with their service. From the beginning to the end they were supportive for every aspects. You can trust them and choose the packages." },
  { name: 'Sneha Soman', quote: "We recently returned from our second trip to Goa with dayout holidays and it was just as amazing as the first! The team's attention to detail and knowledge of Goa's hidden gems made our trip truly unforgettable." },
];

export const ADDRESS = '1st Floor, Paikayil Plaza, GAIL Road, North Kalamassery, Kochi, Kerala 683503';
export const SOCIAL = [
  { name: 'Instagram', href: 'https://www.instagram.com/dayout_holidays/' },
  { name: 'Facebook', href: 'https://www.facebook.com/p/Dayout-Holidays-100087241266220/' },
];
