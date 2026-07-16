import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';

const BASE = 'https://cnafim-lauf.co.il';
const PAGE_URL = `${BASE}/metapel-regashi`;

const AREAS = [
  'נתיבות', 'אופקים', 'שדרות', 'אשקלון', 'באר שבע', 'קריית גת', 'שדות נגב', 'מרחבים',
];

const METHODS = [
  {
    name: 'CBT',
    label: 'קוגניטיבי-התנהגותי',
    desc: 'זיהוי ושינוי דפוסי חשיבה והתנהגות שמגבילים את איכות החיים. כלים פרקטיים לחרדה, פחדים וויסות.',
    href: '/methods/cbt',
  },
  {
    name: 'EMR',
    label: 'עיבוד תנועות עיניים',
    desc: 'הגעה לשורש הרגשי גם כשמילים לא מספיקות. יעיל לטראומה, מצוקה עמוקה ודפוסים ישנים.',
    href: '/methods/emr',
  },
  {
    name: 'NLP',
    label: 'תכנות נוירו-לשוני',
    desc: 'עבודה על דפוסי חשיבה ושפה פנימית לחיזוק ביטחון עצמי, מסוגלות ותקשורת.',
    href: '/methods/nlp',
  },
];

const FAQ = [
  {
    q: 'מה ההבדל בין מטפלת רגשית לבין פסיכולוגית?',
    a: 'מטפלת רגשית מתמקדת בליווי רגשי, במתן כלים פרקטיים ובעבודה על דפוסים, ביטחון וחוסן. בשונה מאבחון פסיכולוגי פורמלי, הדגש הוא על תהליך חם, מותאם אישית ומעשי. אני משלבת מספר שיטות מוכחות (CBT, EMR, NLP) ומתאימה אותן לכל מטופל.',
  },
  {
    q: 'מאיזה גיל אפשר לפנות לטיפול רגשי?',
    a: 'אפשר לפנות בכל גיל, מהגיל הרך ועד בגרות. הכלים והשיטות מותאמים לגיל: אצל ילדים דרך משחק, תנועה ושיחה מותאמת, ואצל נערות ונשים דרך שיחה וכלים קוגניטיביים ורגשיים.',
  },
  {
    q: 'כמה זמן נמשך תהליך טיפולי?',
    a: 'תלוי בסוג הקושי ובמטרות. קשיים ממוקדים יכולים להשתנות תוך מספר חודשים, בעוד תהליכים עמוקים יותר לוקחים זמן רב יותר. כבר מהמפגשים הראשונים מרגישים הקלה וכיוון.',
  },
  {
    q: 'האם הטיפול מתאים גם לנשים ומבוגרות?',
    a: 'בהחלט. אני מלווה נשים בהתמודדות עם חרדה, שחיקה, ביקורת עצמית, משברים ותקופות מעבר. הטיפול נותן מרחב בטוח, כלים מעשיים וחיזוק של הביטחון והחוסן האישי.',
  },
  {
    q: 'האם אפשר לקבל טיפול רגשי בזום?',
    a: 'כן. טיפול רגשי מרחוק בזום יעיל מאוד גם לילדים וגם למבוגרות, ומאפשר נגישות וגמישות מכל מקום בארץ - בלי להתפשר על האיכות ועל החיבור.',
  },
  {
    q: 'איך מתחילים?',
    a: 'מתחילים בשיחת היכרות קצרה ולא מחייבת, שבה נבין יחד מה מטריד, מה מתאים ומה הצעד הנכון. משם בונים תהליך שמותאם אישית אליך או לילד/ה שלך.',
  },
];

