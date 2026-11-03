/**
 * Fails if anything the site itself hands a crawler points at a URL that redirects.
 *
 *   node scripts/check-links.mjs          # after `npm run build`; reads out/ and public/
 *   node scripts/check-links.mjs --live   # also asks the live host about every target
 *
 * Search Console lists two URLs under "Page with redirect": /blog/simanim-harada-yelad
 * (the 301 into the panic-attack guide, in netlify.toml) and /blog/ (the host's own
 * trailing-slash 301 to /blog). Both redirects are intended and stay. The rule this
 * script enforces is the other half: nothing on the site may link to either, or to
 * any other URL that answers with a redirect, so that Google only meets them through
 * old external links and its own memory.
 *
 * check-seo already proves that links resolve to built pages, but it strips a
 * trailing slash before comparing - so a link to /blog/ passes there. Here a URL
 * counts only if it is EXACTLY what the host serves at 200:
 *
 *   - a path with a trailing slash (other than /) - the host 301s it
 *   - a path that is not exactly a built file, case included - the host 301s a
 *     wrong-case page to the lowercase one, serves a wrong-case asset at a second
 *     URL for the same file, and anything else is a 404
 *   - a path matched by a redirect rule in netlify.toml - a forced rule fires even
 *     when the file exists; a non-forced one fires only when it does not
 *   - an absolute URL on any host other than the canonical origin (http://, www.,
 *     the netlify.app hostname) - each of those is a 301
 *
 * Where URLs are collected from: every href and every absolute URL in a content
 * attribute (canonical, og:url, og:image, twitter:image) in the built HTML, every
 * same-site URL inside JSON-LD, every <loc> in the sitemap, every link in llms.txt,
 * and the Sitemap: line in robots.txt.
 *
 * --live adds two things a static check cannot see: each unique target is fetched
 * without following redirects and must answer 200, and each fixed-path permanent
 * redirect in netlify.toml (plus the slashed /blog/) must reach a 200 in exactly
 * one permanent hop. The second catches a chain forming later, such as the guide
 * the old slug points at being renamed and redirected in turn.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const ORIGIN = 'https://cnafim-lauf.co.il';
const LIVE = process.argv.includes('--live');

// ── What the host serves ──────────────────────────────────────────────────────
if (!fs.existsSync(OUT)) {
  console.error('check-links: out/ not found - run `npm run build` first.');
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push('/' + path.relative(OUT, full).split(path.sep).join('/'));
  }
  return acc;
}

// Compared as strings, never with fs.existsSync: Windows and macOS filesystems are
// case-insensitive, and the host is not.
const servedFiles = new Set(walk(OUT));
const pages = new Set(
  [...servedFiles]
    .filter((f) => f.endsWith('.html'))
    .map((f) => (f === '/index.html' ? '/' : f.slice(0, -'.html'.length)))
);

// ── Redirect rules from netlify.toml ──────────────────────────────────────────
const toml = fs.readFileSync('netlify.toml', 'utf8');
const rules = toml
  .split(/^\[\[redirects\]\]\s*$/m)
  .slice(1)
  // A rule ends at the next table header of any kind, so the [[headers]] section
  // after the last rule cannot lend it a field.
  .map((block) => block.split(/^\s*\[/m)[0])
  .map((block) => {
    const field = (name) => new RegExp(`^\\s*${name}\\s*=\\s*"?([^"\\n]+?)"?\\s*$`, 'm').exec(block)?.[1];
    return {
      from: field('from'),
      to: field('to'),
      status: Number(field('status') ?? 301),
      force: field('force') === 'true',
    };
  })
  .filter((r) => r.from);

const toRegex = (pattern) =>
  new RegExp(
    '^' +
      pattern
        .split('*')
        .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/:[A-Za-z]+/g, '[^/]+'))
        .join('.*') +
      '$'
  );

const pathRules = rules.filter((r) => r.from.startsWith('/')).map((r) => ({ ...r, re: toRegex(r.from) }));

// Every host the site answers on that is not the canonical origin. Read from the
// rules so a host added there is covered here without editing this file.
const otherHosts = [
  ...new Set(
    rules
      .map((r) => /^(https?:\/\/[^/]+)/.exec(r.from)?.[1])
      .filter((host) => host && host !== ORIGIN)
  ),
];

// ── The verdict for one URL ───────────────────────────────────────────────────
const isAsset = (p) => /\.[a-z0-9]{2,5}$/i.test(p);

/** Why a same-site URL would not be served at 200, or null when it is. */
function problemWith(raw) {
  let url = raw.trim();
  for (const host of otherHosts) {
    if (url === host || url.startsWith(host + '/')) return `uses the non-canonical host ${host} (the host 301s it)`;
  }
  if (url.startsWith(ORIGIN)) url = url.slice(ORIGIN.length) || '/';
  if (!url.startsWith('/') || url.startsWith('//')) return null; // external, tel:, mailto:, #fragment

  let p = url.split('#')[0].split('?')[0];
  try {
    p = decodeURIComponent(p);
  } catch {
    return 'is not valid percent-encoding';
  }
  if (p === '') return null;

  if (p !== '/' && p.endsWith('/')) return 'ends in a slash (the host 301s it to the slashless form)';

  const exists = isAsset(p) ? servedFiles.has(p) : pages.has(p);
  const rule = pathRules.find((r) => r.re.test(p) && (r.force || !exists));
  if (rule) return `matches the netlify.toml rule from ${rule.from} (${rule.status} to ${rule.to})`;

  if (!exists) {
    const lower = p.toLowerCase();
    if (lower !== p && (isAsset(lower) ? servedFiles.has(lower) : pages.has(lower))) {
      return isAsset(p)
        ? `differs only in case from ${lower} (the host serves the same file at a second URL)`
        : `differs only in case from ${lower} (the host 301s it)`;
    }
    return 'is not a page or file the build produced';
  }
  return null;
}

