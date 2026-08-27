import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';
import RelatedLinks from '../../../components/RelatedLinks';
import { canonicalMeta, SITE_URL, SCHEMA_IDS, areaServed } from '../../../lib/site';
import InfoDisclaimer from '../../../components/InfoDisclaimer';
import Breadcrumbs from '../../../components/Breadcrumbs';

const FAQ = [
  {
    q: 'מה זה טיפול EMR?',
    a: 'EMR היא שיטת עיבוד רגשי שבה עובדים עם תנועות עיניים לצד תשאול מדויק, כדי להגיע לזיכרון או לחוויה שממשיכים להשפיע על ההווה ולעבד אותם. היא מתאימה במיוחד כשדיבור לבדו לא מצליח להזיז את הקושי.',
  },
  {
    q: 'מה ההבדל בין EMR ל-EMDR?',
    a: 'שתי הגישות מבוססות על עיבוד רגשי בעזרת תנועות עיניים, אך אינן זהות. בסיס המחקר הרחב וההנחיות הקליניות הבינלאומיות מתייחסים ל-EMDR באופן ספציפי. חשוב לנו לדייק בכך ולא להציג את השיטות כאותו דבר.',
  },
  {
    q: 'האם EMR מתאים לילדים?',
    a: 'כן, בהתאמה לגיל ולבשלות הרגשית, ותמיד בשיתוף ההורים. אצל ילדים העבודה קצרה יותר, משלבת משחק ודמיון, ונעשית במינון זהיר. ההחלטה אם השיטה מתאימה נעשית אחרי שיחת היכרות והיכרות עם הרקע.',
  },
  {
    q: 'כמה מפגשים נדרשים?',
    a: 'זה תלוי בסוג הקושי ובוותק שלו. לעיתים די בכמה מפגשים ממוקדים סביב אירוע אחד, ולעיתים נדרש תהליך ארוך יותר. בשיחת ההיכרות אפשר להעריך כיוון, ובמהלך העבודה בודקים יחד אם יש התקדמות.',
  },
  {
    q: 'האם התהליך מציף או קשה רגשית?',
    a: 'תוך כדי העבודה עשויות לעלות התנגדויות, רגשות עזים וזיכרונות נוספים. זה חלק מהתהליך, ותפקיד המטפל לזהות זאת בזמן אמת, לווסת ולשמור על קצב בטוח. לא נכנסים לחומר שהמטופל אינו מוכן אליו.',
  },
  {
    q: 'האם אפשר לעבור טיפול EMR בזום?',
    a: 'כן. חלק מהעבודה נעשית גם מרחוק, בהתאמה ובבדיקה שהתנאים בבית מאפשרים מרחב שקט ובטוח. בשיחת ההיכרות נבדוק יחד אם המסגרת הזאת מתאימה לך או לילד.',
  },
];

export const metadata: Metadata = {
  title: 'טיפול EMR בנתיבות ובדרום - עיבוד בתנועות עיניים | כנפיים לעוף',
  description:
    'טיפול EMR - עיבוד רגשי בתנועות עיניים - בנתיבות, בכל אזור הדרום וגם בזום. לטראומה, חרדות ודפוסים רגשיים שממשיכים להשפיע, גם כשדיבור לא מספיק.',
  keywords: [
    'EMR',
    'טיפול EMR',
    'עיבוד רגשי בתנועות עיניים',
    'EMR נתיבות',
    'EMR בדרום',
    'ההבדל בין EMR ל-EMDR',
    'טיפול בטראומה',
  ],
  ...canonicalMeta('/methods/emr'),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'טיפול EMR - עיבוד רגשי בתנועות עיניים',
  name: 'טיפול EMR - כנפיים לעוף',
  description:
    'עיבוד רגשי בעזרת תנועות עיניים לטיפול בטראומה, חרדות ודפוסים רגשיים מגבילים, לילדים, נערות ונשים. בנתיבות, בכל אזור הדרום וגם בזום.',
  url: `${SITE_URL}/methods/emr`,
  provider: { '@type': 'Person', '@id': SCHEMA_IDS.person },
  areaServed: areaServed(),
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

// The demo clip below is server-rendered in the page, but without VideoObject
// markup Google reported it as an unindexed video. Facts here are real: the
// clip is 5 seconds long (parsed from the mp4 header) and was added to the
// site on 2026-03-30 (git date of public/emr_video1.mp4).
const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'הדגמת טיפול EMR - עיבוד רגשי בתנועות עיניים',
  description:
    'סרטון הדגמה קצר מתוך מפגש EMR: כך נראית העבודה עם תנועות עיניים בקליניקה של גאולה אלון.',
  thumbnailUrl: `${SITE_URL}/emr_live.jpeg`,
  uploadDate: '2026-03-30',
  contentUrl: `${SITE_URL}/emr_video1.mp4`,
  duration: 'PT5S',
  inLanguage: 'he',
};

