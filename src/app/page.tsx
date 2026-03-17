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
      {/* Left wing */}
      <path
        d="M24 17 C19 7, 3 5, 3 15 C3 25, 17 27, 24 17Z"
        fill="currentColor"
      />
      {/* Right wing */}
      <path
        d="M24 17 C29 7, 45 5, 45 15 C45 25, 31 27, 24 17Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Lower tail feathers */}
      <path
        d="M24 17 C22 24, 15 30, 17 33 C19 31, 22 27, 24 17Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M24 17 C26 24, 33 30, 31 33 C29 31, 26 27, 24 17Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}

function FounderPortrait() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #C2D9C6 0%, #8DAE94 50%, #5D7D63 100%)' }}>
      {/* Botanical circle decoration */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 440"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="290" cy="55"  r="155" stroke="white" strokeWidth="1"   fill="none" opacity="0.18" />
        <circle cx="290" cy="55"  r="100" stroke="white" strokeWidth="0.8" fill="none" opacity="0.13" />
        <circle cx="30"  cy="410" r="125" stroke="white" strokeWidth="1"   fill="none" opacity="0.15" />
        <ellipse cx="160" cy="220" rx="55" ry="140" stroke="white" strokeWidth="1.5" fill="none" opacity="0.1" transform="rotate(-12 160 220)" />
        <ellipse cx="160" cy="220" rx="55" ry="140" stroke="white" strokeWidth="1.5" fill="none" opacity="0.1" transform="rotate(12 160 220)"  />
      </svg>
      {/* Monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)' }}>
          <span className="font-display text-5xl font-light text-white">ג</span>
        </div>
        <div className="text-center">
          <div className="text-white font-medium text-sm tracking-widest">גאולה אלון</div>
          <div className="text-xs mt-1 tracking-wider" style={{ color: 'rgba(255,255,255,0.7)' }}>מטפלת ומאבחנת</div>
        </div>
      </div>
    </div>
  );
}

function FounderAbout() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #DAE9D7 0%, #A4C4A7 60%, #7AA080 100%)' }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 480 480"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="80"  cy="80"  r="220" stroke="#3A5B42" strokeWidth="1.5" fill="none" opacity="0.12" />
        <circle cx="400" cy="400" r="200" stroke="#3A5B42" strokeWidth="1.5" fill="none" opacity="0.09" />
        <ellipse cx="240" cy="240" rx="90" ry="220" stroke="#3A5B42" strokeWidth="2" fill="none" opacity="0.09" transform="rotate(-18 240 240)" />
        <ellipse cx="240" cy="240" rx="90" ry="220" stroke="#3A5B42" strokeWidth="2" fill="none" opacity="0.09" transform="rotate(18 240 240)"  />
        <line x1="0" y1="480" x2="480" y2="0"   stroke="#3A5B42" strokeWidth="0.6" opacity="0.07" />
        <line x1="0" y1="380" x2="380" y2="0"   stroke="#3A5B42" strokeWidth="0.4" opacity="0.05" />
      </svg>
      <div className="absolute bottom-7 right-7 text-right">
        <div className="font-display text-sm font-light" style={{ color: 'rgba(30,40,30,0.55)' }}>
          מעל 20 שנות ניסיון קליני
        </div>
      </div>
    </div>
  );
}

// ======================
// SECTION LABEL
// ======================

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: '#8FAE95' }}>
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
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <WingsLogo className="w-9 h-7" style={{ color: '#4A6B50' } as React.CSSProperties} />
            <span className="font-display text-xl font-medium" style={{ color: '#4A6B50' }}>
              כנפיים לעוף
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: '#56645A' }}>
            <a href="#about"    className="transition-colors hover:text-[#4A6B50]">אודות</a>
            <a href="#services" className="transition-colors hover:text-[#4A6B50]">תחומי טיפול</a>
            <a href="#approach" className="transition-colors hover:text-[#4A6B50]">הגישה שלי</a>
            <a href="#contact"  className="transition-colors hover:text-[#4A6B50]">יצירת קשר</a>
          </nav>

          {/* CTA */}
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
        {/* Background shape */}
        <div
          className="absolute top-0 left-0 h-full -z-10 rounded-r-[100px]"
          style={{ width: '38%', backgroundColor: '#EDF3EB', opacity: 0.6 }}
        />
        {/* Soft glow */}
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full -z-10"
          style={{ backgroundColor: '#C8DCC5', opacity: 0.15, filter: 'blur(64px)' }}
        />

        <div className="max-w-6xl mx-auto px-6 py-36 md:py-48 flex flex-col md:flex-row items-center gap-16">

          {/* Text */}
          <div className="flex-1 text-right">
            <SectionLabel text="מרכז טיפולי-לימודי" />
            <h1 className="font-display text-6xl md:text-8xl font-light leading-[1.05] mb-6" style={{ color: '#292E27' }}>
              כנפיים<br />לעוף
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-14" style={{ color: '#56645A', maxWidth: '26rem', marginRight: 0, marginLeft: 'auto' }}>
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

          {/* Portrait placeholder */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="relative w-72 h-96 md:w-80 md:h-[440px] rounded-3xl overflow-hidden shadow-2xl">
                <FounderPortrait />
              </div>
              {/* Decorative frames */}
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
      <section id="about" className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* About image placeholder */}
          <div className="relative order-2 md:order-1">
            <div className="relative w-full h-[480px] rounded-3xl overflow-hidden shadow-lg">
              <FounderAbout />
            </div>
            <div
              className="absolute -bottom-6 -right-6 w-36 h-36 rounded-2xl -z-10 border"
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
            <div className="w-16 h-0.5 mt-4 mb-9" style={{ backgroundColor: '#8FAE95' }} />
            <div className="space-y-5 font-light leading-loose text-[1.05rem]" style={{ color: '#56645A' }}>
              <p>
                מעל עשרים שנה של עבודה קלינית ולימודית עם ילדים, נערות ונשים הם הבסיס
                שממנו צמח המרכז. הדרך לשינוי אמיתי עוברת דרך הבנה עמוקה של הצרכים
                הייחודיים של כל אדם.
              </p>
              <p>
                הגישה הטיפולית משלבת שיטות מוכחות: טיפול קוגניטיבי-התנהגותי (CBT),
                EMR, NLP ולימוד מתקן (Remedial Teaching), כולן מותאמות ומשולבות לפי
                הצורך הספציפי של כל מטופל.
              </p>
              <p>
                אני מאמינה שכל אדם נושא בתוכו משאבים ויכולות. תפקידי הוא לעזור לך
                למצוא אותם, לחזק אותם ולהשתמש בהם כדי לצמוח ולהתפתח.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              {[
                { num: '+20', label: 'שנות ניסיון' },
                { num: 'CBT',  label: 'טיפול קוגניטיבי' },
                { num: 'NLP',  label: 'נוירו-לשוני' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl py-5 px-2 border"
                  style={{ backgroundColor: '#EDF3EB', borderColor: '#D5E0D0' }}
                >
                  <div className="font-display text-2xl font-semibold" style={{ color: '#4A6B50' }}>
                    {stat.num}
                  </div>
                  <div className="text-xs mt-1.5 font-light" style={{ color: '#8A9888' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-32" style={{ backgroundColor: '#EDF3EB' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-right mb-16">
            <SectionLabel text="תחומי טיפול" />
            <h2 className="font-display text-5xl font-light" style={{ color: '#292E27' }}>
              במה אני יכולה לעזור
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group relative rounded-3xl p-8 text-right border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ backgroundColor: '#FFFFFF', borderColor: '#D5E0D0' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#8FAE95';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#D5E0D0';
                }}
              >
                {/* Background number */}
                <div
                  className="font-display absolute top-3 left-4 text-8xl font-bold leading-none select-none pointer-events-none"
                  style={{ color: '#EBF3E8' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <div
                    className="w-10 h-0.5 mb-6 transition-all duration-300 group-hover:w-16"
                    style={{ backgroundColor: '#8FAE95' }}
                  />
                  <h3 className="font-display text-xl font-medium mb-3" style={{ color: '#292E27' }}>
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

      {/* ===== APPROACH ===== */}
      <section id="approach" className="max-w-6xl mx-auto px-6 py-32">
        <div className="text-right mb-16">
          <SectionLabel text="הגישה שלי" />
          <h2 className="font-display text-5xl font-light" style={{ color: '#292E27' }}>
            מה מייחד את המרכז
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl p-6 text-right border transition-all duration-300 hover:shadow-md"
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
              {/* Icon dot */}
              <div
                className="w-9 h-9 rounded-full mb-5 flex items-center justify-center border transition-colors"
                style={{ backgroundColor: '#EDF3EB', borderColor: '#C8D8C0' }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8FAE95' }} />
              </div>
              <h3 className="font-display text-base font-semibold mb-2.5" style={{ color: '#292E27' }}>
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed font-light" style={{ color: '#6A7870' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-32" style={{ backgroundColor: '#EDF3EB' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16 items-start">

            {/* Contact info */}
            <div className="md:col-span-2 text-right">
              <SectionLabel text="יצירת קשר" />
              <h2 className="font-display text-4xl font-light mb-6 leading-snug" style={{ color: '#292E27' }}>
                מוזמנים לפנות
              </h2>
              <p className="font-light leading-loose mb-10 text-[1.05rem]" style={{ color: '#56645A' }}>
                לשאלות, מידע נוסף או תיאום שיחת היכרות,
                אני כאן. כל פניה מטופלת בדיסקרטיות ובמהירות.
              </p>
              <div className="space-y-6 text-sm">
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
              className="md:col-span-3 rounded-3xl p-8 border shadow-sm"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#D5E0D0' }}
            >
              {submitted ? (
                <div className="py-16 text-center">
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-semibold tracking-wide" style={{ color: '#56645A' }}>
                        שם מלא
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-right focus:outline-none transition-all border"
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
                        className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all border"
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
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-right appearance-none focus:outline-none transition-all border"
                      style={{ backgroundColor: '#F8F5F0', borderColor: '#D5E0D0', color: '#292E27' }}
                      onFocus={e => { e.target.style.borderColor = '#8FAE95'; e.target.style.boxShadow = '0 0 0 3px rgba(143,174,149,0.15)'; }}
                      onBlur={e =>  { e.target.style.borderColor = '#D5E0D0'; e.target.style.boxShadow = 'none'; }}
                    >
                      <option value="" disabled>בחרו נושא</option>
                      <option value="child">טיפול בילד / נערה</option>
                      <option value="adult">טיפול למבוגרת</option>
                      <option value="learning">קשיי למידה</option>
                      <option value="anxiety">חרדה ורגש</option>
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
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-right resize-none focus:outline-none transition-all border"
                      style={{ backgroundColor: '#F8F5F0', borderColor: '#D5E0D0', color: '#292E27' }}
                      onFocus={e => { e.target.style.borderColor = '#8FAE95'; e.target.style.boxShadow = '0 0 0 3px rgba(143,174,149,0.15)'; }}
                      onBlur={e =>  { e.target.style.borderColor = '#D5E0D0'; e.target.style.boxShadow = 'none'; }}
                      placeholder="ספרו לי במה אוכל לעזור..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
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
      <footer className="py-12" style={{ backgroundColor: '#1A2419', color: '#A8BCA0' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
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
