'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';

const services = [
  {
    title: 'ויסות רגשי וחרדות',
    description:
      'כלים פרקטיים לזיהוי, הבנה וניהול רגשות ומצבי חרדה בחיי היומיום — בגיל הילדות ובבגרות.',
  },
  {
    title: 'חיזוק ביטחון ודימוי עצמי',
    description:
      'בניית תחושת ערך עצמי יציבה, הכרה בייחודיות האישית ופיתוח משאבים פנימיים לחיים מיטיבים.',
  },
  {
    title: 'התמודדות עם משבר, שינוי וטראומה',
    description:
      'ליווי מקצועי ומיומן במצבי מעבר, אובדן, שינוי ואירועים טראומטיים — בגישה עדינה ומכילה.',
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
    description: 'הורים הם שותפים מלאים בתהליך — מעורבותם מחזקת את השפעת הטיפול.',
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

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#333333]">

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-[#E5E8E0]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-wide text-[#5A7A5A]">כנפיים לעוף</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#555]">
            <a href="#about" className="hover:text-[#5A7A5A] transition-colors">אודות</a>
            <a href="#services" className="hover:text-[#5A7A5A] transition-colors">תחומי טיפול</a>
            <a href="#approach" className="hover:text-[#5A7A5A] transition-colors">הגישה שלי</a>
            <a href="#contact" className="hover:text-[#5A7A5A] transition-colors">יצירת קשר</a>
          </nav>
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2 rounded-full bg-[#5A7A5A] text-white hover:bg-[#4A6A4A] transition-colors"
          >
            לתיאום פגישה
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-40 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-right">
            <p className="text-sm font-medium tracking-widest text-[#8B9E82] uppercase mb-6">
              מרכז טיפולי־לימודי
            </p>
            <h1 className="text-4xl md:text-6xl font-light leading-tight text-[#2D2D2D] mb-6">
              כנפיים לעוף
            </h1>
            <p className="text-xl md:text-2xl font-light text-[#5A6B5A] leading-relaxed mb-10">
              ליווי לצמיחה, חיזוק וחיבור עצמי<br className="hidden md:block" />
              לילדים, נערות ונשים
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-[#5A7A5A] text-white text-sm font-medium rounded-full hover:bg-[#4A6A4A] transition-colors text-center"
              >
                לתיאום שיחת היכרות
              </a>
              <a
                href="#services"
                className="px-8 py-3.5 border border-[#C0CDB8] text-[#5A7A5A] text-sm font-medium rounded-full hover:bg-[#EEF2EC] transition-colors text-center"
              >
                תחומי הטיפול
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-72 h-96 md:w-80 md:h-[440px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/founder-profile.jpg"
                alt="גאולה אלון – כנפיים לעוף"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
        {/* Decorative sage shape */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-[#EEF2EC] -z-10 rounded-r-[80px] opacity-60" />
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-l from-transparent via-[#C8D4C0] to-transparent" />
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative w-full h-[480px] rounded-2xl overflow-hidden">
              <Image
                src="/founder-speaking.jpg"
                alt="גאולה אלון מרצה"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-[#EEF2EC] -z-10" />
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold tracking-widest text-[#8B9E82] uppercase mb-4">
              אודות
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2D2D] mb-6 leading-snug">
              גאולה אלון
            </h2>
            <div className="w-12 h-0.5 bg-[#8B9E82] mb-8 mr-0" />
            <div className="space-y-4 text-[#555] leading-relaxed font-light text-[1.05rem]">
              <p>
                מעל עשרים שנה של עבודה קלינית ולימודית עם ילדים, נערות ונשים הם הבסיס שממנו צמח
                המרכז. הדרך לשינוי אמיתי עוברת דרך הבנה עמוקה של הצרכים הייחודיים של כל אדם.
              </p>
              <p>
                הגישה הטיפולית משלבת שיטות מוכחות: טיפול קוגניטיבי-התנהגותי (CBT), EMR, NLP
                ולימוד מתקן (Remedial Teaching) — כולן מותאמות ומשולבות לפי הצורך הספציפי של כל
                מטופל.
              </p>
              <p>
                אני מאמינה שכל אדם נושא בתוכו משאבים ויכולות. תפקידי הוא לעזור לך למצוא אותם,
                לחזק אותם ולהשתמש בהם כדי לצמוח ולהתפתח.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 text-center">
              {[
                { num: '+20', label: 'שנות ניסיון' },
                { num: 'CBT', label: 'טיפול קוגניטיבי' },
                { num: 'NLP', label: 'ותכנות נוירו-לשוני' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#EEF2EC] rounded-xl py-4 px-2">
                  <div className="text-xl font-semibold text-[#5A7A5A]">{stat.num}</div>
                  <div className="text-xs text-[#777] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="bg-[#F3F6F0] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-right mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#8B9E82] uppercase mb-4">
              תחומי טיפול
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2D2D]">
              במה אני יכולה לעזור
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`bg-white rounded-2xl p-8 text-right border border-[#E5E8E0] hover:border-[#B0C4AA] hover:shadow-md transition-all duration-300 ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-8 h-0.5 bg-[#8B9E82] mb-6 mr-0" />
                <h3 className="text-lg font-medium text-[#2D2D2D] mb-3">{service.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES / APPROACH ──────────────────────────────────────── */}
      <section id="approach" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-right mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#8B9E82] uppercase mb-4">
            הגישה שלי
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#2D2D2D]">
            מה מייחד את המרכז
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-[#FAFAF7] border border-[#E5E8E0] rounded-2xl p-6 text-right hover:bg-[#EEF2EC] hover:border-[#B0C4AA] transition-all duration-300"
            >
              <div className="w-6 h-6 rounded-full bg-[#EEF2EC] group-hover:bg-white border border-[#C8D4C0] mb-4 flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#8B9E82]" />
              </div>
              <h3 className="text-base font-semibold text-[#2D2D2D] mb-2">{feature.title}</h3>
              <p className="text-xs text-[#666] leading-relaxed font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#F3F6F0] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16 items-start">
            {/* Left: Info */}
            <div className="md:col-span-2 text-right">
              <p className="text-xs font-semibold tracking-widest text-[#8B9E82] uppercase mb-4">
                יצירת קשר
              </p>
              <h2 className="text-3xl font-light text-[#2D2D2D] mb-6 leading-snug">
                מוזמנים לפנות
              </h2>
              <p className="text-[#555] font-light leading-relaxed mb-10">
                לשאלות, מידע נוסף או תיאום שיחת היכרות — אני כאן. כל פניה מטופלת בדיסקרטיות
                ובמהירות.
              </p>
              <div className="space-y-5 text-sm">
                <div className="flex flex-col text-right gap-1">
                  <span className="text-xs text-[#8B9E82] font-semibold tracking-wider uppercase">מיקום</span>
                  <span className="text-[#444] font-light">ישראל</span>
                </div>
                <div className="flex flex-col text-right gap-1">
                  <span className="text-xs text-[#8B9E82] font-semibold tracking-wider uppercase">שעות פעילות</span>
                  <span className="text-[#444] font-light">ראשון–חמישי, 09:00–18:00</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="md:col-span-3 bg-white rounded-2xl p-8 border border-[#E5E8E0] shadow-sm">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EEF2EC] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#5A7A5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-light text-[#2D2D2D] mb-2">ההודעה נשלחה</h3>
                  <p className="text-sm text-[#666] font-light">אחזור אליך בהקדם. תודה על הפנייה.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-medium text-[#555]">שם מלא</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0E5DC] bg-[#FAFAF7] text-[#333] text-sm focus:outline-none focus:border-[#8B9E82] transition-colors placeholder:text-[#bbb] text-right"
                        placeholder="שם מלא"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-medium text-[#555]">טלפון</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0E5DC] bg-[#FAFAF7] text-[#333] text-sm focus:outline-none focus:border-[#8B9E82] transition-colors placeholder:text-[#bbb] text-right"
                        placeholder="05X-XXXXXXX"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 text-right">
                    <label className="text-xs font-medium text-[#555]">נושא הפנייה</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E5DC] bg-[#FAFAF7] text-[#333] text-sm focus:outline-none focus:border-[#8B9E82] transition-colors text-right appearance-none"
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
                    <label className="text-xs font-medium text-[#555]">הודעה</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E5DC] bg-[#FAFAF7] text-[#333] text-sm focus:outline-none focus:border-[#8B9E82] transition-colors placeholder:text-[#bbb] text-right resize-none"
                      placeholder="ספרו לי במה אוכל לעזור..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#5A7A5A] text-white text-sm font-medium rounded-xl hover:bg-[#4A6A4A] transition-colors"
                  >
                    שלחו הודעה
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-[#2D3828] text-[#B0C0A8] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right">
          <div>
            <div className="text-white font-medium mb-1">כנפיים לעוף</div>
            <div className="text-xs text-[#8A9E82]">מרכז טיפולי-לימודי | גאולה אלון</div>
          </div>
          <div className="text-xs text-[#6A7E62]">
            כל הזכויות שמורות &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
