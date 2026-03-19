'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
// BRAND TOKENS
// ======================
const C = {
  pink:         '#C91F82',
  pinkLight:    '#E535A0',
  purple:       '#4B47BF',
  gold:         '#B8956A',
  goldLight:    '#D4A853',
  textDark:     '#1C1826',
  textMid:      '#574D6A',
  textLight:    '#8A7A9A',
  cream:        '#FAF8F5',
  creamAlt:     '#F5EFE6',
  creamDeep:    '#EDE3D6',
  border:       '#E5D8C8',
  borderLight:  '#EDE6DC',
  ctaGrad:      'linear-gradient(135deg, #E84778 0%, #F0724A 100%)',
  ctaGradHover: 'linear-gradient(135deg, #D03868 0%, #E0623A 100%)',
};

// ======================
// BRAND SVG COMPONENTS
// ======================

/**
 * Butterfly icon drawn in brand pink/purple with opacity layering.
 * No SVG gradient IDs are used so multiple instances never conflict.
 */
function ButterflyIcon({
  className = '',
  style,
  size = 32,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}) {
  const w = size;
  const h = size * 0.71;
  return (
    <svg
      viewBox="0 0 48 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: w, height: h, flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {/* Left primary wing */}
      <path
        d="M24 17 C15 5, 1 4, 3 13 C5 22, 18 23, 24 17Z"
        fill="#C91F82"
        opacity="0.88"
      />
      {/* Right primary wing */}
      <path
        d="M24 17 C33 5, 47 4, 45 13 C43 22, 30 23, 24 17Z"
        fill="#4B47BF"
        opacity="0.65"
      />
      {/* Left secondary wing detail */}
      <path
        d="M24 17 C18 9, 7 7, 5 11 C3 15, 13 19, 24 17Z"
        fill="#C91F82"
        opacity="0.28"
      />
      {/* Right secondary wing detail */}
      <path
        d="M24 17 C30 9, 41 7, 43 11 C45 15, 35 19, 24 17Z"
        fill="#4B47BF"
        opacity="0.22"
      />
      {/* Lower tail left */}
      <path
        d="M24 17 C22 22, 19 29, 21 32 C22 29, 23 24, 24 17Z"
        fill="#C91F82"
        opacity="0.55"
      />
      {/* Lower tail right */}
      <path
        d="M24 17 C26 22, 29 29, 27 32 C26 29, 25 24, 24 17Z"
        fill="#4B47BF"
        opacity="0.42"
      />
      {/* Small sparkle circles on upper wings */}
      <circle cx="9"  cy="9"  r="1.3" fill="#C91F82" opacity="0.45" />
      <circle cx="39" cy="9"  r="1.3" fill="#4B47BF" opacity="0.45" />
      {/* Tiny spiral dots */}
      <circle cx="7"  cy="12" r="0.7" fill="#D4A853" opacity="0.6" />
      <circle cx="41" cy="12" r="0.7" fill="#D4A853" opacity="0.6" />
    </svg>
  );
}

/** Four-pointed star sparkle (ניצוץ motif) */
function SparkleIcon({
  size = 12,
  className = '',
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path
        d="M10 1 L11.6 8.4 L19 10 L11.6 11.6 L10 19 L8.4 11.6 L1 10 L8.4 8.4 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Section label with a trailing sparkle */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 justify-end mb-4">
      <p
        className="text-xs font-semibold tracking-[0.22em] uppercase"
        style={{ color: C.gold }}
      >
        {text}
      </p>
      <SparkleIcon size={9} style={{ color: C.goldLight }} />
    </div>
  );
}

