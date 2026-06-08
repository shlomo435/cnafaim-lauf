import type { Metadata } from 'next';
import { Heebo, Rubik, Frank_Ruhl_Libre, Assistant } from 'next/font/google';
import './globals.css';
import AccessibilityMenu from '../components/AccessibilityMenu';

const heebo = Heebo({
  subsets: ['hebrew'],
  variable: '--font-heebo',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['hebrew'],
  variable: '--font-rubik',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew'],
  variable: '--font-frank-ruhl',
  weight: ['400', '500'],
  display: 'swap',
});

const assistant = Assistant({
  subsets: ['hebrew'],
  variable: '--font-assistant',
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cnafaim-lauf.netlify.app'),
  title: 'מרכז טיפולי-לימודי לילדים ונשים | CBT, NLP והוראה מתקנת | גאולה אלון',
  description: 'ליווי לצמיחה, חיזוק וחיבור עצמי לילדים, נערות ונשים. גאולה אלון, מטפלת ומאבחנת עם מעל 20 שנות ניסיון.',
  openGraph: {
    title: 'מרכז טיפולי-לימודי לילדים ונשים | CBT, NLP והוראה מתקנת | גאולה אלון',
    description: 'ליווי לצמיחה, חיזוק וחיבור עצמי לילדים, נערות ונשים.',
    url: 'https://cnafaim-lauf.netlify.app',
    siteName: 'כנפיים לעוף',
    images: [
      {
        url: 'https://cnafaim-lauf.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'כנפיים לעוף — מרכז טיפולי-לימודי',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מרכז טיפולי-לימודי לילדים ונשים | CBT, NLP והוראה מתקנת | גאולה אלון',
    description: 'ליווי לצמיחה, חיזוק וחיבור עצמי לילדים, נערות ונשים.',
    images: ['https://cnafaim-lauf.netlify.app/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${rubik.variable} ${frankRuhl.variable} ${assistant.variable}`}
    >
      <body className="antialiased">
        <noscript>
          <style>{'.sr { opacity: 1 !important; transform: none !important; }'}</style>
        </noscript>
        {children}
        <AccessibilityMenu />
      </body>
    </html>
  );
}
