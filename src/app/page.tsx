import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { C } from '../lib/tokens';
import { COPYRIGHT_LINE } from '../lib/site';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://cnafim-lauf.co.il/',
  },
};

// Explicit sr-delay class lookup - avoids dynamic string construction that
// confuses static analysis tools (sr-d1…sr-d5 are defined in globals.css).
const SR_DELAY = ['sr-d1', 'sr-d2', 'sr-d3', 'sr-d4', 'sr-d5'] as const;
const srDelay = (i: number) => SR_DELAY[Math.min(i, 4)];
import IntroAnimation from '../components/IntroAnimation';
import ScrollRevealClient from '../components/ScrollRevealClient';
import HeaderScrollClient from '../components/HeaderScrollClient';
import ContactFormClient from '../components/ContactFormClient';

// ======================
// DATA
// ======================

const services = [
  {
    title: 'ויסות רגשי וחרדות',
    description:
      'כלים פרקטיים לזיהוי, הבנה וניהול רגשות ומצבי חרדה בחיי היומיום, בגיל הילדות ובבגרות.',
  },
  {
    title: 'חיזוק ביטחון ודימוי עצמי',
    description:
      'בניית תחושת ערך עצמי יציבה, הכרה בייחודיות האישית ופיתוח משאבים פנימיים לחיים מיטיבים.',
  },
  {
    title: 'התמודדות עם משבר, שינוי וטראומה',
    description:
      'ליווי מקצועי ומיומן במצבי מעבר, אובדן, שינוי ואירועים טראומטיים, בגישה עדינה ומכילה.',
  },
  {
    title: 'קשיים חברתיים ורגשיים',
    description:
      'פיתוח מיומנויות חברתיות, כלים ליצירת קשרים משמעותיים ותחושת שייכות ומקום בעולם.',
  },
  {
    title: 'קשיי למידה, קריאה, כתיבה וקשב',
    description:
      'אבחון והתאמת כלים פדגוגיים לסגנון הלמידה הייחודי של כל ילד ונערה, תוך חיזוק הביטחון העצמי.',
  },
  {
    title: 'הוראה מתקנת',
    description:
      'עבודה ממוקדת ומותאמת אישית לחיזוק הקריאה, הכתיבה, הבנת הנקרא והביטחון הלימודי - בשילוב תנועה, תרגילי מוח וכלים מעשיים שמקדמים הצלחה.',
  },
];

const features = [
  {
    title: 'התאמה אישית',
    description: 'כל תהליך נבנה בהתאם לאישיות, לצרכים ולקצב הייחודי של כל מטופל.',
    slug: 'personalization',
  },
  {
    title: 'מרחב בטוח',
    description: 'סביבה חמה, קבלה ולא שיפוטית המאפשרת פתיחות ועיבוד אמיתי.',
    slug: 'safe-space',
  },
  {
    title: 'שילוב הורים',
    description: 'הורים הם שותפים מלאים בתהליך. מעורבותם מחזקת את השפעת הטיפול.',
    slug: 'parent-involvement',
  },
  {
    title: 'תהליכים ממוקדים',
    description: 'עבודה שיטתית עם יעדים ברורים, מדידים וניתנים להשגה בזמן.',
    slug: 'focused-processes',
  },
  {
    title: 'דיסקרטיות',
    description: 'שמירה מלאה על פרטיות המטופל ומשפחתו בכל שלב של הטיפול.',
    slug: 'discretion',
  },
];

