import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../lib/tokens';
import Breadcrumbs from '../../components/Breadcrumbs';
import RelatedLinks from '../../components/RelatedLinks';
import InfoDisclaimer from '../../components/InfoDisclaimer';
import { SITE_URL, OWNER_NAME, OG_IMAGE, SCHEMA_IDS } from '../../lib/site';

const PAGE_URL = `${SITE_URL}/tipul-regashi-bezoom`;

const FAQ = [
  {
    q: 'האם טיפול רגשי בזום יעיל כמו טיפול פנים אל פנים?',
    a: 'מחקרים רבים מהשנים האחרונות מראים שטיפול מקוון משיג תוצאות דומות לטיפול פנים אל פנים במגוון רחב של קשיים רגשיים, ובהם חרדה, דימוי עצמי וויסות רגשי - במיוחד בגישות מובנות כמו CBT. מה שקובע את ההצלחה הוא איכות הקשר הטיפולי וההתמדה, לא המרחק הפיזי. וכשהפורמט לא מתאים למקרה מסוים - אני אומרת את זה בכנות כבר בשיחת ההיכרות.',
  },
  {
    q: 'מאיזה גיל אפשר טיפול בזום לילד?',
    a: 'בדרך כלל מגיל בית ספר, בערך מגיל שבע-שמונה, כשהילד מסוגל להישאר בקשר מול מסך לאורך מפגש מותאם. עם ילדים צעירים יותר העבודה היעילה מרחוק היא לרוב דרך ההורים - הדרכת הורים בזום - או במפגשים פנים אל פנים בקליניקה בנתיבות.',
  },
  {
    q: 'מה צריך מבחינה טכנית?',
    a: 'מחשב או טאבלט עם מצלמה ומיקרופון, חיבור אינטרנט יציב ואוזניות. לפני המפגש הראשון נעשה בדיקה קצרה יחד כדי לוודא שהכול עובד. אין צורך בשום ידע טכני - לפני כל מפגש נשלח אליכם קישור פשוט, ולוחצים עליו.',
  },
  {
    q: 'מה אם הילד לא משתף פעולה מול המסך?',
    a: 'זה קורה, ויש לזה פתרונות: מפגשים קצרים יותר בהתחלה, שילוב של משחק, ציור וקלפים שמותאמים למסך, והורה זמין ברקע. אם אחרי כמה מפגשים רואים שהפורמט פשוט לא מתאים לילד הזה - עוברים בשקט למסלול אחר: מפגשים בנתיבות או עבודה דרך ההורים. שום תהליך לא נתקע בגלל מסך.',
  },
  {
    q: 'עד כמה הטיפול בזום דיסקרטי?',
    a: 'לחלוטין. המפגשים מתקיימים בשיחת וידאו פרטית, אינם מוקלטים, וכל המידע נשמר בסודיות מלאה - בדיוק כמו בקליניקה. בבית, כל מה שצריך הוא חדר שקט ואוזניות, וכך גם בני הבית אינם שומעים את תוכן השיחה.',
  },
];

