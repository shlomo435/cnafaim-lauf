import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';
import Breadcrumbs from '../../components/Breadcrumbs';
import RelatedLinks from '../../components/RelatedLinks';
import InfoDisclaimer from '../../components/InfoDisclaimer';
import { SITE_URL, OWNER_NAME, OG_IMAGE, SCHEMA_IDS } from '../../lib/site';

const PAGE_URL = `${SITE_URL}/avchun-didakti`;

const AREAS = ['נתיבות', 'אופקים', 'שדרות', 'אשקלון', 'באר שבע', 'קריית גת', 'שדות נגב', 'מרחבים'];

/** Regional councils - typed as AdministrativeArea in schema, not City. */
const REGIONAL_COUNCILS = ['שדות נגב', 'מרחבים'];

const FAQ = [
  {
    q: 'מה זה אבחון דידקטי?',
    a: 'אבחון דידקטי הוא תהליך מובנה שבוחן את המיומנויות הלימודיות של הילד - קריאה, כתיבה, הבנת הנקרא, חשבון, זיכרון וקשב. מטרתו להבין היכן בדיוק נמצא הקושי ומה עומד מאחוריו, וממנו נגזרת תוכנית עבודה מותאמת אישית והמלצות להתאמות בבית הספר.',
  },
  {
    q: 'מה ההבדל בין אבחון דידקטי לאבחון פסיכודידקטי?',
    a: 'אבחון דידקטי מתמקד בתפקוד הלימודי עצמו. אבחון פסיכודידקטי מוסיף לו רובד פסיכולוגי - מדידת משכל ובחינת היבטים רגשיים - ומבוצע בשיתוף פסיכולוג. כשהקושי נראה לימודי בעיקרו, אבחון דידקטי הוא לרוב המענה המדויק והמהיר יותר.',
  },
  {
    q: 'מאיזה גיל אפשר לבצע אבחון?',
    a: 'ניתן לאבחן כבר מסוף כיתה א׳, בערך מגיל שש וחצי, כשנרכשו יסודות הקריאה והכתיבה. אפשר וכדאי לאבחן גם בכיתות הגבוהות, בחטיבה ובתיכון - ככל שמאבחנים מוקדם יותר, כך התהליך קצר יותר ונמנעת שחיקה של הביטחון העצמי.',
  },
  {
    q: 'כמה זמן נמשך האבחון ומתי מקבלים תשובות?',
    a: 'האבחון נערך במפגש אחד או שניים, לרוב שעתיים עד שלוש בסך הכול, בהתאם לגיל ולקצב של הילד. לאחריו נערכת פגישת משוב עם ההורים שבה עוברים על הממצאים, ומתקבל דוח כתוב עם המלצות מעשיות.',
  },
  {
    q: 'האם האבחון מזכה בהתאמות בבחינות?',
    a: 'דוח אבחון דידקטי משמש בסיס לבקשת התאמות במסגרת בית הספר, כגון הארכת זמן, התעלמות משגיאות כתיב או הקראה. ההחלטה על ההתאמות מתקבלת בוועדה הבית ספרית, והדוח הוא המסמך המקצועי שעליו היא נשענת.',
  },
  {
    q: 'מה עושים עם הדוח אחרי האבחון?',
    a: 'הדוח אינו מטרה בפני עצמו אלא נקודת פתיחה. ממנו נבנית תוכנית הוראה מתקנת ממוקדת, הוא מועבר לצוות החינוכי לצורך התאמות, ומשמש כלי לשיחה עם הילד על החוזקות שלו. אני מלווה את ההורים גם בשלב הזה.',
  },
  {
    q: 'האם אפשר לבצע אבחון בזום?',
    a: 'שלב האבחון עצמו מתבצע פנים אל פנים, כדי לאפשר תצפית מדויקת על אופן העבודה של הילד. שיחת ההיכרות המקדימה ופגישת המשוב יכולות להתקיים בזום, וכך גם ליווי ההמשך למשפחות מרוחקות.',
  },
];