// FAQ - single source for the visible section and the FAQPage structured data.
const homeFaq = [
  {
    q: 'איפה ממוקם המרכז ולאילו אזורים אתם נותנים שירות?',
    a: 'המרכז ממוקם בנתיבות ונותן שירות לכל אזור הדרום - אופקים, שדרות, אשקלון, באר שבע, קריית גת והיישובים שסביב. בנוסף, קיימת אפשרות לטיפולים ולמפגשים מרחוק בזום לכל מקום בארץ.',
  },
  {
    q: 'לאיזה גיל מתאים הטיפול?',
    a: 'המרכז מלווה ילדים, נערות ונשים - מהגיל הרך ועד בגרות. הכלים והשיטות מותאמים אישית לגיל ולצורך של כל מטופל, בין אם דרך משחק ותנועה אצל ילדים ובין אם דרך שיחה וכלים קוגניטיביים אצל מבוגרות.',
  },
  {
    q: 'מה ההבדל בין טיפול רגשי להוראה מתקנת, ואיך יודעים מה צריך?',
    a: 'טיפול רגשי עוסק ברגש, בביטחון ובהתמודדות; הוראה מתקנת עוסקת בקשיי קריאה, כתיבה וקשב. לעיתים קרובות קושי לימודי וקושי רגשי שזורים זה בזה. בשיחת ההיכרות ובאבחון קצר מבינים יחד מה המענה הנכון, ולעיתים משלבים בין השניים.',
  },
  {
    q: 'באילו שיטות טיפוליות את עובדת?',
    a: 'הגישה הוליסטית ומשלבת שיטות מוכחות: CBT (טיפול קוגניטיבי-התנהגותי), EMR (עיבוד רגשי בתנועות עיניים), NLP (תכנות נוירו-לשוני) והוראה מתקנת - כולן מותאמות אישית לצורך הספציפי של כל מטופל.',
  },
  {
    q: 'אפשר לקבל טיפול בזום?',
    a: 'כן. קיימת אפשרות לטיפולים ולמפגשים מרחוק בזום, יעילים ומותאמים גם לילדים וגם למבוגרות. זה מאפשר ליווי איכותי וגמיש מכל מקום בארץ, לצד מפגשים פנים אל פנים בנתיבות.',
  },
  {
    q: 'איך מתחילים תהליך?',
    a: 'מתחילים בשיחת היכרות קצרה ולא מחייבת, שבה מבינים יחד מה מטריד ומה הצעד הנכון. משם נבנה תהליך מותאם אישית. כל פנייה מטופלת בדיסקרטיות מלאה ובמהירות.',
  },
];

// ======================
// SHARED SERVER COMPONENTS
// ======================

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-3 md:mb-4">
      <p className="text-sm font-semibold tracking-[0.18em]" style={{ color: C.rose }}>
        {text}
      </p>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.rose, opacity: 0.45 }} />
    </div>
  );
}

