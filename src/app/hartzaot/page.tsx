import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';
import RelatedLinks from '../../components/RelatedLinks';
import { SITE_URL, OWNER_NAME } from '../../lib/site';

const PAGE_URL = `${SITE_URL}/hartzaot`;

const AREAS = ['נתיבות', 'אופקים', 'שדרות', 'אשקלון', 'באר שבע', 'קריית גת', 'שדות נגב', 'מרחבים'];

const TOPICS = [
  { t: 'חיזוק ביטחון עצמי אצל ילדים', d: 'איך נבנה דימוי עצמי, מה שוחק אותו, ומה הורים וצוותים יכולים לעשות אחרת.' },
  { t: 'ויסות רגשי והתמודדות עם חרדות', d: 'למה ילדים מתפוצצים על דברים קטנים, ואיך מלווים אותם חזרה לשקט.' },
  { t: 'פיתוח מיומנויות חברתיות', d: 'ילדים שמתקשים להשתלב - מה עומד מאחורי זה ואיך אפשר לעזור.' },
  { t: 'הצבת גבולות וחיזוק הקשר', d: 'גבולות שלא הורסים את הקשר, אלא דווקא מחזקים אותו.' },
  { t: 'הקשר בין קושי רגשי לקשיי למידה', d: 'איך מצוקה רגשית מתחפשת לקושי לימודי - ולהפך.' },
  { t: 'תקשורת מקרבת בבית ובכיתה', d: 'כלים מעשיים לשיחה שמפחיתה התנגדות ומגבירה שיתוף פעולה.' },
];

const FAQ = [
  {
    q: 'למי מיועדות ההרצאות?',
    a: 'להורים, לצוותי חינוך בבתי ספר ובגנים, לוועדי הורים, למתנ"סים ולקהילות. כל הרצאה מותאמת מראש לקהל - הרצאה לצוות חינוכי נבנית אחרת מהרצאה להורים.',
  },
  {
    q: 'כמה זמן נמשכת הרצאה?',
    a: 'הפורמט הנפוץ הוא שעה עד שעה וחצי, כולל זמן לשאלות. אפשר להתאים פורמט קצר יותר לערב הורים, או סדנה מורחבת של כמה מפגשים לצוות.',
  },
  {
    q: 'באילו אזורים אתם מגיעים?',
    a: 'ההרצאות מתקיימות בנתיבות ובכל אזור הדרום - אופקים, שדרות, אשקלון, באר שבע, קריית גת והיישובים שסביב. קיימת גם אפשרות להרצאה מקוונת בזום לכל מקום בארץ.',
  },
  {
    q: 'האם אפשר להתאים נושא שאינו ברשימה?',
    a: 'בהחלט. הנושאים ברשימה הם המבוקשים ביותר, אך הרצאה נבנית לפי הצורך של הקהל. אם יש נושא שמעסיק את ההורים או את הצוות אצלכם, אפשר לבנות סביבו הרצאה ייעודית.',
  },
  {
    q: 'איך מתאמים הרצאה?',
    a: 'פונים בטלפון או דרך טופס יצירת הקשר, מתאמים שיחה קצרה שבה מבינים את הקהל, הנושא והפורמט, ומשם נקבעים מועד ותנאים.',
  },
];

