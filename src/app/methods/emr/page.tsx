import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';
import RelatedLinks from '../../../components/RelatedLinks';
import { canonicalMeta } from '../../../lib/site';
import InfoDisclaimer from '../../../components/InfoDisclaimer';

export const metadata: Metadata = {
  title: 'EMR - עיבוד תנועות עיניים | כנפיים לעוף',
  description:
    'טיפול EMR (עיבוד תנועות עיניים) לשחרור טראומה, חרדות ודפוסים רגשיים שאינם משרתים. גלו כיצד EMR יכול לשנות את חייכם.',
  ...canonicalMeta('/methods/emr'),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://cnafim-lauf.co.il/' },
    { '@type': 'ListItem', position: 2, name: 'שיטות הטיפול', item: 'https://cnafim-lauf.co.il/#methods' },
    { '@type': 'ListItem', position: 3, name: 'EMR', item: 'https://cnafim-lauf.co.il/methods/emr' },
  ],
};

export default function EmrPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-10 justify-end" style={{ color: C.textLight }} aria-label="נתיב ניווט">
          <Link href="/" className="hover:underline" style={{ color: C.rose }}>בית</Link>
          <span>/</span>
          <Link href="/#methods" className="hover:underline" style={{ color: C.rose }}>שיטות הטיפול</Link>
          <span>/</span>
          <span>EMR</span>
        </nav>

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

        <RelatedLinks
          links={[
            { href: '/blog/mah-ze-emr',  title: 'EMR: השיטה שעוזרת כשדיבור לא מספיק', desc: 'מהי EMR, במה היא שונה, ולאילו מצבים היא מתאימה.' },
            { href: '/metapel-regashi',  title: 'מטפלת רגשית בנתיבות והדרום',        desc: 'טיפול רגשי לילדים, נערות ונשים - וגם בזום.' },
            { href: '/methods/cbt',      title: 'CBT - קוגניטיבי-התנהגותי',           desc: 'זיהוי ושינוי דפוסי חשיבה שמגבילים את איכות החיים.' },
            { href: '/methods/nlp',      title: 'NLP - תכנות נוירו-לשוני',            desc: 'שינוי דפוסי חשיבה לחיזוק ביטחון ומסוגלות.' },
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
