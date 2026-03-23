'use client';

import React, { useState, useEffect } from 'react';

const PINK      = '#d81b60';
const PINK_DARK = '#880e4f';
const CREAM     = '#FAF8F5';

// ─── Butterfly SVG (full, symmetric) ─────────────────────────────────────────
function ButterflyMark() {
  return (
    <svg
      viewBox="0 0 280 168"
      width="280"
      height="168"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* ── Upper left wing ─────────────────────── */}
      <path
        d="M 140,84 C 128,58 95,22 48,12 C 12,4 2,36 16,56 C 30,76 92,76 140,84 Z"
        fill={PINK}
      />
      {/* Inner shading — upper left */}
      <path
        d="M 140,84 C 116,66 84,46 60,38 C 38,30 25,42 32,55 C 42,67 94,72 140,84 Z"
        fill={PINK_DARK}
        opacity="0.22"
      />
      {/* ── Lower left wing ─────────────────────── */}
      <path
        d="M 140,84 C 112,92 80,112 58,134 C 42,152 50,166 70,157 C 100,146 128,118 140,84 Z"
        fill={PINK}
        opacity="0.8"
      />
      {/* Inner shading — lower left */}
      <path
        d="M 140,84 C 118,92 90,108 72,126 C 58,140 64,154 80,147 C 104,137 128,110 140,84 Z"
        fill={PINK_DARK}
        opacity="0.18"
      />
      {/* ── Upper right wing ────────────────────── */}
      <path
        d="M 140,84 C 152,58 185,22 232,12 C 268,4 278,36 264,56 C 250,76 188,76 140,84 Z"
        fill={PINK}
      />
      {/* Inner shading — upper right */}
      <path
        d="M 140,84 C 164,66 196,46 220,38 C 242,30 255,42 248,55 C 238,67 186,72 140,84 Z"
        fill={PINK_DARK}
        opacity="0.22"
      />
      {/* ── Lower right wing ────────────────────── */}
      <path
        d="M 140,84 C 168,92 200,112 222,134 C 238,152 230,166 210,157 C 180,146 152,118 140,84 Z"
        fill={PINK}
        opacity="0.8"
      />
      {/* Inner shading — lower right */}
      <path
        d="M 140,84 C 162,92 190,108 208,126 C 222,140 216,154 200,147 C 176,137 152,110 140,84 Z"
        fill={PINK_DARK}
        opacity="0.18"
      />
      {/* ── Body ────────────────────────────────── */}
      <ellipse cx="140" cy="89" rx="4"   ry="16"  fill={PINK_DARK} />
      <circle  cx="140" cy="70" r="5.5"           fill={PINK_DARK} />
      {/* ── Left antenna ────────────────────────── */}
      <path
        d="M 137,66 C 124,50 110,34 94,24"
        stroke={PINK_DARK} strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      <circle cx="94" cy="24" r="2.4" fill={PINK_DARK} />
      {/* ── Right antenna ───────────────────────── */}
      <path
        d="M 143,66 C 156,50 170,34 186,24"
        stroke={PINK_DARK} strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      <circle cx="186" cy="24" r="2.4" fill={PINK_DARK} />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function IntroAnimation() {
  const [leaving, setLeaving] = useState(false);
  const [done,    setDone]    = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setLeaving(true),  3100);
    const t2 = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = '';
    }, 3850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  const skip = () => {
    if (leaving || done) return;
    setLeaving(true);
    setTimeout(() => {
      setDone(true);
      document.body.style.overflow = '';
    }, 650);
  };

  if (done) return null;

  return (
    <div
      onClick={skip}
      role="presentation"
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9999,
        background:     CREAM,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexDirection:  'column',
        cursor:         'pointer',
        userSelect:     'none',
        opacity:        leaving ? 0 : 1,
        transition:     leaving ? 'opacity 0.65s ease' : undefined,
        pointerEvents:  leaving ? 'none' : 'all',
      }}
    >
      {/* ── Wings (split clip-path trick) ──────────────── */}
      <div style={{ position: 'relative', width: 280, height: 168 }}>
        {/* Left half — sweeps in from the left */}
        <div className="intro-wing-left">
          <ButterflyMark />
        </div>
        {/* Right half — sweeps in from the right */}
        <div className="intro-wing-right">
          <ButterflyMark />
        </div>
      </div>

      {/* ── Brand title ────────────────────────────────── */}
      <div
        className="intro-title-anim"
        style={{
          marginTop:   28,
          textAlign:   'center',
          fontFamily:  'var(--font-frank-ruhl), "Frank Ruhl Libre", serif',
          fontSize:    '2.7rem',
          fontWeight:  300,
          color:       '#1C1826',
          lineHeight:  1,
          letterSpacing: '-0.01em',
          direction:   'rtl',
        }}
      >
        כנפיים לעוף
      </div>

      {/* ── Subtitle ───────────────────────────────────── */}
      <div
        className="intro-subtitle-anim"
        style={{
          marginTop:     10,
          textAlign:     'center',
          fontFamily:    'var(--font-assistant), sans-serif',
          fontSize:      '0.88rem',
          fontWeight:    400,
          color:         '#8A7A9A',
          letterSpacing: '0.05em',
          direction:     'rtl',
        }}
      >
        טיפול רגשי CBT · גאולה אלון
      </div>

      {/* ── Skip hint ──────────────────────────────────── */}
      <div
        className="intro-skip-hint"
        style={{
          position:      'absolute',
          bottom:        28,
          fontSize:      '0.7rem',
          color:         '#B8A8C8',
          fontFamily:    'var(--font-assistant), sans-serif',
          letterSpacing: '0.06em',
          direction:     'rtl',
        }}
      >
        לחץ לדילוג
      </div>
    </div>
  );
}