function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`}>
      <div className="h-px flex-1 max-w-[120px]" style={{ backgroundColor: C.border }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.rose, opacity: 0.4 }} />
      <div className="h-px flex-1 max-w-[120px]" style={{ backgroundColor: C.border }} />
    </div>
  );
}

function Rule({ className = '' }: { className?: string }) {
  return (
    <div className={`w-12 h-px mt-4 mb-6 ${className}`} style={{ backgroundColor: C.border }} />
  );
}

function WavyDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-4 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 24" className="w-full max-w-lg h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,12 C40,3 80,21 120,12 C160,3 200,21 240,12 C280,3 320,21 360,12 C400,3 440,17 480,12"
          stroke={C.rose}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function RoseDot({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg className="w-2 h-2 flex-shrink-0" viewBox="0 0 8 8" fill="none" aria-hidden="true" style={{ opacity }}>
      <path d="M4 0.8L7.2 4L4 7.2L0.8 4L4 0.8Z" fill="#D81B8C" />
    </svg>
  );
}

// Server-safe CTA button - hover handled via CSS, no JS event handlers
function CtaButton({
  href,
  children,
  className = '',
  block = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  block?: boolean;
}) {
  return (
    <a
      href={href}
      className={twMerge(
        'text-sm font-medium text-center text-white transition-all duration-300 rounded-lg bg-[#D81B8C] hover:bg-[#AD1457]',
        block ? 'block w-full py-3.5' : 'inline-block px-8 py-3.5',
        className,
      )}
    >
      {children}
    </a>
  );
}

// ======================
// STRUCTURED DATA
// ======================

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': 'https://cnafim-lauf.co.il/#organization',
  name: 'כנפיים לעוף - מרכז טיפולי-לימודי',
  description:
    'מרכז רגשי-לימודי בנתיבות - הוראה מתקנת, טיפול רגשי ואבחונים לימודיים לילדים, נערות ונשים. שירות בכל אזור הדרום וגם בזום.',
  url: 'https://cnafim-lauf.co.il',
  telephone: '+972-50-296-1213',
  email: 'gehulaa@gmail.com',
  image: 'https://cnafim-lauf.co.il/og-image.jpg',
  logo: 'https://cnafim-lauf.co.il/logo.jpg',
  priceRange: '₪₪',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61585099706314',
    'https://www.instagram.com/gehula_alon',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'נתיבות',
    addressRegion: 'דרום',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.4231,
    longitude: 34.5889,
  },
  areaServed: [
    { '@type': 'City', name: 'נתיבות' },
    { '@type': 'City', name: 'אופקים' },
    { '@type': 'City', name: 'שדרות' },
    { '@type': 'City', name: 'אשקלון' },
    { '@type': 'City', name: 'באר שבע' },
    { '@type': 'City', name: 'קריית גת' },
    { '@type': 'AdministrativeArea', name: 'מחוז הדרום' },
  ],
  availableLanguage: { '@type': 'Language', name: 'Hebrew' },
  openingHours: ['Su-Th 09:00-18:00'],
  founder: {
    '@type': 'Person',
    name: 'גאולה אלון',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'גאולה אלון',
  jobTitle: 'מטפלת רגשית ומאבחנת לימודית',
  knowsAbout: [
    'CBT טיפול קוגניטיבי-התנהגותי',
    'NLP תכנות נוירו-לשוני',
    'EMR עיבוד תנועות עיניים',
    'הוראה מתקנת',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'כנפיים לעוף - מרכז טיפולי-לימודי',
  },
  telephone: '+972-50-296-1213',
  email: 'gehulaa@gmail.com',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61585099706314',
    'https://www.instagram.com/gehula_alon',
  ],
};

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

// ======================
// MAIN PAGE (Server Component)
// ======================

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />

      {/* Client scroll-reveal side-effect */}
      <ScrollRevealClient />

      {/* Intro animation (client) */}
      <IntroAnimation />

      {/* The floating contact cluster (WhatsApp, drawer, mobile CTA) is mounted
          once in the root layout so it is present on every page. */}

      {/* ===== HEADER ===== */}
      <HeaderScrollClient />

      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden flex flex-col min-h-[calc(100dvh-80px)] md:min-h-screen"
        style={{ background: 'linear-gradient(to bottom, #FFF0F6 0%, #F3E8FF 100%)' }}
      >
        {/* Subtle dot texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #F8BBD9 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
            opacity: 0.4,
          }}
        />

        {/* Centered content column - no justify-between so content never clips */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-4 pb-4 md:justify-center md:flex-1">

          {/* Tag */}
          <p
            className="text-xs font-semibold tracking-[0.24em] mb-2 uppercase"
            style={{ color: C.textMid }}
          >
            מרכז טיפולי-לימודי
          </p>

          {/* H1 heading - clamp corrected: min 1.8rem so it never shrinks below readable */}
          <h1
            className="font-display font-medium leading-snug tracking-tight mb-1"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 4rem)' }}
            aria-label="מרכז רגשי לימודי לילדים, נערות ונשים"
          >
            <span style={{ color: C.textDark }}>מרכז </span>
            <strong style={{ color: C.rose, fontWeight: 700 }}>רגשי</strong>
            <span style={{ color: C.textDark }}> לימודי</span>
            <br />
            <span style={{ color: C.textDark }}>לילדים, </span>
            <strong style={{ color: C.rose, fontWeight: 700 }}>נערות</strong>
            <span style={{ color: C.textDark }}> ונשים</span>
          </h1>

          {/* Image - natural 854x1280 portrait ratio so the full photo is visible (no crop), width capped so it stays balanced */}
          <div className="relative w-full max-w-[280px] md:max-w-[340px] mt-2 rounded-2xl overflow-hidden aspect-[854/1280]">
            <Image
              src="/founder_speaking.jpg"
              alt="גאולה אלון, מטפלת רגשית ומנהלת המרכז, כנפיים לעוף"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 280px, 340px"
            />
          </div>

          {/* Credits */}
          <p className="mt-4 text-base font-medium" style={{ color: C.textMid }}>
            <strong style={{ color: '#3949AB' }}>גאולה אלון</strong>
            {' | CBT · EMR · NLP · הוראה מתקנת'}
          </p>

          {/* CTA button - desktop only (mobile uses fixed bottom bar) */}
          <a
            href="#contact"
            className="hidden lg:inline-block mt-5 mb-2 px-8 py-3 text-white text-base font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: C.rose, boxShadow: '0 6px 24px rgba(216,27,140,0.22)' }}
          >
            לתיאום שיחת היכרות ←
          </a>
        </div>

        {/* Services strip */}
        <div
          className="relative z-10 px-5 py-5 md:py-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.85)', borderTop: `1px solid ${C.borderLight}` }}
        >
          <div className="max-w-4xl mx-auto text-center md:flex md:flex-wrap md:justify-center md:gap-x-1">
            {['הוראה מתקנת', 'טיפולים רגשיים', 'אבחונים תפקודיים לימודיים', 'הדרכת הורים'].map((item, i, arr) => (
              <React.Fragment key={item}>
                <span className="block md:inline text-base font-light" style={{ color: C.textMid }}>
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span className="hidden md:inline text-base mx-2" style={{ color: C.rose }}>•</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="mt-3 text-sm font-light italic text-center" style={{ color: C.rose }}>
            מקום שמעניק לילדים כלים, ביטחון וכנפיים לצמוח, להתמודד ולהאמין בעצמם
          </p>
          <div
            className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm font-medium"
            style={{ color: C.textHeading }}
          >
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s-7-5.686-7-11a7 7 0 0 1 14 0c0 5.314-7 11-7 11z" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              נתיבות
            </span>
            <span style={{ color: C.rose }}>·</span>
            <span>שירות בכל אזור הדרום</span>
            <span style={{ color: C.rose }}>·</span>
            <span>גם בזום</span>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 lg:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Portrait - desktop only. Natural 733x1280 ratio, capped width, centered - full photo visible */}
          <div className="hidden md:flex justify-center relative sr sr-d1">
            <div
              className="relative w-full max-w-[360px] aspect-[733/1280] rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.borderLight}`, boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}
            >
              <Image
                src="/founder_portrait.jpg"
                alt="גאולה אלון, מטפלת רגשית ומאבחנת לימודית, מרכז כנפיים לעוף נתיבות"
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
          </div>

          {/* Text column */}
          <div className="text-center sr sr-d2">
            <SectionLabel text="אודות" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              גאולה אלון
            </h2>
            <Rule className="mx-auto" />
            <div className="space-y-4 font-light leading-[1.8] text-[1.05rem]" style={{ color: C.textMid }}>
              <p>
                בעלת תואר שני בחינוך ומעל עשרים שנה של ניסיון קליני ולימודי עם ילדים, נערות ונשים.
                הדרך לשינוי אמיתי עוברת דרך הבנה עמוקה ומכילה של הצרכים הייחודיים של כל אדם,
                ומתוך מרחב שמרגיש כמו בית.
              </p>
              <p>
                הגישה הטיפולית הוליסטית משלבת שיטות מוכחות: טיפול קוגניטיבי-התנהגותי (CBT),
                EMR ו-NLP, כולן מותאמות אישית לפי הצורך הספציפי של כל מטופל, בכל שלב בדרך.
              </p>
              <p>
                אני מאמינה שכל אדם נושא בתוכו משאבים ויכולות. תפקידי הוא לעזור לך לגלות
                אותם, לחזק אותם ולהשתמש בהם כדי לצמוח ולחיות חיים מלאים ומשמעותיים.
              </p>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { num: '+20', label: 'שנות ניסיון' },
                { num: 'CBT',  label: 'טיפול קוגניטיבי' },
                { num: 'NLP',  label: 'נוירו-לשוני' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl py-4 px-2 border"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
                >
                  <div className="font-display text-2xl font-semibold" style={{ color: C.textHeading }}>{stat.num}</div>
                  <div className="text-sm mt-1 font-light" style={{ color: C.textLight }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <WavyDivider />
      </div>

      {/* ===== METHODS & EXPERTISE ===== */}
      <section id="methods" className="py-7 md:py-12 lg:py-14" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 lg:mb-16 sr">
            <SectionLabel text="גישה טיפולית" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              הגישה הטיפולית ותחומי המומחיות
            </h2>
          </div>

          {/* Methods intro */}
          <div className="text-center max-w-3xl mx-auto sr sr-d1">
            <Rule className="mx-auto" />
            <p className="text-[1.05rem] font-light leading-[1.8]" style={{ color: C.textMid }}>
              במסגרת הטיפול, המטופל מקבל שילוב מדויק של מגוון כלים מתקדמים, המותאמים אישית לתוצאה האפקטיבית ביותר:
            </p>
          </div>

          {/* Method cards - full-width row */}
          <div className="mt-7 md:mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch sr sr-d2">
            {[
              {
                method: 'CBT',
                label: 'קוגניטיבי-התנהגותי',
                desc: 'זיהוי ושינוי דפוסי חשיבה והתנהגות שליליים המגבילים את איכות החיים.',
                href: '/methods/cbt',
              },
              {
                method: 'EMR',
                label: 'עיבוד תנועות עיניים',
                desc: 'עיבוד רגשי ותנועות עיניים לטיפול בטראומה, חרדות ומצוקה רגשית עמוקה.',
                href: '/methods/emr',
              },
              {
                method: 'NLP',
                label: 'תכנות נוירו-לשוני',
                desc: 'שינוי דפוסים מנטליים ורגשיים לשיפור יכולות, ביטחון עצמי ותקשורת.',
                href: '/methods/nlp',
              },
              {
                method: 'הוראה מתקנת',
                label: 'חיזוק מיומנויות למידה דרך תנועה ותרגילי מוח',
                desc: 'עבודה ממוקדת ומותאמת אישית לחיזוק הקריאה, הכתיבה, הבנת הנקרא והביטחון הלימודי - בשילוב תנועה, תרגילי מוח וכלים מעשיים שמקדמים הצלחה.',
                href: '/methods/remedial',
              },
            ].map(({ method, label, desc, href }) => (
              <Link
                key={method}
                href={href}
                className="rounded-xl p-5 border border-[#F8BBD9] text-center transition-all duration-300 flex flex-col hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(57,73,171,0.07)] hover:-translate-y-1"
                style={{ backgroundColor: C.cream }}
              >
                <div className="font-display text-2xl font-semibold mb-1" style={{ color: C.textHeading }}>{method}</div>
                <div className="text-xs font-medium tracking-wide mb-2.5" style={{ color: C.rose }}>{label}</div>
                <p className="text-sm leading-[1.7] font-light flex-1" style={{ color: C.textMid }}>{desc}</p>
                <div className="mt-3 text-sm font-medium" style={{ color: C.rose }}>לפרטים →</div>
              </Link>
            ))}
          </div>

          {/* Expertise - full width */}
          <div className="mt-10 md:mt-14 text-center sr sr-d3">
            <p className="text-[1.05rem] font-light leading-[1.8] mb-5" style={{ color: C.textMid }}>
              ניסיון רב ומוכח בתחומים הבאים:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-w-4xl mx-auto">
              {[
                'ויסות רגשי וחרדות',
                'חיזוק ביטחון ודימוי עצמי',
                'התמודדות עם מצבי משבר, שינוי וטראומה',
                'קשיים חברתיים ורגשיים',
                'קשיי למידה, קריאה, כתיבה וקשב',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-3 rounded-xl px-4 py-3 border border-[#F8BBD9]"
                  style={{ backgroundColor: C.cream }}
                >
                  <RoseDot />
                  <span className="text-sm font-light" style={{ color: C.textMid, lineHeight: '1.7' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-8 md:mt-10 rounded-md p-6 md:p-8 text-center border border-[#F8BBD9] sr"
            style={{ backgroundColor: C.cream }}
          >
            <p className="text-[1.05rem] font-light leading-[1.8] max-w-4xl mx-auto" style={{ color: C.textMid }}>
              המרכז שם דגש על עבודה בשיתוף ההורים, הקשבה עמוקה, בניית אמון, ומתן כלים פרקטיים ליום-יום - כדי שהשינוי לא יישאר רק בחדר הטיפול, אלא ילווה גם את החיים עצמם.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-7 md:py-12 lg:py-14" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 sr">
            <SectionLabel text="תחומי טיפול" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              במה אני יכולה לעזור
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`sr ${srDelay(i)} group relative rounded-xl p-6 md:p-8 text-center border border-[#F8BBD9] transition-all duration-300 hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1`}
                style={{ backgroundColor: C.cream }}
              >
                {service.title === 'הוראה מתקנת' ? (
                  <div className="mb-5 flex justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#D81B8C" strokeWidth="1.6" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5" stroke="#D81B8C" strokeWidth="1.6" strokeLinejoin="round"/>
                      <path d="M2 12l10 5 10-5" stroke="#D81B8C" strokeWidth="1.6" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-px mb-5 transition-all duration-300 group-hover:w-14" style={{ backgroundColor: C.rose, opacity: 0.5 }} />
                )}
                <h3 className="font-display text-xl font-medium mb-2.5" style={{ color: C.textHeading, letterSpacing: '-0.02em' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-[1.8] font-light" style={{ color: C.textMid }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== LECTURES & TRAINING ===== */}
      <section id="lectures" className="py-7 md:py-12 lg:py-14" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* Section heading - mobile only (desktop heading is inside text column) */}
          <div className="text-center mb-6 md:hidden sr">
            <SectionLabel text="הרצאות והדרכות" />
            <h2
              className="font-display text-3xl font-medium leading-snug"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              הרצאות והדרכות להורים, צוותי חינוך וקהילה
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">

            {/* Image column - natural 461x1024 story-format ratio, capped width, centered - full photo visible */}
            <div className="relative flex justify-center order-2 md:order-1 sr sr-d1">
              <div
                className="relative w-full max-w-[300px] aspect-[461/1024] rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${C.borderLight}`, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}
              >
                <Image
                  src="/conference_audience.jpg"
                  alt="גאולה אלון בהרצאה להורים וצוותי חינוך, מרכז כנפיים לעוף"
                  fill
                  className="object-cover"
                  sizes="300px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text column */}
            <div className="text-center order-1 md:order-2 sr sr-d2">
              <SectionLabel text="הרצאות והדרכות" />
              <h2
                className="font-display text-3xl md:text-4xl font-medium leading-snug"
                style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
              >
                הרצאות והדרכות להורים, צוותי חינוך וקהילה
              </h2>
              <Rule className="mx-auto" />
              <div className="space-y-4 font-light leading-[1.8] text-[1.05rem]" style={{ color: C.textMid }}>
                <p>
                  הרצאות מקצועיות וחווייתיות בנושאים רגשיים, חינוכיים ולימודיים, המיועדות להורים,
                  צוותי חינוך, בתי ספר, גנים וקהילות.
                </p>
                <p>
                  ההרצאות משלבות ידע מקצועי מעולמות הטיפול הרגשי, CBT והעבודה החינוכית, לצד
                  כלים פרקטיים שניתן לקחת מיד לחיי היום-יום.
                </p>
              </div>

              <div className="mt-6 md:mt-8">
                <p className="text-sm font-semibold mb-4 text-center" style={{ color: C.textHeading }}>
                  בין נושאי ההרצאות:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'חיזוק ביטחון עצמי אצל ילדים',
                    'ויסות רגשי והתמודדות עם חרדות',
                    'פיתוח מיומנויות חברתיות',
                    'הצבת גבולות וחיזוק הקשר בין הורים לילדים',
                    'הבנת הקשר בין קושי רגשי לקשיי למידה',
                    'כלים מעשיים לתקשורת מקרבת בבית ובמסגרת החינוכית',
                  ].map((item) => (
                    <li key={item} className="flex items-center justify-center gap-3">
                      <RoseDot opacity={0.65} />
                      <span className="text-sm font-light" style={{ color: C.textMid, lineHeight: '1.7' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 md:mt-8 flex justify-center">
                <CtaButton href="#contact">לפרטים ותיאום הרצאה</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== THERAPY CARDS ===== */}
      <section id="cards" className="py-7 md:py-12 lg:py-14" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          <div className="text-center mb-8 md:mb-12 lg:mb-16 sr">
            <SectionLabel text="קלפים טיפוליים" />
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-snug"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              קלפים שמדליקים אור בכל ילד
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">

            {/* Cards image */}
            <div className="relative flex flex-col items-center gap-6 order-2 md:order-1 sr sr-d1">
              <div
                className="relative w-full max-w-[340px] aspect-[860/1280] rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${C.borderLight}`, boxShadow: '0 4px 28px rgba(57,73,171,0.08)' }}
              >
                <Image
                  src="/therapy_cards_box.jpg"
                  alt="קלפי ניצוץ"
                  fill
                  className="object-cover"
                  sizes="340px"
                  loading="lazy"
                />
              </div>
              <CtaButton href="#contact">לפרטים ורכישה</CtaButton>
            </div>

            {/* Cards text */}
            <div className="text-center order-1 md:order-2 sr sr-d2">
              <Rule className="mx-auto" />
              <div className="space-y-5 font-light leading-[1.8] text-[1.05rem]" style={{ color: C.textMid }}>
                <p>
                  קלפי &quot;ניצוץ&quot; נוצרו כדי לתת לכל ילד מרחב בטוח לביטוי עצמי. כל קלף
                  מזמין שיחה שמאפשרת לילד לבטא את עולמו הרגשי, להתחבר לכוחות הפנימיים
                  שלו, ולחוות שהוא נראה, נשמע ומוערך.
                </p>
                <p>
                  הקלפים פועלים כגשר תקשורת בין הורים לילדים. הם יוצרים שפה משותפת
                  שמחזקת ומעמיקה את הקשר, בונה אמון ופותחת דיאלוג פתוח ואמיתי.
                </p>
                <p>
                  שימוש קבוע בהם מסייע לילדים לפתח חוסן, לזהות את חוזקותיהם
                  ולהתמודד טוב יותר עם אתגרי החיים.
                </p>
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3">
                {[
                  { title: 'ביטוי עצמי',    subtitle: 'מרחב בטוח לעיבוד רגשות' },
                  { title: 'קשר הורי',       subtitle: 'גשר תקשורת ואמון' },
                  { title: 'דיאלוג פתוח',    subtitle: 'שיחות משמעותיות בבית' },
                  { title: 'עמידות רגשית',   subtitle: 'ביטחון עצמי וחוסן' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-4 text-center border border-[#F8BBD9] transition-all duration-300 hover:border-[#3949AB] hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                    style={{ backgroundColor: C.cream }}
                  >
                    <div className="text-base font-semibold mb-0.5" style={{ color: C.textHeading }}>{item.title}</div>
                    <div className="text-sm font-light" style={{ color: C.textLight }}>{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== APPROACH ===== */}
      <section id="approach" className="py-7 md:py-12 lg:py-14" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 sr">
            <SectionLabel text="הגישה שלי" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              מה מייחד את המרכז
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {features.map((feature, i) => (
              <Link
                key={feature.title}
                href={`/features/${feature.slug}`}
                className={`sr ${srDelay(i)} group rounded-xl p-5 text-center border border-[#F8BBD9] transition-all duration-300 hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1`}
                style={{ backgroundColor: C.cream }}
              >
                <div
                  className="w-8 h-8 rounded-full mb-4 flex items-center justify-center"
                  style={{ backgroundColor: C.creamAlt, border: `1px solid ${C.border}` }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: i % 2 === 0 ? C.rose : C.plum }}
                  />
                </div>
                <h3
                  className="font-display text-base font-semibold mb-2"
                  style={{ color: C.textHeading, letterSpacing: '-0.01em' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-[1.8] font-light" style={{ color: C.textMid }}>
                  {feature.description}
                </p>
                <p className="text-xs mt-3 font-medium" style={{ color: C.rose }}>קראו עוד →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-7 md:py-12 lg:py-14" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 sr">
            <SectionLabel text="שאלות נפוצות" />
            <h2
              className="font-display text-3xl md:text-4xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              כל מה שרציתם לדעת
            </h2>
          </div>
          <div className="space-y-3 sr sr-d1">
            {homeFaq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#F8BBD9] overflow-hidden"
                style={{ backgroundColor: C.cream }}
              >
                <summary
                  className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-right font-medium select-none"
                  style={{ color: C.textHeading }}
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    style={{ color: C.rose }}
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                  <span className="flex-1">{item.q}</span>
                </summary>
                <div className="px-5 pb-4 text-sm font-light leading-[1.9] text-right" style={{ color: C.textMid }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Divider between FAQ and contact (both on creamAlt) */}
      <div style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <SectionDivider />
        </div>
      </div>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="pt-7 pb-[88px] md:py-12 lg:py-14" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-6 md:gap-10 lg:gap-16 items-start">

            {/* Contact info */}
            <div className="md:col-span-2 text-center sr sr-d1">
              <SectionLabel text="יצירת קשר" />
              <h2
                className="font-display text-3xl md:text-4xl font-medium mb-4 md:mb-6 leading-snug"
                style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
              >
                מוזמנים לפנות
              </h2>
              <p className="font-light leading-[1.8] mb-6 md:mb-8 text-[1.05rem]" style={{ color: C.textMid }}>
                לשאלות, מידע נוסף או תיאום שיחת היכרות,
                אני כאן. כל פניה מטופלת בדיסקרטיות ובמהירות.
              </p>
              <div className="space-y-4 md:space-y-5 text-sm">
                <div className="flex flex-col text-center gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>טלפון</span>
                  <a
                    href="tel:0502961213"
                    className="font-light transition-colors text-[#3949AB] hover:text-[#D81B8C]"
                    style={{ direction: 'ltr' }}
                  >
                    050-296-1213
                  </a>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>אימייל</span>
                  <a
                    href="mailto:gehulaa@gmail.com"
                    className="font-light transition-colors text-[#3949AB] hover:text-[#D81B8C]"
                    style={{ direction: 'ltr' }}
                  >
                    gehulaa@gmail.com
                  </a>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>מיקום</span>
                  <span className="font-light" style={{ color: C.textDark }}>ישראל</span>
                  <span className="text-sm font-medium leading-relaxed mt-1" style={{ color: C.textHeading }}>
                    קיימת אפשרות לטיפולים מרחוק באמצעות פגישות Zoom.
                  </span>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>שעות פעילות</span>
                  <span className="font-light" style={{ color: C.textDark }}>ראשון עד חמישי, 09:00 עד 18:00</span>
                </div>
              </div>
            </div>

            {/* Contact form - client island */}
            <ContactFormClient />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="pt-8 pb-[88px] md:pt-12 md:pb-10 lg:pb-12" style={{ backgroundColor: C.plum }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-right pb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>

            {/* Logo + tagline */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <Link href="/" aria-label="כנפיים לעוף - דף הבית">
                <Image
                  src="/logo.jpg"
                  alt="כנפיים לעוף"
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain"
                  style={{ maxWidth: 160, mixBlendMode: 'screen', opacity: 0.9 }}
                />
              </Link>
              <p className="text-sm font-light leading-relaxed max-w-[200px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                מרכז רגשי-לימודי לילדים, נערות ונשים
              </p>
            </div>

            {/* Quick nav */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs font-semibold tracking-[0.2em] mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>ניווט מהיר</p>
              {[
                ['אודות',         '#about'],
                ['מטפלת רגשית',   '/metapel-regashi'],
                ['הוראה מתקנת',   '/methods/remedial'],
                ['גישה טיפולית',  '#methods'],
                ['תחומי טיפול',   '#services'],
                ['הרצאות',        '#lectures'],
                ['בלוג',          '/blog/'],
                ['יצירת קשר',     '#contact'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm font-light transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <p className="text-xs font-semibold tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.45)' }}>יצירת קשר</p>
              <a
                href="tel:0502961213"
                className="text-sm font-light transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.7)', direction: 'ltr' }}
              >
                050-296-1213
              </a>
              <a
                href="mailto:gehulaa@gmail.com"
                className="text-sm font-light transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.7)', direction: 'ltr' }}
              >
                gehulaa@gmail.com
              </a>
              <p className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.6)' }}>
                ראשון-חמישי, 09:00-18:00
              </p>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href="https://www.facebook.com/profile.php?id=61585099706314"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="עמוד הפייסבוק של כנפיים לעוף"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:text-white hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/gehula_alon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="עמוד האינסטגרם של כנפיים לעוף"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:text-white hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
              <a
                href="#contact"
                className="mt-1 inline-block px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: C.rose, color: 'white', boxShadow: '0 4px 16px rgba(216,27,140,0.25)' }}
              >
                לתיאום שיחת היכרות
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 text-center">
            <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {COPYRIGHT_LINE}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
