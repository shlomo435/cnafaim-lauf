/**
 * Walks every URL in public/sitemap.xml against the LIVE site and prints:
 * status, redirect (if any), canonical, robots meta.
 *
 * Every row must be: 200, no redirect, canonical === the URL itself, no noindex.
 * Then it asks every OTHER host the site answers on to redirect here instead.
 * Exits 1 on any deviation.
 *
 *   node scripts/seo-check.mjs
 */
import fs from 'node:fs';

const ORIGIN = 'https://cnafim-lauf.co.il';

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
  const norm = (u) => (u.replace(/\/$/, '') === ORIGIN ? `${ORIGIN}/` : u);
  const canonicalOk = norm(canonical) === norm(url);
  const noindex = /noindex/i.test(robots);

  const row =
    pad(url.replace(ORIGIN, '') || '/', 46) +
    pad(head.status, 8) +
    pad(redirected ? '-> ' + (location || '?') : 'no', 10) +
    pad(canonicalOk ? 'yes' : 'MISMATCH', 14) +
    robots;
  console.log(row);

  if (head.status !== 200) problems.push(`${url}: status ${head.status}${location ? ' -> ' + location : ''}`);
  if (!canonicalOk) problems.push(`${url}: canonical is "${canonical}"`);
  if (noindex) problems.push(`${url}: robots says noindex`);
}

// ── Alternate hosts ───────────────────────────────────────────────────────────
// Every host but the canonical one has to redirect here, with the path intact.
//
// This check exists because cnafaim-lauf.netlify.app answered 200 for every page
// for months: the entire site at a second crawlable address, with nothing but a
// canonical tag arguing for the real one. Nothing in the repo could have caught
// it. check-seo reads the files the build wrote, and the sweep above only visits
// URLs that are canonical by construction - neither one ever asks a different
// host a question.
//
// The host list is read from netlify.toml, so a rule added there is covered here
// without editing this file.
const toml = fs.readFileSync('netlify.toml', 'utf8');
const altHosts = [
  ...new Set(
    [...toml.matchAll(/^\s*from\s*=\s*"(https?:\/\/[^"]+?)\/\*"/gm)].map((m) => m[1]).filter((host) => host !== ORIGIN)
  ),
];

// Probe a real page rather than the root: a rule that forgets :splat sends every
// path to the home page, which reads as a soft 404 and stays invisible as long
// as you only ever ask for "/".
const probePath = new URL(urls.find((u) => u !== `${ORIGIN}/`) ?? `${ORIGIN}/`).pathname;

console.log(`\nALTERNATE HOSTS (probing ${probePath})`);
console.log('-'.repeat(100));
for (const host of altHosts) {
  const url = host + probePath;
  const first = await fetch(url, { redirect: 'manual' });
  const redirected = first.status >= 300 && first.status < 400;
  const final = redirected ? await fetch(url) : first;
  const landed = final.url === `${ORIGIN}${probePath}` && final.status === 200;

  const verdict = !redirected
    ? 'SERVES THE SITE - no redirect'
    : landed
      ? `-> ${ORIGIN}${probePath}`
      : `LANDED ON ${final.url}`;
  console.log(pad(host, 46) + pad(first.status, 8) + verdict);

  if (!redirected) {
    problems.push(`${url}: answers ${first.status} instead of redirecting - the site is served on a second host`);
  } else if (!landed) {
    problems.push(`${url}: redirect ends at ${final.url} (${final.status}), not ${ORIGIN}${probePath}`);
  }
}

console.log('-'.repeat(100));
if (problems.length) {
  console.error(`\n✗ ${problems.length} deviation(s):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log(`✓ all ${urls.length} sitemap URLs: 200, no redirect, canonical matches, indexable`);
console.log(`✓ all ${altHosts.length} alternate hosts redirect to ${ORIGIN}, path intact`);
