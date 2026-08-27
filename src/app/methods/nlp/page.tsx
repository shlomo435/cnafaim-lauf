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
    q: 'מה זה ניתוב לשוני פיזיולוגי?',
    a: 'ניתוב לשוני פיזיולוגי הוא התרגום העברי של NLP - Neuro-Linguistic Programming. זו גישה שעובדת על הדרך שבה אנחנו מייצגים חוויות בתוכנו: התמונות שעולות בראש, התחושות בגוף והמשפטים שאנחנו אומרים לעצמנו - ומנסה לשנות את התגובה הרגשית שנלווית אליהן.',
  },
  {
    q: 'ניתוב לשוני פיזיולוגי, תכנות נוירו-לשוני ו-NLP - זה אותו דבר?',
    a: 'כן. באנגלית יש שם אחד, NLP, ובעברית התקבלו שני תרגומים במקביל: "ניתוב לשוני פיזיולוגי" ו"תכנות נוירו-לשוני". שלושת השמות מתייחסים לאותה שיטה בדיוק.',
  },
  {
    q: 'האם השיטה מוכחת מדעית?',
    a: 'לא במידה שבה CBT מוכח. סקירה שיטתית שפורסמה ב-2012 בחנה עשרה מחקרים מבוקרים ולא מצאה ראיות מספקות ליעילות NLP בשיפור תוצאות בריאותיות, בעיקר בשל מיעוט המחקרים ואיכותם. לכן אנחנו מציגים את השיטה ככלי משלים לצד גישות מבוססות-ראיות, ולא כתחליף להן.',
  },
  {
    q: 'מאיזה גיל אפשר לעבוד עם ילדים בשיטה?',
    a: 'הכלים מותאמים לגיל, ואפשר לעבוד גם עם ילדי גן דרך משחק, ציור וסיפור. ככל שהילד גדול יותר משלבים יותר עבודה מילולית ומודעת. מה שקובע הוא הצורך ואופי הילד, ולא הגיל בפני עצמו.',
  },
  {
    q: 'מה ההבדל בין NLP ל-CBT?',
    a: 'CBT הוא טיפול מובנה ומבוסס-מחקר שעובד על הקשר בין מחשבה, רגש והתנהגות, וכולל חשיפה הדרגתית ותרגול בין המפגשים. NLP עובד יותר דרך דימויים, חושים ושפה פנימית, והבסיס המחקרי שלו מצומצם בהרבה. בחרדה משמעותית הקו הראשון הוא CBT.',
  },
  {
    q: 'כמה מפגשים צריך?',
    a: 'עבודה ממוקדת סביב מטרה ברורה היא לרוב קצרה יחסית. עם זאת, תהליך אמיתי לא נמדד במספר מפגשים אלא בשאלה אם משהו בחיים באמת השתנה. הבטחה מראש לתוצאה בשלושה מפגשים היא סימן אזהרה, לא הבטחה.',
  },
];

