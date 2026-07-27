'use client';

import { useState } from 'react';
import { C } from '../lib/tokens';

const SUBJECT_LABELS: Record<string, string> = {
  child:   'טיפול בילד / נערה',
  adult:   'טיפול למבוגרת',
  learning:'קשיי למידה',
  anxiety: 'חרדה ורגש',
  cards:   'קלפים טיפוליים',
  info:    'מידע כללי',
};

const inputClass =
  'w-full px-4 py-3 rounded-md text-sm text-right border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B8C] focus-visible:ring-offset-1';

const inputStyle = {
  backgroundColor: C.creamAlt,
  borderColor:     C.border,
  color:           C.textDark,
};

export default function ContactFormClient() {
  const [form,      setForm]      = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormError('');
    const subjectLabel = SUBJECT_LABELS[form.subject] || form.subject;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
          name:       form.name,
          phone:      form.phone,
          subject:    `פנייה מהאתר - ${subjectLabel}`,
          message:    form.message,
          from_name:  'אתר כנפיים לעוף',
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || `HTTP ${res.status}`);
      setForm({ name: '', phone: '', subject: '', message: '' });
      setSubmitted(true);
    } catch (err) {
      console.error('Web3Forms error (contact):', err);
      setFormError('אירעה שגיאה בשליחה. אנא נסו שוב או פנו בטלפון.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="md:col-span-3 rounded-xl p-5 md:p-7 border sr sr-d2"
      style={{
        backgroundColor: C.cream,
        borderColor:     C.border,
        boxShadow:       '0 1px 8px rgba(57,73,171,0.05)',
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
            style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
          >
            ההודעה נשלחה
          </h3>
          <p className="text-sm font-light" style={{ color: C.textMid }}>
            אחזור אליך בהקדם. תודה על הפנייה.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 text-right">
              <label htmlFor="contactName" className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
                שם מלא
              </label>
              <input
                id="contactName"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                style={inputStyle}
                placeholder="שם מלא"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-right">
              <label htmlFor="contactPhone" className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
                טלפון
              </label>
              <input
                id="contactPhone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                style={inputStyle}
                placeholder="05X-XXXXXXX"
                dir="ltr"
              />
            </div>
          </div>

          {/* Subject select with custom dropdown arrow (Fix 15) */}
          <div className="flex flex-col gap-1.5 text-right">
            <label htmlFor="contactSubject" className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
              נושא הפנייה
            </label>
            <div className="relative">
              <select
                id="contactSubject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={`${inputClass} appearance-none`}
                style={inputStyle}
              >
                <option value="" disabled>בחרו נושא</option>
                {Object.entries(SUBJECT_LABELS).map(([val, lbl]) => (
                  <option key={val} value={val}>{lbl}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textLight }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-right">
            <label htmlFor="contactMessage" className="text-xs font-semibold tracking-wide" style={{ color: C.textMid }}>
              הודעה
            </label>
            <textarea
              id="contactMessage"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
              style={inputStyle}
              placeholder="ספרו לי במה אוכל לעזור..."
            />
          </div>

          {formError && (
            <p className="text-xs text-center" style={{ color: '#e11d48' }}>{formError}</p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3.5 rounded-md text-white text-sm font-medium transition-colors duration-200 bg-[#3949AB] hover:bg-[#3949AB] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {sending ? 'שולח...' : 'שלחו הודעה'}
          </button>
        </form>
      )}
    </div>
  );
}