/** Elegant butterfly ornament divider replacing generic line separators */
function ButterflyDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-1 ${className}`}>
      <div
        className="h-px flex-1 max-w-[110px]"
        style={{ background: `linear-gradient(to left, ${C.border}, transparent)` }}
      />
      <ButterflyIcon size={20} />
      <div
        className="h-px flex-1 max-w-[110px]"
        style={{ background: `linear-gradient(to right, ${C.border}, transparent)` }}
      />
    </div>
  );
}

/** Gold accent rule used under headings */
function GoldRule({ width = 'w-20' }: { width?: string }) {
  return (
    <div
      className={`${width} h-0.5 mt-3 mb-6`}
      style={{ background: `linear-gradient(to left, ${C.goldLight}, ${C.gold})` }}
    />
  );
}

/** Primary CTA button with pink-to-orange gradient */
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
  const [over, setOver] = React.useState(false);
  return (
    <a
      href={href}
      className={`text-sm font-medium text-center text-white rounded-full transition-all shadow-md hover:shadow-lg ${block ? 'block w-full py-3.5' : 'inline-block px-8 py-3.5'} ${className}`}
      style={{ background: over ? C.ctaGradHover : C.ctaGrad }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {children}
    </a>
  );
}

// ======================
// MAIN PAGE
// ======================

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const focusStyle = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = C.pink;
      e.target.style.boxShadow = `0 0 0 3px rgba(201,31,130,0.1)`;
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = C.border;
      e.target.style.boxShadow = 'none';
    },
  };

  const inputBase: React.CSSProperties = {
    backgroundColor: C.creamAlt,
    borderColor: C.border,
    color: C.textDark,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>

      {/* ===== HEADER ===== */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(250,248,245,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* Logo image with mix-blend-mode so white bg blends into header */}
          <a href="#" className="flex items-center flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="כנפיים לעוף"
              className="h-14 w-auto object-contain"
              style={{ maxWidth: 168, mixBlendMode: 'multiply' }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: C.textMid }}>
            {(['אודות', 'תחומי טיפול', 'קלפים טיפוליים', 'הגישה שלי', 'יצירת קשר'] as const).map(
              (label, i) => {
                const hrefs = ['#about', '#services', '#cards', '#approach', '#contact'];
                return (
                  <a
                    key={label}
                    href={hrefs[i]}
                    className="transition-colors duration-200"
                    onMouseEnter={e => (e.currentTarget.style.color = C.pink)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.textMid)}
                  >
                    {label}
                  </a>
                );
              }
            )}
          </nav>

          <CtaButton href="#contact" className="px-5 py-2 text-xs">
            לתיאום פגישה
          </CtaButton>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Diagonal warm cream panel on the portrait side */}
        <div
          className="absolute top-0 right-0 h-full -z-10"
          style={{
            width: '50%',
            background: `linear-gradient(160deg, ${C.creamAlt} 0%, ${C.creamDeep} 100%)`,
            clipPath: 'polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
        {/* Pink radial glow top-right */}
        <div
          className="absolute -top-24 right-8 w-96 h-96 rounded-full -z-10"
          style={{ background: 'radial-gradient(circle, rgba(201,31,130,0.09) 0%, transparent 68%)' }}
        />
        {/* Purple glow bottom-left */}
        <div
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full -z-10"
          style={{ background: 'radial-gradient(circle, rgba(75,71,191,0.07) 0%, transparent 65%)' }}
        />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">

          {/* Text block */}
          <div className="flex-1 text-right">
            <SectionLabel text="מרכז טיפולי-לימודי" />

            <div className="relative inline-block mb-6">
              <h1
                className="font-display text-[5.5rem] md:text-[8rem] font-light leading-[1.0]"
                style={{ color: C.textDark }}
              >
                כנפיים
                <br />
                לעוף
              </h1>
              {/* Ghost butterfly behind the headline */}
              <div className="absolute -top-6 -left-10 pointer-events-none" aria-hidden="true">
                <ButterflyIcon size={56} style={{ opacity: 0.18 }} />
              </div>
            </div>

            <p
              className="text-xl md:text-2xl font-light leading-relaxed mb-9"
              style={{ color: C.textMid, maxWidth: '28rem', marginRight: 0, marginLeft: 'auto' }}
            >
              ליווי לצמיחה, חיזוק וחיבור עצמי
              <br className="hidden md:block" />
              לילדים, נערות ונשים
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <CtaButton href="#contact">לתיאום שיחת היכרות</CtaButton>
              <a
                href="#services"
                className="px-9 py-3.5 rounded-full text-sm font-medium text-center transition-all border"
                style={{ borderColor: C.border, color: C.textMid, backgroundColor: 'transparent' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = C.creamAlt;
                  e.currentTarget.style.borderColor = C.gold;
                  e.currentTarget.style.color = C.textDark;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.color = C.textMid;
                }}
              >
                תחומי הטיפול
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="flex-shrink-0 relative">
            {/* Pink glow halo behind portrait */}
            <div
              className="absolute inset-0 -z-10 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse at 60% 40%, rgba(201,31,130,0.14) 0%, transparent 68%)',
                transform: 'scale(1.35)',
              }}
            />
            <div className="relative w-72 h-96 md:w-80 md:h-[440px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/founder_portrait.jpg"
                alt="גאולה אלון"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Gold accent corner block */}
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl -z-10 border-2"
              style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
            />
          </div>
        </div>
      </section>

      {/* Butterfly ornament divider */}
      <div className="max-w-6xl mx-auto px-6">
        <ButterflyDivider />
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Images column */}
          <div className="relative order-2 md:order-1">
            <div className="relative w-full h-[360px] rounded-3xl overflow-hidden shadow-lg">
              <img
                src="/founder_speaking.jpg"
                alt="גאולה אלון בהרצאה"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Inset audience thumbnail */}
            <div
              className="absolute -bottom-6 -left-4 w-44 h-28 rounded-2xl overflow-hidden shadow-xl border-2"
              style={{ borderColor: '#FFFFFF' }}
            >
              <img
                src="/conference_audience.jpg"
                alt="קהל בהרצאה"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Accent blocks */}
            <div
              className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl -z-10 border"
              style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
            />
            <div
              className="absolute -top-5 -left-5 w-16 h-16 rounded-full -z-10 opacity-35"
              style={{ backgroundColor: C.pinkLight, filter: 'blur(22px)' }}
            />
          </div>

          {/* Text column */}
          <div className="text-right order-1 md:order-2">
            <SectionLabel text="אודות" />
            <h2 className="font-display text-5xl font-light" style={{ color: C.textDark }}>
              גאולה אלון
            </h2>
            <GoldRule />
            <div className="space-y-4 font-light leading-loose text-[1.05rem]" style={{ color: C.textMid }}>
              <p>
                מעל עשרים שנה של ניסיון קליני ולימודי עם ילדים, נערות ונשים הם הבסיס שממנו
                צמח המרכז. הדרך לשינוי אמיתי עוברת דרך הבנה עמוקה ומכילה של הצרכים
                הייחודיים של כל אדם, ומתוך מרחב שמרגיש כמו בית.
              </p>
              <p>
                הגישה הטיפולית הוליסטית משלבת שיטות מוכחות: טיפול קוגניטיבי-התנהגותי (CBT),
                EMR, NLP ולימוד מתקן (Remedial Teaching), כולן מותאמות אישית לפי הצורך
                הספציפי של כל מטופל, בכל שלב בדרך.
              </p>
              <p>
                אני מאמינה שכל אדם נושא בתוכו משאבים ויכולות. תפקידי הוא לעזור לך לגלות
                אותם, לחזק אותם ולהשתמש בהם כדי לצמוח, להתפתח ולחיות חיים מלאים ומשמעותיים.
              </p>
            </div>

            {/* Stats tiles */}
            <div className="mt-7 grid grid-cols-3 gap-4 text-center">
              {[
                { num: '+20', label: 'שנות ניסיון' },
                { num: 'CBT',  label: 'טיפול קוגניטיבי' },
                { num: 'NLP',  label: 'נוירו-לשוני' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl py-4 px-2 border"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
                >
                  <div className="font-display text-2xl font-semibold" style={{ color: C.pink }}>
                    {stat.num}
                  </div>
                  <div className="text-xs mt-1 font-light" style={{ color: C.textLight }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-14" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-right mb-9">
            <SectionLabel text="תחומי טיפול" />
            <h2 className="font-display text-5xl font-light" style={{ color: C.textDark }}>
              במה אני יכולה לעזור
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group relative rounded-3xl p-7 text-right border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ backgroundColor: '#FFFFFF', borderColor: C.border }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.pinkLight;
                  e.currentTarget.style.boxShadow = `0 8px 36px rgba(201,31,130,0.09)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Ghost number watermark in brand pink */}
                <div
                  className="font-display absolute top-2 left-4 text-[5.5rem] font-bold leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(201,31,130,0.045)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  {/* Gold accent rule */}
                  <div
                    className="w-10 h-0.5 mb-5 transition-all duration-300 group-hover:w-16"
                    style={{ background: `linear-gradient(to left, ${C.goldLight}, ${C.gold})` }}
                  />
                  <h3 className="font-display text-xl font-medium mb-2.5" style={{ color: C.textDark }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: C.textMid }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Butterfly ornament divider */}
      <div className="max-w-6xl mx-auto px-6 py-3">
        <ButterflyDivider />
      </div>

      {/* ===== THERAPY CARDS ===== */}
      <section id="cards" className="py-16" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Section heading */}
          <div className="text-right mb-11">
            <SectionLabel text="קלפים טיפוליים" />
            <h2
              className="font-display text-5xl md:text-6xl font-light leading-snug"
              style={{ color: C.textDark }}
            >
              קלפים שמדליקים אור בכל ילד!
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* Cards product image */}
            <div className="relative flex justify-center order-2 md:order-1">
              <div className="relative">
                {/* Warm gold + pink glow behind the box */}
                <div
                  className="absolute inset-0 rounded-3xl -z-10"
                  style={{
                    background:
                      'radial-gradient(ellipse at 40% 45%, rgba(212,168,83,0.28) 0%, rgba(201,31,130,0.09) 55%, transparent 72%)',
                    transform: 'scale(1.28)',
                  }}
                />
                <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/therapy_cards_box.jpg"
                    alt="קלפי ניצוץ – קלפים שמדליקים אור בכל ילד"
                    className="w-full h-auto object-contain object-center"
                  />
                </div>
                {/* Gold accent corner */}
                <div
                  className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl -z-10 border"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
                />
                {/* Pink sparkle accent top-left */}
                <div
                  className="absolute -top-5 -left-5 w-16 h-16 rounded-full -z-10 opacity-45"
                  style={{ backgroundColor: C.pinkLight, filter: 'blur(22px)' }}
                />
                {/* Floating brand pill */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shadow-md"
                  style={{
                    background: 'rgba(255,255,255,0.93)',
                    color: C.pink,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <SparkleIcon size={9} style={{ color: C.goldLight }} />
                  ניצוץ
                </div>
              </div>
            </div>

            {/* Cards text */}
            <div className="text-right order-1 md:order-2">
              <GoldRule />
              <div className="space-y-5 font-light leading-loose text-[1.05rem]" style={{ color: C.textMid }}>
                <p>
                  קלפי "ניצוץ" נוצרו כדי לתת לכל ילד מרחב בטוח לביטוי עצמי. כל קלף
                  מזמין שיחה שמאפשרת לילד לבטא את עולמו הרגשי, להתחבר לכוחות הפנימיים
                  שלו, ולחוות שהוא נראה, נשמע ומוקדש.
                </p>
                <p>
                  הקלפים פועלים כגשר תקשורת בין הורים לילדים. הם יוצרים שפה משותפת
                  שמחזקת ומעמיקה את הקשר, בונה אמון ופותחת דיאלוג פתוח ואמיתי. הורים
                  מגלים בהם כלי רב-עוצמה לחיבור מחדש בשגרת היומיום.
                </p>
                <p>
                  לצד החיבור ההורי, קלפי "ניצוץ" תומכים בבניית ביטחון עצמי ועמידות
                  רגשית. שימוש קבוע בהם מסייע לילדים לפתח חוסן, לזהות את חוזקותיהם
                  ולהתמודד טוב יותר עם אתגרי החיים.
                </p>
              </div>

              {/* Highlights grid */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { title: 'ביטוי עצמי',    subtitle: 'מרחב בטוח לעיבוד רגשות' },
                  { title: 'קשר הורי',       subtitle: 'גשר תקשורת ואמון' },
                  { title: 'דיאלוג פתוח',   subtitle: 'שיחות משמעותיות בבית' },
                  { title: 'עמידות רגשית',  subtitle: 'ביטחון עצמי וחוסן' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl p-4 text-right border transition-all hover:shadow-md"
                    style={{ backgroundColor: '#FFFFFF', borderColor: C.border }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = C.pinkLight;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = C.border;
                    }}
                  >
                    <div className="font-display text-lg font-semibold mb-0.5" style={{ color: C.pink }}>
                      {item.title}
                    </div>
                    <div className="text-xs font-light" style={{ color: C.textLight }}>
                      {item.subtitle}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CtaButton href="#contact">לפרטים ורכישה</CtaButton>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Butterfly ornament divider */}
      <div className="max-w-6xl mx-auto px-6 py-3">
        <ButterflyDivider />
      </div>

      {/* ===== APPROACH ===== */}
      <section id="approach" className="py-14" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-right mb-9">
            <SectionLabel text="הגישה שלי" />
            <h2 className="font-display text-5xl font-light" style={{ color: C.textDark }}>
              מה מייחד את המרכז
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {features.map((feature, i) => (
              <Link
                key={feature.title}
                href={`/features/${feature.slug}`}
                className="group rounded-2xl p-5 text-right border transition-all duration-300 block"
                style={{ backgroundColor: '#FFFFFF', borderColor: C.border, textDecoration: 'none' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = C.cream;
                  e.currentTarget.style.borderColor = C.gold;
                  e.currentTarget.style.boxShadow = `0 4px 20px rgba(184,149,106,0.15)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Sparkle icon badge */}
                <div
                  className="w-9 h-9 rounded-full mb-4 flex items-center justify-center border"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.borderLight }}
                >
                  <SparkleIcon size={12} style={{ color: i % 2 === 0 ? C.pink : C.gold }} />
                </div>
                <h3 className="font-display text-base font-semibold mb-2" style={{ color: C.textDark }}>
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed font-light" style={{ color: C.textMid }}>
                  {feature.description}
                </p>
                <p className="text-xs mt-3 font-medium" style={{ color: C.pink }}>
                  קראו עוד &larr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-14" style={{ backgroundColor: C.cream }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 items-start">

            {/* Contact info */}
            <div className="md:col-span-2 text-right">
              <SectionLabel text="יצירת קשר" />
              <h2 className="font-display text-4xl font-light mb-5 leading-snug" style={{ color: C.textDark }}>
                מוזמנים לפנות
              </h2>
              <p className="font-light leading-loose mb-8 text-[1.05rem]" style={{ color: C.textMid }}>
                לשאלות, מידע נוסף או תיאום שיחת היכרות,
                אני כאן. כל פניה מטופלת בדיסקרטיות ובמהירות.
              </p>
              <div className="space-y-5 text-sm">
                <div className="flex flex-col text-right gap-1.5">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: C.gold }}
                  >
                    טלפון
                  </span>
                  <a
                    href="tel:0502961213"
                    className="font-light transition-colors"
                    style={{ color: C.textDark, direction: 'ltr', textAlign: 'right' }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.pink)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.textDark)}
                  >
                    050-296-1213
                  </a>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-right gap-1.5">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: C.gold }}
                  >
                    מיקום
                  </span>
                  <span className="font-light" style={{ color: C.textDark }}>ישראל</span>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-right gap-1.5">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: C.gold }}
                  >
                    שעות פעילות
                  </span>
                  <span className="font-light" style={{ color: C.textDark }}>
                    ראשון עד חמישי, 09:00 עד 18:00
                  </span>
                </div>
              </div>
              {/* Decorative butterfly */}
              <div className="mt-12 flex justify-end">
                <ButterflyIcon size={64} style={{ opacity: 0.15 }} />
              </div>
            </div>

            {/* Form card */}
            <div
              className="md:col-span-3 rounded-3xl p-7 border shadow-sm"
              style={{ backgroundColor: '#FFFFFF', borderColor: C.border }}
            >
              {submitted ? (
                <div className="py-14 text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: C.ctaGrad }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-light mb-2" style={{ color: C.textDark }}>
                    ההודעה נשלחה
                  </h3>
                  <p className="text-sm font-light" style={{ color: C.textMid }}>
                    אחזור אליך בהקדם. תודה על הפנייה.
                  </p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
                        שם מלא
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm text-right focus:outline-none transition-all border"
                        style={inputBase}
                        {...focusStyle}
                        placeholder="שם מלא"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
                        טלפון
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all border"
                        style={inputBase}
                        {...focusStyle}
                        placeholder="05X-XXXXXXX"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-right">
                    <label className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
                      נושא הפנייה
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-right appearance-none focus:outline-none transition-all border"
                      style={inputBase}
                      {...focusStyle}
                    >
                      <option value="" disabled>בחרו נושא</option>
                      <option value="child">טיפול בילד / נערה</option>
                      <option value="adult">טיפול למבוגרת</option>
                      <option value="learning">קשיי למידה</option>
                      <option value="anxiety">חרדה ורגש</option>
                      <option value="cards">קלפים טיפוליים</option>
                      <option value="info">מידע כללי</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 text-right">
                    <label className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
                      הודעה
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-right resize-none focus:outline-none transition-all border"
                      style={inputBase}
                      {...focusStyle}
                      placeholder="ספרו לי במה אוכל לעזור..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
                    style={{ background: C.ctaGrad }}
                    onMouseEnter={e => (e.currentTarget.style.background = C.ctaGradHover)}
                    onMouseLeave={e => (e.currentTarget.style.background = C.ctaGrad)}
                  >
                    שלחו הודעה
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10" style={{ backgroundColor: '#15101E', color: '#9A8EAA' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
          <a href="#" className="flex items-center gap-4 flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="כנפיים לעוף"
              className="h-14 w-auto object-contain"
              style={{ maxWidth: 160, mixBlendMode: 'screen', opacity: 0.88 }}
            />
          </a>
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-xs font-light" style={{ color: '#6B5E7A' }}>
              מרכז טיפולי-לימודי | גאולה אלון
            </div>
            <div className="text-xs font-light" style={{ color: '#4A3E5A' }}>
              כל הזכויות שמורות &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