export const metadata: Metadata = {
  title: 'ניתוב לשוני פיזיולוגי (NLP) בנתיבות ובדרום | כנפיים לעוף',
  description:
    'טיפול בשיטת ניתוב לשוני פיזיולוגי (NLP) בנתיבות, בכל אזור הדרום וגם בזום. עבודה על דפוסי חשיבה, חיזוק ביטחון עצמי ושחרור חסמים רגשיים - לילדים, נערות ונשים.',
  keywords: [
    'ניתוב לשוני פיזיולוגי',
    'NLP',
    'תכנות נוירו-לשוני',
    'טיפול NLP לילדים',
    'ניתוב לשוני פיזיולוגי נתיבות',
    'NLP בדרום',
    'NLP בזום',
  ],
  ...canonicalMeta('/methods/nlp'),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'ניתוב לשוני פיזיולוגי (NLP)',
  name: 'ניתוב לשוני פיזיולוגי - כנפיים לעוף',
  description:
    'עבודה בכלי ניתוב לשוני פיזיולוגי (NLP) לחיזוק ביטחון עצמי, שחרור פחדים ממוקדים ושינוי דפוסי חשיבה - לילדים, נערות ונשים. בנתיבות, בכל אזור הדרום וגם בזום.',
  url: `${SITE_URL}/methods/nlp`,
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

export default function NlpPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
            { label: 'ניתוב לשוני פיזיולוגי (NLP)' },
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
          ניתוב לשוני פיזיולוגי (NLP) בנתיבות ובדרום
        </h1>

        <p className="text-xl font-light leading-relaxed text-right mb-10" style={{ color: C.textMid }}>
          ניתוב לשוני פיזיולוגי · תכנות נוירו-לשוני · NLP
        </p>

        {/* Article body */}
        <div className="space-y-6 text-right">
          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              אז איך נראה טיפול NLP (ניתוב לשוני פיזיולוגי)?
            </strong>
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            שיטת ה-NLP עובדת עם{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>התת-מודע שלנו</strong>. היא מבוססת על הרעיון
            שכל חוויה שחווינו מקודדת במוח שלנו דרך החושים, ויוצרת &quot;תבניות&quot; של רגש והתנהגות.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            במפגש NLP, אנחנו לא רק מדברים על הבעיה, אלא{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              משנים את הדרך שבה המוח זוכר ומפרש אותה
            </strong>
            .
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            למשל, ילד שחווה כישלון צורב בלימודים, עשוי &quot;לראות&quot; את הכישלון הזה כתמונה ענקית ושחורה
            בכל פעם שהוא ניגש למבחן. בעזרת טכניקות של NLP (כמו דמיון מודרך, שינוי מרכיבי חושים, ועוגנים),
            המטפל{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              מוביל את המטופל לשנות את הייצוג הפנימי של החוויה
            </strong>
            . התמונה &quot;השחורה&quot; מוקטנת ומוחלפת בתמונה מעצימה.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>שינוי השפה הפנימית:</strong> הטיפול עובד חזק
            על המילים שהמטופל אומר לעצמו. נזהה מילים מחלישות (&quot;אני תמיד נכשל&quot;) ונלמד את המוח
            להשתמש בשפה חדשה, מדויקת ומעצימה שמייצרת{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>מוטיבציה ואמונה עצמית</strong>.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            זהו כלי מהיר ועוצמתי לשחרור חסמים רגשיים, שינוי הרגלים, ויצירת{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>חוסן מנטלי אמיתי</strong>.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            NLP מתאים במיוחד לאנשים שרוצים לפתח ביטחון עצמי, לשחרר פחדים, לשפר ביצועים (בלימודים, בעבודה,
            בספורט), ולשנות דפוסים רגשיים שמעכבים אותם - והכל מתוך עבודה על השורש, לא על הסימפטום.
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { title: 'עבודה עם התת-מודע', body: 'שינוי תבניות עמוקות שנוצרו מתוך חוויות עבר ומכתיבות את ההווה.' },
            { title: 'שפה פנימית חדשה',   body: 'מחליפים מסרים מחלישים במסרים מעצימים שמייצרים תנועה ואמונה.' },
            { title: 'מהיר ועוצמתי',       body: 'תוצאות ניכרות בתהליך קצר יחסית, ללא צורך בשנים של חפירה.' },
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
            שאלות נפוצות על ניתוב לשוני פיזיולוגי
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
            { href: '/blog/nituv-leshoni-fiziologi',  title: 'ניתוב לשוני פיזיולוגי - המדריך המלא', desc: 'מה זו השיטה, אילו טכניקות יש בה, ומה המחקר אומר.' },
            { href: '/blog/isha-lo-maaminah-batzmah', title: 'ביטחון עצמי נמוך אצל נשים', desc: 'הקול הביקורתי הפנימי, מקורו, וכלים לשינוי.' },
            { href: '/metapel-regashi',               title: 'מטפלת רגשית בנתיבות והדרום',    desc: 'טיפול רגשי לילדים, נערות ונשים - וגם בזום.' },
            { href: '/methods/cbt',                   title: 'CBT - קוגניטיבי-התנהגותי',       desc: 'זיהוי ושינוי דפוסי חשיבה שמגבילים את איכות החיים.' },
            { href: '/methods/emr',                   title: 'EMR - עיבוד תנועות עיניים',      desc: 'להגיע לשורש הרגשי גם כשדיבור לא מספיק.' },
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
