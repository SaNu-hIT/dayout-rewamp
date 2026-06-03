export default function manifest() {
  return {
    name: 'DayOut Holidays',
    short_name: 'DayOut',
    description: 'Premium Goa Travel & Lifestyle — beaches, waterfalls, festivals and adventures.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0F',
    theme_color: '#F5C518',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
  };
}