export const metadata: Metadata = {
  title: 'אבחון דידקטי בנתיבות ובדרום | תפקודי-לימודי - כנפיים לעוף',
  description:
    'אבחון דידקטי ותפקודי-לימודי בנתיבות ובכל אזור הדרום. בחינת קריאה, כתיבה, הבנת הנקרא, חשבון, זיכרון וקשב, דוח מפורט והמלצות להתאמות. ליווי מלא גם אחרי האבחון.',
  keywords: [
    'אבחון דידקטי',
    'אבחון דידקטי נתיבות',
    'אבחון תפקודי לימודי',
    'אבחון לקויות למידה',
    'מאבחנת דידקטית',
    'התאמות בבחינות',
    'אבחון דידקטי בדרום',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'אבחון דידקטי בנתיבות ובדרום | כנפיים לעוף',
    description:
      'אבחון תפקודי-לימודי מקיף לילדים ולנוער - קריאה, כתיבה, קשב וזיכרון. דוח מפורט, המלצות להתאמות וליווי אחרי האבחון.',
    url: PAGE_URL,
    type: 'article',
    images: [OG_IMAGE],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'אבחון דידקטי ותפקודי-לימודי',
  name: 'אבחון דידקטי - כנפיים לעוף',
  description:
    'אבחון דידקטי ותפקודי-לימודי לילדים ולנוער: קריאה, כתיבה, הבנת הנקרא, חשבון, זיכרון וקשב. כולל דוח מפורט, המלצות להתאמות ובניית תוכנית עבודה.',
  url: PAGE_URL,
  provider: {
    '@type': 'Person',
    '@id': SCHEMA_IDS.person,
    name: OWNER_NAME,
    jobTitle: 'מאבחנת דידקטית ומורה להוראה מתקנת',
  },
  areaServed: [
    ...AREAS.map((name) => ({
      '@type': REGIONAL_COUNCILS.includes(name) ? 'AdministrativeArea' : 'City',
      name,
    })),
    { '@type': 'AdministrativeArea', name: 'מחוז הדרום' },
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

export default function DidacticAssessmentPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

      <section className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.jpg"
            alt="כנפיים לעוף - אבחון דידקטי בנתיבות"
            width={240}
            height={80}
            className="h-16 md:h-20 w-auto object-contain"
            style={{ maxWidth: 240, mixBlendMode: 'multiply' }}
            priority
          />
        </Link>
        <p className="mt-3 text-sm md:text-[0.95rem] font-light tracking-[0.18em] uppercase" style={{ color: C.textLight }}>
          מרכז רגשי לימודי · נתיבות והדרום
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'בית', href: '/' }, { label: 'אבחון דידקטי' }]} />

        <div className="w-16 h-0.5 mb-6 mr-auto" style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }} />

        <h1
          className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight"
          style={{ color: C.textDark, letterSpacing: '-0.02em' }}
        >
          אבחון דידקטי בנתיבות ובאזור הדרום
        </h1>

        <div className="space-y-5 text-right">
          <P>
            כשילד משקיע ובכל זאת נשאר מאחור, כשכל שיעורי הבית הופכים למאבק, וכשאף אחד לא מצליח
            להצביע במדויק על מה הבעיה - <Strong>אבחון דידקטי</Strong> הוא הדרך לקבל תשובה ברורה.
            לא תווית, אלא מפה: מה קל לילד, מה קשה לו, ולמה.
          </P>
          <P>
            האבחון נערך בנתיבות ומשרת משפחות מכל אזור הדרום. בסופו מקבלים <Strong>דוח מפורט
            והמלצות מעשיות</Strong> - גם לבית, גם לבית הספר, וגם לבניית תוכנית עבודה ממוקדת.
          </P>
        </div>

        <div
          className="mt-8 rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center border"
          style={{ backgroundColor: C.cream, borderColor: C.border }}
        >
          {['אבחון בנתיבות', 'שירות בכל הדרום', 'דוח והמלצות', 'ליווי אחרי האבחון'].map((item) => (
            <span key={item} className="text-sm font-medium" style={{ color: C.textDark }}>{item}</span>
          ))}
        </div>

        <H2>מתי כדאי לשקול אבחון?</H2>
        <P>אלה הסימנים שמצדיקים בדיקה מקצועית, במיוחד כשהם חוזרים לאורך זמן:</P>
        <ul className="space-y-3 my-6">
          {[
            'פער מתמשך בין המאמץ שהילד משקיע לבין התוצאות',
            'קריאה איטית, מגומגמת או עם החלפת אותיות גם אחרי שנה בבית הספר',
            'קושי בהבנת הנקרא - קורא אך לא זוכר ולא מבין',
            'כתב יד קשה, שגיאות כתיב רבות או קושי לארגן טקסט',
            'קושי בקשב, בריכוז ובארגון משימות',
            'הימנעות מלימודים, תסכול או ירידה בביטחון העצמי',
            'המלצה של המורה או היועצת לבדוק',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />
              <span className="flex-1 text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>{item}</span>
            </li>
          ))}
        </ul>

        <H2>מה בודקים באבחון?</H2>
        <P>האבחון בוחן את מכלול המיומנויות שמרכיבות יחד את היכולת ללמוד:</P>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {[
            { t: 'קריאה', d: 'דיוק, שטף, קצב, ובעיקר הבנת הנקרא.' },
            { t: 'כתיבה', d: 'כתיב נכון, ניסוח, ארגון טקסט וקצב הכתיבה.' },
            { t: 'חשבון', d: 'פעולות בסיסיות, שליטה בעובדות יסוד ופתרון בעיות מילוליות.' },
            { t: 'זיכרון', d: 'זיכרון עבודה, זיכרון שמיעתי וזיכרון חזותי.' },
            { t: 'קשב וארגון', d: 'יכולת ריכוז לאורך זמן, ניהול משימות וארגון.' },
            { t: 'סגנון למידה', d: 'הדרך הייחודית שבה המוח של הילד קולט ומעבד מידע.' },
          ].map((c) => (
            <div key={c.t} className="rounded-xl p-5 border text-right" style={{ backgroundColor: C.cream, borderColor: C.border }}>
              <h3 className="font-display text-lg font-semibold mb-1.5" style={{ color: C.textDark }}>{c.t}</h3>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>{c.d}</p>
            </div>
          ))}
        </div>

        <H2>איך נראה התהליך</H2>
        <ol className="space-y-4 my-6">
          {[
            { t: 'שיחת היכרות', d: 'שיחה קצרה ולא מחייבת: מה מטריד, מה כבר ניסיתם, והאם אבחון הוא אכן הצעד הנכון.' },
            { t: 'מפגש האבחון', d: 'מפגש אחד או שניים בסביבה נעימה ולא מלחיצה. הילד עובד, ואני מתבוננת לא רק בתוצאה אלא באופן שבו הוא מגיע אליה.' },
            { t: 'פגישת משוב', d: 'עוברים יחד על הממצאים בשפה ברורה, בלי ז׳רגון - מה נמצא, מה המשמעות, ומה עושים מכאן.' },
            { t: 'דוח והמלצות', d: 'דוח כתוב עם המלצות מעשיות לבית ולבית הספר, כולל בסיס לבקשת התאמות.' },
            { t: 'המשך ליווי', d: 'בניית תוכנית הוראה מתקנת לפי הממצאים, ועזרה בהצגת הדוח לצוות החינוכי.' },
          ].map((step, i) => (
            <li key={step.t} className="flex items-start gap-4 text-right">
              <span
                className="mt-1 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold text-white"
                style={{ backgroundColor: C.plum }}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="font-display text-lg font-semibold" style={{ color: C.textDark }}>{step.t}</div>
                <p className="text-[1.02rem] font-light leading-[1.8]" style={{ color: C.textMid }}>{step.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="my-8 rounded-xl p-5 border text-right" style={{ backgroundColor: C.cream, borderColor: C.border }}>
          <p className="text-sm font-semibold mb-2" style={{ color: C.rose }}>כדאי לדעת</p>
          <p className="text-base font-light leading-[1.9]" style={{ color: C.textMid }}>
            הרבה הורים חוששים שאבחון &quot;יתייג&quot; את הילד. בפועל קורה ההפך: ילד שמבין למה משהו קשה לו
            מפסיק לחשוב שהוא פשוט לא מספיק חכם. האבחון מחליף האשמה עצמית בהסבר, ובדרך פעולה.
          </p>
        </div>

        <H2>אבחון בכל אזור הדרום</H2>
        <div className="space-y-5 text-right">
          <P>
            המרכז ממוקם ב<Strong>נתיבות</Strong> ומשרת משפחות מ{AREAS.slice(1).join(', ')} והיישובים
            שסביב. מפגש האבחון מתקיים פנים אל פנים, ואילו שיחת ההיכרות ופגישת המשוב יכולות
            להתקיים <Strong>בזום</Strong> לנוחות המשפחה.
          </P>
        </div>

        <H2>שאלות נפוצות על אבחון דידקטי</H2>
        <div className="space-y-4 mt-2">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl p-5 border text-right" style={{ backgroundColor: C.cream, borderColor: C.border }}>
              <h3 className="font-medium text-base mb-2.5" style={{ color: C.textDark }}>{item.q}</h3>
              <p className="text-sm font-light leading-[1.9]" style={{ color: C.textMid }}>{item.a}</p>
            </div>
          ))}
        </div>

        <RelatedLinks
          links={[
            { href: '/blog/avchun-didakti-madrich-horim', title: 'המדריך המלא לאבחון דידקטי', desc: 'הרחבה: מה בודקים, טווחי מחירים, ומה עושים עם הדוח.' },
            { href: '/methods/remedial',                  title: 'הוראה מתקנת',                 desc: 'המשך טבעי לאבחון - תוכנית עבודה שמטפלת בשורש הקושי.' },
            { href: '/blog/kshei-kriya-yelad',            title: 'הילד שלי לא מצליח לקרוא',     desc: 'מתי זה שלב התפתחותי ומתי כדאי לפנות.' },
            { href: '/metapel-regashi',                   title: 'מטפלת רגשית',                 desc: 'כשקושי לימודי מלווה גם בשחיקה רגשית.' },
          ]}
        />

        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-lg font-medium mb-1.5" style={{ color: C.textDark }}>רוצים לדעת מה באמת קורה?</p>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>
            שיחת היכרות קצרה תעזור להבין אם אבחון הוא הצעד הנכון - ללא התחייבות.
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

        <InfoDisclaimer />
      </main>
    </div>
  );
}
