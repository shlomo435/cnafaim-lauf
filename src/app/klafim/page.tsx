import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';
import Breadcrumbs from '../../components/Breadcrumbs';
import RelatedLinks from '../../components/RelatedLinks';
import { SITE_URL, OWNER_NAME, OG_IMAGE, SCHEMA_IDS } from '../../lib/site';

const PAGE_URL = `${SITE_URL}/klafim`;

const FAQ = [
  {
    q: 'לאיזה גיל מתאימים הקלפים?',
    a: 'הקלפים מתאימים לילדים מגיל הגן ועד גיל ההתבגרות, ומשמשים גם מטפלים בעבודה עם מבוגרים. אצל ילדים צעירים ההורה מנחה את השיחה, ואצל גדולים יותר הם מזמינים שיחה עצמאית ופתוחה.',
  },
  {
    q: 'צריך רקע טיפולי כדי להשתמש בהם?',
    a: 'לא. הקלפים נבנו כך שכל הורה יוכל להשתמש בהם בבית, בלי הכשרה מקצועית. הם מגיעים עם הנחיות שימוש פשוטות, והעיקרון הבסיסי הוא פשוט: לשאול, להקשיב, ולא למהר לתקן.',
  },
  {
    q: 'איך משתמשים בהם בפועל?',
    a: 'בוחרים קלף - הילד או ההורה - ומדברים עליו. אין תשובות נכונות ולא נכונות. הקלף הוא רק פתח לשיחה: מה הוא מזכיר לך, מתי הרגשת ככה, מה עזר לך אז. מומלץ לקבוע זמן קבוע ורגוע, למשל לפני השינה.',
  },
  {
    q: 'האם מטפלים יכולים להשתמש בהם?',
    a: 'בהחלט. הקלפים משמשים מטפלים רגשיים, יועצות חינוכיות ומורות בעבודה פרטנית וקבוצתית, ככלי לפתיחת שיחה ולעיבוד רגשי.',
  },
  {
    q: 'איך רוכשים?',
    a: 'פונים בטלפון, בוואטסאפ או דרך טופס יצירת הקשר, ומקבלים את כל הפרטים על המחיר, הזמינות ואופן המשלוח.',
  },
];

