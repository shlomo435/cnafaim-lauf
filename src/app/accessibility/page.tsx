import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';
import { SITE_URL, OWNER_NAME, PHONE_DISPLAY, PHONE_TEL, EMAIL } from '../../lib/site';

const PAGE_URL = `${SITE_URL}/accessibility`;

export const metadata: Metadata = {
  title: 'הצהרת נגישות | כנפיים לעוף',
  description: 'הצהרת הנגישות של אתר כנפיים לעוף - האמצעים שננקטו להנגשת האתר, רמת ההתאמה, מגבלות ידועות ודרכי פנייה לרכז הנגישות.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-medium mt-10 mb-4 leading-snug" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.05rem] font-light leading-[1.9]" style={{ color: C.textMid }}>{children}</p>;
}
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 my-5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />
          <span className="flex-1 text-[1.02rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <section className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        <Link href="/" className="inline-block">
          <Image src="/logo.jpg" alt="כנפיים לעוף" width={240} height={80} className="h-16 md:h-20 w-auto object-contain" style={{ maxWidth: 240, mixBlendMode: 'multiply' }} priority />
        </Link>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        <div className="w-16 h-0.5 mb-6 mr-auto" style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }} />

        <h1 className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
          הצהרת נגישות
        </h1>

        <div className="space-y-5 text-right">
          <P>
            מרכז &quot;כנפיים לעוף&quot; רואה חשיבות רבה במתן שירות שוויוני לכלל הציבור, ופועל
            להנגשת האתר כך שיהיה זמין ונוח לשימוש גם עבור אנשים עם מוגבלות. הנגישות היא חלק מתפיסת
            העולם של המרכז, ולא רק דרישה פורמלית.
          </P>
        </div>

        <H2>אמצעי הנגישות באתר</H2>
        <P>באתר הוטמעו, בין היתר, האמצעים הבאים:</P>
        <Bullets
          items={[
            'תפריט נגישות ייעודי הכולל הגדלת גופן, גופן קריא ושליטה ברמת הניגודיות',
            'מבנה כותרות היררכי ותקין המאפשר ניווט נוח בקורא מסך',
            'קישור "דלג לתוכן" המאפשר מעבר מהיר לתוכן העיקרי בעזרת המקלדת',
            'ניווט מלא באמצעות מקלדת וסימון ברור של אלמנט הפוקוס',
            'טקסט חלופי (alt) לתמונות בעלות משמעות',
            'תמיכה בהעדפת המערכת להפחתת אנימציות (prefers-reduced-motion)',
            'תוכן האתר מוצג גם ללא הפעלת JavaScript',
            'ניגודיות צבעים העומדת בדרישות תקן WCAG 2.1 ברמה AA',
            'התאמה למגוון גדלי מסך, כולל טלפונים ניידים וטאבלטים',
          ]}
        />

        <H2>רמת הנגישות</H2>
        <P>
          האתר הונגש בהתאם להנחיות תקן ישראלי 5568 המבוסס על הנחיות WCAG 2.0, ונעשה מאמץ לעמוד
          ברמת התאמה AA.
        </P>

        <H2>מגבלות ידועות</H2>
        <P>
          למרות המאמצים, ייתכן שיימצאו באתר רכיבים או תכנים שטרם הונגשו במלואם, בין היתר בתכנים
          שהועלו בעבר או בתכנים של צד שלישי. אנו ממשיכים לפעול לשיפור הנגישות באופן שוטף.
        </P>
        <P>
          אם נתקלתם בבעיית נגישות כלשהי באתר, נשמח מאוד לשמוע. פנייה כזו עוזרת לנו לתקן ולשפר, ואנו
          מתחייבים לטפל בה בהקדם האפשרי.
        </P>

        <H2>הנגשת השירות במרכז</H2>
        <P>
          מעבר להנגשת האתר, ניתן לתאם מראש התאמות בקבלת השירות עצמו, לרבות אפשרות לקיים מפגשים
          מרחוק בזום עבור מי שהגעה פיזית מהווה עבורו קושי. מוזמנים לפנות ולתאם.
        </P>

        <H2>פנייה בנושא נגישות</H2>
        <div className="rounded-xl p-6 border text-right mt-2" style={{ backgroundColor: C.cream, borderColor: C.border }}>
          <p className="text-base font-medium mb-3" style={{ color: C.textDark }}>רכזת נגישות: {OWNER_NAME}</p>
          <div className="space-y-2 text-[1.02rem] font-light" style={{ color: C.textMid }}>
            <p>
              טלפון:{' '}
              <a href={`tel:${PHONE_TEL}`} className="font-medium hover:opacity-80" style={{ color: C.rose, direction: 'ltr', display: 'inline-block' }}>
                {PHONE_DISPLAY}
              </a>
            </p>
            <p>
              אימייל:{' '}
              <a href={`mailto:${EMAIL}`} className="font-medium hover:opacity-80" style={{ color: C.rose, direction: 'ltr', display: 'inline-block' }}>
                {EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-right" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <Link href="/" className="inline-block px-6 py-3 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]" style={{ borderColor: C.border, color: C.textMid }}>
              ← חזרה לאתר
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:opacity-80" style={{ color: C.rose }}>
              מדיניות פרטיות
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
