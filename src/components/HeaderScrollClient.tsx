'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { C } from '../lib/tokens';
import MobileMenuClient from './MobileMenuClient';

const NAV_LINKS = [
  ['אודות',            '#about'],
  ['גישה טיפולית',     '#methods'],
  ['תחומי טיפול',      '#services'],
  ['הרצאות',           '#lectures'],
  ['קלפים טיפוליים',   '#cards'],
  ['הגישה שלי',        '#approach'],
  ['יצירת קשר',        '#contact'],
] as const;

function smoothScroll(href: string) {
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function HeaderScrollClient() {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastYRef.current && y > 80);
      lastYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur-sm shadow-sm border-b transition-transform duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="relative h-20 md:h-24 flex items-center">

            {/* Desktop nav — smooth scroll on all links */}
            <nav className="hidden md:flex items-center gap-3 text-sm font-light" aria-label="ניווט ראשי">
              {NAV_LINKS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => { e.preventDefault(); smoothScroll(href); }}
                  className="transition-colors duration-200 hover:text-[#D81B8C] cursor-pointer"
                  style={{ color: C.textMid }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Logo — centered, clicks scroll to top */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); smoothScroll('#'); }}
                className="pointer-events-auto"
                aria-label="כנפיים לעוף - דף הבית"
              >
                <Image
                  src="/logo.jpg"
                  alt="כנפיים לעוף"
                  width={200}
                  height={67}
                  className="h-16 w-auto object-contain"
                  style={{ maxWidth: 200, mixBlendMode: 'multiply' }}
                  priority
                />
              </a>
            </div>

            {/* CTA — desktop only, smooth scroll */}
            <div className="mr-auto">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); smoothScroll('#contact'); }}
                className="hidden md:inline-block px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                style={{ backgroundColor: C.rose }}
              >
                לתיאום פגישה
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MobileMenuClient — hamburger is fixed z-[9999], always above header z-50 */}
      <MobileMenuClient />
    </>
  );
}
