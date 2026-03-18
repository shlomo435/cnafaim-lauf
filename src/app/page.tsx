'use client';

import React, { useState } from 'react';

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
  },
  {
    title: 'מרחב בטוח',
    description: 'סביבה חמה, קבלה ולא שיפוטית המאפשרת פתיחות ועיבוד אמיתי.',
  },
  {
    title: 'שילוב הורים',
    description: 'הורים הם שותפים מלאים בתהליך. מעורבותם מחזקת את השפעת הטיפול.',
  },
  {
    title: 'תהליכים ממוקדים',
    description: 'עבודה שיטתית עם יעדים ברורים, מדידים וניתנים להשגה בזמן.',
  },
  {
    title: 'דיסקרטיות',
    description: 'שמירה מלאה על פרטיות המטופל ומשפחתו בכל שלב של הטיפול.',
  },
];

// ======================
// SUB-COMPONENTS
// ======================

function WingsLogo({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 48 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M24 17 C19 7, 3 5, 3 15 C3 25, 17 27, 24 17Z" fill="currentColor" />
      <path d="M24 17 C29 7, 45 5, 45 15 C45 25, 31 27, 24 17Z" fill="currentColor" opacity="0.65" />
      <path d="M24 17 C22 24, 15 30, 17 33 C19 31, 22 27, 24 17Z" fill="currentColor" opacity="0.5" />
      <path d="M24 17 C26 24, 33 30, 31 33 C29 31, 26 27, 24 17Z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: '#8FAE95' }}>
      {text}
    </p>
  );
}

