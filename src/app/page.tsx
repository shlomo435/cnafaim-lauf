'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import IntroAnimation from '../components/IntroAnimation';

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
// BRAND TOKENS — 60/30/10
// ======================
const C = {
  // 60% — Warm Alabaster (primary background)
  cream:       '#FDF8F5',
  creamAlt:    '#F7F0EB',
  creamDeep:   '#EDE3D6',
  // 30% — Deep Plum (headlines, buttons, footer)
  plum:        '#4A2C40',
  plumHover:   '#3D2235',
  // 10% — Muted Rose (icons, active links, accents only)
  rose:        '#D81B60',
  // Supporting text
  textDark:    '#4A2C40',
  textMid:     '#7A5A6A',
  textLight:   '#9A7A8A',
  // Structural
  border:      '#E5D5D0',
  borderLight: '#EDE6DC',
};

// ======================
// SHARED COMPONENTS
// ======================

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center md:justify-end mb-3 md:mb-4">
      <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.rose }}>
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
    <div
      className={`w-12 h-px mt-4 mb-6 ${className}`}
      style={{ backgroundColor: C.border }}
    />
  );
}

function WavyDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-4 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 24" className="w-full max-w-lg h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,12 C40,3 80,21 120,12 C160,3 200,21 240,12 C280,3 320,21 360,12 C400,3 440,17 480,12"
          stroke="#E5D5D0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function RoseDot({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg
      className="w-2 h-2 flex-shrink-0"
      viewBox="0 0 8 8"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path d="M4 0.8L7.2 4L4 7.2L0.8 4L4 0.8Z" fill="#D81B60" />
    </svg>
  );
}

