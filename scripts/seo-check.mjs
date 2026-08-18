/**
 * Walks every URL in public/sitemap.xml against the LIVE site and prints:
 * status, redirect (if any), canonical, robots meta.
 *
 * Every row must be: 200, no redirect, canonical === the URL itself, no noindex.
 * Exits 1 on any deviation.
 *
 *   node scripts/seo-check.mjs
 */
import fs from 'node:fs';

const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const pad = (s, n) => String(s).padEnd(n);
const problems = [];

console.log(pad('URL', 46) + pad('STATUS', 8) + pad('REDIRECT', 10) + pad('CANONICAL OK', 14) + 'ROBOTS');
console.log('-'.repeat(100));

for (const url of urls) {
  // no-follow first, to see whether the exact sitemap URL redirects
  const head = await fetch(url, { redirect: 'manual' });
  const redirected = head.status >= 300 && head.status < 400;
  const location = redirected ? head.headers.get('location') : '';

  // then fetch the document itself for canonical/robots
  const res = redirected ? await fetch(url) : head;
  const html = await res.text();
  const canonical = /rel="canonical" href="([^"]+)"/.exec(html)?.[1] ?? '';
  const robots = /name="robots" content="([^"]+)"/.exec(html)?.[1] ?? '(default)';

  // For the domain root, an empty path and "/" are the same URI (RFC 3986) -
  // Next emits the bare-domain form while the sitemap lists the slashed root.
  const norm = (u) => (u.replace(/\/$/, '') === 'https://cnafim-lauf.co.il' ? 'https://cnafim-lauf.co.il/' : u);
  const canonicalOk = norm(canonical) === norm(url);
  const noindex = /noindex/i.test(robots);

  const row =
    pad(url.replace('https://cnafim-lauf.co.il', '') || '/', 46) +
    pad(head.status, 8) +
    pad(redirected ? '-> ' + (location || '?') : 'no', 10) +
    pad(canonicalOk ? 'yes' : 'MISMATCH', 14) +
    robots;
  console.log(row);

  if (head.status !== 200) problems.push(`${url}: status ${head.status}${location ? ' -> ' + location : ''}`);
  if (!canonicalOk) problems.push(`${url}: canonical is "${canonical}"`);
  if (noindex) problems.push(`${url}: robots says noindex`);
}

console.log('-'.repeat(100));
if (problems.length) {
  console.error(`\n✗ ${problems.length} deviation(s):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log(`✓ all ${urls.length} sitemap URLs: 200, no redirect, canonical matches, indexable`);
