/**
 * SEO regression guard - run after `npm run build`:  node scripts/check-seo.mjs
 *
 * Catches the class of bug that made Google refuse to index /blog: the site
 * normalises to URLs WITHOUT a trailing slash (the host 301s /blog/ to /blog),
 * so any canonical, og:url or sitemap entry pointing at the slashed variant
 * makes Google fetch a redirect and drop the page.
 *
 * Checks:
 *   1. no sitemap <loc> ends in "/" (except the site root)
 *   2. every sitemap URL corresponds to a page that was actually built
 *   3. every built page has a canonical
 *   4. canonical === og:url on every page
 *   5. no canonical or og:url ends in "/" (except the root)
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const SITEMAP = 'public/sitemap.xml';
const ORIGIN = 'https://cnafim-lauf.co.il';

// Pages that legitimately carry no canonical.
const NO_CANONICAL_OK = new Set(['/404', '/_not-found']);
const SKIP = (p) => p.includes('__forms') || p.includes('google3');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function routeOf(file) {
  let route = '/' + path.relative(OUT, file).split(path.sep).join('/').replace(/\.html$/, '');
  return route === '/index' ? '/' : route;
}

const problems = [];

// ---- sitemap ----
const sitemap = fs.readFileSync(SITEMAP, 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

for (const loc of locs) {
  if (loc !== `${ORIGIN}/` && loc.endsWith('/')) {
    problems.push(`sitemap: trailing slash on ${loc} (the host 301s it - Google will not index)`);
  }
}

// ---- pages ----
const files = walk(OUT).filter((f) => !SKIP(f));
const built = new Set(files.map(routeOf));

for (const loc of locs) {
  const route = loc.replace(ORIGIN, '').replace(/\/$/, '') || '/';
  const decoded = decodeURIComponent(route);
  if (!built.has(route) && !built.has(decoded)) {
    problems.push(`sitemap: ${loc} has no corresponding built page`);
  }
}

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeOf(file);
  const canonical = /rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  const ogUrl = /property="og:url" content="([^"]+)"/.exec(html)?.[1];

  if (!canonical) {
    if (!NO_CANONICAL_OK.has(route)) problems.push(`${route}: no canonical`);
    continue;
  }
  if (canonical !== `${ORIGIN}/` && canonical.endsWith('/')) {
    problems.push(`${route}: canonical has a trailing slash (${canonical})`);
  }
  if (ogUrl && decodeURIComponent(ogUrl) !== decodeURIComponent(canonical)) {
    problems.push(`${route}: og:url !== canonical\n      canonical: ${canonical}\n      og:url   : ${ogUrl}`);
  }
  if (!ogUrl) problems.push(`${route}: no og:url (Next falls back to metadataBase, i.e. the homepage)`);
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} SEO problem(s):\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error('');
  process.exit(1);
}

console.log(`✓ SEO checks passed: ${files.length} pages, ${locs.length} sitemap URLs`);
console.log('  canonical present and === og:url everywhere; no trailing-slash URLs.');
