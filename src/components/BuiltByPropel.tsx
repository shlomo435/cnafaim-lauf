import Image from 'next/image';
import { C } from '../lib/tokens';

/**
 * Agency credit, rendered from the root layout so it closes every page.
 *
 * Sits on a light band rather than inside the plum footer: the Propel logo is
 * dark artwork on transparency and would not read on the footer's background.
 * The whole row - text and logo - is one link.
 */
export default function BuiltByPropel() {
  return (
    <div
      className="w-full px-5 pt-5 pb-[88px] lg:pb-5 text-center"
      style={{ backgroundColor: C.cream, borderTop: `1px solid ${C.border}` }}
    >
      <a
        href="https://propel.co.il"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="האתר נבנה על ידי פרופל בניית אתרים - מעבר לאתר פרופל"
        className="inline-flex items-center gap-2.5 flex-wrap justify-center transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C01880] focus-visible:ring-offset-2 rounded-md px-2 py-1"
      >
        <span className="text-xs font-light" style={{ color: C.textLight }}>
          האתר נבנה על ידי
        </span>
        <Image
          src="/propel-logo.webp"
          alt="פרופל בניית אתרים"
          width={1200}
          height={377}
          className="h-6 md:h-7 w-auto object-contain"
          sizes="112px"
          loading="lazy"
        />
      </a>
    </div>
  );
}
