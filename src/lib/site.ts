// Site-wide constants shared across pages.

export const SITE_URL = 'https://cnafim-lauf.co.il';
export const SITE_NAME = 'כנפיים לעוף';
export const OWNER_NAME = 'גאולה אלון';

export const PHONE_DISPLAY = '050-296-1213';
export const PHONE_TEL = '0502961213';
export const EMAIL = 'gehulaa@gmail.com';

/**
 * Absolute canonical URL for a path.
 *
 * The site normalises to URLs WITHOUT a trailing slash (the host 301s /blog/ to
 * /blog), so canonical, og:url, sitemap entries and internal links must all use
 * the slashless form. Pointing any of them at the slashed variant makes Google
 * fetch a redirect and refuse to index the page.
 */
export function absoluteUrl(pathname = '/'): string {
  if (!pathname || pathname === '/') return `${SITE_URL}/`;
  const clean = ('/' + pathname.replace(/^\/+/, '')).replace(/\/+$/, '');
  return `${SITE_URL}${clean}`;
}

/**
 * Metadata fragment that keeps canonical and og:url in lockstep. Without an
 * explicit openGraph.url, Next falls back to metadataBase and every page claims
 * the homepage as its og:url.
 */
export function canonicalMeta(pathname: string) {
  const url = absoluteUrl(pathname);
  return { alternates: { canonical: url }, openGraph: { url } };
}

// Evaluated when the site is built, so the footer year cannot silently rot.
export const COPYRIGHT_YEAR = new Date().getFullYear();

export const COPYRIGHT_LINE = `כל הזכויות שמורות © ${COPYRIGHT_YEAR} · ${SITE_NAME} | ${OWNER_NAME}`;