// ── Collect every URL the site publishes ──────────────────────────────────────
const problems = [];
const targets = new Set(); // same-site paths, for --live
let checked = 0;

function check(where, url) {
  checked++;
  const problem = problemWith(url);
  if (problem) {
    problems.push(`${where}: ${url} ${problem}`);
    return;
  }
  // Stored decoded and encoded once at fetch time. Hrefs arrive in both forms (the
  // sitemap percent-encodes Hebrew tag slugs, the HTML may not), and encoding an
  // already-encoded path turns /blog/tag/%D7... into a URL that really is a 410.
  const local = url.startsWith(ORIGIN) ? url.slice(ORIGIN.length) || '/' : url;
  if (local.startsWith('/') && !local.startsWith('//')) {
    targets.add(decodeURIComponent(local.split('#')[0].split('?')[0]));
  }
}

const decodeAttr = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

/** Every string in a JSON-LD tree that names a URL on one of our hosts. */
function jsonUrls(node, acc = []) {
  if (typeof node === 'string') {
    if (node.startsWith(ORIGIN) || otherHosts.some((h) => node.startsWith(h))) acc.push(node);
  } else if (Array.isArray(node)) {
    for (const v of node) jsonUrls(v, acc);
  } else if (node && typeof node === 'object') {
    for (const v of Object.values(node)) jsonUrls(v, acc);
  }
  return acc;
}

const SKIP_HREF = /^\/(_next|\.netlify)\//;
for (const file of [...servedFiles].filter((f) => f.endsWith('.html'))) {
  const route = file === '/index.html' ? '/' : file.slice(0, -'.html'.length);
  // The Netlify Forms stub and the Search Console verification file, exactly - an
  // unanchored match would also skip a future /blog/googleads-... post.
  if (/^\/(__forms|google[0-9a-f]+)$/.test(route)) continue;
  const html = fs.readFileSync(path.join(OUT, file), 'utf8');

  for (const [, value] of html.matchAll(/\shref="([^"]+)"/g)) {
    const url = decodeAttr(value);
    if (!SKIP_HREF.test(url)) check(route, url);
  }
  for (const [, value] of html.matchAll(/\scontent="(https?:\/\/[^"]+)"/g)) check(route, decodeAttr(value));

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      continue; // check-seo reports JSON-LD that does not parse
    }
    for (const url of jsonUrls(data)) check(`${route} (JSON-LD)`, url);
  }
}

const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) check('sitemap.xml', loc);

const llms = fs.readFileSync('public/llms.txt', 'utf8');
for (const [, url] of llms.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) check('llms.txt', url);

const robots = fs.readFileSync('public/robots.txt', 'utf8');
for (const [, url] of robots.matchAll(/^Sitemap:\s*(\S+)/gim)) check('robots.txt', url);

// ── Live ──────────────────────────────────────────────────────────────────────
let liveSummary = '';
if (LIVE) {
  const list = [...targets].sort();
  const queue = [...list];
  const worker = async () => {
    while (queue.length) {
      const p = queue.shift();
      const url = ORIGIN + encodeURI(p);
      try {
        const res = await fetch(url, { redirect: 'manual' });
        if (res.status !== 200) {
          const to = res.headers.get('location');
          problems.push(`live: ${p} answers ${res.status}${to ? ' -> ' + to : ''}`);
        }
      } catch (err) {
        problems.push(`live: ${p} could not be fetched (${err.message})`);
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));

  // Each intended permanent redirect: one hop, permanent, straight to a 200.
  const probes = [
    ...pathRules.filter((r) => [301, 308].includes(r.status) && !/[*:]/.test(r.from)).map((r) => r.from),
    '/blog/',
  ];
  for (const from of probes) {
    try {
      const first = await fetch(ORIGIN + from, { redirect: 'manual' });
      const location = first.headers.get('location');
      if (![301, 308].includes(first.status) || !location) {
        problems.push(`live redirect: ${from} answers ${first.status}, expected a single 301 or 308`);
        continue;
      }
      const next = new URL(location, ORIGIN + from).href;
      const second = await fetch(next, { redirect: 'manual' });
      if (second.status !== 200) {
        problems.push(`live redirect: ${from} -> ${next} answers ${second.status} - a chain, not one hop to a 200`);
      }
    } catch (err) {
      problems.push(`live redirect: ${from} could not be fetched (${err.message})`);
    }
  }
  liveSummary = `\n  live: ${list.length} targets answered 200; ${probes.length} intended redirect(s) are one permanent hop to a 200.`;
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} link(s) point at a redirect or a missing URL:\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error('');
  process.exit(1);
}

console.log(`✓ check-links: ${checked} URLs across ${pages.size} pages, sitemap, llms.txt and robots.txt.`);
console.log('  None ends in a slash, none hits a netlify.toml redirect, none is on a non-canonical host.' + liveSummary);
