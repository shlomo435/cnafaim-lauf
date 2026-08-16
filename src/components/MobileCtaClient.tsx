'use client';

import { useEffect, useState } from 'react';

const HIDE_AFTER = 40; // px - "started scrolling"

/**
 * The mobile CTA bar. Visible at the top of the page and hidden as soon as the
 * visitor starts scrolling, so it stops covering content while they read.
 *
 * It also toggles `cta-hidden` on <html>: the WhatsApp, mail and accessibility
 * buttons sit above this bar, so they drop into its place when it goes away
 * instead of leaving a gap (see globals.css).
 */
export default function MobileCtaClient({ href = '/#contact' }: { href?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > HIDE_AFTER);
    onScroll(); // honour a restored scroll position on load
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('cta-hidden', hidden);
    return () => document.documentElement.classList.remove('cta-hidden');
  }, [hidden]);

  return (
    <a
      href={href}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="fixed z-[9997] lg:hidden flex items-center justify-center px-3 text-white text-sm font-medium rounded-full whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D81B8C]"
      style={{
        bottom: '16px',
        left: '16px',
        right: '16px',
        height: '48px',
        backgroundColor: '#D81B8C',
        boxShadow: '0 4px 16px rgba(216,27,140,0.30)',
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'translateY(120%)' : 'translateY(0)',
        pointerEvents: hidden ? 'none' : 'auto',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      לתיאום שיחת היכרות ←
    </a>
  );
}
