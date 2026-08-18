// Site-wide constants shared across pages.

export const SITE_URL = 'https://cnafim-lauf.co.il';
export const SITE_NAME = 'כנפיים לעוף';
export const OWNER_NAME = 'גאולה אלון';

/** Default social-share image (1200x630). */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Stable @id anchors for the sitewide JSON-LD entity graph. The full Person /
 * Organization / WebSite nodes are emitted once from the root layout; every
 * page-level schema references these ids instead of re-declaring the entities,
 * so Google resolves one rich entity rather than many conflicting duplicates.
 */
export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
} as const;

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
  // images is included because Next does NOT deep-merge metadata: any page that
  // sets its own openGraph replaces the layout's entirely, silently dropping
  // the share image. Before this, 29 of 30 indexable pages had no og:image.
  return {
    alternates: { canonical: url },
    openGraph: { url, siteName: SITE_NAME, images: [OG_IMAGE] },
  };
}

// Evaluated when the site is built, so the footer year cannot silently rot.
export const COPYRIGHT_YEAR = new Date().getFullYear();

export const COPYRIGHT_LINE = `כל הזכויות שמורות © ${COPYRIGHT_YEAR} · ${SITE_NAME} | ${OWNER_NAME}`;
