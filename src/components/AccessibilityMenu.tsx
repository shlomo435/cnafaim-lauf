'use client';

import React, { useState, useEffect } from 'react';

const BLUE = '#1A6FA8';
const BLUE_DARK = '#145A8C';
const BLUE_LIGHT = '#E8F3FC';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [readableFont, setReadableFont] = useState(false);
  const [contrast, setContrast] = useState(0);

  // Load saved preferences
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

  // Apply readable font class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (readableFont) {
      html.classList.add('a11y-readable-font');
    } else {
      html.classList.remove('a11y-readable-font');
    }
    try { localStorage.setItem('a11y-readable-font', String(readableFont)); } catch { /* noop */ }
  }, [readableFont]);

  // Apply contrast level class to html element
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
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
            border: '1px solid #dde9f5',
            boxShadow: '0 8px 32px rgba(26,111,168,0.18)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: BLUE,
              padding: '16px 20px',
            }}
          >
            <div
              style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                fontFamily: 'var(--font-assistant), sans-serif',
              }}
            >
              תפריט נגישות
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.75)',
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
                {/* Font Icon */}
                <div
                  aria-hidden="true"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: BLUE_LIGHT,
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
                      fill={BLUE}
                      fontFamily="serif"
                    >
                      A
                    </text>
                    <line x1="3" y1="21" x2="21" y2="21" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="21" x2="9" y2="8" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#1a2a3a',
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
                  background: readableFont ? BLUE : '#D1D5DB',
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
                    boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
                  }}
                />
              </button>
            </div>

            {/* Contrast Row */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                {/* Contrast Icon */}
                <div
                  aria-hidden="true"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: BLUE_LIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke={BLUE} strokeWidth="1.6" fill="none" />
                    <path d="M12 3 A9 9 0 0 1 12 21 Z" fill={BLUE} />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#1a2a3a',
                    fontFamily: 'var(--font-assistant), sans-serif',
                  }}
                >
                  ניגודיות
                </span>
              </div>

              {/* Contrast Slider */}
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
                  accentColor: BLUE,
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
          background: isOpen ? BLUE_DARK : BLUE,
          borderRadius: 9999,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 18px 10px 14px',
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          boxShadow: '0 4px 18px rgba(26,111,168,0.32)',
          transition: 'background 0.2s, box-shadow 0.2s',
          fontFamily: 'var(--font-assistant), sans-serif',
          userSelect: 'none',
        }}
      >
        {/* Accessibility (WCAG) figure icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* Head */}
          <circle cx="12" cy="4.5" r="2" fill="white" />
          {/* Body */}
          <line x1="12" y1="7.5" x2="12" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Arms */}
          <line x1="5.5" y1="10.5" x2="18.5" y2="10.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Left leg */}
          <line x1="12" y1="14" x2="8.5" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Right leg */}
          <line x1="12" y1="14" x2="15.5" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        נגישות
      </button>
    </div>
  );
}
