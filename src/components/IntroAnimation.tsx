'use client';

import React, { useState, useEffect, useRef } from 'react';

const TEAL      = '#9C27B0';
const TEAL_DARK = '#3949AB';
const CREAM     = '#FFF0F5';

function ButterflyMark() {
  return (
    <svg
      viewBox="0 0 280 168"
      width="280"
      height="168"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path d="M 140,84 C 128,58 95,22 48,12 C 12,4 2,36 16,56 C 30,76 92,76 140,84 Z" fill={TEAL} />
      <path d="M 140,84 C 116,66 84,46 60,38 C 38,30 25,42 32,55 C 42,67 94,72 140,84 Z" fill={TEAL_DARK} opacity="0.22" />
      <path d="M 140,84 C 112,92 80,112 58,134 C 42,152 50,166 70,157 C 100,146 128,118 140,84 Z" fill={TEAL} opacity="0.8" />
      <path d="M 140,84 C 118,92 90,108 72,126 C 58,140 64,154 80,147 C 104,137 128,110 140,84 Z" fill={TEAL_DARK} opacity="0.18" />
      <path d="M 140,84 C 152,58 185,22 232,12 C 268,4 278,36 264,56 C 250,76 188,76 140,84 Z" fill={TEAL} />
      <path d="M 140,84 C 164,66 196,46 220,38 C 242,30 255,42 248,55 C 238,67 186,72 140,84 Z" fill={TEAL_DARK} opacity="0.22" />
      <path d="M 140,84 C 168,92 200,112 222,134 C 238,152 230,166 210,157 C 180,146 152,118 140,84 Z" fill={TEAL} opacity="0.8" />
      <path d="M 140,84 C 162,92 190,108 208,126 C 222,140 216,154 200,147 C 176,137 152,110 140,84 Z" fill={TEAL_DARK} opacity="0.18" />
      <ellipse cx="140" cy="89" rx="4" ry="16" fill={TEAL_DARK} />
      <circle  cx="140" cy="70" r="5.5" fill={TEAL_DARK} />
      <path d="M 137,66 C 124,50 110,34 94,24" stroke={TEAL_DARK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="94" cy="24" r="2.4" fill={TEAL_DARK} />
      <path d="M 143,66 C 156,50 170,34 186,24" stroke={TEAL_DARK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="186" cy="24" r="2.4" fill={TEAL_DARK} />
    </svg>
  );
}

export default function IntroAnimation() {
  const [leaving, setLeaving] = useState(false);
  const [done,    setDone]    = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Skip if already played this session, or if user prefers reduced motion.
    // Guarded: sessionStorage/matchMedia can throw in privacy modes - a throw here
    // must never leave the overlay stuck (that would make the site "not open").
    let alreadySeen = false;
    let reduceMotion = false;
    try {
      alreadySeen = sessionStorage.getItem('intro-seen') === '1';
      reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch { /* storage or matchMedia unavailable */ }
    if (alreadySeen || reduceMotion) {
      document.body.style.overflow = '';
      const t = setTimeout(() => { if (mountedRef.current) setDone(true); }, 0);
      return () => {
        mountedRef.current = false;
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }

    document.body.style.overflow = 'hidden';

    // Keep this short: the splash hides all content, so every extra 100ms here
    // is time a visitor stares at a blank screen before they can read anything.
    //
    // Anchor to navigation start, not to hydration. This effect runs only once
    // React has hydrated, which on a slow phone can be a second or more after
    // the page loaded - a plain setTimeout would add the splash on top of that
    // and let the CSS safety-net beat the JS teardown, leaving the page visible
    // but still scroll-locked.
    const FADE_AT = 1200;
    const DONE_AT = 1500;
    const elapsed = performance.now();

    const t1 = setTimeout(() => {
      if (!mountedRef.current) return;
      setLeaving(true);
    }, Math.max(0, FADE_AT - elapsed));

    const t2 = setTimeout(() => {
      if (!mountedRef.current) return;
      setDone(true);
      document.body.style.overflow = '';
      try { sessionStorage.setItem('intro-seen', '1'); } catch { /* private browsing */ }
    }, Math.max(0, DONE_AT - elapsed));

    return () => {
      mountedRef.current = false;
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  const skip = () => {
    if (leaving || done) return;
    setLeaving(true);
    try { sessionStorage.setItem('intro-seen', '1'); } catch { /* private browsing */ }
    setTimeout(() => {
      if (!mountedRef.current) return;
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
      className="intro-overlay"
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
      <div style={{ position: 'relative', width: 280, height: 168 }}>
        <div className="intro-wing-left"><ButterflyMark /></div>
        <div className="intro-wing-right"><ButterflyMark /></div>
      </div>

      <div
        className="intro-title-anim"
        style={{
          marginTop:     28,
          textAlign:     'center',
          fontFamily:    'var(--font-rubik), "Rubik", sans-serif',
          fontSize:      '3rem',
          fontWeight:    500,
          color:         '#3949AB',
          lineHeight:    1.05,
          letterSpacing: '-0.04em',
          direction:     'rtl',
        }}
      >
        כנפיים לעוף
      </div>

      <div
        className="intro-subtitle-anim"
        style={{
          marginTop:     10,
          textAlign:     'center',
          fontFamily:    'var(--font-heebo), sans-serif',
          fontSize:      '0.88rem',
          fontWeight:    400,
          color:         '#5C4A6E',
          letterSpacing: '0.05em',
          direction:     'rtl',
        }}
      >
        טיפול רגשי CBT · גאולה אלון
      </div>

    </div>
  );
}
