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
 *   6. exactly one <h1> per page
 *   7. every id="..." on a page is unique
 *   8. every in-page href="#x" has a matching id="x"
 *   9. every JSON-LD block parses
 *  10. every internal link resolves to a page that was built
 *  11. every indexable page is reachable by a link from somewhere else on the site
 *  12. no internal link points at a route the site deliberately retired
 *  13. every VideoObject sits on the watch page the sitemap lists for its video,
 *      plays that video, and points at files that exist
 *  14. no meta description is long enough for Google to truncate it
 *  15. every image a page claims in og:image, twitter:image or JSON-LD exists
 *
 * Checks 10-12 exist because a stale report once claimed half the blog posts were
 * orphaned and that /blog still listed the retired tag taxonomy. Both were false,
 * but nothing in the repo could prove it in one command. Now it can.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const SITEMAP = 'public/sitemap.xml';
const ORIGIN = 'https://cnafim-lauf.co.il';

// Pages that legitimately carry no canonical.
// Error pages carry no canonical by design: /410 is the body Netlify serves for
// retired tag archives, and canonicalising it would invite indexing.
const NO_CANONICAL_OK = new Set(['/404', '/_not-found', '/410']);
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

  // --- Structure checks -------------------------------------------------
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) problems.push(`${route}: ${h1s.length} <h1> elements (expected exactly 1)`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupeIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  for (const id of new Set(dupeIds)) problems.push(`${route}: duplicate id="${id}"`);

  // Anchors the page points at must exist on the page. React can emit an
  // escaped fragment, so compare decoded.
  const idSet = new Set(ids.map((id) => decodeURIComponent(id)));
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => decodeURIComponent(m[1]));
  for (const a of new Set(anchors)) {
    if (a && !idSet.has(a)) problems.push(`${route}: href="#${a}" has no matching id`);
  }

  // Structured data must be valid JSON, or Google silently discards it.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  blocks.forEach((m, i) => {
    try {
      JSON.parse(m[1]);
    } catch (err) {
      problems.push(`${route}: JSON-LD block ${i + 1} does not parse (${err.message})`);
    }
  });
}

// ---- internal link graph ----------------------------------------------------
// Built from the rendered HTML, so it reflects what a crawler without JavaScript
// actually sees - which is the only thing that counts for indexing.

// Routes the site deliberately retired. An internal link to one of these is a
// real bug: it sends a crawler to a 301 or a 410 from inside our own pages.
const RETIRED = [/^\/blog\/simanim-harada-yelad$/, /^\/blog\/tag\//];
// Tag archives that build but are noindex on purpose; they need no inbound link.
const NOINDEX_OK = new Set(['/blog/tag/נשים', '/blog/tag/נערות']);
const NOT_LINKABLE = new Set(['/404', '/_not-found', '/410']);
const ASSET = /\.(jpg|jpeg|png|ico|svg|xml|txt|webp|mp4|json|pdf)$/i;

const linkedTo = new Set();
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const from = routeOf(file);

  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let target = decodeURIComponent(m[1]);
    if (/^\/(_next|\.netlify)/.test(target) || ASSET.test(target)) continue;
    if (target.length > 1) target = target.replace(/\/$/, '');

    // A retired route is still "built" only when it is the 301 source, so check
    // the retired list before the existence check to get the clearer message.
    const retired = RETIRED.find((re) => re.test(target));
    if (retired && !built.has(target)) {
      problems.push(`${from}: links to retired route ${target} (crawler gets a 301 or 410)`);
      continue;
    }
    if (!built.has(target)) {
      problems.push(`${from}: links to ${target}, which was not built`);
      continue;
    }
    if (target !== from) linkedTo.add(target);
  }
}

