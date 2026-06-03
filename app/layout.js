import Script from 'next/script';
import './globals.css';
import EnquiryPopup from '@/components/EnquiryPopup';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const BASE_URL = 'https://dayoutholidays.com';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much does a Goa trip cost?', acceptedAnswer: { '@type': 'Answer', text: 'Our packages start from ₹3,599 per person for budget trips up to ₹7,000 per person for premium getaways. Contact us for a custom quote.' } },
    { '@type': 'Question', name: 'What is the best time to visit Goa?', acceptedAnswer: { '@type': 'Answer', text: 'October to February is peak season with ideal weather. March–May offers fewer crowds and better deals. June–September is monsoon — great for waterfalls and lush scenery.' } },
    { '@type': 'Question', name: 'Do you arrange airport transfers?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all our packages include or optionally include private AC cab transfers from Goa airport to your hotel and back.' } },
    { '@type': 'Question', name: 'Can I customise my itinerary?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Every trip is tailored to you. Add or remove activities, upgrade accommodation, or extend your stay. WhatsApp us and we respond within 24 hours.' } },
    { '@type': 'Question', name: 'What is your cancellation policy?', acceptedAnswer: { '@type': 'Answer', text: 'Cancellations 48+ hours before the trip receive a full refund. Within 48 hours may incur a partial charge. We also offer free rescheduling once per booking.' } },
    { '@type': 'Question', name: 'Do you offer group discounts?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — groups of 10+ get special rates. We have dedicated Student Group and College packages from ₹3,599/person. Contact us for a group quotation.' } },
  ],
};

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
    'things to do in Goa', 'Goa trip planner', 'Goa holiday packages', 'Goa tour operator',
  ],
  authors: [{ name: 'DayOut Travel', url: BASE_URL }],
  creator: 'DayOut Travel',
  publisher: 'DayOut Travel',
  category: 'Travel & Lifestyle',

  alternates: { canonical: BASE_URL },

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
      { url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'DayOut – Premium Travel & Lifestyle in Goa' },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@dayout_holidays',
    creator: '@dayout_holidays',
    title: 'DayOut – Premium Travel & Lifestyle in Goa',
    description: 'Your premium guide to Goa\'s most unforgettable beaches, waterfalls, and adventures.',
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
    // google: 'your-google-search-console-token',
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

        {/* TravelAgency structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'DayOut',
            alternateName: 'DayOut Holidays',
            description: 'Premium travel & lifestyle experiences in Goa — beaches, waterfalls, festivals and adventures.',
            url: BASE_URL,
            telephone: '+918848965352',
            email: 'dayoutholidays@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Opposite Union Bank, Chakkalakkal Building Rajakumary',
              addressLocality: 'Rajakumary',
              addressRegion: 'Kerala',
              postalCode: '685619',
              addressCountry: 'IN',
            },
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_URL}/images/logo.png`,
              width: 200,
              height: 60,
            },
            image: `${BASE_URL}/images/hero-bg.jpg`,
            areaServed: {
              '@type': 'State',
              name: 'Goa',
              addressCountry: 'IN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+918848965352',
              contactType: 'customer support',
              availableLanguage: ['English', 'Hindi', 'Malayalam'],
              contactOption: 'TollFree',
            },
            sameAs: [
              'https://www.instagram.com/dayout_holidays/',
              'https://www.facebook.com/p/Dayout-Holidays-100087241266220/',
            ],
          })}}
        />

        {/* FAQPage structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(FAQ_SCHEMA)}}
        />
      </head>
      <body>
        <EnquiryPopup />
        <WhatsAppFloat />
        {children}

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
