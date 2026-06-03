import './globals.css';
import EnquiryPopup from '@/components/EnquiryPopup';

const BASE_URL = 'https://dayoutholidays.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'DayOut – Premium Travel & Lifestyle in Goa',
    template: '%s | DayOut Goa',
  },
  description:
    'Discover Goa\'s most unforgettable experiences — pristine beaches, hidden waterfalls, vibrant festivals, and adventure trails. DayOut is your premium travel & lifestyle guide to Goa.',
  keywords: [
    'Goa travel', 'Goa tourism', 'Goa beaches', 'Goa adventures', 'Goa waterfalls',
    'Goa festivals', 'premium travel Goa', 'DayOut', 'travel lifestyle', 'Goa experiences',
    'things to do in Goa', 'Goa trip planner',
  ],
  authors: [{ name: 'DayOut Travel', url: BASE_URL }],
  creator: 'DayOut Travel',
  publisher: 'DayOut Travel',
  category: 'Travel & Lifestyle',

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'DayOut',
    title: 'DayOut – Premium Travel & Lifestyle in Goa',
    description:
      'Discover Goa\'s most unforgettable experiences — pristine beaches, hidden waterfalls, vibrant festivals, and adventure trails.',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'DayOut – Premium Travel & Lifestyle in Goa',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@dayout_holidays',
    creator: '@dayout_holidays',
    title: 'DayOut – Premium Travel & Lifestyle in Goa',
    description:
      'Your premium guide to Goa\'s most unforgettable beaches, waterfalls, and adventures.',
    images: ['/images/hero-bg.jpg'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '16x16' },
    ],
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  verification: {
    // Add your Google Search Console verification token here when available
    // google: 'xxxxxxxxxxxx',
  },
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
            alternateName: 'DayOut Goa',
            description: 'Premium travel & lifestyle experiences in Goa — beaches, waterfalls, festivals and adventures.',
            url: 'https://dayoutholidays.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://dayoutholidays.com/images/logo.png',
              width: 200,
              height: 60,
            },
            image: 'https://dayoutholidays.com/images/hero-bg.jpg',
            areaServed: {
              '@type': 'State',
              name: 'Goa',
              addressCountry: 'IN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              availableLanguage: ['English', 'Hindi'],
            },
            sameAs: [
              'https://www.instagram.com/dayout_holidays/',
              'https://www.facebook.com/p/Dayout-Holidays-100087241266220/',
            ],
          })}}
        />
      </head>
      <body>
        <EnquiryPopup />
        {children}
      </body>
    </html>
  );
}
