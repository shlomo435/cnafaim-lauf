import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { C } from '../lib/tokens';
import IntroAnimation from '../components/IntroAnimation';
import ScrollRevealClient from '../components/ScrollRevealClient';
import MobileMenuClient from '../components/MobileMenuClient';
import SideDrawerClient from '../components/SideDrawerClient';
import ContactFormClient from '../components/ContactFormClient';

// ======================
// DATA
// ======================

const services = [
  {
    title: 'ויסות רגשי וחרדות',
    description:
      'כלים פרקטיים לזיהוי, הבנה וניהול רגשות ומצבי חרדה בחיי היומיום, בגיל הילדות ובבגרות.',
  },
  {
    title: 'חיזוק ביטחון ודימוי עצמי',
    description:
      'בניית תחושת ערך עצמי יציבה, הכרה בייחודיות האישית ופיתוח משאבים פנימיים לחיים מיטיבים.',
  },
  {
    title: 'התמודדות עם משבר, שינוי וטראומה',
    description:
      'ליווי מקצועי ומיומן במצבי מעבר, אובדן, שינוי ואירועים טראומטיים, בגישה עדינה ומכילה.',
  },
  {
    title: 'קשיים חברתיים ורגשיים',
    description:
      'פיתוח מיומנויות חברתיות, כלים ליצירת קשרים משמעותיים ותחושת שייכות ומקום בעולם.',
  },
  {
    title: 'קשיי למידה, קריאה, כתיבה וקשב',
    description:
      'אבחון והתאמת כלים פדגוגיים לסגנון הלמידה הייחודי של כל ילד ונערה, תוך חיזוק הביטחון העצמי.',
  },
  {
    title: 'הוראה מתקנת',
    description:
      'עבודה ממוקדת ומותאמת אישית לחיזוק הקריאה, הכתיבה, הבנת הנקרא והביטחון הלימודי — בשילוב תנועה, תרגילי מוח וכלים מעשיים שמקדמים הצלחה.',
  },
];

const features = [
  {
    title: 'התאמה אישית',
    description: 'כל תהליך נבנה בהתאם לאישיות, לצרכים ולקצב הייחודי של כל מטופל.',
    slug: 'personalization',
  },
  {
    title: 'מרחב בטוח',
    description: 'סביבה חמה, קבלה ולא שיפוטית המאפשרת פתיחות ועיבוד אמיתי.',
    slug: 'safe-space',
  },
  {
    title: 'שילוב הורים',
    description: 'הורים הם שותפים מלאים בתהליך. מעורבותם מחזקת את השפעת הטיפול.',
    slug: 'parent-involvement',
  },
  {
    title: 'תהליכים ממוקדים',
    description: 'עבודה שיטתית עם יעדים ברורים, מדידים וניתנים להשגה בזמן.',
    slug: 'focused-processes',
  },
  {
    title: 'דיסקרטיות',
    description: 'שמירה מלאה על פרטיות המטופל ומשפחתו בכל שלב של הטיפול.',
    slug: 'discretion',
  },
];

// ======================
// SHARED SERVER COMPONENTS
// ======================

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center md:justify-end mb-3 md:mb-4">
      <p className="text-sm font-semibold tracking-[0.18em]" style={{ color: C.rose }}>
        {text}
      </p>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.rose, opacity: 0.45 }} />
    </div>
  );
}

function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`}>
      <div className="h-px flex-1 max-w-[120px]" style={{ backgroundColor: C.border }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.rose, opacity: 0.4 }} />
      <div className="h-px flex-1 max-w-[120px]" style={{ backgroundColor: C.border }} />
    </div>
  );
}

function Rule({ className = '' }: { className?: string }) {
  return (
    <div className={`w-12 h-px mt-4 mb-6 ${className}`} style={{ backgroundColor: C.border }} />
  );
}

function WavyDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-4 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 24" className="w-full max-w-lg h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,12 C40,3 80,21 120,12 C160,3 200,21 240,12 C280,3 320,21 360,12 C400,3 440,17 480,12"
          stroke="#D81B8C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function RoseDot({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg className="w-2 h-2 flex-shrink-0" viewBox="0 0 8 8" fill="none" aria-hidden="true" style={{ opacity }}>
      <path d="M4 0.8L7.2 4L4 7.2L0.8 4L4 0.8Z" fill="#D81B8C" />
    </svg>
  );
}

// Server-safe CTA button - hover handled via CSS, no JS event handlers
function CtaButton({
  href,
  children,
  className = '',
  block = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  block?: boolean;
}) {
  return (
    <a
      href={href}
      className={`text-sm font-medium text-center text-white transition-all duration-300 rounded-lg bg-[#D81B8C] hover:bg-[#AD1457] ${
        block ? 'block w-full py-3.5' : 'inline-block px-8 py-3.5'
      } ${className}`}
    >
      {children}
    </a>
  );
}

// Floating WhatsApp button - CSS hover only, server-compatible
function FloatingContactButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
      <a
        href={`https://wa.me/972502961213?text=${encodeURIComponent('היי גאולה, הגעתי מהאתר ואשמח לפרטים')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] pointer-events-auto hover:scale-110 hover:shadow-xl"
        style={{ backgroundColor: '#25D366' }}
        aria-label="שלחו הודעה ב-WhatsApp"
        title="שלחו הודעה ב-WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
        <span
          className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white border border-[#1ebe5d]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ backgroundColor: '#25D366', boxShadow: '0 4px 12px rgba(37,211,102,0.15)' }}
        >
          שלחו הודעה ב-WhatsApp
        </span>
      </a>
    </div>
  );
}

