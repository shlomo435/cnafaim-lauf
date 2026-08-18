import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';
import Breadcrumbs from '../../../components/Breadcrumbs';
import RelatedLinks from '../../../components/RelatedLinks';

const BASE = 'https://cnafim-lauf.co.il';
const PAGE_URL = `${BASE}/methods/remedial`;

// Areas served - fuels both the visible copy and the Service schema.
const AREAS = [
  'נתיבות', 'אופקים', 'שדרות', 'אשקלון', 'באר שבע', 'קריית גת', 'שדות נגב', 'מרחבים',
];

// FAQ data - single source for both the visible section and the FAQPage schema.
const FAQ = [
  {
    q: 'מה זה הוראה מתקנת ובמה היא שונה משיעורי עזר?',
    a: 'שיעור עזר עוזר לילד להשלים חומר ולהתכונן למבחן. הוראה מתקנת מטפלת בשורש הקושי - בדרך שבה המוח מעבד קריאה, כתיבה וקשב. תחילה מבינים למה הקושי קיים, ורק אז בונים תוכנית שמדברת ישירות אליו, בשילוב תנועה, תרגילי מוח וכלים מותאמים אישית.',
  },
  {
    q: 'מאיזה גיל מתאימה הוראה מתקנת?',
    a: 'אפשר לפנות כבר מסוף כיתה א׳, בערך מגיל שש וחצי, וגם בכיתות הגבוהות ובחטיבה. ככל שמתחילים מוקדם יותר, כך התהליך קצר ויעיל יותר ומונע שחיקה של הביטחון העצמי.',
  },
  {
    q: 'כמה זמן לוקח לראות שיפור?',
    a: 'ברוב המקרים רואים שינוי ניכר תוך שניים עד ארבעה חודשים של עבודה עקבית. הקצב תלוי בסוג הקושי, בגיל ובמידת המעורבות של ההורים. כבר מהמפגשים הראשונים מרגישים הבדל בביטחון של הילד.',
  },
  {
    q: 'האם אפשר לקבל הוראה מתקנת בזום?',
    a: 'כן. חלק מהתהליך, ולעיתים כולו, מתקיים במפגשי זום יעילים ומותאמים לילדים. זה מנגיש טיפול איכותי גם למשפחות מרוחקות או עמוסות, בלי להתפשר על האיכות.',
  },
  {
    q: 'אתם נותנים שירות רק בנתיבות?',
    a: 'המרכז ממוקם בנתיבות ונותן שירות לכל אזור הדרום - אופקים, שדרות, אשקלון, באר שבע, קריית גת והיישובים שסביב. בנוסף, קיימת אפשרות לטיפולים מרחוק בזום לכל מקום בארץ.',
  },
  {
    q: 'איך מתחילים? האם חייבים אבחון קודם?',
    a: 'מתחילים בשיחת היכרות קצרה ולא מחייבת. לאחריה נערך אבחון תפקודי-לימודי קצר וממוקד שמאפשר להבין את הקושי במדויק, וממנו נבנית תוכנית עבודה אישית לילד או לילדה.',
  },
];

