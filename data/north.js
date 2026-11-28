// North India — the altitude route. Elevations are approximate, in metres.
// Items with `sample: true` are layout placeholders until DayOut confirms them.
import { CANCELLATION } from './region';
import { NOTES } from './notes';

const IMG = '/images/swell';

// Fixed altitude meter: each mark jumps to its section.
export const NORTH_METER = [
  { label: '80 m', href: '#base' },
  { label: '431 m', href: '#basecamp' },
  { label: '2,050 m', href: '#grades' },
  { label: '3,000 m', href: '#treeline' },
  { label: '3,500 m', href: '#himalaya' },
  { label: '4,400 m', href: '#notes' },
  { label: '4,500 m', href: '#stories' },
  { label: '5,000 m', href: '#faq' },
  { label: '5,359 m', href: '#summit' },
];

export const DESTINATIONS = [
  { name: 'Varanasi', region: 'Uttar Pradesh', alt: 80, blurb: 'Ghats and evening aarti', img: `${IMG}/varanasi.jpg`, imgAlt: 'Boats moored below the Varanasi ghats' },
  { name: 'Agra', region: 'Uttar Pradesh', alt: 170, blurb: 'The Taj at sunrise', img: `${IMG}/taj.jpg`, imgAlt: 'The Taj Mahal at sunset' },
  { name: 'Rishikesh', region: 'Uttarakhand', alt: 372, blurb: 'Rafting, yoga, Ganga aarti', img: `${IMG}/rishikesh.jpg`, imgAlt: 'Temple tower above the Ganga at Rishikesh' },
  { name: 'Jaipur', region: 'Rajasthan', alt: 431, blurb: 'Forts, palaces, bazaars', img: `${IMG}/jaipur.jpg`, imgAlt: 'Riders on white horses passing Hawa Mahal' },
  { name: 'Udaipur', region: 'Rajasthan', alt: 598, blurb: 'Lake palaces at dusk', img: `${IMG}/udaipur.jpg`, imgAlt: 'White palace on Lake Pichola, Udaipur' },
  { name: 'Srinagar', region: 'Kashmir', alt: 1585, blurb: 'Shikaras on Dal Lake', img: `${IMG}/kashmir.jpg`, imgAlt: 'Shikaras on Dal Lake, Srinagar' },
  { name: 'Darjeeling', region: 'West Bengal', alt: 2042, blurb: 'Toy train, Kanchenjunga views', img: `${IMG}/darjeeling.jpg`, imgAlt: 'Kanchenjunga above Darjeeling town' },
  { name: 'Manali', region: 'Himachal', alt: 2050, blurb: 'Pine valleys, river camps', img: `${IMG}/manali.jpg`, imgAlt: 'Snow peaks behind pine trees near Manali' },
  { name: 'Leh', region: 'Ladakh', alt: 3500, blurb: 'Monasteries and high passes', img: `${IMG}/leh.jpg`, imgAlt: 'Leh town below snow-capped mountains' },
  { name: 'Pangong Tso', region: 'Ladakh', alt: 4225, blurb: 'The lake that changes colour', img: `${IMG}/pangong.jpg`, imgAlt: 'Prayer flags by Pangong lake' },
];

export const NORTH_CAMP = [
  { t: 'Day 0', title: 'Flights from Kochi, booked', desc: 'Kochi to Delhi, Jaipur, Varanasi, Bagdogra, Srinagar or Leh — timed so your first day is not lost.' },
  { t: 'Arrival', title: 'Pickup where you land', desc: 'Private cab from the airport or station, straight to your stay.' },
  { t: 'Stays', title: 'Checked by our team', desc: 'Heritage havelis, houseboats on Dal Lake, homestays in the mountains.' },
  { t: 'Permits', title: 'Paperwork handled', desc: 'Inner Line Permits and protected-area passes arranged before you go.' },
  { t: '24/7', title: 'Someone always picks up', desc: 'One call or WhatsApp and a local crew is on it, on the plains or at 4,000 m.' },
];

export const BASECAMP_STACK = [
  { img: `${IMG}/varanasi.jpg`, alt: 'Boats on the Ganges at Varanasi' },
  { img: `${IMG}/taj.jpg`, alt: 'The Taj Mahal at sunset' },
  { img: `${IMG}/spiti.jpg`, alt: 'Key Monastery in Spiti' },
];

// The profile steepens and the sun climbs with the grade.
export const GRADES = [
  { id: 'all', name: 'All grades', top: 70, max: 'Any' },
  { id: 'easy', name: 'Easy · under 2,000 m', top: 40, max: '1,999 m' },
  { id: 'moderate', name: 'Moderate · 2,000–3,500 m', top: 75, max: '3,500 m' },
  { id: 'high', name: 'High altitude · 3,500 m+', top: 112, max: '5,359 m' },
];