export const metadata: Metadata = {
  title: 'הרצאות והדרכות להורים ולצוותי חינוך | נתיבות והדרום - גאולה אלון',
  description:
    'הרצאות והדרכות מקצועיות וחווייתיות להורים, צוותי חינוך, בתי ספר, גנים וקהילות. ויסות רגשי, ביטחון עצמי, גבולות, מיומנויות חברתיות וקשיי למידה. בנתיבות, בכל הדרום ובזום.',
  keywords: [
    'הרצאות להורים',
    'הרצאות לצוותי חינוך',
    'הרצאה ויסות רגשי',
    'הרצאות חינוכיות בדרום',
    'סדנאות להורים',
    'מרצה בתחום הרגשי',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'הרצאות והדרכות להורים ולצוותי חינוך | גאולה אלון',
    description: 'הרצאות מקצועיות וחווייתיות בנושאים רגשיים, חינוכיים ולימודיים - בנתיבות, בכל הדרום ובזום.',
    url: PAGE_URL,
    type: 'article',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'בית', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'הרצאות והדרכות', item: PAGE_URL },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'הרצאות והדרכות',
  name: 'הרצאות והדרכות - כנפיים לעוף',
  description:
    'הרצאות והדרכות להורים, צוותי חינוך, בתי ספר, גנים וקהילות בנושאים רגשיים, חינוכיים ולימודיים. פנים אל פנים בדרום או בזום.',
  url: PAGE_URL,
  provider: { '@type': 'Person', name: OWNER_NAME, jobTitle: 'מטפלת רגשית ומרצה', url: SITE_URL },
  areaServed: [
    ...AREAS.map((name) => ({ '@type': 'City', name })),
    { '@type': 'AdministrativeArea', name: 'מחוז הדרום' },
  ],
  audience: [
    { '@type': 'Audience', audienceType: 'הורים' },
    { '@type': 'Audience', audienceType: 'צוותי חינוך' },
    { '@type': 'Audience', audienceType: 'קהילות וארגונים' },
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
    <h2 className="font-display text-2xl md:text-3xl font-medium mt-12 mb-4 leading-snug" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>{children}</p>;
}
function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: C.textDark, fontWeight: 600 }}>{children}</strong>;
}