function CtaButton({
  href,
  children,
  className = '',
  block = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  block?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className={`text-sm font-medium text-center text-white transition-colors duration-200 rounded-md ${
        block ? 'block w-full py-3.5' : 'inline-block px-8 py-3.5'
      } ${className}`}
      style={{ backgroundColor: C.rose }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b5144f')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.rose)}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

// ======================
// SCROLL REVEAL HOOK
// ======================

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('sr-visible');
        }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.sr').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ======================
// FLOATING CONTACT BUTTON
// ======================

function FloatingContactButton() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {hovered && (
        <div
          className="px-3 py-1.5 rounded-md text-xs font-medium text-white shadow-md"
          style={{ backgroundColor: '#25D366', whiteSpace: 'nowrap' }}
        >
          שלחו הודעה ב-WhatsApp
        </div>
      )}
      <a
        href="https://wa.me/972502961213"
        id="floating-contact-btn"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
        style={{ backgroundColor: hovered ? '#1ebe5d' : '#25D366' }}
        aria-label="שלחו הודעה ב-WhatsApp"
        title="שלחו הודעה ב-WhatsApp"
      >
        {/* WhatsApp icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

// ======================
// SIDE DRAWER
// ======================

function SideDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    backgroundColor: C.creamAlt,
    borderColor: C.border,
    color: C.textDark,
  };
  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = C.rose;
    e.target.style.boxShadow = `0 0 0 3px rgba(216,27,96,0.1)`;
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = C.border;
    e.target.style.boxShadow = 'none';
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        style={{ animation: 'fadeInOverlay 0.2s ease forwards' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="fixed top-0 right-0 h-full w-80 z-50 flex flex-col text-right"
        dir="rtl"
        style={{
          backgroundColor: C.cream,
          borderLeft: `1px solid ${C.border}`,
          boxShadow: '-12px 0 48px rgba(74,44,64,0.12)',
          animation: 'slideInFromRight 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: C.border }}
        >
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
            style={{ color: C.textMid }}
            aria-label="סגור"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <h3 className="font-display text-lg font-medium" style={{ color: C.textDark }}>
              צרו קשר מהיר
            </h3>
            <p className="text-xs font-light" style={{ color: C.textLight }}>
              אשוב אליכם בהקדם האפשרי
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="w-10 h-px mb-6" style={{ backgroundColor: C.border }} />

          {sent ? (
            <div className="text-center py-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: C.plum }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display text-xl mb-1" style={{ color: C.textDark }}>
                ההודעה נשלחה!
              </p>
              <p className="text-sm font-light" style={{ color: C.textMid }}>
                אחזור אליך בהקדם.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: C.textMid }}>שם מלא</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="שמכם"
                  className="w-full px-4 py-2.5 rounded-md text-sm text-right focus:outline-none border transition-all"
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: C.textMid }}>טלפון</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="05X-XXXXXXX"
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-md text-sm focus:outline-none border transition-all"
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: C.textMid }}>הודעה קצרה</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="במה אוכל לעזור?"
                  className="w-full px-4 py-2.5 rounded-md text-sm text-right resize-none focus:outline-none border transition-all"
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-md text-white text-sm font-medium transition-colors duration-200"
                style={{ backgroundColor: C.rose }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b5144f')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.rose)}
              >
                שלחו הודעה
              </button>
            </form>
          )}
        </div>

        <div className="px-5 py-4 border-t text-center" style={{ borderColor: C.border }}>
          <a
            href="tel:0502961213"
            className="text-sm font-medium transition-colors"
            style={{ color: C.rose, direction: 'ltr' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.plum)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.rose)}
          >
            050-296-1213
          </a>
        </div>
      </aside>
    </>
  );
}

// ======================
// MODAL
// ======================

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border pointer-events-auto"
          dir="rtl"
          role="dialog"
          aria-modal="true"
          style={{
            backgroundColor: C.cream,
            borderColor: C.border,
            boxShadow: '0 24px 80px rgba(74,44,64,0.22)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/8 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#D81B60] z-10"
            style={{ color: C.textMid }}
            aria-label="סגור"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-6 md:p-8 pt-10">{children}</div>
        </div>
      </div>
    </>
  );
}

function EmrModalContent() {
  return (
    <div className="text-right">
      <h3 className="font-display text-2xl font-medium mb-5" style={{ color: C.plum, letterSpacing: '-0.02em' }}>
        EMR — עיבוד תנועות עיניים
      </h3>
      <video controls className="w-full rounded-xl shadow-md mb-6" src="/emr_video1.mp4">
        הדפדפן שלך אינו תומך בתג הווידאו.
      </video>
      <div className="space-y-4 text-[1.05rem] font-light leading-[1.8]" style={{ color: C.textMid }}>
        <p className="mb-4">
          <strong style={{ color: C.plum }}>אז איך נראה מפגש טיפול בתנועות עיניים EMR?</strong>
        </p>
        <p className="mb-4">
          <strong style={{ color: C.plum }}>במפגש EMR</strong> המטפל מוביל את המטופל בשיח טיפולי שבו המטופל משתף על אתגרים רגשיים או קונקרטיים בחייו.
        </p>
        <p className="mb-4">
          במהלך השיחה המטפל מתבונן בתנועות העיניים ויודע לזהות מתי המטופל מתחבר למצוקה רגשית אמיתית, גם אם היא עדיין לא נאמרת במילים.
        </p>
        <p className="mb-4">
          בשלב הזה <strong style={{ color: C.plum }}>המטפל יוביל</strong> את המטופל להתחבר לזיכרון מטריד או כואב, ויבצע תנועות עיניים שמאפשרות עיבוד ושחרור של הזיכרון.
        </p>
        <p className="mb-4">
          תוך כדי התהליך עשויות <strong style={{ color: C.plum }}>לעלות התנגדויות</strong> הצפות רגשיות וזיכרונות נוספים. מטפל מיומן יודע לזהות את המתרחש בזמן אמת, לווסת, ולעבוד בצורה מדויקת ובטוחה.
        </p>
        <p className="mb-4">
          <strong style={{ color: C.plum }}>אבל זה לא הכול.</strong>
        </p>
        <p className="mb-4">
          <strong style={{ color: C.plum }}>מטפל EMR מיומן</strong> יודע להוביל את המטופל גם לשחרור של מנגנוני הגנה ודפוסי התנהגות שכבר אינם מועילים לו, דפוסים שנבנו בעבר מתוך צורך, חוסר אונים או הישרדות.
        </p>
        <img
          src="/image_32.jpg"
          alt="המחשה לתהליך EMR"
          className="rounded-xl shadow-sm mb-6 max-w-full h-auto"
        />
        <p className="mb-4">
          <strong style={{ color: C.plum }}>לדוגמה</strong>, ילדה שלא ראו אותה ולא קיבלה יחס רגשי למדה שכאשר היא כועסת היא מקבלת מענה. הכעס אמנם פוגע בהמשך במערכות יחסים, אבל בילדות זו הייתה אסטרטגיה שעבדה, ולכן היא נשמרה באופן לא מודע גם בבגרות.
        </p>
        <p className="mb-4">
          <strong style={{ color: C.plum }}>בטיפול EMR</strong> ניתן להגיע במהירות לכאב הראשוני שבו נוצר הדפוס הזה, ולשחרר אותו באמצעות תנועות עיניים ותשאול מדויק. כאשר המקום הזה מתרפא, הצורך בדפוס ההגנתי פשוט נחלש או נעלם.
        </p>
        <p>
          כך נוצר שינוי עמוק, לא דרך מאבק בהתנהגות, אלא דרך ריפוי המקום שממנו היא נולדה.
        </p>
      </div>
    </div>
  );
}

// ======================
// MAIN PAGE
// ======================

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useScrollReveal();

  const focusStyle = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = C.rose;
      e.target.style.boxShadow = `0 0 0 3px rgba(216,27,96,0.1)`;
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

      {/* ===== INTRO ANIMATION ===== */}
      <IntroAnimation />

      {/* ===== FLOATING CONTACT BUTTON ===== */}
      <FloatingContactButton />

      {/* ===== SIDE DRAWER ===== */}
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* ===== EXPERTISE MODAL ===== */}
      {activeModal && (
        <Modal onClose={() => setActiveModal(null)}>
          {activeModal === 'emr' && <EmrModalContent />}
          {activeModal === 'cbt' && (
            <div className="text-right">
              <h3 className="font-display text-2xl font-medium mb-4" style={{ color: C.plum, letterSpacing: '-0.02em' }}>
                CBT — טיפול קוגניטיבי-התנהגותי
              </h3>
              <p className="text-[1.05rem] font-light leading-[1.8]" style={{ color: C.textMid }}>
                טיפול קוגניטיבי-התנהגותי המסייע לזהות ולשנות דפוסי חשיבה והתנהגות שליליים המגבילים את איכות החיים.
              </p>
            </div>
          )}
          {activeModal === 'nlp' && (
            <div className="text-right">
              <h3 className="font-display text-2xl font-medium mb-4" style={{ color: C.plum, letterSpacing: '-0.02em' }}>
                NLP — תכנות נוירו-לשוני
              </h3>
              <p className="text-[1.05rem] font-light leading-[1.8]" style={{ color: C.textMid }}>
                תכנות נוירו-לשוני המאפשר שינוי דפוסים מנטליים ורגשיים לשיפור יכולות, ביטחון עצמי ותקשורת.
              </p>
            </div>
          )}
        </Modal>
      )}

      {/* ===== HEADER ===== */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(253,248,245,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-[72px] flex items-center justify-between">
          <a href="#" className="flex items-center flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="כנפיים לעוף"
              className="h-11 md:h-14 w-auto object-contain"
              style={{ maxWidth: 148, mixBlendMode: 'multiply' }}
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
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.rose)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.textMid)}
                  >
                    {label}
                  </a>
                );
              }
            )}
          </nav>

          <div className="flex items-center gap-3">
            <CtaButton href="#contact" className="hidden md:inline-block px-5 py-2 text-xs">
              לתיאום פגישה
            </CtaButton>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-md transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#D81B60]"
              style={{ color: C.textDark }}
              aria-label={mobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t"
            style={{ backgroundColor: 'rgba(253,248,245,0.99)', borderColor: C.borderLight }}
          >
            <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col text-right">
              {(['אודות', 'תחומי טיפול', 'קלפים טיפוליים', 'הגישה שלי', 'יצירת קשר'] as const).map(
                (label, i) => {
                  const hrefs = ['#about', '#services', '#cards', '#approach', '#contact'];
                  return (
                    <a
                      key={label}
                      href={hrefs[i]}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 text-sm font-medium border-b last:border-b-0 transition-colors"
                      style={{ color: C.textDark, borderColor: C.borderLight }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.rose)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = C.textDark)}
                    >
                      {label}
                    </a>
                  );
                }
              )}
              <div className="pt-3 pb-2">
                <CtaButton href="#contact" block onClick={() => setMobileMenuOpen(false)}>
                  לתיאום פגישה
                </CtaButton>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Subtle warm panel on the portrait side */}
        <div
          className="absolute top-0 right-0 h-full -z-10"
          style={{
            width: '48%',
            backgroundColor: C.creamAlt,
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-24 md:pb-36 flex flex-col md:flex-row items-center gap-8 md:gap-14">

          {/* Text block */}
          <div className="flex-1 text-center md:text-right w-full relative" style={{ zIndex: 10 }}>
            <p
              className="text-xs font-semibold tracking-[0.22em] uppercase mb-5"
              style={{ color: C.rose }}
            >
              מרכז טיפולי-לימודי
            </p>

            <h1
              className="font-display text-[3.6rem] sm:text-[4.8rem] md:text-[6rem] lg:text-[7.5rem] font-light leading-[1.0]"
              style={{ color: C.plum, letterSpacing: '-0.02em' }}
            >
              כנפיים
              <br />
              לעוף
            </h1>

            <div className="w-16 h-px my-6 mx-auto md:mx-0" style={{ backgroundColor: C.border }} />

            <p
              className="text-lg md:text-xl font-light leading-[1.8] mb-8 md:mb-10 mx-auto md:mx-0"
              style={{ color: C.textMid, maxWidth: '28rem' }}
            >
              <span className="block">ליווי לצמיחה, חיזוק וחיבור עצמי</span>
              <span className="block">לילדים, נערות ונשים</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-end">
              <CtaButton href="#contact">לתיאום שיחת היכרות</CtaButton>
              <a
                href="#services"
                className="px-8 py-3.5 rounded-md text-sm font-medium text-center transition-all border"
                style={{ borderColor: C.border, color: C.textMid, backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = C.creamAlt;
                  e.currentTarget.style.borderColor = C.plum;
                  e.currentTarget.style.color = C.plum;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.color = C.textMid;
                }}
              >
                תחומי הטיפול
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-8 md:mt-10 flex flex-wrap gap-2 justify-center md:justify-end">
              {['+20 שנות ניסיון', 'CBT מוסמכת', 'EMR מוסמכת', 'NLP מוסמכת', 'בעלת תואר שני בחינוך'].map(
                (label) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs border"
                    style={{
                      borderColor: C.borderLight,
                      color: C.textMid,
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      lineHeight: '1.6',
                    }}
                  >
                    <RoseDot />
                    {label}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Portrait */}
          <div className="flex-shrink-0 relative mt-16 md:mt-0">
            <div
              className="relative w-60 h-[320px] sm:w-72 sm:h-[400px] md:w-80 md:h-[460px] rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${C.borderLight}`,
                boxShadow: '0 4px 32px rgba(74,44,64,0.1), 0 1px 4px rgba(74,44,64,0.05)',
              }}
            >
              <img
                src="/founder_portrait.jpg"
                alt="גאולה אלון"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Credentials pill — top left */}
            <div
              className="absolute -top-3 -left-3 md:-top-4 md:-left-5 px-3.5 py-2 rounded-md border shadow-sm"
              style={{ backgroundColor: C.cream, borderColor: C.border }}
            >
              <div className="text-[0.6rem] font-light mb-0.5" style={{ color: C.textLight }}>
                מוסמכת ב
              </div>
              <div className="text-xs font-semibold" style={{ color: C.plum }}>
                CBT · EMR · NLP
              </div>
            </div>

            {/* Years badge — bottom left */}
            <div
              className="absolute -bottom-3 -left-3 md:-left-8 px-4 py-3 rounded-md text-center"
              style={{
                backgroundColor: C.plum,
                color: 'white',
                boxShadow: '0 4px 20px rgba(74,44,64,0.3)',
              }}
            >
              <div className="font-display text-2xl font-semibold leading-none">+20</div>
              <div className="text-[0.6rem] font-light opacity-80 mt-0.5">שנות ניסיון</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionDivider />
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Images column */}
          <div className="relative order-2 md:order-1 sr sr-d1">
            <div
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 2px 20px rgba(74,44,64,0.08)' }}
            >
              <img
                src="/founder_speaking.jpg"
                alt="גאולה אלון בהרצאה"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div
              className="hidden md:block absolute -bottom-6 -left-4 w-44 aspect-video rounded-xl overflow-hidden border-2"
              style={{
                borderColor: C.cream,
                boxShadow: '0 4px 20px rgba(74,44,64,0.12)',
              }}
            >
              <img
                src="/conference_audience.jpg"
                alt="קהל בהרצאה"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Text column */}
          <div className="text-center md:text-right order-1 md:order-2 sr sr-d2">
            <SectionLabel text="אודות" />
            <h2
              className="font-display text-4xl md:text-5xl font-light"
              style={{ color: C.plum, letterSpacing: '-0.02em' }}
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
                { num: 'CBT', label: 'טיפול קוגניטיבי' },
                { num: 'NLP', label: 'נוירו-לשוני' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md py-4 px-2 border"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
                >
                  <div className="font-display text-2xl font-semibold" style={{ color: C.plum }}>
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

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <WavyDivider />
      </div>

      {/* ===== METHODS & EXPERTISE ===== */}
      <section id="methods" className="py-10 md:py-12" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center md:text-right mb-10 sr">
            <SectionLabel text="גישה טיפולית" />
            <h2
              className="font-display text-4xl md:text-5xl font-light"
              style={{ color: C.plum, letterSpacing: '-0.02em' }}
            >
              הגישה הטיפולית ותחומי המומחיות
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-14">

            {/* Methods column */}
            <div className="text-right sr sr-d1">
              <Rule className="mx-auto md:mx-0" />
              <p className="text-[1.05rem] font-light leading-[1.8] mb-5" style={{ color: C.textMid }}>
                במסגרת הטיפול, המטופל מקבל שילוב מדויק של מגוון כלים מתקדמים, המותאמים אישית לתוצאה האפקטיבית ביותר:
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    method: 'CBT',
                    label: 'קוגניטיבי-התנהגותי',
                    desc: 'זיהוי ושינוי דפוסי חשיבה והתנהגות שליליים המגבילים את איכות החיים.',
                    modalKey: 'cbt',
                  },
                  {
                    method: 'EMR',
                    label: 'עיבוד תנועות עיניים',
                    desc: 'עיבוד רגשי ותנועות עיניים לטיפול בטראומה, חרדות ומצוקה רגשית עמוקה.',
                    modalKey: 'emr',
                  },
                  {
                    method: 'NLP',
                    label: 'תכנות נוירו-לשוני',
                    desc: 'שינוי דפוסים מנטליים ורגשיים לשיפור יכולות, ביטחון עצמי ותקשורת.',
                    modalKey: 'nlp',
                  },
                ].map(({ method, label, desc, modalKey }) => (
                  <div
                    key={method}
                    className="rounded-xl p-4 border text-right cursor-pointer transition-all duration-200 hover:scale-105 flex flex-col"
                    style={{ backgroundColor: C.cream, borderColor: C.border }}
                    onClick={() => setActiveModal(modalKey)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveModal(modalKey); }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.plum;
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(74,44,64,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={`פרטים על ${method}`}
                  >
                    <div className="font-display text-2xl font-semibold mb-1" style={{ color: C.plum }}>{method}</div>
                    <div className="text-[0.65rem] font-semibold tracking-wide uppercase mb-2.5" style={{ color: C.rose }}>{label}</div>
                    <p className="text-xs leading-[1.7] font-light flex-1" style={{ color: C.textMid }}>{desc}</p>
                    <div className="mt-3 text-xs font-medium" style={{ color: C.rose }}>לפרטים ←</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise column */}
            <div className="text-right sr sr-d2">
              <Rule className="mx-auto md:mx-0" />
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
                    className="flex items-center gap-3 rounded-xl px-4 py-3 border"
                    style={{ backgroundColor: C.cream, borderColor: C.border }}
                  >
                    <RoseDot />
                    <span className="text-sm font-light" style={{ color: C.textMid, lineHeight: '1.7' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-8 md:mt-10 rounded-md p-6 md:p-8 text-right border sr"
            style={{ backgroundColor: C.cream, borderColor: C.border }}
          >
            <p className="text-[1.05rem] font-light leading-[1.8]" style={{ color: C.textMid }}>
              המרכז שם דגש על עבודה בשיתוף ההורים, הקשבה עמוקה, בניית אמון, ומתן כלים פרקטיים ליום-יום — כדי שהשינוי לא יישאר רק בחדר הטיפול, אלא ילווה גם את החיים עצמם.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-10 md:py-12" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center md:text-right mb-8 md:mb-12 sr">
            <SectionLabel text="תחומי טיפול" />
            <h2
              className="font-display text-4xl md:text-5xl font-light"
              style={{ color: C.plum, letterSpacing: '-0.02em' }}
            >
              במה אני יכולה לעזור
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`sr sr-d${Math.min(i + 1, 5) as 1|2|3|4|5} group relative rounded-md p-6 md:p-8 text-right border transition-all duration-200 ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ backgroundColor: C.cream, borderColor: C.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.plum;
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(74,44,64,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-8 h-px mb-5 transition-all duration-300 group-hover:w-14"
                  style={{ backgroundColor: C.rose, opacity: 0.5 }}
                />
                <h3
                  className="font-display text-xl font-medium mb-2.5"
                  style={{ color: C.plum, letterSpacing: '-0.02em' }}
                >
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
      <section id="lectures" className="py-10 md:py-12" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* Image column */}
            <div className="relative order-2 md:order-1 sr sr-d1">
              <div
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 2px 20px rgba(74,44,64,0.08)' }}
              >
                <img
                  src="/conference_audience.jpg"
                  alt="הרצאות והדרכות"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Text column */}
            <div className="text-center md:text-right order-1 md:order-2 sr sr-d2">
              <SectionLabel text="הרצאות והדרכות" />
              <h2
                className="font-display text-3xl md:text-4xl font-light leading-snug"
                style={{ color: C.plum, letterSpacing: '-0.02em' }}
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
                <p
                  className="text-sm font-semibold mb-4 text-center md:text-right"
                  style={{ color: C.plum }}
                >
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
                    <li key={item} className="flex items-center gap-3 justify-center md:justify-end">
                      <span className="text-sm font-light text-right" style={{ color: C.textMid, lineHeight: '1.7' }}>{item}</span>
                      <RoseDot opacity={0.65} />
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
      <section id="cards" className="py-10 md:py-12" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          <div className="text-center md:text-right mb-8 md:mb-12 sr">
            <SectionLabel text="קלפים טיפוליים" />
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-snug"
              style={{ color: C.plum, letterSpacing: '-0.02em' }}
            >
              קלפים שמדליקים אור בכל ילד
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* Cards image */}
            <div className="relative flex flex-col items-center gap-6 order-2 md:order-1 sr sr-d1">
              <div
                className="relative w-full max-w-[340px] rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${C.borderLight}`,
                  boxShadow: '0 4px 28px rgba(74,44,64,0.08)',
                }}
              >
                <img
                  src="/therapy_cards_box.jpg"
                  alt="קלפי ניצוץ"
                  className="w-full h-auto object-cover object-top"
                />
              </div>
              <CtaButton href="#contact">לפרטים ורכישה</CtaButton>
            </div>

            {/* Cards text */}
            <div className="text-center md:text-right order-1 md:order-2 sr sr-d2">
              <Rule className="mx-auto md:mx-0" />
              <div className="space-y-5 font-light leading-[1.8] text-[1.05rem]" style={{ color: C.textMid }}>
                <p>
                  קלפי "ניצוץ" נוצרו כדי לתת לכל ילד מרחב בטוח לביטוי עצמי. כל קלף
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
                  { title: 'ביטוי עצמי', subtitle: 'מרחב בטוח לעיבוד רגשות' },
                  { title: 'קשר הורי', subtitle: 'גשר תקשורת ואמון' },
                  { title: 'דיאלוג פתוח', subtitle: 'שיחות משמעותיות בבית' },
                  { title: 'עמידות רגשית', subtitle: 'ביטחון עצמי וחוסן' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-md p-4 text-right border transition-colors duration-200"
                    style={{ backgroundColor: C.cream, borderColor: C.border }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.plum; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
                  >
                    <div className="text-base font-semibold mb-0.5" style={{ color: C.plum }}>
                      {item.title}
                    </div>
                    <div className="text-xs font-light" style={{ color: C.textLight }}>
                      {item.subtitle}
                    </div>
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
      <section id="approach" className="py-10 md:py-12" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center md:text-right mb-8 md:mb-12 sr">
            <SectionLabel text="הגישה שלי" />
            <h2
              className="font-display text-4xl md:text-5xl font-light"
              style={{ color: C.plum, letterSpacing: '-0.02em' }}
            >
              מה מייחד את המרכז
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((feature, i) => (
              <Link
                key={feature.title}
                href={`/features/${feature.slug}`}
                className={`sr sr-d${Math.min(i + 1, 5) as 1|2|3|4|5} group rounded-md p-5 text-right border transition-all duration-200 block`}
                style={{ backgroundColor: C.cream, borderColor: C.border, textDecoration: 'none' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.plum;
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(74,44,64,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
                  style={{ color: C.plum, letterSpacing: '-0.01em' }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs leading-[1.8] font-light" style={{ color: C.textMid }}>
                  {feature.description}
                </p>
                <p className="text-xs mt-3 font-medium" style={{ color: C.rose }}>
                  קראו עוד &larr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-10 md:py-12" style={{ backgroundColor: C.creamAlt }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-start">

            {/* Contact info */}
            <div className="md:col-span-2 text-center md:text-right sr sr-d1">
              <SectionLabel text="יצירת קשר" />
              <h2
                className="font-display text-3xl md:text-4xl font-light mb-4 md:mb-6 leading-snug"
                style={{ color: C.plum, letterSpacing: '-0.02em' }}
              >
                מוזמנים לפנות
              </h2>
              <p className="font-light leading-[1.8] mb-6 md:mb-8 text-[1.05rem]" style={{ color: C.textMid }}>
                לשאלות, מידע נוסף או תיאום שיחת היכרות,
                אני כאן. כל פניה מטופלת בדיסקרטיות ובמהירות.
              </p>
              <div className="space-y-4 md:space-y-5 text-sm">
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: C.rose }}
                  >
                    טלפון
                  </span>
                  <a
                    href="tel:0502961213"
                    className="font-light transition-colors"
                    style={{ color: C.textDark, direction: 'ltr' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.rose)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.textDark)}
                  >
                    050-296-1213
                  </a>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: C.rose }}
                  >
                    אימייל
                  </span>
                  <a
                    href="mailto:gehulaa@gmail.com"
                    className="font-light transition-colors"
                    style={{ color: C.textDark, direction: 'ltr' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.rose)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.textDark)}
                  >
                    gehulaa@gmail.com
                  </a>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: C.rose }}
                  >
                    מיקום
                  </span>
                  <span className="font-light" style={{ color: C.textDark }}>ישראל</span>
                  <span className="text-sm font-medium leading-relaxed mt-1" style={{ color: C.plum }}>
                    קיימת אפשרות לטיפולים מרחוק באמצעות פגישות Zoom.
                  </span>
                </div>
                <div className="h-px" style={{ backgroundColor: C.border }} />
                <div className="flex flex-col text-center md:text-right gap-1.5">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: C.rose }}
                  >
                    שעות פעילות
                  </span>
                  <span className="font-light" style={{ color: C.textDark }}>
                    ראשון עד חמישי, 09:00 עד 18:00
                  </span>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div
              className="md:col-span-3 rounded-md p-5 md:p-7 border sr sr-d2"
              style={{
                backgroundColor: C.cream,
                borderColor: C.border,
                boxShadow: '0 1px 8px rgba(74,44,64,0.05)',
              }}
            >
              {submitted ? (
                <div className="py-14 text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: C.plum }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="font-display text-2xl font-light mb-2"
                    style={{ color: C.plum, letterSpacing: '-0.02em' }}
                  >
                    ההודעה נשלחה
                  </h3>
                  <p className="text-sm font-light" style={{ color: C.textMid }}>
                    אחזור אליך בהקדם. תודה על הפנייה.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 text-right">
                      <label className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
                        שם מלא
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-md text-sm text-right focus:outline-none transition-all border"
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
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-md text-sm focus:outline-none transition-all border"
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
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-md text-sm text-right appearance-none focus:outline-none transition-all border"
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
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-md text-sm text-right resize-none focus:outline-none transition-all border"
                      style={inputBase}
                      {...focusStyle}
                      placeholder="ספרו לי במה אוכל לעזור..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-md text-white text-sm font-medium transition-colors duration-200"
                    style={{ backgroundColor: C.plum }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.plumHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.plum)}
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
      <footer className="py-6 md:py-8" style={{ backgroundColor: C.plum }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-right">
          <a href="#" className="flex items-center flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="כנפיים לעוף"
              className="h-14 w-auto object-contain"
              style={{ maxWidth: 160, mixBlendMode: 'screen', opacity: 0.9 }}
            />
          </a>
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>
              מרכז טיפולי-לימודי | גאולה אלון
            </div>
            <div className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
              כל הזכויות שמורות &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