// ======================
// MAIN PAGE (Server Component)
// ======================

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>

      {/* Client scroll-reveal side-effect */}
      <ScrollRevealClient />

      {/* Intro animation (client) */}
      <IntroAnimation />

      {/* Floating buttons */}
      <FloatingContactButton />
      <SideDrawerClient />

      {/* ===== HEADER ===== */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm shadow-sm border-b"
        style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="relative h-20 md:h-24 flex items-center">

            {/* Desktop nav — right side in RTL */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-light" aria-label="ניווט ראשי">
              {(
                [
                  ['אודות',           '#about'],
                  ['תחומי טיפול',     '#services'],
                  ['קלפים טיפוליים',  '#cards'],
                  ['הגישה שלי',       '#approach'],
                  ['יצירת קשר',       '#contact'],
                ] as const
              ).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="transition-colors duration-200 hover:text-[#D81B8C]"
                  style={{ color: C.textMid }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Logo — absolutely centered */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <a href="#" className="pointer-events-auto" aria-label="כנפיים לעוף - דף הבית">
                <Image
                  src="/logo.jpg"
                  alt="כנפיים לעוף"
                  width={200}
                  height={67}
                  className="h-16 md:h-16 w-auto object-contain"
                  style={{ maxWidth: 200, mixBlendMode: 'multiply' }}
                  priority
                />
              </a>
            </div>

            {/* CTA (desktop only) + hamburger — left side in RTL */}
            <div className="flex items-center gap-3 mr-auto">
              <a
                href="#contact"
                className="hidden md:inline-block px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: C.rose }}
              >
                לתיאום פגישה
              </a>
              <MobileMenuClient />
            </div>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden flex flex-col min-h-[calc(100dvh-80px)] md:min-h-0"
        style={{ background: 'linear-gradient(to bottom, #FFF0F6 0%, #F3E8FF 100%)' }}
      >
        {/* Subtle dot texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #F8BBD9 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
            opacity: 0.4,
          }}
        />

        {/* Centered content column */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-4 flex-1 justify-between md:justify-start">

          {/* Tag */}
          <p
            className="text-xs font-semibold tracking-[0.24em] mb-2 uppercase"
            style={{ color: C.textMid }}
          >
            מרכז טיפולי-לימודי
          </p>

          {/* H1 heading — highlighted keywords in rose */}
          <h1
            className="font-display font-medium leading-snug tracking-tight mb-1"
            style={{ fontSize: 'clamp(2.1rem, 6vw, 4rem)' }}
          >
            <span style={{ color: C.textDark }}>מרכז </span>
            <strong style={{ color: C.rose, fontWeight: 700 }}>רגשי</strong>
            <span style={{ color: C.textDark }}> לימודי</span>
            <br />
            <span style={{ color: C.textDark }}>לילדים, </span>
            <strong style={{ color: C.rose, fontWeight: 700 }}>נערות</strong>
            <span style={{ color: C.textDark }}> ונשים</span>
          </h1>

          {/* Image — 240px on mobile, natural on desktop */}
          <div
            className="w-full md:max-w-[480px] mt-2 rounded-2xl overflow-hidden md:h-auto"
            style={{ height: 'min(240px, 38dvh)' }}
          >
            <Image
              src="/founder_speaking.jpg"
              alt="גאולה אלון"
              width={960}
              height={720}
              className="w-full h-full object-cover object-top block"
              priority
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>

          {/* Credits */}
          <p className="mt-4 text-base md:text-base font-medium" style={{ color: C.textMid }}>
            <strong style={{ color: '#3949AB' }}>גאולה אלון</strong>
            {' | CBT · EMR · NLP · הוראה מתקנת'}
          </p>

          {/* CTA button */}
          <a
            href="#contact"
            className="inline-block mt-4 mb-4 px-8 py-3 text-white text-base font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: C.rose, boxShadow: '0 6px 24px rgba(216,27,140,0.22)' }}
          >
            לתיאום שיחת היכרות ←
          </a>
        </div>

        {/* Services strip */}
        <div
          className="relative z-10 px-5 py-5 md:py-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.85)', borderTop: `1px solid ${C.borderLight}` }}
        >
          <div className="max-w-4xl mx-auto text-center md:flex md:flex-wrap md:justify-center md:gap-x-1">
            {['הוראה מתקנת', 'טיפולים רגשיים', 'אבחונים תפקודיים לימודיים', 'הדרכת הורים'].map((item, i, arr) => (
              <React.Fragment key={item}>
                <span className="block md:inline text-base font-light" style={{ color: C.textMid }}>
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span className="hidden md:inline text-base mx-2" style={{ color: C.rose }}>•</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="mt-3 text-sm font-light italic text-center" style={{ color: C.rose }}>
            מקום שמעניק לילדים כלים, ביטחון וכנפיים לצמוח, להתמודד ולהאמין בעצמם
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-14 lg:py-16">
        <div className="max-w-3xl mx-auto md:mx-0 md:mr-auto">

          {/* Text column */}
          <div className="text-center md:text-right sr">
            <SectionLabel text="אודות" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              גאולה אלון
            </h2>
            <Rule className="mx-auto md:mx-0" />
            <div className="space-y-4 font-light leading-[1.8] text-[1.05rem]" style={{ color: C.textMid }}>
              <p>
                בעלת תואר שני בחינוך ומעל עשרים שנה של ניסיון קליני ולימודי עם ילדים, נערות ונשים.
                הדרך לשינוי אמיתי עוברת דרך הבנה עמוקה ומכילה של הצרכים הייחודיים של כל אדם,
                ומתוך מרחב שמרגיש כמו בית.
              </p>
              <p>
                הגישה הטיפולית הוליסטית משלבת שיטות מוכחות: טיפול קוגניטיבי-התנהגותי (CBT),
                EMR ו-NLP, כולן מותאמות אישית לפי הצורך הספציפי של כל מטופל, בכל שלב בדרך.
              </p>
              <p>
                אני מאמינה שכל אדם נושא בתוכו משאבים ויכולות. תפקידי הוא לעזור לך לגלות
                אותם, לחזק אותם ולהשתמש בהם כדי לצמוח ולחיות חיים מלאים ומשמעותיים.
              </p>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { num: '+20', label: 'שנות ניסיון' },
                { num: 'CBT',  label: 'טיפול קוגניטיבי' },
                { num: 'NLP',  label: 'נוירו-לשוני' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl py-4 px-2 border"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
                >
                  <div className="font-display text-2xl font-semibold" style={{ color: C.textHeading }}>{stat.num}</div>
                  <div className="text-sm mt-1 font-light" style={{ color: C.textLight }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <WavyDivider />
      </div>

      {/* ===== METHODS & EXPERTISE ===== */}
      <section id="methods" className="py-7 md:py-20 lg:py-24" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center md:text-right mb-10 lg:mb-16 sr">
            <SectionLabel text="גישה טיפולית" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              הגישה הטיפולית ותחומי המומחיות
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-14 lg:gap-20">

            {/* Methods column */}
            <div className="text-center sr sr-d1">
              <Rule className="mx-auto" />
              <p className="text-[1.05rem] font-light leading-[1.8] mb-5" style={{ color: C.textMid }}>
                במסגרת הטיפול, המטופל מקבל שילוב מדויק של מגוון כלים מתקדמים, המותאמים אישית לתוצאה האפקטיבית ביותר:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    method: 'CBT',
                    label: 'קוגניטיבי-התנהגותי',
                    desc: 'זיהוי ושינוי דפוסי חשיבה והתנהגות שליליים המגבילים את איכות החיים.',
                    href: '/methods/cbt',
                  },
                  {
                    method: 'EMR',
                    label: 'עיבוד תנועות עיניים',
                    desc: 'עיבוד רגשי ותנועות עיניים לטיפול בטראומה, חרדות ומצוקה רגשית עמוקה.',
                    href: '/methods/emr',
                  },
                  {
                    method: 'NLP',
                    label: 'תכנות נוירו-לשוני',
                    desc: 'שינוי דפוסים מנטליים ורגשיים לשיפור יכולות, ביטחון עצמי ותקשורת.',
                    href: '/methods/nlp',
                  },
                  {
                    method: 'הוראה מתקנת',
                    label: 'חיזוק מיומנויות למידה דרך תנועה ותרגילי מוח',
                    desc: 'עבודה ממוקדת ומותאמת אישית לחיזוק הקריאה, הכתיבה, הבנת הנקרא והביטחון הלימודי - בשילוב תנועה, תרגילי מוח וכלים מעשיים שמקדמים הצלחה.',
                    href: '/methods/remedial',
                  },
                ].map(({ method, label, desc, href }) => (
                  <Link
                    key={method}
                    href={href}
                    className="rounded-xl p-4 border border-[#F8BBD9] text-center transition-all duration-300 flex flex-col hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(57,73,171,0.07)] hover:-translate-y-1"
                    style={{ backgroundColor: C.cream }}
                  >
                    <div className="font-display text-2xl font-semibold mb-1" style={{ color: C.textHeading }}>{method}</div>
                    <div className="text-xs font-medium tracking-wide mb-2.5" style={{ color: C.rose }}>{label}</div>
                    <p className="text-sm leading-[1.7] font-light flex-1" style={{ color: C.textMid }}>{desc}</p>
                    {/* Fix 12: forward arrow = → */}
                    <div className="mt-3 text-sm font-medium" style={{ color: C.rose }}>לפרטים →</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Expertise column */}
            <div className="text-center sr sr-d2">
              <Rule className="mx-auto" />
              <p className="text-[1.05rem] font-light leading-[1.8] mb-5" style={{ color: C.textMid }}>
                ניסיון רב ומוכח בתחומים הבאים:
              </p>
              <div className="space-y-2.5">
                {[
                  'ויסות רגשי וחרדות',
                  'חיזוק ביטחון ודימוי עצמי',
                  'התמודדות עם מצבי משבר, שינוי וטראומה',
                  'קשיים חברתיים ורגשיים',
                  'קשיי למידה, קריאה, כתיבה וקשב',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[#F8BBD9]"
                    style={{ backgroundColor: C.cream }}
                  >
                    <RoseDot />
                    <span className="text-sm font-light" style={{ color: C.textMid, lineHeight: '1.7' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-8 md:mt-10 rounded-md p-6 md:p-8 text-center border border-[#F8BBD9] sr"
            style={{ backgroundColor: C.cream }}
          >
            <p className="text-[1.05rem] font-light leading-[1.8] max-w-4xl ml-auto" style={{ color: C.textMid }}>
              המרכז שם דגש על עבודה בשיתוף ההורים, הקשבה עמוקה, בניית אמון, ומתן כלים פרקטיים ליום-יום - כדי שהשינוי לא יישאר רק בחדר הטיפול, אלא ילווה גם את החיים עצמם.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-7 md:py-20 lg:py-24" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center md:text-right mb-8 md:mb-12 lg:mb-16 sr">
            <SectionLabel text="תחומי טיפול" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              במה אני יכולה לעזור
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`sr sr-d${Math.min(i + 1, 5) as 1|2|3|4|5} group relative rounded-xl p-6 md:p-8 text-center border border-[#F8BBD9] transition-all duration-300 hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1`}
                style={{ backgroundColor: C.cream }}
              >
                {service.title === 'הוראה מתקנת' ? (
                  <div className="mb-5 flex justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#D81B8C" strokeWidth="1.6" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5" stroke="#D81B8C" strokeWidth="1.6" strokeLinejoin="round"/>
                      <path d="M2 12l10 5 10-5" stroke="#D81B8C" strokeWidth="1.6" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-px mb-5 transition-all duration-300 group-hover:w-14" style={{ backgroundColor: C.rose, opacity: 0.5 }} />
                )}
                <h3 className="font-display text-xl font-medium mb-2.5" style={{ color: C.textHeading, letterSpacing: '-0.02em' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-[1.8] font-light" style={{ color: C.textMid }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== LECTURES & TRAINING ===== */}
      <section id="lectures" className="py-7 md:py-20 lg:py-24" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">

            {/* Image column */}
            <div className="relative order-2 md:order-1 sr sr-d1">
              <Image
                src="/conference_audience.jpg"
                alt="הרצאות והדרכות"
                width={1200}
                height={800}
                className="w-full h-auto block rounded-2xl"
                style={{ border: `1px solid ${C.borderLight}`, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text column */}
            <div className="text-center md:text-right order-1 md:order-2 sr sr-d2">
              <SectionLabel text="הרצאות והדרכות" />
              <h2
                className="font-display text-3xl md:text-4xl font-medium leading-snug"
                style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
              >
                הרצאות והדרכות להורים, צוותי חינוך וקהילה
              </h2>
              <Rule className="mx-auto md:mx-0" />
              <div className="space-y-4 font-light leading-[1.8] text-[1.05rem]" style={{ color: C.textMid }}>
                <p>
                  הרצאות מקצועיות וחווייתיות בנושאים רגשיים, חינוכיים ולימודיים, המיועדות להורים,
                  צוותי חינוך, בתי ספר, גנים וקהילות.
                </p>
                <p>
                  ההרצאות משלבות ידע מקצועי מעולמות הטיפול הרגשי, CBT והעבודה החינוכית, לצד
                  כלים פרקטיים שניתן לקחת מיד לחיי היום-יום.
                </p>
              </div>

              <div className="mt-6 md:mt-8">
                <p className="text-sm font-semibold mb-4 text-center md:text-right" style={{ color: C.textHeading }}>
                  בין נושאי ההרצאות:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'חיזוק ביטחון עצמי אצל ילדים',
                    'ויסות רגשי והתמודדות עם חרדות',
                    'פיתוח מיומנויות חברתיות',
                    'הצבת גבולות וחיזוק הקשר בין הורים לילדים',
                    'הבנת הקשר בין קושי רגשי לקשיי למידה',
                    'כלים מעשיים לתקשורת מקרבת בבית ובמסגרת החינוכית',
                  ].map((item) => (
                    <li key={item} className="flex items-center justify-center gap-3">
                      <RoseDot opacity={0.65} />
                      <span className="text-sm font-light" style={{ color: C.textMid, lineHeight: '1.7' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 md:mt-8 flex justify-center md:justify-end">
                <CtaButton href="#contact">לפרטים ותיאום הרצאה</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== THERAPY CARDS ===== */}
      <section id="cards" className="py-7 md:py-20 lg:py-24" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          <div className="text-center md:text-right mb-8 md:mb-12 lg:mb-16 sr">
            <SectionLabel text="קלפים טיפוליים" />
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-snug"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              קלפים שמדליקים אור בכל ילד
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">

            {/* Cards image */}
            <div className="relative flex flex-col items-center gap-6 order-2 md:order-1 sr sr-d1">
              <div
                className="relative w-full max-w-[340px] rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${C.borderLight}`, boxShadow: '0 4px 28px rgba(57,73,171,0.08)' }}
              >
                <Image
                  src="/therapy_cards_box.jpg"
                  alt="קלפי ניצוץ"
                  width={340}
                  height={420}
                  className="w-full h-auto object-cover object-top"
                  sizes="340px"
                />
              </div>
              <CtaButton href="#contact">לפרטים ורכישה</CtaButton>
            </div>

            {/* Cards text */}
            <div className="text-center md:text-right order-1 md:order-2 sr sr-d2">
              <Rule className="mx-auto md:mx-0" />
              <div className="space-y-5 font-light leading-[1.8] text-[1.05rem]" style={{ color: C.textMid }}>
                <p>
                  קלפי &quot;ניצוץ&quot; נוצרו כדי לתת לכל ילד מרחב בטוח לביטוי עצמי. כל קלף
                  מזמין שיחה שמאפשרת לילד לבטא את עולמו הרגשי, להתחבר לכוחות הפנימיים
                  שלו, ולחוות שהוא נראה, נשמע ומוקדד.
                </p>
                <p>
                  הקלפים פועלים כגשר תקשורת בין הורים לילדים. הם יוצרים שפה משותפת
                  שמחזקת ומעמיקה את הקשר, בונה אמון ופותחת דיאלוג פתוח ואמיתי.
                </p>
                <p>
                  שימוש קבוע בהם מסייע לילדים לפתח חוסן, לזהות את חוזקותיהם
                  ולהתמודד טוב יותר עם אתגרי החיים.
                </p>
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3">
                {[
                  { title: 'ביטוי עצמי',    subtitle: 'מרחב בטוח לעיבוד רגשות' },
                  { title: 'קשר הורי',       subtitle: 'גשר תקשורת ואמון' },
                  { title: 'דיאלוג פתוח',    subtitle: 'שיחות משמעותיות בבית' },
                  { title: 'עמידות רגשית',   subtitle: 'ביטחון עצמי וחוסן' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-4 text-center border border-[#F8BBD9] transition-all duration-300 hover:border-[#3949AB] hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                    style={{ backgroundColor: C.cream }}
                  >
                    <div className="text-base font-semibold mb-0.5" style={{ color: C.textHeading }}>{item.title}</div>
                    <div className="text-sm font-light" style={{ color: C.textLight }}>{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== APPROACH ===== */}
      <section id="approach" className="py-7 md:py-20 lg:py-24" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center md:text-right mb-8 md:mb-12 lg:mb-16 sr">
            <SectionLabel text="הגישה שלי" />
            <h2
              className="font-display text-4xl md:text-5xl font-medium"
              style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
            >
              מה מייחד את המרכז
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {features.map((feature, i) => (
              <Link
                key={feature.title}
                href={`/features/${feature.slug}`}
                className={`sr sr-d${Math.min(i + 1, 5) as 1|2|3|4|5} group rounded-xl p-5 text-center border border-[#F8BBD9] transition-all duration-300 hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1`}
                style={{ backgroundColor: C.cream }}
              >
                <div
                  className="w-8 h-8 rounded-full mb-4 flex items-center justify-center"
                  style={{ backgroundColor: C.creamAlt, border: `1px solid ${C.border}` }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: i % 2 === 0 ? C.rose : C.plum }}
                  />
                </div>
                <h3
                  className="font-display text-base font-semibold mb-2"
                  style={{ color: C.textHeading, letterSpacing: '-0.01em' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-[1.8] font-light" style={{ color: C.textMid }}>
                  {feature.description}
                </p>
                {/* Fix 12: forward = → */}
                <p className="text-xs mt-3 font-medium" style={{ color: C.rose }}>קראו עוד →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-7 md:py-20 lg:py-24" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-6 md:gap-10 lg:gap-16 items-start">

            {/* Contact info */}
            <div className="md:col-span-2 text-center md:text-right sr sr-d1">
              <SectionLabel text="יצירת קשר" />
              <h2
                className="font-display text-3xl md:text-4xl font-medium mb-4 md:mb-6 leading-snug"
                style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
              >
                מוזמנים לפנות
              </h2>
              <p className="font-light leading-[1.8] mb-6 md:mb-8 text-[1.05rem]" style={{ color: C.textMid }}>
                לשאלות, מידע נוסף או תיאום שיחת היכרות,
                אני כאן. כל פניה מטופלת בדיסקרטיות ובמהירות.
              </p>
              <div className="space-y-4 md:space-y-5 text-sm">
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>טלפון</span>
                  <a
                    href="tel:0502961213"
                    className="font-light transition-colors text-[#3949AB] hover:text-[#D81B8C]"
                    style={{ direction: 'ltr' }}
                  >
                    050-296-1213
                  </a>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>אימייל</span>
                  <a
                    href="mailto:gehulaa@gmail.com"
                    className="font-light transition-colors text-[#3949AB] hover:text-[#D81B8C]"
                    style={{ direction: 'ltr' }}
                  >
                    gehulaa@gmail.com
                  </a>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>מיקום</span>
                  <span className="font-light" style={{ color: C.textDark }}>ישראל</span>
                  <span className="text-sm font-medium leading-relaxed mt-1" style={{ color: C.textHeading }}>
                    קיימת אפשרות לטיפולים מרחוק באמצעות פגישות Zoom.
                  </span>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: C.rose }}>שעות פעילות</span>
                  <span className="font-light" style={{ color: C.textDark }}>ראשון עד חמישי, 09:00 עד 18:00</span>
                </div>
              </div>
            </div>

            {/* Contact form - client island */}
            <ContactFormClient />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 md:py-10 lg:py-12" style={{ backgroundColor: C.plum }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-right">
          <a href="#" aria-label="כנפיים לעוף - דף הבית" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="כנפיים לעוף"
              width={160}
              height={56}
              className="h-14 w-auto object-contain"
              style={{ maxWidth: 160, mixBlendMode: 'screen', opacity: 0.9 }}
            />
          </a>
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>
              מרכז טיפולי-לימודי | גאולה אלון
            </div>
            <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
              כל הזכויות שמורות &copy; 2025 {/* Update annually */}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
