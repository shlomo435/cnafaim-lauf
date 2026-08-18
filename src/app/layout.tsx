import type { Metadata } from 'next';
import { Heebo, Rubik } from 'next/font/google';
import './globals.css';
import AccessibilityMenu from '../components/AccessibilityMenu';
import FloatingContact from '../components/FloatingContact';
import BuiltByPropel from '../components/BuiltByPropel';
import SiteFooter from '../components/SiteFooter';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://cnafim-lauf.co.il'),
  title: 'מטפלת רגשית והוראה מתקנת בנתיבות והדרום | כנפיים לעוף - גאולה אלון',
  description: 'מטפלת רגשית והוראה מתקנת בנתיבות ובכל אזור הדרום, וגם בזום. גאולה אלון - טיפול רגשי, אבחונים לימודיים והוראה מתקנת לילדים, נערות ונשים. מעל 20 שנות ניסיון.',
  openGraph: {
    title: 'מטפלת רגשית והוראה מתקנת בנתיבות והדרום | כנפיים לעוף - גאולה אלון',
    description: 'מטפלת רגשית והוראה מתקנת בנתיבות ובכל הדרום, וגם בזום. טיפול רגשי ואבחונים לימודיים לילדים, נערות ונשים.',
    url: 'https://cnafim-lauf.co.il',
    siteName: 'כנפיים לעוף',
    images: [
      {
        url: 'https://cnafim-lauf.co.il/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'כנפיים לעוף - מרכז טיפולי-לימודי',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מטפלת רגשית והוראה מתקנת בנתיבות והדרום | כנפיים לעוף - גאולה אלון',
    description: 'מטפלת רגשית והוראה מתקנת בנתיבות ובכל הדרום, וגם בזום. טיפול רגשי ואבחונים לימודיים לילדים, נערות ונשים.',
    images: ['https://cnafim-lauf.co.il/og-image.jpg'],
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
      className={`${heebo.variable} ${rubik.variable}`}
    >
      <head>
        {/* Mark JS as available before first paint. `.sr` content is hidden-for-
            animation only under html.js; without working JS it stays fully visible,
            so the page never depends on JS just to render its content. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">
        <noscript>
          <style>{'.sr { opacity: 1 !important; transform: none !important; }'}</style>
        </noscript>
        <a href="#main-content" className="skip-link">דלג לתוכן</a>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
        <BuiltByPropel />
        <FloatingContact />
        <AccessibilityMenu />
      </body>
    </html>
  );
}
