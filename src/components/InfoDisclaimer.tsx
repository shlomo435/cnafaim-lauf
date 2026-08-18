import { C } from '../lib/tokens';

/**
 * Standing YMYL disclaimer for content that touches mental-health topics.
 * Rendered under every blog article and on the service pages - informational
 * content on OCD, anxiety, depression or trauma should never read as a
 * substitute for professional care, and a crisis pointer is standard practice.
 */
export default function InfoDisclaimer() {
  return (
    <div
      className="mt-10 rounded-xl px-5 py-4 border text-right"
      style={{ backgroundColor: C.creamAlt, borderColor: C.borderLight }}
    >
      <p className="text-xs font-light leading-[1.9]" style={{ color: C.textLight }}>
        התוכן באתר מידעי בלבד ואינו תחליף לאבחון, לייעוץ רפואי או לטיפול מקצועי.
        במצוקה חריפה ניתן לפנות לער&quot;ן בטלפון{' '}
        <a href="tel:1201" className="font-medium underline hover:opacity-80" style={{ color: C.textMid, textUnderlineOffset: '2px' }}>
          1201
        </a>{' '}
        או לגורם רפואי.
      </p>
    </div>
  );
}