export default function LecturesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Link
        href="/"
        aria-label="סגור וחזור לאתר"
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
        style={{ backgroundColor: 'rgba(255,255,255,0.92)', border: `1px solid ${C.border}`, color: C.textMid, boxShadow: '0 2px 14px rgba(57,73,171,0.12)' }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M11.5 3.5L3.5 11.5M3.5 3.5l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </Link>

      <section className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        <Link href="/" className="inline-block">
          <Image src="/logo.jpg" alt="כנפיים לעוף - הרצאות והדרכות" width={240} height={80} className="h-16 md:h-20 w-auto object-contain" style={{ maxWidth: 240, mixBlendMode: 'multiply' }} priority />
        </Link>
        <p className="mt-3 text-sm md:text-[0.95rem] font-light tracking-[0.18em] uppercase" style={{ color: C.textLight }}>
          מרכז רגשי לימודי · נתיבות והדרום
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <div className="w-16 h-0.5 mb-6 mr-auto" style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }} />

        <h1 className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
          הרצאות והדרכות להורים ולצוותי חינוך
        </h1>

        <div className="space-y-5 text-right">
          <P>
            הרצאות מקצועיות וחווייתיות בנושאים רגשיים, חינוכיים ולימודיים, המיועדות ל<Strong>הורים,
            צוותי חינוך, בתי ספר, גנים, ועדי הורים וקהילות</Strong>.
          </P>
          <P>
            ההרצאות משלבות ידע מקצועי מעולמות הטיפול הרגשי, CBT והעבודה החינוכית, לצד{' '}
            <Strong>כלים פרקטיים שאפשר לקחת מיד ליום-יום</Strong>. לא תיאוריה מרוחקת, אלא דוגמאות
            מהשטח ומענה לשאלות אמיתיות של הקהל.
          </P>
        </div>

        <div className="mt-8 rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center border" style={{ backgroundColor: C.cream, borderColor: C.border }}>
          {['שעה עד שעה וחצי', 'מותאם לקהל', 'בכל אזור הדרום', 'גם בזום'].map((item) => (
            <span key={item} className="text-sm font-medium" style={{ color: C.textDark }}>{item}</span>
          ))}
        </div>

        <div className="relative w-full max-w-[300px] mx-auto mt-10 aspect-[461/1024] rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.borderLight}`, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
          <Image src="/conference_audience.jpg" alt="גאולה אלון בהרצאה להורים וצוותי חינוך" fill className="object-cover" sizes="300px" />
        </div>

        <H2>נושאי ההרצאות</H2>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {TOPICS.map((t) => (
            <div key={t.t} className="rounded-xl p-5 border text-right" style={{ backgroundColor: C.cream, borderColor: C.border }}>
              <h3 className="font-display text-lg font-semibold mb-1.5" style={{ color: C.textDark }}>{t.t}</h3>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>{t.d}</p>
            </div>
          ))}
        </div>
        <P>
          הרשימה מציגה את הנושאים המבוקשים ביותר, אך <Strong>כל הרצאה נבנית לפי הקהל והצורך</Strong>.
          אם יש נושא שמעסיק את ההורים או את הצוות אצלכם, אפשר לבנות סביבו הרצאה ייעודית.
        </P>

        <H2>למי זה מתאים</H2>
        <div className="mt-2 grid sm:grid-cols-3 gap-4">
          {[
            { t: 'הורים', d: 'ערבי הורים, ועדי הורים ומפגשי קהילה.' },
            { t: 'צוותי חינוך', d: 'השתלמויות למורים, גננות וסייעות.' },
            { t: 'ארגונים', d: 'מתנ"סים, עמותות ומסגרות קהילתיות.' },
          ].map((a) => (
            <div key={a.t} className="rounded-xl p-5 border text-right" style={{ backgroundColor: C.cream, borderColor: C.border }}>
              <h3 className="font-display text-lg font-semibold mb-1.5" style={{ color: C.textDark }}>{a.t}</h3>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>{a.d}</p>
            </div>
          ))}
        </div>

        <H2>המרצה</H2>
        <P>
          <Strong>{OWNER_NAME}</Strong>, מטפלת רגשית ומאבחנת לימודית, בעלת תואר שני בחינוך ומעל
          עשרים שנות ניסיון עם ילדים, נערות ונשים. הניסיון הקליני והחינוכי הוא שהופך את ההרצאות
          למעשיות: כל כלי שמוצג בהן נבחן קודם בחדר הטיפול ובכיתה.
        </P>

        <H2>הרצאות בכל אזור הדרום</H2>
        <P>
          ההרצאות מתקיימות ב<Strong>נתיבות</Strong> ובכל אזור הדרום - {AREAS.slice(1).join(', ')}{' '}
          והיישובים שסביב, וכן ב<Strong>פורמט מקוון בזום</Strong> לכל מקום בארץ.
        </P>

        <H2>שאלות נפוצות</H2>
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
            { href: '/metapel-regashi',            title: 'מטפלת רגשית',                    desc: 'טיפול רגשי לילדים, נערות ונשים.' },
            { href: '/hadrachat-horim',            title: 'הדרכת הורים',                    desc: 'ליווי ממוקד להורים - כלים מעשיים לבית.' },
            { href: '/blog/vitur-regashi-madrich', title: 'ויסות רגשי בילדים',              desc: 'אחד הנושאים המבוקשים ביותר בהרצאות.' },
            { href: '/blog',                      title: 'מדריכים וכתבות',                 desc: 'תוכן מקצועי להורים ולצוותי חינוך.' },
          ]}
        />

        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-lg font-medium mb-1.5" style={{ color: C.textDark }}>מעוניינים לתאם הרצאה?</p>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>
            שיחה קצרה תעזור להתאים את הנושא, הפורמט והמועד לקהל שלכם.
          </p>
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <Link href="/#contact" className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1" style={{ background: C.plum, boxShadow: '0 8px 30px rgba(57,73,171,0.12)' }}>
              לפרטים ותיאום הרצאה
            </Link>
            <Link href="/" className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]" style={{ borderColor: C.border, color: C.textMid }}>
              ← חזרה לאתר
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
