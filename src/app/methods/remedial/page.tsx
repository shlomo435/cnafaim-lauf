import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';

export const metadata: Metadata = {
  title: 'הוראה מתקנת | כנפיים לעוף - מרכז רגשי לימודי',
  description:
    'הוראה מתקנת לילדים המתקשים בקריאה, כתיבה, שטף, דיוק, הבנת הנקרא ותחושת מסוגלות בלמידה. תהליך מותאם אישית המשלב תנועה, תרגילי מוח וכלים מעשיים.',
  alternates: {
    canonical: 'https://cnafaim-lauf.netlify.app/methods/remedial',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://cnafaim-lauf.netlify.app/' },
    { '@type': 'ListItem', position: 2, name: 'שיטות הטיפול', item: 'https://cnafaim-lauf.netlify.app/#methods' },
    { '@type': 'ListItem', position: 3, name: 'הוראה מתקנת', item: 'https://cnafaim-lauf.netlify.app/methods/remedial' },
  ],
};

export default function RemedialPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creamAlt, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* X close button — fixed top-left */}
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
          <path d="M11.5 3.5L3.5 11.5M3.5 3.5l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </Link>

      {/* ① LOGO + SUBTITLE */}
      <section className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.jpg"
            alt="כנפיים לעוף"
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
          מרכז רגשי לימודי
        </p>
      </section>

      {/* ② HERO IMAGE + TAGLINE PANEL */}
      <section className="px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
        <div
          className="w-full overflow-hidden rounded-t-3xl"
          style={{ boxShadow: '0 16px 48px rgba(57,73,171,0.13)' }}
        >
          {/* subtle teal gradient overlay at the bottom of the image */}
          <div className="relative w-full">
            <Image
              src="/founder_speaking.jpg"
              alt="גאולה אלון - מרכז כנפיים לעוף"
              width={1400}
              height={950}
              className="w-full h-auto object-cover object-top block"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
              priority
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{ background: `linear-gradient(to bottom, transparent, ${C.creamDeep}CC)` }}
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

        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-6 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }}
        />

        <h1
          className="font-display text-4xl md:text-5xl font-medium text-right mb-8 leading-tight"
          style={{ color: C.textDark, letterSpacing: '-0.02em' }}
        >
          הוראה מתקנת
        </h1>

        <div className="space-y-6 text-right">
          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            במרכז &quot;כנפיים לעוף&quot; ניתנת הוראה מתקנת לילדים המתקשים ב
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              קריאה, כתיבה, שטף, דיוק, הבנת הנקרא
            </strong>{' '}
            ותחושת מסוגלות בלמידה.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            התהליך מתחיל ב
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              אבחון תפקודי-לימודי קצר וממוקד
            </strong>
            , שמטרתו להבין היכן נמצא הקושי, על מה הוא יושב, ומהי הדרך הנכונה ביותר לקדם את הילד או הילדה.
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            העבודה נעשית מתוך ניסיון של כ-30 שנה בתחום ההוראה המתקנת, ומשלבת{' '}
            <strong style={{ color: C.textDark, fontWeight: 600 }}>
              כלים מקצועיים, תנועה, תרגילי מוח, חיזוק תפקודים לימודיים ובניית ביטחון עצמי
            </strong>
            .
          </p>

          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            המטרה היא לא רק לשפר קריאה וכתיבה, אלא לעזור לילד להרגיש:
          </p>

          <blockquote
            className="text-xl md:text-2xl font-light leading-relaxed text-right pr-5 border-r-4 py-2 my-2"
            style={{ color: C.textDark, borderColor: C.rose }}
          >
            &quot;אני מסוגל. אני מתקדם. אני יכול להצליח.&quot;
          </blockquote>
        </div>

        {/* Info cards */}
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'למי זה מתאים?',
              body: 'לילדים עם קושי בקריאה, כתיבה, שטף ודיוק, הבנת הנקרא, קשיי קשב, חוסר ביטחון בלמידה או פערים לימודיים.',
            },
            {
              title: 'איך מתחילים?',
              body: 'מתאמים אבחון ראשוני, ולאחריו נבנית תוכנית עבודה אישית ומדויקת לפי הצורך של הילד.',
            },
            {
              title: 'ניסיון של 30 שנה',
              body: 'עבודה מקצועית ומנוסה המשלבת את הידע העדכני בתחום ההוראה המתקנת עם גישה חמה ואישית.',
            },
            {
              title: 'שילוב תנועה ומוח',
              body: 'תרגילי מוח וגוף המפעילים מסלולי למידה שונים ומחזקים את הקשר בין תנועה לבין יכולות לימודיות.',
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
      </main>
    </div>
  );
}
