import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../lib/site';

// Google Search Console verification code provided by user
const GOOGLE_SITE_VERIFICATION = 'UFBeuZAxS1jn-htwlLbKF7n7_4sQeXxJXfSbQy9yHuk';
// Google Analytics 4 Measurement ID provided by user
const GA4_MEASUREMENT_ID = 'G-96890P0222';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  // Google Search Console verification - active with real code
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        {children}
        {/* Google Analytics 4 Script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_MEASUREMENT_ID}');
            `,
          }}
        />
      </body>
    </html>
  );
}