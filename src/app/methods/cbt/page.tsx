import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';
import RelatedLinks from '../../../components/RelatedLinks';
import { canonicalMeta } from '../../../lib/site';

export const metadata: Metadata = {
  title: 'CBT - טיפול קוגניטיבי-התנהגותי | כנפיים לעוף',
  description:
    'טיפול CBT מבוסס על ההבנה שהמחשבות שלנו משפיעות על הרגשות שלנו, והרגשות משפיעים על ההתנהגות. גלו כיצד CBT יכול לעזור לכם.',
  ...canonicalMeta('/methods/cbt'),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://cnafim-lauf.co.il/' },
    { '@type': 'ListItem', position: 2, name: 'שיטות הטיפול', item: 'https://cnafim-lauf.co.il/#methods' },
    { '@type': 'ListItem', position: 3, name: 'CBT', item: 'https://cnafim-lauf.co.il/methods/cbt' },
  ],
};

export default function CbtPage() {
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
          {/* Fix 12: back navigation uses ← */}
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
          <span>CBT</span>
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
          CBT - טיפול קוגניטיבי-התנהגותי בנתיבות ובדרום
        </h1>

        <p className="text-xl font-light leading-relaxed text-right mb-10" style={{ color: C.textMid }}>
          טיפול קוגניטיבי-התנהגותי
        </p>

        {/* Hero image - natural 854x1280 portrait ratio, capped width and centered so the full photo is visible */}
        <div
          className="relative w-full max-w-[360px] mx-auto aspect-[854/1280] rounded-2xl overflow-hidden mb-10 border"
          style={{ borderColor: C.border, boxShadow: '0 8px 30px rgba(57,73,171,0.07)' }}
        >
          <Image
            src="/founder_speaking.jpg"
            alt="טיפול CBT - גאולה אלון"
            fill
            className="object-cover"
            sizes="360px"
            priority
          />
        </div>

        {/* Article body */}
        <div className="space-y-6 text-right">
          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              אז איך נראה טיפול קוגניטיבי-התנהגותי (CBT)?
            </strong>
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            טיפול CBT מבוסס על ההבנה ש
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              המחשבות שלנו משפיעות על הרגשות שלנו, והרגשות משפיעים על ההתנהגות
            </strong>
            . כאשר אנו לומדים לזהות ולשנות מחשבות שליליות ומעוותות, נוצר שינוי אמיתי גם ברגש וגם בהתנהגות.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            במפגש, המטופל משתף בקושי מרכזי שהוא חווה (למשל: חרדה חברתית, קשיי ויסות, או דימוי עצמי נמוך).
            המטפל עוזר לו{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              לזהות את &quot;מלכודות החשיבה&quot;
            </strong>{' '}
            &ndash; אותן מחשבות אוטומטיות ושליליות שמזינות את הקושי (כמו &quot;אף אחד לא ירצה להיות חבר שלי&quot;).
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            השלב הבא הוא{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>אתגור המחשבות</strong>.
            המטופל לומד לבחון את המציאות בצורה מאוזנת יותר ולהחליף את המחשבות המעכבות במחשבות מקדמות ומציאותיות.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            אבל השינוי לא נשאר רק בראש. טיפול CBT הוא{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>טיפול אקטיבי</strong>.
            המטופל והמטפל בונים יחד תוכנית פעולה הדרגתית (&quot;חשיפות&quot; או משימות התנהגותיות) שבה המטופל
            מתנסה במצבים שמהם נמנע בעבר, וצובר{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              הצלחות קטנות שבונות ביטחון עצמי
            </strong>
            .
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            CBT הוכח מחקרית כאחד הכלים האפקטיביים ביותר לטיפול בחרדה, דיכאון, פחדים, OCD ועוד מגוון רחב של
            קשיים רגשיים והתנהגותיים, הן בילדים והן במבוגרים.
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { title: 'מוכח מחקרית', body: 'אחת השיטות הנחקרות ביותר בעולם הטיפול הפסיכולוגי.' },
            { title: 'ממוקד ויעיל', body: 'תהליך עם יעדים ברורים ותוצאות מדידות בטווח קצר יחסית.' },
            { title: 'כלים לחיים',  body: 'המטופל רוכש מיומנויות שמלוות אותו גם אחרי סיום הטיפול.' },
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
              <h3 className="font-display text-base font-semibold mb-1.5" style={{ color: C.textDark }}>
                {card.title}
              </h3>
              <p className="text-sm font-light leading-[1.8]" style={{ color: C.textLight }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <RelatedLinks
          links={[
            { href: '/blog/cbt-yelad',   title: 'CBT לילדים: איך זה נראה בפועל', desc: 'מה קורה במפגש, דוגמה מהחיים, ומה הילד לוקח הביתה.' },
            { href: '/metapel-regashi',  title: 'מטפלת רגשית בנתיבות והדרום',   desc: 'טיפול רגשי לילדים, נערות ונשים - וגם בזום.' },
            { href: '/methods/emr',      title: 'EMR - עיבוד תנועות עיניים',     desc: 'להגיע לשורש הרגשי גם כשדיבור לא מספיק.' },
            { href: '/methods/nlp',      title: 'NLP - תכנות נוירו-לשוני',       desc: 'שינוי דפוסי חשיבה לחיזוק ביטחון ומסוגלות.' },
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
            {/* Fix 12: back = ← */}
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

{/* Site footer is rendered by the root layout */}
    </div>
  );
}
