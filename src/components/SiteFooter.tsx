import Link from 'next/link';
import Image from 'next/image';
import { C } from '../lib/tokens';
import { COPYRIGHT_LINE, PHONE_DISPLAY, PHONE_TEL, EMAIL } from '../lib/site';

/**
 * The one site footer, mounted from the root layout so all pages share it.
 *
 * This is deliberate SEO structure, not just chrome: before it existed only on
 * the homepage, every service page had a single inbound link, which Search
 * Console read as "crawled - currently not indexed". With the footer sitewide,
 * each service, the blog and both legal pages receive an inbound link from
 * every page on the site.
 *
 * Anchor links use the absolute /#... form so they work from inner pages too.
 */
const NAV = [
  ['אודות',          '/#about'],
  ['מטפלת רגשית',    '/metapel-regashi'],
  ['הוראה מתקנת',    '/methods/remedial'],
  ['אבחון דידקטי',   '/avchun-didakti'],
  ['הדרכת הורים',    '/hadrachat-horim'],
  ['הרצאות והדרכות', '/hartzaot'],
  ['קלפי ניצוץ',     '/klafim'],
  ['טיפול בזום',     '/tipul-regashi-bezoom'],
  ['בלוג',           '/blog'],
  ['יצירת קשר',      '/#contact'],
] as const;

export default function SiteFooter() {
  return (
    <footer className="pt-8 pb-8 md:pt-12 md:pb-10 lg:pb-12" style={{ backgroundColor: C.plum }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-right pb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>

          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <Link href="/" aria-label="כנפיים לעוף - דף הבית">
              <Image
                src="/logo.jpg"
                alt="כנפיים לעוף"
                width={160}
                height={56}
                className="h-12 w-auto object-contain"
                style={{ maxWidth: 160, mixBlendMode: 'screen', opacity: 0.9 }}
              />
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-[200px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
              מרכז רגשי-לימודי לילדים, נערות ונשים
            </p>
          </div>

          {/* Quick nav */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs font-semibold tracking-[0.2em] mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>ניווט מהיר</p>
            {NAV.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-light transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-xs font-semibold tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.45)' }}>יצירת קשר</p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-sm font-light transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.7)', direction: 'ltr' }}
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm font-light transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.7)', direction: 'ltr' }}
            >
              {EMAIL}
            </a>
            <p className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.6)' }}>
              ראשון-חמישי, 09:00-18:00
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a
                href="https://www.facebook.com/profile.php?id=61585099706314"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="עמוד הפייסבוק של כנפיים לעוף"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:text-white hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/gehula_alon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="עמוד האינסטגרם של כנפיים לעוף"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:text-white hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
            <Link
              href="/#contact"
              className="mt-1 inline-block px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: C.rose, color: 'white', boxShadow: '0 4px 16px rgba(216,27,140,0.25)' }}
            >
              לתיאום שיחת היכרות
            </Link>
          </div>
        </div>

        {/* Copyright + legal */}
        <div className="pt-6 text-center">
          <div className="flex items-center justify-center gap-3 flex-wrap mb-3">
            <Link href="/accessibility" className="text-xs font-light transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
              הצהרת נגישות
            </Link>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <Link href="/privacy" className="text-xs font-light transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
              מדיניות פרטיות
            </Link>
          </div>
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {COPYRIGHT_LINE}
          </p>
        </div>
      </div>
    </footer>
  );
}