// ======================
// MAIN PAGE
// ======================

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F5F0', color: '#292E27' }}>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'rgba(248,245,240,0.96)', borderColor: '#D5E0D0' }}>
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <WingsLogo className="w-9 h-7" style={{ color: '#4A6B50' } as React.CSSProperties} />
            <span className="font-display text-xl font-medium" style={{ color: '#4A6B50' }}>
              כנפיים לעוף
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: '#56645A' }}>
            <a href="#about"    className="transition-colors hover:text-[#4A6B50]">אודות</a>
            <a href="#services" className="transition-colors hover:text-[#4A6B50]">תחומי טיפול</a>
            <a href="#cards"    className="transition-colors hover:text-[#4A6B50]">קלפים טיפוליים</a>
            <a href="#approach" className="transition-colors hover:text-[#4A6B50]">הגישה שלי</a>
            <a href="#contact"  className="transition-colors hover:text-[#4A6B50]">יצירת קשר</a>
          </nav>

          <a
            href="#contact"
            className="text-sm font-medium px-6 py-2.5 rounded-full text-white transition-all shadow-sm hover:shadow-md"
            style={{ backgroundColor: '#4A6B50' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A5B40')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4A6B50')}
          >
            לתיאום פגישה
          </a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full -z-10 rounded-r-[100px]"
          style={{ width: '38%', backgroundColor: '#EDF3EB', opacity: 0.6 }}
        />
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full -z-10"
          style={{ backgroundColor: '#C8DCC5', opacity: 0.15, filter: 'blur(64px)' }}
        />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-22 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-right">
            <SectionLabel text="מרכז טיפולי-לימודי" />
            <h1 className="font-display text-6xl md:text-8xl font-light leading-[1.05] mb-5" style={{ color: '#292E27' }}>
              כנפיים<br />לעוף
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-7" style={{ color: '#56645A', maxWidth: '26rem', marginRight: 0, marginLeft: 'auto' }}>
              ליווי לצמיחה, חיזוק וחיבור עצמי<br className="hidden md:block" />
              לילדים, נערות ונשים
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <a
                href="#contact"
                className="px-9 py-4 rounded-full text-white text-sm font-medium text-center transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#4A6B50' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A5B40')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4A6B50')}
              >
                לתיאום שיחת היכרות
              </a>
              <a
                href="#services"
                className="px-9 py-4 rounded-full text-sm font-medium text-center transition-colors border"
                style={{ borderColor: '#BFCFB8', color: '#4A6B50', backgroundColor: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#EDF3EB')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                תחומי הטיפול
              </a>
            </div>
          </div>

          {/* Hero image: founder portrait */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="relative w-72 h-96 md:w-80 md:h-[430px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/founder_portrait.jpg"
                  alt="גאולה אלון"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl -z-10 border"
                style={{ backgroundColor: '#EDF3EB', borderColor: '#D5E0D0' }}
              />
              <div
                className="absolute -top-3 -right-3 w-11 h-11 rounded-full"
                style={{ backgroundColor: '#C8DCC5', opacity: 0.65 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px" style={{ background: 'linear-gradient(to left, transparent, #C0D4B8, transparent)' }} />
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* About images */}
          <div className="relative order-2 md:order-1">
            <div className="relative w-full h-[360px] rounded-3xl overflow-hidden shadow-lg">
              <img
                src="/founder_speaking.jpg"
                alt="גאולה אלון בהרצאה"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Inset: audience / conference photo */}
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
            <div
              className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl -z-10 border"
              style={{ backgroundColor: '#EDF3EB', borderColor: '#D5E0D0' }}
            />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-full -z-10"
              style={{ backgroundColor: '#D5E8D5', opacity: 0.7 }}
            />
          </div>

          {/* About text */}
          <div className="text-right order-1 md:order-2">
            <SectionLabel text="אודות" />
            <h2 className="font-display text-5xl font-light mb-2" style={{ color: '#292E27' }}>
              גאולה אלון
            </h2>
            <div className="w-16 h-0.5 mt-3 mb-5" style={{ backgroundColor: '#8FAE95' }} />
            <div className="space-y-4 font-light leading-loose text-[1.05rem]" style={{ color: '#56645A' }}>
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

            {/* Stats */}
            <div className="mt-5 grid grid-cols-3 gap-4 text-center">
              {[
                { num: '+20', label: 'שנות ניסיון' },
                { num: 'CBT',  label: 'טיפול קוגניטיבי' },
                { num: 'NLP',  label: 'נוירו-לשוני' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl py-4 px-2 border"
                  style={{ backgroundColor: '#EDF3EB', borderColor: '#D5E0D0' }}
                >
                  <div className="font-display text-2xl font-semibold" style={{ color: '#4A6B50' }}>
                    {stat.num}
                  </div>
                  <div className="text-xs mt-1 font-light" style={{ color: '#8A9888' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-12" style={{ backgroundColor: '#EDF3EB' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-right mb-8">
            <SectionLabel text="תחומי טיפול" />
            <h2 className="font-display text-5xl font-light" style={{ color: '#292E27' }}>
              במה אני יכולה לעזור
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group relative rounded-3xl p-6 text-right border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ backgroundColor: '#FFFFFF', borderColor: '#D5E0D0' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#8FAE95'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#D5E0D0'; }}
              >
                <div
                  className="font-display absolute top-3 left-4 text-8xl font-bold leading-none select-none pointer-events-none"
                  style={{ color: '#EBF3E8' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <div
                    className="w-10 h-0.5 mb-5 transition-all duration-300 group-hover:w-16"
                    style={{ backgroundColor: '#8FAE95' }}
                  />
                  <h3 className="font-display text-xl font-medium mb-2.5" style={{ color: '#292E27' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: '#6A7870' }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THERAPY CARDS ===== */}
      <section id="cards" className="py-16" style={{ backgroundColor: '#FDFAF6' }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section heading */}
          <div className="text-right mb-12">
            <SectionLabel text="קלפים טיפוליים" />
            <h2 className="font-display text-5xl md:text-6xl font-light leading-snug" style={{ color: '#292E27' }}>
              "ניצוץ" – קלפים<br />
              להדלקת האור הפנימי
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* Cards image */}
            <div className="relative flex justify-center order-2 md:order-1">
              <div className="relative">
                {/* Warm glow behind the box */}
                <div
                  className="absolute inset-0 rounded-3xl -z-10"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,220,100,0.3) 0%, transparent 68%)',
                    transform: 'scale(1.2)',
                  }}
                />
                <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/therapy_cards_box.jpg"
                    alt="קלפי ניצוץ – קלפים שמדליקים אור בכל ילד"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Decorative accents */}
                <div
                  className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl -z-10 border"
                  style={{ backgroundColor: '#EDF3EB', borderColor: '#D5E0D0' }}
                />
                <div
                  className="absolute -top-4 -left-4 w-16 h-16 rounded-full -z-10"
                  style={{ backgroundColor: '#F5E9A0', opacity: 0.75 }}
                />
                {/* Floating label */}
                <div
                  className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-semibold shadow-md"
                  style={{ backgroundColor: '#FFFFFF', color: '#4A6B50', border: '1px solid #D5E0D0' }}
                >
                  ניצוץ – קלפים שמדליקים אור בכל ילד!
                </div>
              </div>
            </div>

            {/* Cards text */}
            <div className="text-right order-1 md:order-2">
              <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#8FAE95' }} />
              <div className="space-y-5 font-light leading-loose text-[1.05rem]" style={{ color: '#56645A' }}>
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
              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  { title: 'ביטוי עצמי', subtitle: 'מרחב בטוח לעיבוד רגשות' },
                  { title: 'קשר הורי', subtitle: 'גשר תקשורת ואמון' },
                  { title: 'דיאלוג פתוח', subtitle: 'שיחות משמעותיות בבית' },
                  { title: 'עמידות רגשית', subtitle: 'ביטחון עצמי וחוסן' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl p-4 text-right border"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D5E0D0' }}
                  >
                    <div className="font-display text-lg font-semibold mb-0.5" style={{ color: '#4A6B50' }}>
                      {item.title}
                    </div>
                    <div className="text-xs font-light" style={{ color: '#8A9888' }}>
                      {item.subtitle}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <a
                  href="#contact"
                  className="inline-block px-8 py-3.5 rounded-full text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#4A6B50' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A5B40')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4A6B50')}
                >
                  לפרטים ורכישה
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px" style={{ background: 'linear-gradient(to left, transparent, #C0D4B8, transparent)' }} />
      </div>

      {/* ===== APPROACH ===== */}
      <section id="approach" className="py-12" style={{ backgroundColor: '#EDF3EB' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-right mb-8">
            <SectionLabel text="הגישה שלי" />
            <h2 className="font-display text-5xl font-light" style={{ color: '#292E27' }}>
              מה מייחד את המרכז
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl p-5 text-right border transition-all duration-300 hover:shadow-md"
                style={{ backgroundColor: '#F8F5F0', borderColor: '#D5E0D0' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#EDF3EB';
                  e.currentTarget.style.borderColor = '#8FAE95';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#F8F5F0';
                  e.currentTarget.style.borderColor = '#D5E0D0';
                }}
              >
                <div
                  className="w-9 h-9 rounded-full mb-4 flex items-center justify-center border transition-colors"
                  style={{ backgroundColor: '#EDF3EB', borderColor: '#C8D8C0' }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8FAE95' }} />
                </div>
                <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#292E27' }}>
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed font-light" style={{ color: '#6A7870' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-12" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 items-start">

            {/* Contact info */}
            <div className="md:col-span-2 text-right">
              <SectionLabel text="יצירת קשר" />
              <h2 className="font-display text-4xl font-light mb-5 leading-snug" style={{ color: '#292E27' }}>
                מוזמנים לפנות
              </h2>
              <p className="font-light leading-loose mb-8 text-[1.05rem]" style={{ color: '#56645A' }}>
                לשאלות, מידע נוסף או תיאום שיחת היכרות,
                אני כאן. כל פניה מטופלת בדיסקרטיות ובמהירות.
              </p>
              <div className="space-y-5 text-sm">
                <div className="flex flex-col text-right gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: '#8A9888' }}>
                    מיקום
                  </span>
                  <span className="font-light" style={{ color: '#3A4438' }}>ישראל</span>
                </div>
                <div className="h-px" style={{ backgroundColor: '#C8D8C0' }} />
                <div className="flex flex-col text-right gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: '#8A9888' }}>
                    שעות פעילות
                  </span>
                  <span className="font-light" style={{ color: '#3A4438' }}>ראשון עד חמישי, 09:00 עד 18:00</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div
              className="md:col-span-3 rounded-3xl p-7 border shadow-sm"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#D5E0D0' }}
            >
              {submitted ? (
                <div className="py-14 text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 border"
                    style={{ backgroundColor: '#EDF3EB', borderColor: '#C8D8C0' }}
                  >
                    <svg className="w-6 h-6" style={{ color: '#4A6B50' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-light mb-2" style={{ color: '#292E27' }}>
                    ההודעה נשלחה
                  </h3>
                  <p className="text-sm font-light" style={{ color: '#6A7870' }}>
                    אחזור אליך בהקדם. תודה על הפנייה.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-semibold tracking-wide" style={{ color: '#56645A' }}>
                        שם מלא
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm text-right focus:outline-none transition-all border"
                        style={{ backgroundColor: '#F8F5F0', borderColor: '#D5E0D0', color: '#292E27' }}
                        onFocus={e => { e.target.style.borderColor = '#8FAE95'; e.target.style.boxShadow = '0 0 0 3px rgba(143,174,149,0.15)'; }}
                        onBlur={e =>  { e.target.style.borderColor = '#D5E0D0'; e.target.style.boxShadow = 'none'; }}
                        placeholder="שם מלא"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-semibold tracking-wide" style={{ color: '#56645A' }}>
                        טלפון
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all border"
                        style={{ backgroundColor: '#F8F5F0', borderColor: '#D5E0D0', color: '#292E27' }}
                        onFocus={e => { e.target.style.borderColor = '#8FAE95'; e.target.style.boxShadow = '0 0 0 3px rgba(143,174,149,0.15)'; }}
                        onBlur={e =>  { e.target.style.borderColor = '#D5E0D0'; e.target.style.boxShadow = 'none'; }}
                        placeholder="05X-XXXXXXX"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-right">
                    <label className="text-xs font-semibold tracking-wide" style={{ color: '#56645A' }}>
                      נושא הפנייה
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-right appearance-none focus:outline-none transition-all border"
                      style={{ backgroundColor: '#F8F5F0', borderColor: '#D5E0D0', color: '#292E27' }}
                      onFocus={e => { e.target.style.borderColor = '#8FAE95'; e.target.style.boxShadow = '0 0 0 3px rgba(143,174,149,0.15)'; }}
                      onBlur={e =>  { e.target.style.borderColor = '#D5E0D0'; e.target.style.boxShadow = 'none'; }}
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
                    <label className="text-xs font-semibold tracking-wide" style={{ color: '#56645A' }}>
                      הודעה
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-right resize-none focus:outline-none transition-all border"
                      style={{ backgroundColor: '#F8F5F0', borderColor: '#D5E0D0', color: '#292E27' }}
                      onFocus={e => { e.target.style.borderColor = '#8FAE95'; e.target.style.boxShadow = '0 0 0 3px rgba(143,174,149,0.15)'; }}
                      onBlur={e =>  { e.target.style.borderColor = '#D5E0D0'; e.target.style.boxShadow = 'none'; }}
                      placeholder="ספרו לי במה אוכל לעזור..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
                    style={{ backgroundColor: '#4A6B50' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A5B40')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4A6B50')}
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
      <footer className="py-10" style={{ backgroundColor: '#1A2419', color: '#A8BCA0' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-right">
          <div className="flex items-center gap-3">
            <WingsLogo className="w-8 h-6" style={{ color: '#6B8F71' } as React.CSSProperties} />
            <div>
              <div className="font-display text-base font-medium" style={{ color: '#FFFFFF' }}>
                כנפיים לעוף
              </div>
              <div className="text-xs mt-0.5 font-light" style={{ color: '#6B8F71' }}>
                מרכז טיפולי-לימודי | גאולה אלון
              </div>
            </div>
          </div>
          <div className="text-xs font-light" style={{ color: '#4E6450' }}>
            כל הזכויות שמורות &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>

    </div>
  );
}
