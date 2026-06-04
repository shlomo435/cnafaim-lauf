'use client';

import { useState } from 'react';
import { C } from '../lib/tokens';

const NAV_LINKS = [
  { label: 'אודות',         href: '#about' },
  { label: 'תחומי טיפול',   href: '#services' },
  { label: 'קלפים טיפוליים', href: '#cards' },
  { label: 'הגישה שלי',     href: '#approach' },
  { label: 'יצירת קשר',     href: '#contact' },
];

export default function MobileMenuClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button - only visible on mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-md transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-1"
        style={{ color: C.textDark }}
        aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Dropdown - fixed below the header so it doesn't disrupt header layout */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed top-16 inset-x-0 z-40 border-t shadow-lg md:hidden"
          style={{ backgroundColor: 'rgba(240,253,250,0.99)', borderColor: C.borderLight }}
        >
          <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col text-right">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium border-b last:border-b-0 transition-colors text-[#111827] hover:text-[#2DD4BF]"
                style={{ borderColor: C.borderLight }}
              >
                {label}
              </a>
            ))}
            <div className="pt-3 pb-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full py-3.5 text-sm font-medium text-center text-white rounded-lg bg-[#2DD4BF] hover:bg-[#14B8A6] transition-colors duration-300"
              >
                לתיאום פגישה
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
