import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';
import Breadcrumbs from '../../components/Breadcrumbs';
import { SITE_NAME, OWNER_NAME, PHONE_DISPLAY, PHONE_TEL, EMAIL, canonicalMeta } from '../../lib/site';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | כנפיים לעוף',
  description: 'מדיניות הפרטיות של אתר כנפיים לעוף - איזה מידע נאסף בטופס יצירת הקשר, למה הוא משמש, היכן הוא נשמר, למשך כמה זמן, וכיצד ניתן לבקש עיון או מחיקה.',
  ...canonicalMeta('/privacy'),
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
function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: C.textDark, fontWeight: 600 }}>{children}</strong>;
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <section className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        <Link href="/" className="inline-block">
          <Image src="/logo.jpg" alt={SITE_NAME} width={240} height={80} className="h-16 md:h-20 w-auto object-contain" style={{ maxWidth: 240, mixBlendMode: 'multiply' }} priority />
        </Link>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        <Breadcrumbs items={[{ label: 'בית', href: '/' }, { label: 'מדיניות פרטיות' }]} />

        <div className="w-16 h-0.5 mb-6 mr-auto" style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }} />

        <h1 className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
          מדיניות פרטיות
        </h1>

        <div className="space-y-5 text-right">
          <P>
            הפרטיות שלכם חשובה לנו במיוחד. מרכז {SITE_NAME} עוסק בתחום רגיש, ולכן אנו מקפידים על
            שמירה קפדנית על המידע שנמסר לנו. מסמך זה מסביר איזה מידע נאסף באתר, למה הוא משמש, היכן
            הוא נשמר וכיצד תוכלו לבקש לעיין בו או למחוק אותו.
          </P>
        </div>

        <H2>איזה מידע נאסף</H2>
        <P>
          האתר אוסף מידע <Strong>רק כאשר אתם בוחרים ליצור קשר</Strong> באמצעות טופס יצירת הקשר או
          טופס הפנייה המהירה. המידע כולל:
        </P>
        <Bullets
          items={[
            'שם מלא',
            'מספר טלפון',
            'נושא הפנייה',
            'תוכן ההודעה החופשי שאתם כותבים',
          ]}
        />
        <P>
          אין באתר חובה למסור מידע, והגלישה בו אינה מחייבת מסירת פרטים כלשהם. אין באתר מערכת
          הרשמה, ואיננו אוספים מידע על גלישתכם לצורכי פרסום.
        </P>

        <H2>מידע על קטינים</H2>
        <P>
          מטבע השירות, ייתכן שתבחרו לשתף בטופס מידע הנוגע ל<Strong>ילד או קטין</Strong>. אנו
          מבקשים למסור בטופס את המידע ההכרחי בלבד לצורך יצירת הקשר הראשוני, ולשמור פרטים אישיים
          ורגישים לשיחה עצמה. מידע שנמסר על קטין נשמר באותה רמת סודיות ומטופל בדיסקרטיות מלאה.
        </P>

        <H2>למה המידע משמש</H2>
        <Bullets
          items={[
            'יצירת קשר חוזר בעקבות פנייתכם',
            'מתן מענה לשאלה או תיאום שיחת היכרות',
            'ניהול ההתקשרות השוטפת אם תבחרו להתחיל תהליך',
          ]}
        />
        <P>
          <Strong>איננו מוכרים, משכירים או מעבירים את המידע לצדדים שלישיים</Strong> לצורכי שיווק,
          ואיננו שולחים דיוור פרסומי למי שלא ביקש זאת במפורש.
        </P>

        <H2>היכן המידע נשמר</H2>
        <P>
          פניות מהאתר נשלחות ונשמרות באמצעות שירות הטפסים של <Strong>Netlify</Strong>, ספקית
          האחסון של האתר, ומועברות לתיבת הדואר האלקטרוני של המרכז. הגישה למידע מוגבלת ל
          {OWNER_NAME} בלבד. האתר מאובטח בתעודת SSL, וכל התעבורה בו מוצפנת.
        </P>

        <H2>משך שמירת המידע</H2>
        <P>
          פניות נשמרות למשך הזמן הנדרש לטיפול בפנייה ולניהול ההתקשרות. ניתן לבקש בכל עת את מחיקת
          הפנייה, ואנו נפעל למחוק אותה בהקדם, למעט מידע שקיימת חובה חוקית לשמרו.
        </P>

        <H2>עוגיות (Cookies)</H2>
        <P>
          האתר <Strong>אינו עושה שימוש בעוגיות מעקב או פרסום</Strong>. תפריט הנגישות שומר את
          ההעדפות שבחרתם (כגון גודל גופן וניגודיות) באחסון המקומי של הדפדפן שלכם בלבד, כדי שהאתר
          ייראה כפי שהתאמתם אותו גם בביקור הבא. מידע זה נשאר במכשיר שלכם ואינו נשלח לשום מקום.
        </P>

        <H2>הזכויות שלכם</H2>
        <P>בהתאם לחוק הגנת הפרטיות, אתם רשאים:</P>
        <Bullets
          items={[
            'לעיין במידע שנשמר אודותיכם',
            'לבקש לתקן מידע שאינו נכון או מעודכן',
            'לבקש למחוק את המידע שנמסר',
          ]}
        />
        <P>לכל בקשה בנושא, ניתן לפנות בפרטים המופיעים מטה, ונטפל בה בהקדם.</P>

        <H2>שינויים במדיניות</H2>
        <P>
          מדיניות זו עשויה להתעדכן מעת לעת. הנוסח המעודכן יפורסם תמיד בעמוד זה.
        </P>

        <H2>יצירת קשר בנושא פרטיות</H2>
        <div className="rounded-xl p-6 border text-right mt-2" style={{ backgroundColor: C.cream, borderColor: C.border }}>
          <p className="text-base font-medium mb-3" style={{ color: C.textDark }}>{OWNER_NAME} · {SITE_NAME}</p>
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
            <Link href="/accessibility" className="text-sm font-medium hover:opacity-80" style={{ color: C.rose }}>
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