export const metadata: Metadata = {
  title: 'מטפלת רגשית בנתיבות ובדרום | גאולה אלון - כנפיים לעוף',
  description:
    'מטפלת רגשית בנתיבות ובכל אזור הדרום, וגם בזום. גאולה אלון - טיפול רגשי לילדים, נערות ונשים בגישה חמה ומותאמת אישית, בשילוב CBT, EMR ו-NLP. מעל 20 שנות ניסיון.',
  keywords: [
    'מטפלת רגשית',
    'מטפלת רגשית נתיבות',
    'מטפלת רגשית בדרום',
    'טיפול רגשי לילדים',
    'מטפלת רגשית לנשים',
    'טיפול רגשי בזום',
    'גאולה אלון',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'מטפלת רגשית בנתיבות ובדרום | גאולה אלון',
    description:
      'טיפול רגשי לילדים, נערות ונשים - בנתיבות, בכל הדרום וגם בזום. גישה חמה ומותאמת אישית.',
    url: PAGE_URL,
    type: 'article',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'בית', item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'מטפלת רגשית', item: PAGE_URL },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'טיפול רגשי',
  name: 'טיפול רגשי - מטפלת רגשית גאולה אלון',
  description:
    'טיפול רגשי לילדים, נערות ונשים בגישה חמה ומותאמת אישית, בשילוב CBT, EMR ו-NLP. בנתיבות, בכל אזור הדרום וגם בזום.',
  url: PAGE_URL,
  provider: {
    '@type': 'Person',
    name: 'גאולה אלון',
    jobTitle: 'מטפלת רגשית ומאבחנת לימודית',
    url: BASE,
  },
  areaServed: [
    ...AREAS.map((name) => ({ '@type': 'City', name })),
    { '@type': 'AdministrativeArea', name: 'מחוז הדרום' },
  ],
  availableChannel: [
    {
      '@type': 'ServiceChannel',
      name: 'מפגשים פנים אל פנים בנתיבות',
      serviceLocation: {
        '@type': 'Place',
        name: 'כנפיים לעוף - נתיבות',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'נתיבות',
          addressRegion: 'דרום',
          addressCountry: 'IL',
        },
      },
    },
    {
      '@type': 'ServiceChannel',
      name: 'מפגשים מרחוק בזום',
      serviceUrl: `${BASE}/#contact`,
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

// ── Small server components ────────────────────────────────────────────────
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display text-2xl md:text-3xl font-medium mt-12 mb-4 leading-snug"
      style={{ color: C.textDark, letterSpacing: '-0.02em' }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: C.textDark, fontWeight: 600 }}>{children}</strong>;
}