export default function EmrPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(255,240,245,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-4xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="כנפיים לעוף"
              width={168}
              height={56}
              className="h-14 w-auto object-contain"
              style={{ maxWidth: 168, mixBlendMode: 'multiply' }}
              priority
            />
          </Link>
          {/* Fix 12: back = ← */}
          <Link
            href="/#methods"
            className="text-sm font-light transition-colors hover:text-[#D81B8C]"
            style={{ color: C.textMid }}
          >
            ← חזרה לשיטות הטיפול
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">

        <Breadcrumbs
          items={[
            { label: 'בית', href: '/' },
            { label: 'שיטות הטיפול', href: '/#methods' },
            { label: 'EMR - עיבוד רגשי בתנועות עיניים' },
          ]}
        />

        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-5 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}66, ${C.rose})` }}
        />

        <p className="text-sm font-semibold tracking-[0.2em] mb-3 text-right" style={{ color: C.rose }}>
          גישה טיפולית
        </p>

        <h1
          className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tighter text-right mb-4"
          style={{ color: C.textDark }}
        >
          EMR - עיבוד רגשי בתנועות עיניים
        </h1>

        <p className="text-xl font-light leading-relaxed text-right mb-10" style={{ color: C.textMid }}>
          עיבוד תנועות עיניים
        </p>

        {/* Video */}
        <div
          className="w-full rounded-2xl overflow-hidden mb-8 border"
          style={{ borderColor: C.border, boxShadow: '0 8px 30px rgba(57,73,171,0.07)' }}
        >
          <video
            controls
            className="w-full block"
            src="/emr_video1.mp4"
            aria-label="סרטון הדגמה לטיפול EMR"
          >
            הדפדפן שלך אינו תומך בתג הווידאו.
          </video>
        </div>

        {/* Article body */}
        <div className="space-y-6 text-right">
          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              אז איך נראה מפגש טיפול בתנועות עיניים EMR?
            </strong>
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>במפגש EMR</strong> המטפל מוביל את המטופל בשיח
            טיפולי שבו המטופל משתף על אתגרים רגשיים או קונקרטיים בחייו.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            במהלך השיחה המטפל מתבונן בתנועות העיניים ויודע לזהות מתי המטופל מתחבר למצוקה רגשית אמיתית,
            גם אם היא עדיין לא נאמרת במילים.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            בשלב הזה{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>המטפל יוביל</strong> את המטופל להתחבר לזיכרון
            מטריד או כואב, ויבצע תנועות עיניים שמאפשרות עיבוד ושחרור של הזיכרון.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            תוך כדי התהליך עשויות{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>לעלות התנגדויות</strong>, הצפות רגשיות וזיכרונות
            נוספים. מטפל מיומן יודע לזהות את המתרחש בזמן אמת, לווסת, ולעבוד בצורה מדויקת ובטוחה.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>אבל זה לא הכול.</strong>
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>מטפל EMR מיומן</strong> יודע להוביל את המטופל
            גם לשחרור של מנגנוני הגנה ודפוסי התנהגות שכבר אינם מועילים לו - דפוסים שנבנו בעבר מתוך
            צורך, חוסר אונים או הישרדות.
          </p>

          {/* Mid-article image - natural 461x1024 story-format ratio, capped width and centered so the full photo is visible */}
          <div
            className="relative w-full max-w-[300px] mx-auto aspect-[461/1024] rounded-2xl overflow-hidden my-8 border"
            style={{ borderColor: C.border, boxShadow: '0 4px 20px rgba(57,73,171,0.06)' }}
          >
            <Image
              src="/emr_live.jpeg"
              alt="המחשה לתהליך EMR"
              fill
              className="object-cover"
              sizes="300px"
              loading="lazy"
            />
          </div>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>לדוגמה</strong>, ילדה שלא ראו אותה ולא קיבלה
            יחס רגשי למדה שכאשר היא כועסת היא מקבלת מענה. הכעס אמנם פוגע בהמשך במערכות יחסים, אבל בילדות
            זו הייתה אסטרטגיה שעבדה, ולכן היא נשמרה באופן לא מודע גם בבגרות.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>בטיפול EMR</strong> ניתן להגיע במהירות לכאב
            הראשוני שבו נוצר הדפוס הזה, ולשחרר אותו באמצעות תנועות עיניים ותשאול מדויק. כאשר המקום הזה
            מתרפא, הצורך בדפוס ההגנתי פשוט נחלש או נעלם.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            כך נוצר שינוי עמוק - לא דרך מאבק בהתנהגות, אלא דרך ריפוי המקום שממנו היא נולדה.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            חשוב לנו לדייק: EMR היא שיטה קרובה ל-EMDR, אך אינה זהה לה. בסיס המחקר הרחב והמלצות
            ההנחיות הקליניות מתייחסים ל-EMDR באופן ספציפי, והעקרונות המשותפים לשתי הגישות הם עיבוד
            רגשי בעזרת תנועות עיניים.
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { title: 'עיבוד טראומה',   body: 'גישה ישירה לזיכרונות כואבים ושחרורם בצורה בטוחה ומבוקרת.' },
            { title: 'שינוי דפוסים',   body: 'שחרור מנגנוני הגנה ישנים שאינם מועילים עוד בחיים הנוכחיים.' },
            { title: 'תוצאות מהירות', body: 'תהליך ממוקד שמביא לשינוי עמוק בפחות זמן מגישות אחרות.' },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-5 border text-right"
              style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.rose }} />
              </div>
              <h2 className="font-display text-base font-semibold mb-1.5" style={{ color: C.textDark }}>
                {card.title}
              </h2>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-2xl font-medium mb-8"
            style={{ color: C.textDark, letterSpacing: '-0.02em' }}
          >
            שאלות נפוצות על טיפול EMR
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-xl p-5 border text-right"
                style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
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
        </section>

        <RelatedLinks
          links={[
            { href: '/blog/mah-ze-emr',  title: 'EMR: השיטה שעוזרת כשדיבור לא מספיק', desc: 'מהי EMR, במה היא שונה, ולאילו מצבים היא מתאימה.' },
            { href: '/metapel-regashi',  title: 'מטפלת רגשית בנתיבות והדרום',        desc: 'טיפול רגשי לילדים, נערות ונשים - וגם בזום.' },
            { href: '/methods/cbt',      title: 'CBT - קוגניטיבי-התנהגותי',           desc: 'זיהוי ושינוי דפוסי חשיבה שמגבילים את איכות החיים.' },
            { href: '/methods/nlp',      title: 'ניתוב לשוני פיזיולוגי (NLP)',        desc: 'שינוי דפוסי חשיבה לחיזוק ביטחון ומסוגלות.' },
          ]}
        />

        {/* CTA */}
        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>
            מעוניינים לשמוע עוד או לתאם שיחת היכרות?
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
              href="/#methods"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לשיטות הטיפול
            </Link>
          </div>
        </div>

        <InfoDisclaimer />
      </main>

{/* Site footer is rendered by the root layout */}
    </div>
  );
}
