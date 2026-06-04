import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';

export const metadata: Metadata = {
  title: 'הוראה מתקנת - חיזוק מיומנויות למידה | כנפיים לעוף',
  description:
    'הוראה מתקנת לילדים המתקשים בקריאה, כתיבה, שטף, דיוק, הבנת הנקרא ותחושת מסוגלות בלמידה. תהליך מותאם אישית המשלב תנועה, תרגילי מוח וכלים מעשיים.',
};

export default function RemedialPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(240,253,250,0.97)', borderColor: C.borderLight }}
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
          <Link
            href="/#methods"
            className="text-sm font-light transition-colors hover:text-[#2DD4BF]"
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
          <span>הוראה מתקנת</span>
        </nav>

        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-5 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}66, ${C.rose})` }}
        />

        <p className="text-sm font-semibold tracking-[0.2em] mb-3 text-right" style={{ color: C.rose }}>
          גישה לימודית
        </p>

        <h1
          className="font-display text-5xl md:text-6xl font-light leading-tight tracking-tighter text-right mb-4"
          style={{ color: C.textDark }}
        >
          הוראה מתקנת
        </h1>

        <p className="text-xl font-light leading-relaxed text-right mb-10" style={{ color: C.textMid }}>
          חיזוק מיומנויות למידה דרך תנועה ותרגילי מוח
        </p>

        {/* Hero image */}
        <div
          className="w-full rounded-2xl overflow-hidden mb-10 border"
          style={{ borderColor: C.border, boxShadow: '0 8px 30px rgba(19,78,74,0.07)' }}
        >
          <Image
            src="/therapy_cards_box.jpg"
            alt="הוראה מתקנת - כנפיים לעוף"
            width={1200}
            height={800}
            className="w-full h-auto object-cover object-top"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Article body */}
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
            className="text-xl font-light leading-relaxed text-right pr-5 border-r-4"
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
              <p className="text-xs font-light leading-[1.8]" style={{ color: C.textLight }}>
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
              style={{ background: C.plum, boxShadow: '0 8px 30px rgba(19,78,74,0.12)' }}
            >
              לתיאום שיחת היכרות
            </Link>
            <Link
              href="/#methods"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#134E4A]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לשיטות הטיפול
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10" style={{ backgroundColor: C.plum, color: 'rgba(255,255,255,0.65)' }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-right">
          <Link href="/" className="flex items-center gap-3" aria-label="כנפיים לעוף - דף הבית">
            <Image
              src="/logo.jpg"
              alt="כנפיים לעוף"
              width={144}
              height={48}
              className="h-12 w-auto object-contain"
              style={{ maxWidth: 144, mixBlendMode: 'screen', opacity: 0.85 }}
            />
          </Link>
          <div className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
            כל הזכויות שמורות &copy; 2025
          </div>
        </div>
      </footer>
    </div>
  );
}