export const metadata: Metadata = {
  title: 'טיפול רגשי בזום לילדים, נערות ונשים | כנפיים לעוף',
  description:
    'טיפול רגשי בזום עם גאולה אלון - מפגשים מקוונים לילדים, נערות ונשים מכל הארץ. למי זה מתאים, איך נראה מפגש, מה מכינים בבית, ושילוב עם מפגשים בנתיבות.',
  keywords: [
    'טיפול רגשי בזום',
    'טיפול רגשי מקוון',
    'טיפול רגשי מרחוק',
    'טיפול בזום לילדים',
    'טיפול רגשי אונליין',
    'מטפלת רגשית בזום',
    'הדרכת הורים בזום',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'טיפול רגשי בזום לילדים, נערות ונשים | כנפיים לעוף',
    description: 'מפגשים טיפוליים מקוונים מכל מקום בארץ - לילדים, נערות ונשים. עם אפשרות לשילוב מפגשים בנתיבות.',
    url: PAGE_URL,
    type: 'article',
    images: [OG_IMAGE],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'טיפול רגשי מקוון בזום',
  name: 'טיפול רגשי בזום - כנפיים לעוף',
  description:
    'טיפול רגשי מקוון בזום לילדים, נערות ונשים מכל רחבי הארץ: מפגשים אישיים מרחוק בשילוב CBT, EMR ו-NLP, עם אפשרות לשילוב מפגשים פנים אל פנים בנתיבות.',
  url: PAGE_URL,
  provider: {
    '@type': 'Person',
    '@id': SCHEMA_IDS.person,
    name: OWNER_NAME,
    jobTitle: 'מטפלת רגשית ומאבחנת לימודית',
  },
  areaServed: { '@type': 'Country', name: 'ישראל' },
  availableChannel: {
    '@type': 'ServiceChannel',
    name: 'מפגש וידאו בזום',
    serviceUrl: PAGE_URL,
  },
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

export default function OnlineTherapyPage() {
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
          <Image src="/logo.jpg" alt="כנפיים לעוף - טיפול רגשי בזום" width={240} height={80} className="h-16 md:h-20 w-auto object-contain" style={{ maxWidth: 240, mixBlendMode: 'multiply' }} priority />
        </Link>
        <p className="mt-3 text-sm md:text-[0.95rem] font-light tracking-[0.18em] uppercase" style={{ color: C.textLight }}>
          מרכז רגשי לימודי · נתיבות והדרום
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'בית', href: '/' }, { label: 'טיפול רגשי בזום' }]} />

        <div className="w-16 h-0.5 mb-6 mr-auto" style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }} />

        <h1 className="font-display text-4xl md:text-5xl font-medium text-right mb-6 leading-tight" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
          טיפול רגשי בזום - מהבית שלכם, מכל מקום בארץ
        </h1>

        <div className="space-y-5 text-right">
          <P>
            יש משפחות שהדרך לקליניקה בנתיבות פשוטה - עשר דקות נסיעה וחניה ליד הדלת. ויש משפחות
            שבשבילן טיפול טוב נשאר בגדר חלום: אין מטפלת מנוסה ביישוב, ההסעות באמצע היום בלתי
            אפשריות, או שפשוט אין כוחות לעוד נסיעה בסוף יום עמוס. <Strong>בשביל זה בדיוק קיים
            טיפול רגשי בזום</Strong> - אותה מטפלת, אותן שיטות, אותו קשר אישי, מהחדר השקט בבית שלכם.
          </P>
          <P>
            אני מלווה בזום ילדים, נערות ונשים מכל רחבי הארץ, במקביל למפגשים בקליניקה בנתיבות.
            אחרי שנים של עבודה בשני הפורמטים אני יכולה לומר בפשטות: <Strong>המסך אינו מחסום לקשר
            טיפולי אמיתי</Strong> - בתנאי שהמפגש נבנה נכון, מותאם לגיל, ושבוחרים מראש בכנות למי
            זה מתאים ולמי לא.
          </P>
        </div>

        <div className="mt-8 rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center border" style={{ backgroundColor: C.cream, borderColor: C.border }}>
          {['מכל מקום בארץ', 'ילדים, נערות ונשים', 'שילוב עם מפגשים בנתיבות', 'דיסקרטיות מלאה'].map((item) => (
            <span key={item} className="text-sm font-medium" style={{ color: C.textDark }}>{item}</span>
          ))}
        </div>

        <H2>למי טיפול בזום מתאים - ולמי פחות</H2>
        <P>
          טיפול מקוון הוא כלי נהדר, אבל הוא לא מתאים לכל אחד ולכל מצב - וחשוב לי לומר את זה
          בכנות כבר כאן. הוא מתאים במיוחד עבור:
        </P>
        <ul className="space-y-3 my-6">
          {[
            'נערות ונשים שנוח להן להיפתח דווקא מהמרחב המוכר והבטוח של הבית',
            'משפחות שגרות רחוק מהדרום או ביישובים ללא מענה טיפולי מקצועי בקרבת מקום',
            'הורים עסוקים שנסיעה באמצע היום מפילה את כל הלוז המשפחתי',
            'ילדים מגיל בית ספר שרגילים למסך ומרגישים איתו בנוח',
            'שמירה על רצף טיפולי בתקופות של מעבר דירה, מחלה או שגרה צפופה',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />
              <span className="flex-1 text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>{item}</span>
            </li>
          ))}
        </ul>
        <P>
          ולמי פחות? לילדים צעירים מאוד, בגיל הגן, שזקוקים למשחק תנועתי ולנוכחות פיזית; למצבים
          מורכבים שדורשים ליווי צמוד; ולבתים שבהם אין פינה שקטה ופרטית. במקרים כאלה נעדיף
          מפגשים פנים אל פנים בנתיבות, או מסלול אחר שעובד מצוין מרחוק - <Strong>הדרכת הורים
          בזום</Strong>, שבה השינוי עובר דרככם ולא דרך המסך.
        </P>

        <H2>איך נראה מפגש זום עם ילד</H2>
        <P>
          מפגש עם ילד מול מסך לא יכול להיות העתק של שיחה בקליניקה - והוא גם לא מנסה להיות.
          אני עובדת עם הילד בכלים שמתורגמים היטב למסך: קלפים טיפוליים שאני מציגה מולו, ציור
          שהוא מרים אל המצלמה ואנחנו מתבוננים בו יחד, משחקים משותפים, דמיון מודרך ותרגילים
          קצרים של תנועה ונשימה. המפגשים הראשונים קצרים ומדודים, והאורך גדל ככל שהילד נכנס לקשר.
        </P>
        <P>
          ההורים הם חלק מהמערך: בתחילת הדרך הורה נמצא בקרבת מקום - לא בתוך החדר, אבל זמין -
          ובסיום חלק מהמפגשים אנחנו מסכמים יחד בכמה משפטים. כך הטיפול לא נשאר &quot;מאחורי
          המסך&quot; אלא מחלחל הביתה, אל היומיום של המשפחה.
        </P>

        <H2>ואיך נראה מפגש עם נערה או אישה</H2>
        <P>
          עם נערות ונשים העבודה המקוונת קרובה מאוד למפגש בקליניקה: שיחה פתוחה, עבודה מובנית
          בכלים של CBT ו-NLP, דפי עבודה שאני משתפת על המסך, ותרגול בין המפגשים. לא מעט נשים
          מספרות שדווקא בבית - עם כוס תה, בלי נסיעה ובלי חדר המתנה - קל להן יותר להגיע פתוחות
          ורגועות. יש מי שמרגישות שהמסך מעניק מעין מרחב מוגן, שמאפשר לגעת בדברים הרגישים
          באמת מוקדם יותר.
        </P>

        <H2>מה כדאי להכין בבית</H2>
        <P>לא צריך הרבה, אבל מה שצריך - חשוב:</P>
        <ul className="space-y-3 my-6">
          {[
            'חדר שקט עם דלת שנסגרת, כדי שהמפגש לא ייקטע באמצע',
            'אוזניות - גם לאיכות שמע טובה וגם לשמירה על הפרטיות',
            'מחשב או טאבלט מונח בגובה העיניים - יציב ונוח יותר מטלפון ביד',
            'חיבור אינטרנט יציב, ובדיקה קצרה לפני המפגש הראשון',
            'לילדים: דף, צבעים ומשחק אהוב בהישג יד',
            'תיאום עם בני הבית שזהו זמן שקט, ללא כניסות לחדר',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />
              <span className="flex-1 text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>{item}</span>
            </li>
          ))}
        </ul>

        <H2>האם טיפול מרחוק באמת יעיל?</H2>
        <P>
          זו השאלה שכל הורה שואל, ובצדק. מחקרים מהשנים האחרונות מצביעים על כך שטיפול מקוון
          משיג תוצאות דומות לטיפול פנים אל פנים במגוון רחב של קשיים רגשיים - חרדה, דימוי עצמי,
          ויסות רגשי - במיוחד בגישות מובנות כמו <Strong>CBT</Strong>. מה שמנבא הצלחה הוא לא
          המרחק הפיזי אלא איכות הקשר הטיפולי, ההתמדה והשותפות של הבית.
        </P>
        <P>
          מהניסיון שלי, ילדים של דור המסך מסתגלים לפורמט מהר להפתיע, ונשים רבות מוצאות בו
          דווקא יתרון. ועדיין - אם במהלך הדרך אראה שהזום לא משרת את הילד או את המטופלת,
          אגיד זאת ביושר ונחשוב יחד על התאמה.
        </P>

        <div className="my-8 rounded-xl p-5 border text-right" style={{ backgroundColor: C.cream, borderColor: C.border }}>
          <p className="text-sm font-semibold mb-2" style={{ color: C.rose }}>כדאי לדעת</p>
          <p className="text-base font-light leading-[1.9]" style={{ color: C.textMid }}>
            בשיחת ההיכרות נבחן יחד אם זום מתאים למקרה שלכם. אם התשובה היא לא - אגיד את זה
            בפשטות, ונמצא יחד את המסלול הנכון: מפגשים בנתיבות, שילוב בין השניים, או הדרכת הורים.
          </p>
        </div>

        <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-right pr-5 border-r-4 py-2 my-8" style={{ color: C.textDark, borderColor: C.rose }}>
          &quot;אמא מהצפון אמרה לי בתחילת הדרך: חששתי שדרך מסך זה ירגיש קר. אחרי חודש היא
          כתבה לי: הבת שלי מחכה לזום הזה כל השבוע.&quot;
        </blockquote>

        <H2>שילוב עם מפגשים בנתיבות</H2>
        <P>
          זום ומפגשים פיזיים אינם שני עולמות נפרדים - ברוב המקרים הם משלימים זה את זה. משפחות
          מהדרום בוחרות לעיתים להתחיל בהיכרות פנים אל פנים בקליניקה בנתיבות, ולהמשיך את שגרת
          הטיפול בזום. אחרות עובדות בעיקר מרחוק ומגיעות למפגש פיזי אחת לתקופה. הגמישות הזו
          שומרת על <Strong>רצף טיפולי</Strong> - גם כשילד חולה, כשהרכב במוסך או כשהלוז מתהפך.
        </P>

        <H2>זמינות לכל הארץ</H2>
        <P>
          המרחק כבר לא קובע. אני עובדת בזום עם משפחות ונשים מכל הארץ - מהצפון, מהמרכז,
          מירושלים ומהערבה - באותן שעות פעילות ובאותה מסירות כמו בקליניקה. בשביל משפחה ביישוב
          קטן בלי מטפלת רגשית בסביבה, ובשביל אישה שמחפשת את המטפלת המתאימה לה ולא את הקרובה
          ביותר - זו פתיחת דלת אמיתית.
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
            { href: '/metapel-regashi',                title: 'מטפלת רגשית',                     desc: 'הגישה, השיטות ותחומי הטיפול - בנתיבות, בדרום ובזום.' },
            { href: '/hadrachat-horim',                title: 'הדרכת הורים',                     desc: 'תהליך ממוקד עם ההורים - פורמט שעובד מצוין בזום.' },
            { href: '/blog/lehaskir-layelad-al-tipul', title: 'איך מסבירים לילד על טיפול',       desc: 'מדריך לשיחה לפי גיל - מה לומר ומה לא.' },
            { href: '/methods/cbt',                    title: 'CBT - טיפול קוגניטיבי-התנהגותי',  desc: 'הגישה המובנית שמתורגמת הכי טוב לעבודה מקוונת.' },
          ]}
        />

        <InfoDisclaimer />

        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-lg font-medium mb-1.5" style={{ color: C.textDark }}>רוצים לבדוק אם זום מתאים לכם?</p>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>שיחת היכרות קצרה, ללא התחייבות - נכיר, נבין את הצורך ונחליט יחד על הפורמט המתאים.</p>
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