// An indexable page nothing links to is invisible to a crawler that does not
// read the sitemap, and weak even to one that does.
for (const route of built) {
  if (linkedTo.has(route) || route === '/') continue;
  if (NOT_LINKABLE.has(route) || NOINDEX_OK.has(route) || SKIP(route)) continue;
  const html = fs.readFileSync(path.join(OUT, route === '/' ? 'index.html' : `${route}.html`), 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  problems.push(`${route}: indexable but no internal link points at it (orphan)`);
}

// ---- declared images ---------------------------------------------------------
// A per-post cover that was never rendered leaves og:image and Article.image
// pointing at a 404. Nothing on the page looks wrong, and it only surfaces when
// somebody shares the link. scripts/generate-post-covers.mjs writes those files;
// this proves it ran before the build.
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeOf(file);
  const declared = new Set();
  for (const [, url] of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) declared.add(url);
  for (const [, url] of html.matchAll(/<meta name="twitter:image" content="([^"]+)"/g)) declared.add(url);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      continue; // already reported by check 9
    }
    for (const node of data['@graph'] ?? [data]) {
      for (const value of [node.image, node.thumbnailUrl, node.logo?.url].flat()) {
        if (typeof value === 'string') declared.add(value);
      }
    }
  }
  for (const url of declared) {
    if (!url.startsWith(ORIGIN)) continue; // images hosted elsewhere are not ours to verify
    if (!fs.existsSync(path.join(OUT, decodeURIComponent(url.slice(ORIGIN.length))))) {
      problems.push(`${route}: declares image ${url}, which is not a file this site serves`);
    }
  }
}

// ---- meta description length -------------------------------------------------
// Google truncates around 160 characters. Counting the raw HTML would overstate
// every description containing a quote (&quot; is six characters for one), which
// is exactly how two already-fine pages were reported as too long - so decode
// first. No minimum is enforced here: a short description is weak, not broken.
const decodeEntities = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const raw = /<meta name="description" content="([^"]*)"/.exec(html)?.[1];
  if (!raw) continue;
  const length = decodeEntities(raw).length;
  if (length > 160) problems.push(`${routeOf(file)}: meta description is ${length} chars; Google truncates past 160`);
}

// ---- videos -----------------------------------------------------------------
// Google indexes a video only from its watch page. A VideoObject on any other
// page is what Search Console rejected as "Video is not on a watch page", and a
// sitemap video that disagrees with the page's markup is a mismatch it reports.
const sitemapVideos = new Map(); // contentUrl -> { page, thumbnail }
for (const [, block] of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const content = /<video:content_loc>([^<]+)</.exec(block)?.[1];
  if (!content) continue;
  sitemapVideos.set(content, {
    page: /<loc>([^<]+)</.exec(block)[1].replace(ORIGIN, ''),
    thumbnail: /<video:thumbnail_loc>([^<]+)</.exec(block)?.[1],
  });
}

const markedUp = new Set();
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeOf(file);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      continue; // already reported by check 9
    }
    for (const node of data['@graph'] ?? [data]) {
      if (node['@type'] !== 'VideoObject') continue;
      const listed = sitemapVideos.get(node.contentUrl);
      if (!listed) {
        problems.push(`${route}: VideoObject for ${node.contentUrl} has no <video:video> in the sitemap`);
      } else if (listed.page !== route) {
        problems.push(`${route}: VideoObject for ${node.contentUrl} belongs only on its watch page ${listed.page}`);
      } else {
        markedUp.add(node.contentUrl);
        if (listed.thumbnail !== node.thumbnailUrl) {
          problems.push(`${route}: thumbnailUrl ${node.thumbnailUrl} !== sitemap thumbnail_loc ${listed.thumbnail}`);
        }
      }
      for (const url of [node.contentUrl, node.thumbnailUrl]) {
        if (!url?.startsWith(ORIGIN) || !fs.existsSync(path.join(OUT, url.slice(ORIGIN.length)))) {
          problems.push(`${route}: VideoObject points at ${url}, which is not a file this site serves`);
        }
      }
      if (node.contentUrl && !html.includes(`src="${node.contentUrl.slice(ORIGIN.length)}"`)) {
        problems.push(`${route}: VideoObject describes ${node.contentUrl}, but the page has no player for it`);
      }
    }
  }
}
for (const [content, { page }] of sitemapVideos) {
  if (!markedUp.has(content)) problems.push(`sitemap: ${page} lists video ${content} but carries no VideoObject for it`);
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} SEO problem(s):\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error('');
  process.exit(1);
}

console.log(`✓ SEO checks passed: ${files.length} pages, ${locs.length} sitemap URLs`);
console.log('  canonical present and === og:url everywhere; no trailing-slash URLs.');
console.log('  one h1 per page; ids unique; in-page anchors resolve; JSON-LD parses.');
console.log(`  ${linkedTo.size} routes have an inbound internal link; no orphans, no links to retired routes.`);
console.log(`  ${markedUp.size} video(s) marked up only on their watch page, matching the video sitemap.`);
