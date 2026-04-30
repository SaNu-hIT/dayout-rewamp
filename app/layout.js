import './globals.css';

export const metadata = {
  title: 'DayOut – Live Every Moment | Premium Goa Travel',
  description: 'DayOut – Discover breathtaking beaches, waterfalls, festivals and adventures in Goa. Your premium guide to Goa\'s most unforgettable experiences.',
  keywords: 'travel, beach, destinations, Goa, adventure, festivals, DayOut',
  authors: [{ name: 'DayOut Travel' }],
  openGraph: {
    title: 'DayOut – Live Every Moment',
    description: 'Discover breathtaking travel destinations, beach getaways, and unforgettable experiences.',
    type: 'website',
    images: ['/images/hero-bg.jpg'],
  },
  icons: { icon: '/images/logo.png' },
};

export const viewport = {
  themeColor: '#F5C518',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'DayOut',
            description: 'Premium travel experiences across beaches, forests, and festival destinations.',
            url: 'https://dayout.travel',
            logo: '/images/logo.png',
            sameAs: ['https://instagram.com/dayout','https://twitter.com/dayout'],
          })}}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
