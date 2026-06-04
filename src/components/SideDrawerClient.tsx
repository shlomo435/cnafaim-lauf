'use client';

import { useState, useEffect, useRef } from 'react';
import { C } from '../lib/tokens';

const FOCUSABLE_SELECTORS = 'input, select, textarea, button, a[href]';

export default function SideDrawerClient() {
  const [isOpen,  setIsOpen]  = useState(false);
  const [form,    setForm]    = useState({ name: '', phone: '', message: '' });
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState('');

  const drawerRef    = useRef<HTMLElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Fix 19: Auto-focus first input + ESC to close + Tab focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Auto-focus the name input once the CSS transition has had a frame to start
    const raf = requestAnimationFrame(() => firstInputRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key !== 'Tab' || !drawerRef.current) return;

      const focusableEls = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      ).filter((el) => !(el as HTMLButtonElement | HTMLInputElement).disabled);

      if (focusableEls.length === 0) return;

      const first = focusableEls[0];
      const last  = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(raf);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
          name:       form.name,
          phone:      form.phone,
          subject:    'פנייה מהירה מהאתר – כנפיים לעוף',
          message:    form.message,
          from_name:  'אתר כנפיים לעוף',
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || `HTTP ${res.status}`);
      setForm({ name: '', phone: '', message: '' });
      setSent(true);
    } catch (err) {
      console.error('Web3Forms error (drawer):', err);
      setError('אירעה שגיאה בשליחה. אנא נסו שוב או פנו בטלפון.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating trigger button - above the WhatsApp button */}
      <div className="fixed bottom-24 right-6 z-[9998]">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="פתח טופס יצירת קשר מהיר"
          aria-expanded={isOpen}
          aria-controls="side-drawer"
          title="צרו קשר מהיר"
          className="w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D81B8C]"
          style={{ backgroundColor: C.plum }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </button>
      </div>

      {/* Fix 18: Overlay - always in DOM, shown/hidden via CSS opacity + pointer-events */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Fix 18: Drawer panel - always in DOM, slid in/out via CSS transform */}
      <aside
        id="side-drawer"
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 z-50 flex flex-col text-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-label="טופס יצירת קשר מהיר"
        aria-hidden={!isOpen}
        style={{
          backgroundColor: C.cream,
          borderLeft:      `1px solid ${C.border}`,
          boxShadow:       '-12px 0 48px rgba(57,73,171,0.12)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: C.border }}>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B8C]"
            style={{ color: C.textMid }}
            aria-label="סגור"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <h3 className="font-display text-lg font-medium" style={{ color: C.textDark }}>צרו קשר מהיר</h3>
            <p className="text-xs font-light" style={{ color: C.textLight }}>אשוב אליכם בהקדם האפשרי</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="w-10 h-px mb-6" style={{ backgroundColor: C.border }} />

          {sent ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: C.plum }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display text-xl mb-1" style={{ color: C.textDark }}>ההודעה נשלחה!</p>
              <p className="text-sm font-light" style={{ color: C.textMid }}>אחזור אליך בהקדם.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawerName" className="text-xs font-semibold" style={{ color: C.textMid }}>שם מלא</label>
                <input
                  id="drawerName"
                  ref={firstInputRef}
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="שמכם"
                  className="w-full px-4 py-2.5 rounded-md text-sm text-right border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B8C] focus-visible:ring-offset-1"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border, color: C.textDark }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawerPhone" className="text-xs font-semibold" style={{ color: C.textMid }}>טלפון</label>
                <input
                  id="drawerPhone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="05X-XXXXXXX"
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-md text-sm border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B8C] focus-visible:ring-offset-1"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border, color: C.textDark }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawerMessage" className="text-xs font-semibold" style={{ color: C.textMid }}>הודעה קצרה</label>
                <textarea
                  id="drawerMessage"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="במה אוכל לעזור?"
                  className="w-full px-4 py-2.5 rounded-md text-sm text-right resize-none border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B8C] focus-visible:ring-offset-1"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border, color: C.textDark }}
                />
              </div>
              {error && <p className="text-xs text-center" style={{ color: '#e11d48' }}>{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-md text-white text-sm font-medium transition-colors duration-200 bg-[#D81B8C] hover:bg-[#AD1457] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {sending ? 'שולח...' : 'שלחו הודעה'}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t text-center" style={{ borderColor: C.border }}>
          <a
            href="tel:0502961213"
            className="text-sm font-medium transition-colors text-[#D81B8C] hover:text-[#3949AB]"
            style={{ direction: 'ltr' }}
          >
            050-296-1213
          </a>
        </div>
      </aside>
    </>
  );
}
