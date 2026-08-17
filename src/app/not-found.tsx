import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../lib/tokens';

export const metadata: Metadata = {
  title: 'הדף לא נמצא | כנפיים לעוף',
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: '/',                  title: 'דף הבית',        desc: 'המרכז, השיטות ותחומי הטיפול' },
  { href: '/metapel-regashi',   title: 'מטפלת רגשית',    desc: 'טיפול רגשי לילדים, נערות ונשים' },
  { href: '/methods/remedial',  title: 'הוראה מתקנת',    desc: 'לקשיי קריאה, כתיבה וקשב' },
  { href: '/blog',             title: 'מדריכים וכתבות', desc: 'מידע מקצועי בשפה של הורים' },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
      style={{ backgroundColor: C.creamAlt, color: C.textDark }}
    >
      <Link href="/" aria-label="כנפיים לעוף - דף הבית" className="inline-block mb-8">
        <Image
          src="/logo.jpg"
          alt="כנפיים לעוף"
          width={200}
          height={67}
          className="h-16 w-auto object-contain"
          style={{ maxWidth: 200, mixBlendMode: 'multiply' }}
          priority
        />
      </Link>

      <p className="text-sm font-semibold tracking-[0.2em] mb-3" style={{ color: C.rose }}>
        404
      </p>
      <h1
        className="font-display text-3xl md:text-4xl font-medium mb-4 leading-snug"
        style={{ color: C.textHeading, letterSpacing: '-0.02em' }}
      >
        הדף שחיפשתם לא נמצא
      </h1>
      <p className="text-[1.05rem] font-light leading-[1.9] max-w-md mb-10" style={{ color: C.textMid }}>
        ייתכן שהכתובת השתנתה או שנפלה בה טעות קטנה. הנה כמה מקומות טובים להמשיך מהם:
      </p>

      <div className="grid sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl p-5 border text-right transition-all duration-300 hover:border-[#3949AB] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(57,73,171,0.07)]"
            style={{ backgroundColor: C.cream, borderColor: C.border }}
          >
            <div className="font-display text-lg font-semibold mb-1" style={{ color: C.textDark }}>
              {l.title}
            </div>
            <p className="text-sm font-light leading-[1.7]" style={{ color: C.textMid }}>
              {l.desc}
            </p>
            <div className="mt-2 text-sm font-medium" style={{ color: C.rose }}>מעבר ←</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
        <Link
          href="/#contact"
          className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1"
          style={{ background: C.plum, boxShadow: '0 8px 30px rgba(57,73,171,0.12)' }}
        >
          לתיאום שיחת היכרות
        </Link>
        <a
          href="tel:0502961213"
          className="text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: C.rose, direction: 'ltr' }}
        >
          050-296-1213
        </a>
      </div>
    </div>
  );
}