export const PASSES = [
  { grade: 'easy', gradeName: 'Easy', name: 'Golden Triangle', dest: 'Delhi', desc: 'Delhi, the Taj at Agra, then the forts and bazaars of Jaipur.', max: '431 m', dur: '[N] Days, [N] Nights', price: '₹[price]', img: `${IMG}/taj.jpg`, sample: true },
  { grade: 'easy', gradeName: 'Easy', name: 'Varanasi & Rishikesh', dest: 'Varanasi', desc: 'Dawn boat on the ghats, then the river and rafting at Rishikesh.', max: '372 m', dur: '[N] Days, [N] Nights', price: '₹[price]', img: `${IMG}/varanasi.jpg`, sample: true },
  { grade: 'moderate', gradeName: 'Moderate', name: 'Kashmir Valleys', dest: 'Srinagar', desc: 'Dal Lake houseboat, Gulmarg gondola, Sonamarg and Pahalgam.', max: '2,740 m', dur: '[N] Days, [N] Nights', price: '₹[price]', img: `${IMG}/kashmir.jpg`, sample: true },
  { grade: 'moderate', gradeName: 'Moderate', name: 'Darjeeling & Sikkim', dest: 'Bagdogra', desc: 'Toy train, Tsomgo Lake and Kanchenjunga at sunrise.', max: '3,753 m', dur: '[N] Days, [N] Nights', price: '₹[price]', img: `${IMG}/darjeeling.jpg`, sample: true },
  { grade: 'moderate', gradeName: 'Moderate', name: 'Shimla–Manali Circuit', dest: 'Chandigarh', desc: 'Colonial hills, pine valleys and a day up to the snow.', max: '3,978 m', dur: '[N] Days, [N] Nights', price: '₹[price]', img: `${IMG}/manali.jpg`, sample: true },
  { grade: 'high', gradeName: 'High altitude', name: 'Ladakh Road Trip', dest: 'Leh', desc: 'Two rest days in Leh, then Nubra, Khardung La and Pangong.', max: '5,359 m', dur: '[N] Days, [N] Nights', price: '₹[price]', img: `${IMG}/ladakh.jpg`, sample: true },
];

export const HIMALAYA = [
  { name: 'Ladakh', alt: '3,500 m', blurb: 'Leh, Nubra, Pangong, Khardung La', season: 'Jun–Sep', seed: 4.1, img: `${IMG}/ladakh.jpg`, imgAlt: 'Motorcyclist on an empty Ladakh highway' },
  { name: 'Spiti', alt: '3,800 m', blurb: 'Cold desert villages, Key monastery', season: 'Jun–Oct', seed: 5.6, img: `${IMG}/spiti.jpg`, imgAlt: 'Key Monastery on a rocky hill in Spiti' },
  { name: 'Kashmir', alt: '2,650 m', blurb: 'Gulmarg, Sonamarg, Pahalgam', season: 'Apr–Oct · Dec–Feb snow', seed: 6.9, img: `${IMG}/kashmir.jpg`, imgAlt: 'Shikaras on Dal Lake, Srinagar' },
  { name: 'Sikkim', alt: '3,753 m', blurb: 'Gangtok, Tsomgo Lake, Nathu La', season: 'Mar–May · Oct–Dec', seed: 8.3, img: `${IMG}/sikkim.jpg`, imgAlt: 'Gangtok hillside at sunset' },
];

// One source for notes: data/notes.js.
export const NORTH_NOTES = NOTES.filter((n) => n.region === 'north');

export const NORTH_FAQ = [
  { q: 'Will the altitude affect me?', a: 'It can. Leh is at about 3,500 m, so our Ladakh trips start with rest days before any high pass. Drink water, skip alcohol early on, and tell us about heart or lung conditions when you book. If you have health concerns, check with your doctor first.' },
  { q: 'Do I need permits?', a: 'Some areas need them — for example Nubra and Pangong in Ladakh, and Tsomgo Lake and Nathu La in Sikkim. We arrange permits once you share ID details.' },
  { q: 'When is the best time to go?', a: 'Rajasthan, Agra and Varanasi: October to March. Ladakh and Spiti: June to September, when the passes are open. Kashmir: April to October, or December to February for snow. Darjeeling and Sikkim: March to May, and October to December.' },
  { q: 'Can I add the South to the same trip?', a: 'Yes. Fly back via Kochi and add Munnar or the backwaters before you go home — we plan both halves as one trip.' },
  { q: 'Can I change the itinerary?', a: 'Every trip is tailored. Add rest days, drop a pass, upgrade stays or extend nights — we send a custom plan.' },
  CANCELLATION,
];

export const NORTH_BY_HEIGHT = [
  { href: '#climb', label: 'Plains · under 600 m' },
  { href: '#climb', label: 'Hills · 1,500–2,300 m' },
  { href: '#himalaya', label: 'Himalaya · 3,000 m+' },
];
