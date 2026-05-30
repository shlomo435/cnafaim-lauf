'use client';

import { useEffect } from 'react';

export default function ScrollRevealClient() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('sr-visible');
        }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.sr');
    elements.forEach((el) => obs.observe(el));

    // Fallback: after 500 ms force-reveal any .sr already in the viewport
    // (handles direct anchor-link navigation where intersection may not fire)
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.sr:not(.sr-visible)').forEach((el) => {
        const { top } = el.getBoundingClientRect();
        if (top < window.innerHeight) el.classList.add('sr-visible');
      });
    }, 500);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return null;
}
