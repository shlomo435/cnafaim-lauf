import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';
import Breadcrumbs from '../../components/Breadcrumbs';
import RelatedLinks from '../../components/RelatedLinks';
import { SITE_URL, OWNER_NAME } from '../../lib/site';

const PAGE_URL = `${SITE_URL}/hadrachat-horim`;

const AREAS = ['נתיבות', 'אופקים', 'שדרות', 'אשקלון', 'באר שבע', 'קריית גת', 'שדות נגב', 'מרחבים'];

const FAQ = [
  {
    q: 'מה זה הדרכת הורים?',
    a: 'הדרכת הורים היא תהליך קצר וממוקד שבו ההורים מקבלים כלים להתמודדות עם אתגר ספציפי בבית - התפרצויות, קשיי שינה, מריבות בין אחים, גבולות או שיתוף פעולה. העבודה היא עם ההורים, לא עם הילד, מתוך ההבנה שכשההורה משנה את התגובה שלו, גם הילד משתנה.',
  },
  {
    q: 'האם הילד צריך להגיע לפגישות?',
    a: 'לא. הדרכת הורים מתקיימת עם ההורים בלבד. זה אחד היתרונות הגדולים שלה: אפשר להתחיל גם כשהילד מסרב לטיפול, וגם כשהוא צעיר מדי, ועדיין ליצור שינוי אמיתי בבית.',
  },
  {
    q: 'כמה פגישות צריך?',
    a: 'תהליך ממוקד נמשך לרוב בין ארבע לשמונה פגישות. אתגרים מורכבים יותר עשויים לדרוש ליווי ארוך יותר. כבר מהפגישות הראשונות ההורים יוצאים עם כלים מעשיים ליישום מיידי.',
  },
  {
    q: 'האם שני ההורים צריכים להגיע?',
    a: 'זה מומלץ מאוד אך לא תנאי. כששני ההורים שותפים, המסר בבית עקבי יותר והשינוי מהיר יותר. אם רק אחד ההורים יכול להגיע, אפשר בהחלט לעבוד כך ולעדכן את השני.',
  },
  {
    q: 'האם אפשר הדרכת הורים בזום?',
    a: 'כן. הדרכת הורים מתאימה במיוחד לפורמט הזום, והיא מתקיימת בהצלחה עם משפחות מכל הארץ. זה גם חוסך את הצורך בסידור לילדים בזמן הפגישה.',
  },
  {
    q: 'מה ההבדל בין הדרכת הורים לטיפול רגשי לילד?',
    a: 'טיפול רגשי עובד ישירות עם הילד על עולמו הפנימי. הדרכת הורים עובדת על מערכת היחסים ועל דפוסי התגובה בבית. לעיתים קרובות משלבים בין השניים, ולעיתים הדרכת הורים לבדה מספיקה כדי לפתור את הקושי.',
  },
];

