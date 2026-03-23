'use client';

import { useState, useEffect } from 'react';

const PLUM      = '#4A2C40';
const PLUM_DARK = '#3D2235';
const PLUM_LIGHT = '#F7F0EB';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [readableFont, setReadableFont] = useState(false);
  const [contrast, setContrast] = useState(0);

  useEffect(() => {
    try {
      const savedFont = localStorage.getItem('a11y-readable-font') === 'true';
      const savedContrast = parseInt(localStorage.getItem('a11y-contrast') || '0', 10);
      setReadableFont(savedFont);
      setContrast(isNaN(savedContrast) ? 0 : Math.min(3, Math.max(0, savedContrast)));
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (readableFont) {
      html.classList.add('a11y-readable-font');
    } else {
      html.classList.remove('a11y-readable-font');
    }
    try { localStorage.setItem('a11y-readable-font', String(readableFont)); } catch { /* noop */ }
  }, [readableFont]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('a11y-contrast-1', 'a11y-contrast-2', 'a11y-contrast-3');
    if (contrast > 0) {
      html.classList.add(`a11y-contrast-${contrast}`);
    }
    try { localStorage.setItem('a11y-contrast', String(contrast)); } catch { /* noop */ }
  }, [contrast]);

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start"
      dir="rtl"
    >
      {/* Expandable Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="תפריט נגישות"
          aria-modal="false"
          style={{
            width: 284,
            marginBottom: 12,
            borderRadius: 12,
            overflow: 'hidden',
            background: '#fff',
            border: '1px solid #E5D5D0',
            boxShadow: '0 8px 32px rgba(74,44,64,0.14)',
          }}
        >
          {/* Header */}
          <div style={{ background: PLUM, padding: '16px 20px' }}>
            <div
              style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                fontFamily: 'var(--font-assistant), sans-serif',
              }}
            >
              תפריט נגישות
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 12,
                marginTop: 3,
                fontFamily: 'var(--font-assistant), sans-serif',
              }}
            >
              המרכז הלימודי טיפולי כנפיים לעוף
            </div>
          </div>

          {/* Controls */}
          <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Readable Font Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: PLUM_LIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <text
                      x="4"
                      y="18"
                      fontSize="17"
                      fontWeight="700"
                      fill={PLUM}
                      fontFamily="serif"
                    >
                      A
                    </text>
                    <line x1="3" y1="21" x2="21" y2="21" stroke={PLUM} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="21" x2="9" y2="8" stroke={PLUM} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#3a1a2a',
                    fontFamily: 'var(--font-assistant), sans-serif',
                  }}
                >
                  גופן קריא
                </span>
              </div>

              {/* Toggle Switch */}
              <button
                role="switch"
                aria-checked={readableFont}
                aria-label="הפעל גופן קריא"
                onClick={() => setReadableFont((v) => !v)}
                style={{
                  width: 46,
                  height: 26,
                  borderRadius: 13,
                  background: readableFont ? PLUM : '#D1D5DB',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.22s',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 3,
                    left: readableFont ? 23 : 3,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.22s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }}
                />
              </button>
            </div>

            {/* Contrast Row */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: PLUM_LIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke={PLUM} strokeWidth="1.6" fill="none" />
                    <path d="M12 3 A9 9 0 0 1 12 21 Z" fill={PLUM} />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#3a1a2a',
                    fontFamily: 'var(--font-assistant), sans-serif',
                  }}
                >
                  ניגודיות
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value, 10))}
                aria-label="רמת ניגודיות"
                aria-valuemin={0}
                aria-valuemax={3}
                aria-valuenow={contrast}
                style={{
                  width: '100%',
                  accentColor: PLUM,
                  cursor: 'pointer',
                  height: 6,
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#9CA3AF',
                  marginTop: 6,
                  fontFamily: 'var(--font-assistant), sans-serif',
                }}
              >
                <span>רגיל</span>
                <span>גבוה</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="פתח תפריט נגישות"
        style={{
          background: isOpen ? PLUM_DARK : PLUM,
          borderRadius: 9999,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 13px 7px 10px',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          boxShadow: '0 3px 12px rgba(74,44,64,0.28)',
          transition: 'background 0.2s, box-shadow 0.2s',
          fontFamily: 'var(--font-assistant), sans-serif',
          userSelect: 'none',
        }}
      >
        {/* Accessibility figure icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="4.5" r="2" fill="white" />
          <line x1="12" y1="7.5" x2="12" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="5.5" y1="10.5" x2="18.5" y2="10.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="14" x2="8.5" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="14" x2="15.5" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        נגישות
      </button>
    </div>
  );
}
