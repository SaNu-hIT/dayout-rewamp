import Script from 'next/script';
import './globals.css';
import EnquiryPopup from '@/components/EnquiryPopup';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const BASE_URL = 'https://dayoutholidays.com';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const SITE_TITLE = 'DayOut Holidays — Trips across India, planned from Kochi';
const SITE_DESCRIPTION =
  'Trips across India, planned end to end by our team in Kochi: Ladakh, Kashmir and Rajasthan in the North; Kerala, Goa and the islands in the South.';

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'DayOut Holidays — Trips across India, planned from Kochi',
    template: '%s | DayOut Holidays',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'DayOut Holidays', 'travel agency Kochi', 'India tour packages', 'North India tours',
    'South India tours', 'Ladakh trip', 'Kashmir tour', 'Kerala backwaters', 'Goa holiday packages',
    'Munnar tour', 'Rajasthan tour', 'tour operator Kerala',
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      { url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: SITE_TITLE },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@dayout_holidays',
    creator: '@dayout_holidays',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
            description: SITE_DESCRIPTION,
            url: BASE_URL,
            telephone: '+918848965352',
            email: 'dayoutholidays@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1st Floor, Paikayil Plaza, GAIL Road, Near Kalamassery, HMT Colony, North Kalamassery',
              addressLocality: 'Kalamassery',
              addressRegion: 'Kerala',
              postalCode: '683503',
              addressCountry: 'IN',
            },
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_URL}/images/logo.png`,
              width: 200,
              height: 60,
            },
            image: `${BASE_URL}/images/hero-bg.jpg`,
            areaServed: { '@type': 'Country', name: 'India' },
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