export const metadata: Metadata = {
  title: 'הדרכת הורים בנתיבות ובדרום | כלים מעשיים לבית - כנפיים לעוף',
  description:
    'הדרכת הורים בנתיבות, בכל אזור הדרום וגם בזום. כלים מעשיים להתפרצויות, גבולות, מריבות בין אחים, שיתוף פעולה וקשיי שינה. תהליך קצר וממוקד עם גאולה אלון.',
  keywords: [
    'הדרכת הורים',
    'הדרכת הורים נתיבות',
    'הדרכת הורים בדרום',
    'ייעוץ הורי',
    'כלים להורים',
    'הצבת גבולות לילדים',
    'הדרכת הורים בזום',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'הדרכת הורים בנתיבות ובדרום | כנפיים לעוף',
    description: 'כלים מעשיים להורים - התפרצויות, גבולות, שיתוף פעולה. בנתיבות, בכל הדרום וגם בזום.',
    url: PAGE_URL,
    type: 'article',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'הדרכת הורים',
  name: 'הדרכת הורים - כנפיים לעוף',
  description:
    'הדרכת הורים ממוקדת: כלים מעשיים להתמודדות עם התפרצויות, גבולות, מריבות בין אחים, שיתוף פעולה וקשיי שינה. פנים אל פנים בנתיבות או בזום.',
  url: PAGE_URL,
  provider: { '@type': 'Person', name: OWNER_NAME, jobTitle: 'מטפלת רגשית ומדריכת הורים', url: SITE_URL },
  areaServed: [
    ...AREAS.map((name) => ({ '@type': 'City', name })),
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

export default function ParentGuidancePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
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
          <Image src="/logo.jpg" alt="כנפיים לעוף - הדרכת הורים בנתיבות" width={240} height={80} className="h-16 md:h-20 w-auto object-contain" style={{ maxWidth: 240, mixBlendMode: 'multiply' }} priority />
        </Link>
        <p className="mt-3 text-sm md:text-[0.95rem] font-light tracking-[0.18em] uppercase" style={{ color: C.textLight }}>
          מרכז רגשי לימודי · נתיבות והדרום
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'בית', href: '/' }, { label: 'הדרכת הורים' }]} />

        <div className="w-16 h-0.5 mb-6 mr-auto" style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }} />

        <h1 className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
          הדרכת הורים בנתיבות ובאזור הדרום
        </h1>

        <div className="space-y-5 text-right">
          <P>
            אתם הורים טובים. אתם משקיעים, אוהבים ומנסים - ובכל זאת יש בית שבו כל ערב הופך למאבק,
            כל בקשה נתקלת בסירוב, וכל התפרצות מותירה אתכם מרוקנים ואשמים. <Strong>זה לא כישלון
            הורי, זה חוסר בכלים</Strong> - וזה בדיוק מה שהדרכת הורים נותנת.
          </P>
          <P>
            העבודה נעשית <Strong>איתכם, לא עם הילד</Strong>. כשההורה משנה את הדרך שבה הוא מגיב,
            הדינמיקה בבית משתנה - גם בלי שהילד ישב מולי אפילו פעם אחת.
          </P>
        </div>

        <div className="mt-8 rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center border" style={{ backgroundColor: C.cream, borderColor: C.border }}>
          {['ללא נוכחות הילד', 'תהליך קצר וממוקד', 'כלים ליישום מיידי', 'גם בזום'].map((item) => (
            <span key={item} className="text-sm font-medium" style={{ color: C.textDark }}>{item}</span>
          ))}
        </div>

        <H2>למה הדרכת הורים מתאימה</H2>
        <P>אלה האתגרים שהכי הרבה הורים מגיעים איתם:</P>
        <ul className="space-y-3 my-6">
          {[
            'התפרצויות זעם והתקפי בכי שנראים לא פרופורציונליים',
            'קושי בהצבת גבולות, או תחושה ש"שום דבר לא עובד"',
            'מריבות מתמידות בין אחים',
            'סירוב ושיתוף פעולה נמוך - שיעורי בית, מקלחת, שינה',
            'קשיי שינה והירדמות',
            'חרדות ופחדים שמשפיעים על כל המשפחה',
            'תחושה שאתם מתארגנים סביב הקושי של הילד',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />
              <span className="flex-1 text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>{item}</span>
            </li>
          ))}
        </ul>

        <H2>איך נראה התהליך</H2>
        <ol className="space-y-4 my-6">
          {[
            { t: 'מיפוי', d: 'מבינים יחד מה קורה בבית בפועל - לא בכללי, אלא ברמת הרגע והתגובה.' },
            { t: 'זיהוי הדפוס', d: 'מגלים את המעגל שחוזר על עצמו: מה מדליק, מה מגיב, ומה מחזק אותו בלי כוונה.' },
            { t: 'כלים מותאמים', d: 'בונים דרכי תגובה חדשות שמתאימות לילד הזה, לגיל שלו ולמשפחה הזו.' },
            { t: 'תרגול וליווי', d: 'מיישמים בבית, חוזרים עם מה שעבד ומה שלא, ומדייקים.' },
          ].map((step, i) => (
            <li key={step.t} className="flex items-start gap-4 text-right">
              <span className="mt-1 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold text-white" style={{ backgroundColor: C.plum }}>{i + 1}</span>
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
            הדרכת הורים היא לרוב הדרך המהירה והזולה ביותר לשינוי בבית - וזו גם הדלת שנשארת פתוחה
            כשהילד מסרב לטיפול. במקרים רבים אין צורך בשום דבר מעבר לה.
          </p>
        </div>

        <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-right pr-5 border-r-4 py-2 my-8" style={{ color: C.textDark, borderColor: C.rose }}>
          &quot;הורים מגיעים ואומרים: אני כבר לא יודע מה לעשות איתו. ואחרי כמה מפגשים הם אומרים משהו
          אחר: עכשיו אני מבין מה קורה שם.&quot;
        </blockquote>

        <H2>הדרכת הורים בכל הדרום וגם בזום</H2>
        <P>
          הפגישות מתקיימות ב<Strong>נתיבות</Strong> ומשרתות משפחות מ{AREAS.slice(1).join(', ')} והסביבה.
          הפורמט מתאים במיוחד ל<Strong>זום</Strong> - בלי צורך בסידור לילדים, ומכל מקום בארץ.
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
            { href: '/blog/vitur-regashi-madrich',   title: 'ויסות רגשי בילדים: המדריך המלא', desc: 'למה ילדים מתפוצצים על דברים קטנים, וכלים לפי גיל.' },
            { href: '/blog/mesurav-beit-sefer',      title: 'ילד שמסרב ללכת לבית ספר',        desc: 'מה עומד מאחורי הסירוב ואיך להגיב נכון.' },
            { href: '/metapel-regashi',              title: 'מטפלת רגשית',                    desc: 'כשצריך גם עבודה ישירה עם הילד.' },
            { href: '/blog/lehaskir-layelad-al-tipul', title: 'איך מסבירים לילד על טיפול',    desc: 'מדריך לשיחה לפי גיל - מה לומר ומה לא.' },
          ]}
        />

        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-lg font-medium mb-1.5" style={{ color: C.textDark }}>רוצים שיהיה רגוע יותר בבית?</p>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>שיחת היכרות קצרה, ללא התחייבות - בנתיבות, בכל הדרום או בזום.</p>
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <Link href="/#contact" className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1" style={{ background: C.plum, boxShadow: '0 8px 30px rgba(57,73,171,0.12)' }}>
              לתיאום שיחת היכרות
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
