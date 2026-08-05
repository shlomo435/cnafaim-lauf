import Link from 'next/link';
import { C } from '../lib/tokens';

export type RelatedLink = {
  href: string;
  title: string;
  desc: string;
};

/**
 * "Continue reading" block. Every page should offer a way onward, both so a
 * visitor never dead-ends and so internal link equity reaches the service pages.
 */
export default function RelatedLinks({
  links,
  heading = 'מידע נוסף שיכול לעזור',
}: {
  links: RelatedLink[];
  heading?: string;
}) {
  if (links.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
      <h2
        className="font-display text-2xl font-medium mb-6"
        style={{ color: C.textDark, letterSpacing: '-0.02em' }}
      >
        {heading}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl p-5 border transition-all duration-300 hover:border-[#3949AB] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(57,73,171,0.06)]"
            style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
          >
            <div className="font-display text-lg font-semibold mb-1" style={{ color: C.textDark }}>
              {l.title}
            </div>
            <p className="text-sm font-light leading-[1.8]" style={{ color: C.textMid }}>
              {l.desc}
            </p>
            <div className="mt-2 text-sm font-medium" style={{ color: C.rose }}>לפרטים ←</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