export default function EmotionalTherapistPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* X close button - fixed top-left */}
      <Link
        href="/"
        aria-label="סגור וחזור לאתר"
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
        style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          border: `1px solid ${C.border}`,
          color: C.textMid,
          boxShadow: '0 2px 14px rgba(57,73,171,0.12)',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M11.5 3.5L3.5 11.5M3.5 3.5l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </Link>

      {/* ① LOGO + SUBTITLE */}
      <section className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.jpg"
            alt="כנפיים לעוף - מטפלת רגשית בנתיבות"
            width={240}
            height={80}
            className="h-16 md:h-20 w-auto object-contain"
            style={{ maxWidth: 240, mixBlendMode: 'multiply' }}
            priority
          />
        </Link>
        <p
          className="mt-3 text-sm md:text-[0.95rem] font-light tracking-[0.18em] uppercase"
          style={{ color: C.textLight }}
        >
          מרכז רגשי לימודי · נתיבות והדרום
        </p>
      </section>

      {/* ② HERO IMAGE + TAGLINE PANEL */}
      <section className="px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
        <div
          className="w-full overflow-hidden rounded-t-3xl pt-6 md:pt-10 px-6 flex justify-center"
          style={{ boxShadow: '0 16px 48px rgba(57,73,171,0.13)', backgroundColor: C.creamDeep }}
        >
          {/* Natural 733x1280 portrait ratio, capped width and centered - full photo visible */}
          <div className="relative w-full max-w-[360px] aspect-[733/1280] rounded-2xl overflow-hidden">
            <Image
              src="/founder_portrait.jpg"
              alt="גאולה אלון - מטפלת רגשית ומאבחנת לימודית, מרכז כנפיים לעוף נתיבות"
              fill
              className="object-cover"
              sizes="360px"
              priority
            />
          </div>
        </div>

        {/* ③ TEXT PANEL below image */}
        <div
          className="rounded-b-3xl px-6 md:px-14 py-7 md:py-9 text-center"
          style={{ backgroundColor: C.creamDeep }}
        >
          <p
            className="text-base md:text-lg font-medium leading-loose"
            style={{ color: C.textDark }}
          >
            טיפול רגשי&nbsp;&nbsp;/&nbsp;&nbsp;ילדים ונוער&nbsp;&nbsp;/&nbsp;&nbsp;נשים&nbsp;&nbsp;/&nbsp;&nbsp;CBT · EMR · NLP
          </p>
          <p
            className="mt-3 text-sm md:text-[0.95rem] font-light italic leading-relaxed"
            style={{ color: C.textMid }}
          >
            מרחב חם ובטוח לצמוח בו, להתמודד ולהאמין בעצמך
          </p>
        </div>
      </section>

      {/* ④ CONTENT */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">

        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-6 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }}
        />

        <h1
          className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight"
          style={{ color: C.textDark, letterSpacing: '-0.02em' }}
        >
          מטפלת רגשית בנתיבות ובאזור הדרום
        </h1>

        <div className="space-y-5 text-right">
          <P>
            שמי <Strong>גאולה אלון</Strong>, <Strong>מטפלת רגשית</Strong> ומאבחנת לימודית, ואני מלווה
            ילדים, נערות ונשים בדרך לצמיחה, חוסן וביטחון. המרכז ממוקם ב<Strong>נתיבות</Strong> ונותן
            שירות לכל אזור הדרום, וכן מציע טיפול רגשי מרחוק בזום לכל מקום בארץ.
          </P>
          <P>
            כל אדם נושא בתוכו משאבים ויכולות. תפקידי כמטפלת הוא לעזור לך, או לילד/ה שלך, לגלות אותם,
            לחזק אותם ולהשתמש בהם כדי להתמודד ולחיות חיים מלאים יותר. הטיפול נעשה מתוך <Strong>הקשבה
            עמוקה, קבלה ולא שיפוטיות</Strong>, ובמרחב שמרגיש בטוח כמו בית.
          </P>
        </div>

        {/* Local trust strip */}
        <div
          className="mt-8 rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center border"
          style={{ backgroundColor: C.cream, borderColor: C.border }}
        >
          {['מרכז בנתיבות', 'שירות בכל הדרום', 'אפשרות בזום', 'מעל 20 שנות ניסיון'].map((item) => (
            <span key={item} className="text-sm font-medium" style={{ color: C.textDark }}>
              {item}
            </span>
          ))}
        </div>

        <H2>מה עושה מטפלת רגשית?</H2>
        <div className="space-y-5 text-right">
          <P>
            מטפלת רגשית מלווה אנשים בהתמודדות עם רגשות, מחשבות ומצבים שמקשים על חיי היומיום -
            חרדה, לחץ, קשיים חברתיים, משברים, ביקורת עצמית או תקופות מעבר. <Strong>המטרה איננה
            רק להקל</Strong>, אלא לתת כלים אמיתיים שנשארים גם אחרי שהתהליך מסתיים.
          </P>
          <P>
            בשונה מעצה טובה או מהקשבה של חבר, טיפול רגשי הוא תהליך מקצועי ומובנה: מזהים יחד את
            שורש הקושי, מבינים מאיפה הוא הגיע, ובונים דרך חדשה - צעד אחר צעד, בקצב שמתאים לך.
          </P>
        </div>

        <H2>מתי כדאי לפנות למטפלת רגשית?</H2>
        <P>אין צורך במשבר גדול כדי לפנות לטיפול. אלה כמה סימנים שכדאי להקשיב להם:</P>
        <ul className="space-y-3 my-6">
          {[
            'חרדה, דאגה או מתח שחוזרים ומפריעים לשגרה',
            'ביקורת עצמית נוקבת ותחושת "אני לא מספיק טובה"',
            'קושי חברתי, בדידות או קושי ליצור ולשמור קשרים',
            'התמודדות עם אובדן, גירושין, שינוי או אירוע טראומטי',
            'ילד/ה עם התפרצויות, הסתגרות או ירידה בביטחון העצמי',
            'תחושה כללית של תקיעות, שחיקה או חוסר משמעות',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 justify-end">
              <span className="text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>
                {item}
              </span>
              <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />
            </li>
          ))}
        </ul>

        <H2>למי הטיפול מתאים</H2>
        <div className="mt-2 grid sm:grid-cols-3 gap-4">
          {[
            { t: 'ילדים', d: 'ויסות רגשי, חרדות, ביטחון עצמי וקשיים חברתיים - דרך שיחה, משחק ותנועה.' },
            { t: 'נערות', d: 'זהות, דימוי עצמי, לחץ חברתי והתמודדות עם גיל ההתבגרות, במרחב מכבד ובטוח.' },
            { t: 'נשים', d: 'חרדה, שחיקה, ביקורת עצמית, משברים ותקופות מעבר - חזרה לחוסן ולביטחון.' },
          ].map((aud) => (
            <div
              key={aud.t}
              className="rounded-xl p-5 border text-right"
              style={{ backgroundColor: C.cream, borderColor: C.border }}
            >
              <h3 className="font-display text-lg font-semibold mb-1.5" style={{ color: C.textDark }}>
                {aud.t}
              </h3>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>
                {aud.d}
              </p>
            </div>
          ))}
        </div>

        <H2>השיטות שאני עובדת איתן</H2>
        <P>
          כל מטופל מקבל שילוב מדויק של כלים מתקדמים, מותאם אישית לתוצאה האפקטיבית ביותר. אלה
          השיטות המרכזיות שבהן אני עובדת:
        </P>
        <div className="mt-5 grid sm:grid-cols-3 gap-4">
          {METHODS.map((m) => (
            <Link
              key={m.name}
              href={m.href}
              className="rounded-xl p-5 border text-center transition-all duration-300 flex flex-col hover:border-[#3949AB] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(57,73,171,0.07)]"
              style={{ backgroundColor: C.cream, borderColor: C.border }}
            >
              <div className="font-display text-2xl font-semibold mb-1" style={{ color: C.textDark }}>{m.name}</div>
              <div className="text-xs font-medium tracking-wide mb-2.5" style={{ color: C.rose }}>{m.label}</div>
              <p className="text-sm leading-[1.7] font-light flex-1" style={{ color: C.textMid }}>{m.desc}</p>
              <div className="mt-3 text-sm font-medium" style={{ color: C.rose }}>לפרטים ←</div>
            </Link>
          ))}
        </div>

        <H2>איך נראה תהליך טיפולי</H2>
        <ol className="space-y-4 my-6">
          {[
            { t: 'שיחת היכרות', d: 'שיחה קצרה ולא מחייבת שבה נבין יחד מה מטריד ומה הצעד הנכון.' },
            { t: 'הבנת התמונה', d: 'מזהים יחד את שורש הקושי, מאיפה הוא הגיע ומה משפיע עליו כיום.' },
            { t: 'תוכנית אישית', d: 'בונים תהליך מותאם, עם השיטות והכלים שמתאימים בדיוק אליך.' },
            { t: 'עבודה וצמיחה', d: 'מפגשים קבועים שבהם רוכשים כלים, מתחזקים ורואים שינוי אמיתי.' },
          ].map((step, i) => (
            <li key={step.t} className="flex items-start gap-4 justify-end text-right">
              <div>
                <div className="font-display text-lg font-semibold" style={{ color: C.textDark }}>{step.t}</div>
                <p className="text-[1.02rem] font-light leading-[1.8]" style={{ color: C.textMid }}>{step.d}</p>
              </div>
              <span
                className="mt-1 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold text-white"
                style={{ backgroundColor: C.plum }}
              >
                {i + 1}
              </span>
            </li>
          ))}
        </ol>

        <H2>טיפול רגשי בכל הדרום - וגם בזום</H2>
        <div className="space-y-5 text-right">
          <P>
            המרכז ממוקם ב<Strong>נתיבות</Strong> ומלווה משפחות ונשים מכל אזור הדרום -
            {' '}{AREAS.slice(1).join(', ')} והיישובים שסביב.
          </P>
          <P>
            ולמי שנוח לו כך, או שגר רחוק יותר - קיימת אפשרות ל<Strong>טיפול רגשי מרחוק בזום</Strong>,
            שיעיל מאוד גם לילדים וגם לנשים ומאפשר ליווי איכותי מכל מקום בארץ.
          </P>
        </div>

        <H2>על גאולה אלון</H2>
        <div className="space-y-5 text-right">
          <P>
            בעלת תואר שני בחינוך ומעל <Strong>עשרים שנות ניסיון</Strong> קליני ולימודי עם ילדים,
            נערות ונשים. הגישה הטיפולית שלי הוליסטית ומשלבת שיטות מוכחות - <Strong>CBT, EMR ו-NLP</Strong> -
            כולן מותאמות אישית לצורך הספציפי של כל מטופל.
          </P>
          <P>
            אני מאמינה שהדרך לשינוי אמיתי עוברת דרך הבנה עמוקה ומכילה של הצרכים הייחודיים של כל אדם,
            ומתוך מרחב שמרגיש כמו בית. כל פנייה מטופלת בדיסקרטיות מלאה.
          </P>
        </div>

        {/* FAQ */}
        <H2>שאלות נפוצות</H2>
        <div className="space-y-4 mt-2">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-xl p-5 border text-right"
              style={{ backgroundColor: C.cream, borderColor: C.border }}
            >
              <h3 className="font-medium text-base mb-2.5" style={{ color: C.textDark }}>
                {item.q}
              </h3>
              <p className="text-sm font-light leading-[1.9]" style={{ color: C.textMid }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-lg font-medium mb-1.5" style={{ color: C.textDark }}>
            מוכנים להתחיל תהליך?
          </p>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>
            תיאום שיחת היכרות קצרה, בנתיבות, בכל הדרום או בזום - ללא התחייבות.
          </p>
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <Link
              href="/#contact"
              className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1"
              style={{ background: C.plum, boxShadow: '0 8px 30px rgba(57,73,171,0.12)' }}
            >
              לתיאום שיחת היכרות
            </Link>
            <Link
              href="/"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לאתר
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