export const metadata: Metadata = {
  title: 'קלפים טיפוליים לילדים | קלפי ניצוץ - כנפיים לעוף',
  description:
    'קלפים טיפוליים לילדים - קלפי "ניצוץ" של גאולה אלון: פותחים שיחה רגשית, מרחב בטוח לביטוי עצמי וגשר בין הורים לילדים. מתאימים להורים, למטפלים ולאנשי חינוך.',
  keywords: ['קלפים טיפוליים', 'קלפי ניצוץ', 'קלפים טיפוליים לילדים', 'כלי טיפולי לילדים', 'שיחה רגשית עם ילדים'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'קלפי ניצוץ - קלפים טיפוליים לילדים',
    description: 'קלפים שפותחים שיחה רגשית עם ילדים - מרחב בטוח לביטוי עצמי וגשר תקשורת בין הורים לילדים.',
    url: PAGE_URL,
    type: 'article',
    images: [OG_IMAGE],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'קלפי ניצוץ - קלפים טיפוליים לילדים',
  description:
    'קלפים טיפוליים שנוצרו כדי לתת לכל ילד מרחב בטוח לביטוי עצמי, ולשמש גשר תקשורת בין הורים לילדים.',
  url: PAGE_URL,
  image: `${SITE_URL}/therapy_cards_box.jpg`,
  brand: { '@type': 'Brand', name: 'כנפיים לעוף' },
  manufacturer: { '@id': SCHEMA_IDS.organization },
  category: 'כלים טיפוליים',
  audience: { '@type': 'Audience', audienceType: 'הורים, מטפלים ואנשי חינוך' },
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

export default function CardsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
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
          <Image src="/logo.jpg" alt="כנפיים לעוף - קלפי ניצוץ" width={240} height={80} className="h-16 md:h-20 w-auto object-contain" style={{ maxWidth: 240, mixBlendMode: 'multiply' }} priority />
        </Link>
        <p className="mt-3 text-sm md:text-[0.95rem] font-light tracking-[0.18em] uppercase" style={{ color: C.textLight }}>
          מרכז רגשי לימודי · נתיבות והדרום
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'בית', href: '/' }, { label: 'קלפי ניצוץ' }]} />

        <div className="w-16 h-0.5 mb-6 mr-auto" style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }} />

        <h1 className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
          קלפים טיפוליים לילדים - קלפי &quot;ניצוץ&quot; שמדליקים אור בכל ילד
        </h1>

        <div className="space-y-5 text-right">
          <P>
            הרבה הורים מכירים את הרגע הזה: שואלים &quot;איך היה היום?&quot; ומקבלים &quot;בסדר&quot;.
            רוצים להיכנס פנימה, ולא מוצאים את הדלת. <Strong>קלפי ניצוץ נוצרו בדיוק בשביל הרגע
            הזה</Strong> - כדי לתת לילד דרך לדבר על עולמו הרגשי בלי להרגיש שהוא &quot;נחקר&quot;.
          </P>
        </div>

        <div className="relative w-full max-w-[340px] mx-auto mt-10 aspect-[860/1280] rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.borderLight}`, boxShadow: '0 4px 28px rgba(57,73,171,0.08)' }}>
          <Image src="/therapy_cards_box.jpg" alt="קלפי ניצוץ - קלפים טיפוליים לילדים" fill className="object-cover" sizes="340px" priority />
        </div>

        <H2>מה הקלפים עושים</H2>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {[
            { t: 'ביטוי עצמי', d: 'מרחב בטוח שבו הילד יכול לבטא רגשות בלי מילים גדולות ובלי לחץ.' },
            { t: 'קשר הורי', d: 'גשר תקשורת שיוצר שפה משותפת ומעמיק את האמון בין הורה לילד.' },
            { t: 'דיאלוג פתוח', d: 'שיחות משמעותיות בבית, במקום חילופי משפטים קצרים.' },
            { t: 'עמידות רגשית', d: 'שימוש קבוע מסייע לילד לזהות את חוזקותיו ולבנות חוסן.' },
          ].map((c) => (
            <div key={c.t} className="rounded-xl p-5 border text-right" style={{ backgroundColor: C.cream, borderColor: C.border }}>
              <h3 className="font-display text-lg font-semibold mb-1.5" style={{ color: C.textDark }}>{c.t}</h3>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>{c.d}</p>
            </div>
          ))}
        </div>

        <H2>איך משתמשים בהם</H2>
        <ol className="space-y-4 my-6">
          {[
            { t: 'בוחרים רגע רגוע', d: 'לא באמצע מריבה ולא כשממהרים. לפני השינה או בסוף היום עובד מצוין.' },
            { t: 'שולפים קלף', d: 'הילד בוחר, או שולפים יחד. אין תשובה נכונה ואין ציון.' },
            { t: 'שואלים ומקשיבים', d: 'מה הקלף מזכיר לך? מתי הרגשת ככה? ואז - שותקים ונותנים לו מקום.' },
            { t: 'לא ממהרים לתקן', d: 'זה החלק הקשה להורים והחשוב ביותר. לא לפתור, רק להקשיב.' },
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
            הקלפים אינם תחליף לטיפול, והם גם לא אמורים להיות &quot;משימה&quot;. הכוח שלהם הוא דווקא
            בקלילות: חמש דקות של שיחה אמיתית שוות יותר משעה של תחקיר.
          </p>
        </div>

        <H2>למי הם מתאימים</H2>
        <P>
          ל<Strong>הורים</Strong> שרוצים להעמיק את הקשר עם הילד, ל<Strong>מטפלים ויועצות</Strong>{' '}
          ככלי לפתיחת שיחה בחדר, ול<Strong>אנשי חינוך</Strong> בעבודה פרטנית או קבוצתית. הקלפים
          פותחו על ידי {OWNER_NAME} מתוך עשרים שנות עבודה עם ילדים.
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
            { href: '/metapel-regashi',              title: 'מטפלת רגשית',              desc: 'טיפול רגשי לילדים, נערות ונשים.' },
            { href: '/hadrachat-horim',              title: 'הדרכת הורים',              desc: 'כלים מעשיים לבית, מעבר לקלפים.' },
            { href: '/blog/vitur-regashi-madrich',   title: 'ויסות רגשי בילדים',        desc: 'הרקע המקצועי שמאחורי השיחות האלה.' },
            { href: '/blog/yalda-lo-ohevet-atzmah',  title: 'ילדה שלא אוהבת את עצמה',   desc: 'איך מזהים ותומכים בדימוי עצמי נמוך.' },
          ]}
        />

        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-lg font-medium mb-1.5" style={{ color: C.textDark }}>מעוניינים בקלפים?</p>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>
            פנו לקבלת פרטים על מחיר, זמינות ומשלוח.
          </p>
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <Link href="/#contact" className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1" style={{ background: C.plum, boxShadow: '0 8px 30px rgba(57,73,171,0.12)' }}>
              לפרטים ורכישה
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