export const metadata: Metadata = {
  title: 'הוראה מתקנת בנתיבות ובדרום | כנפיים לעוף - גאולה אלון',
  description:
    'הוראה מתקנת בנתיבות ובכל אזור הדרום, וגם בזום. לילדים עם קשיי קריאה, כתיבה, שטף, הבנת הנקרא וקשב. אבחון תפקודי-לימודי ותוכנית אישית המשלבת תנועה ותרגילי מוח. ניסיון רב וגישה חמה.',
  keywords: [
    'הוראה מתקנת',
    'הוראה מתקנת נתיבות',
    'הוראה מתקנת בדרום',
    'מורה להוראה מתקנת',
    'קשיי קריאה',
    'אבחון לימודי',
    'הוראה מתקנת בזום',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'הוראה מתקנת בנתיבות ובדרום | כנפיים לעוף',
    description:
      'הוראה מתקנת לילדים עם קשיי קריאה, כתיבה וקשב - בנתיבות, בכל הדרום וגם בזום. אבחון ותוכנית אישית.',
    url: PAGE_URL,
    type: 'article',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'הוראה מתקנת',
  name: 'הוראה מתקנת - כנפיים לעוף',
  description:
    'הוראה מתקנת לילדים ולנוער עם קשיי קריאה, כתיבה, שטף, הבנת הנקרא וקשב. אבחון תפקודי-לימודי ותוכנית אישית המשלבת תנועה, תרגילי מוח וחיזוק ביטחון עצמי.',
  url: PAGE_URL,
  provider: {
    '@type': 'Person',
    name: 'גאולה אלון',
    jobTitle: 'מורה להוראה מתקנת ומאבחנת לימודית',
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

export default function RemedialPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* X close button - fixed top-left */}
      <Link
        href="/#methods"
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
            alt="כנפיים לעוף - הוראה מתקנת בנתיבות"
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
          {/* Natural 854x1280 portrait ratio, capped width and centered - full photo visible */}
          <div className="relative w-full max-w-[360px] aspect-[854/1280] rounded-2xl overflow-hidden">
            <Image
              src="/founder_speaking.jpg"
              alt="גאולה אלון - מורה להוראה מתקנת ומאבחנת לימודית, מרכז כנפיים לעוף נתיבות"
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
            הוראה מתקנת&nbsp;&nbsp;/&nbsp;&nbsp;טיפולים רגשיים&nbsp;&nbsp;/&nbsp;&nbsp;אבחונים תפקודיים לימודיים&nbsp;&nbsp;/&nbsp;&nbsp;הדרכת הורים
          </p>
          <p
            className="mt-3 text-sm md:text-[0.95rem] font-light italic leading-relaxed"
            style={{ color: C.textMid }}
          >
            מקום שמעניק לילדים כלים, ביטחון וכנפיים לצמוח, להתמודד ולהאמין בעצמם
          </p>
        </div>
      </section>

      {/* ④ CONTENT */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ label: 'בית', href: '/' }, { label: 'שיטות הטיפול', href: '/#methods' }, { label: 'הוראה מתקנת' }]} />


        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-6 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }}
        />

        <h1
          className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight"
          style={{ color: C.textDark, letterSpacing: '-0.02em' }}
        >
          הוראה מתקנת בנתיבות ובאזור הדרום
        </h1>

        <div className="space-y-5 text-right">
          <P>
            במרכז <Strong>&quot;כנפיים לעוף&quot;</Strong> בנתיבות ניתנת <Strong>הוראה מתקנת</Strong> לילדים,
            נערים ונערות המתקשים בקריאה, כתיבה, שטף, דיוק, הבנת הנקרא, קשב ותחושת מסוגלות בלמידה.
            המרכז משרת את כל אזור הדרום, וכן מציע מפגשים מרחוק בזום לכל מקום בארץ.
          </P>
          <P>
            אם הילד או הילדה שלכם משקיעים ובכל זאת נשארים מאחור, אם כל שיעורי הבית הופכים למאבק,
            ואם הביטחון העצמי בלימודים הולך ונשחק - <Strong>יש דרך אחרת</Strong>. הוראה מתקנת לא מתמקדת
            רק בהשלמת חומר, אלא נוגעת בשורש הקושי ובונה מחדש את היכולת ואת האמונה של הילד בעצמו.
          </P>
        </div>

        {/* Local trust strip */}
        <div
          className="mt-8 rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center border"
          style={{ backgroundColor: C.cream, borderColor: C.border }}
        >
          {[
            'מרכז בנתיבות',
            'שירות בכל הדרום',
            'אפשרות בזום',
            'אבחון ותוכנית אישית',
          ].map((item) => (
            <span key={item} className="text-sm font-medium" style={{ color: C.textDark }}>
              {item}
            </span>
          ))}
        </div>

        <H2>מה זה הוראה מתקנת?</H2>
        <div className="space-y-5 text-right">
          <P>
            הוראה מתקנת היא תחום מקצועי שנועד לעזור לילדים המתקשים ברכישת מיומנויות הלמידה הבסיסיות -
            קריאה, כתיבה, הבנת הנקרא וחשבון. בשונה משיעורי עזר, שמטרתם להשלים חומר ולתרגל,
            <Strong> הוראה מתקנת מטפלת בשורש הקושי</Strong>: בדרך שבה המוח קולט, מעבד ומייצר מידע.
          </P>
          <P>
            הרעיון פשוט אך עמוק: לא כל מוח לומד באותה דרך. כשילד מתקשה, לרוב הוא פשוט זקוק
            לדרך אחרת - כזו שמתאימה בדיוק אליו. ההוראה המתקנת מזהה את הדרך הזו ובונה סביבה תהליך
            מדויק, סבלני ומחזק.
          </P>
        </div>

        <H2>הסימנים שהילד/ה זקוקים להוראה מתקנת</H2>
        <P>כל ילד עובר רגעים קשים עם הלמידה. מה שחשוב הוא תבנית שחוזרת על עצמה לאורך זמן:</P>
        <ul className="space-y-3 my-6">
          {[
            'מחליף/ה אותיות דומות בקריאה ובכתיבה גם אחרי שנה שלמה בבית הספר',
            'קורא/ת לאט מאוד ובקושי, גם כשהמילים מוכרות',
            'לא זוכר/ת מה קרא/ה - כל האנרגיה הלכה לפענוח ולא נשאר להבנה',
            'מסתייג/ת מקריאה בקול, מתבייש/ת או מתנגד/ת',
            'עייפות ותסכול גדולים אחרי מעט מאמץ לימודי',
            'ירידה בביטחון העצמי ובחשק ללמוד',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />
              <span className="flex-1 text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
        <div
          className="my-8 rounded-xl p-5 border text-right"
          style={{ backgroundColor: C.cream, borderColor: C.border }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: C.rose }}>כדאי לדעת</p>
          <p className="text-base font-light leading-[1.9]" style={{ color: C.textMid }}>
            אם שלושה סימנים ומעלה חוזרים על פני כמה חודשים - שווה לפנות לאבחון תפקודי-לימודי.
            ככל שמאבחנים מוקדם יותר, כך קל ומהיר יותר לטפל.
          </p>
        </div>

        <H2>ההבדל בין הוראה מתקנת למורה פרטית</H2>
        <div className="space-y-5 text-right">
          <P>
            הרבה הורים מגלים בדרך הקשה ששנה שלמה עם מורה פרטית לא הביאה שינוי אמיתי - ולא בגלל
            שהמורה לא טובה או שהילד לא השתדל. מורה פרטית עוזרת <Strong>להשלים ולתרגל</Strong> את החומר.
            אבל אם שורש הקושי הוא באופן שבו המוח מעבד מידע, יותר תרגול של אותו הדבר לא יפתור את הבעיה.
          </P>
          <P>
            הוראה מתקנת מתחילה צעד אחד אחורה: <Strong>קודם מבינים מה קורה</Strong>, ורק אז בונים תוכנית
            שמדברת ישירות אל הקושי הספציפי - עם כלים, שיטות ותרגול שמותאמים לילד הזה, ולא לכלל.
          </P>
        </div>

        <H2>איך נראה התהליך - שלב אחר שלב</H2>
        <ol className="space-y-4 my-6">
          {[
            {
              t: 'שיחת היכרות',
              d: 'שיחה קצרה ולא מחייבת שבה מבינים את התמונה, מה מטריד אתכם ומה הצעד הנכון.',
            },
            {
              t: 'אבחון תפקודי-לימודי',
              d: 'אבחון קצר וממוקד שמטרתו להבין היכן נמצא הקושי, על מה הוא יושב, ומהי הדרך הנכונה לקדם.',
            },
            {
              t: 'תוכנית עבודה אישית',
              d: 'בניית תוכנית מדויקת לפי הצורך של הילד/ה, עם יעדים ברורים ומדידים.',
            },
            {
              t: 'מפגשים והתקדמות',
              d: 'עבודה עקבית המשלבת תנועה, תרגילי מוח וכלים מעשיים, תוך חיזוק מתמיד של הביטחון העצמי.',
            },
            {
              t: 'שיתוף ההורים',
              d: 'עדכון שוטף וכלים לבית, כדי שהשינוי ילווה את הילד גם מעבר לחדר.',
            },
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

        <H2>הגישה הייחודית - שילוב תנועה, מוח ורגש</H2>
        <div className="space-y-5 text-right">
          <P>
            העבודה נעשית מתוך ניסיון של שנים רבות בתחום ההוראה המתקנת, ומשלבת <Strong>כלים מקצועיים,
            תנועה, תרגילי מוח, חיזוק תפקודים לימודיים ובניית ביטחון עצמי</Strong>. תרגילי המוח והגוף
            מפעילים מסלולי למידה שונים ומחזקים את הקשר בין תנועה ליכולת לימודית.
          </P>
          <P>המטרה איננה רק לשפר קריאה וכתיבה, אלא לעזור לילד להרגיש:</P>
          <blockquote
            className="text-xl md:text-2xl font-light leading-relaxed text-right pr-5 border-r-4 py-2 my-2"
            style={{ color: C.textDark, borderColor: C.rose }}
          >
            &quot;אני מסוגל. אני מתקדם. אני יכול להצליח.&quot;
          </blockquote>
        </div>

        <H2>הוראה מתקנת בכל הדרום - וגם בזום</H2>
        <div className="space-y-5 text-right">
          <P>
            המרכז ממוקם ב<Strong>נתיבות</Strong> ונותן שירות להורים וילדים מכל אזור הדרום -
            {' '}{AREAS.slice(1).join(', ')} והיישובים שסביב. הקרבה והזמינות מאפשרות תהליך רציף ונוח.
          </P>
          <P>
            ולמי שגר רחוק יותר, או שפשוט נוח לו כך - קיימת אפשרות ל<Strong>הוראה מתקנת מרחוק בזום</Strong>,
            במפגשים יעילים ומותאמים לילדים. כך טיפול איכותי נגיש לכל משפחה, בכל מקום בארץ.
          </P>
        </div>

        {/* Info cards */}
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'למי זה מתאים?',
              body: 'לילדים ונוער עם קושי בקריאה, כתיבה, שטף ודיוק, הבנת הנקרא, קשב, חוסר ביטחון בלמידה או פערים לימודיים.',
            },
            {
              title: 'איך מתחילים?',
              body: 'מתאמים שיחת היכרות ואבחון ראשוני, ולאחריו נבנית תוכנית עבודה אישית ומדויקת לפי הצורך של הילד.',
            },
            {
              title: 'ניסיון רב ומוכח',
              body: 'עבודה מקצועית ומנוסה המשלבת את הידע העדכני בתחום ההוראה המתקנת עם גישה חמה ואישית.',
            },
            {
              title: 'שילוב תנועה ומוח',
              body: 'תרגילי מוח וגוף המפעילים מסלולי למידה שונים ומחזקים את הקשר בין תנועה ליכולות לימודיות.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-5 border text-right"
              style={{ backgroundColor: C.cream, borderColor: C.border }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: C.creamDeep, border: `1px solid ${C.border}` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.rose }} />
              </div>
              <h3 className="font-display text-base font-semibold mb-1.5" style={{ color: C.textDark }}>
                {card.title}
              </h3>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <H2>שאלות נפוצות על הוראה מתקנת</H2>
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

        <RelatedLinks
          links={[
            { href: '/blog/avchun-didakti-madrich-horim', title: 'אבחון דידקטי: המדריך המלא להורים', desc: 'מה בודקים, כמה זה עולה, ומה עושים עם הדוח אחר כך.' },
            { href: '/blog/kshei-kriya-yelad',            title: 'הילד שלי לא מצליח לקרוא',          desc: 'מתי זה שלב ומתי כדאי לפנות לעזרה מקצועית.' },
            { href: '/metapel-regashi',                   title: 'מטפלת רגשית בנתיבות והדרום',      desc: 'כשקושי לימודי מלווה גם בקושי רגשי.' },
            { href: '/blog/mesurav-beit-sefer',           title: 'ילד שמסרב ללכת לבית ספר',          desc: 'מה עומד מאחורי הסירוב ואיך להגיב נכון.' },
          ]}
        />

        {/* CTA */}
        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-lg font-medium mb-1.5" style={{ color: C.textDark }}>
            מוכנים לעזור לילד/ה להתקדם?
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
              href="/#methods"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לשיטות הטיפול
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
