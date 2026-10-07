/**
 * Generates public/sitemap.xml. Wired to `prebuild`, so the file is never
 * hand-maintained and cannot drift from the routes that actually exist.
 *
 * Rules this encodes (they are what Search Console complains about otherwise):
 *   - no trailing slash on any URL except the site root; the host 301s the
 *     slashed form, and a sitemap entry that redirects does not get indexed
 *   - only tag archives above the indexing threshold are listed; the thin ones
 *     stay noindex and out of the file
 *   - a video is listed as <video:video> on its watch page (/videos/<slug>) and
 *     nowhere else, from the same src/content/videos.json the page's VideoObject
 *     is built from, so the sitemap and the markup cannot disagree
 *
 * lastmod:
 *   - blog posts use their own lastModified ?? date from src/lib/blog.ts. The
 *     git date of blog.ts would stamp all twelve posts with whenever that file
 *     was last touched for any reason, which is not true of the articles.
 *   - every other route uses the last commit date of its source file
 *     (git log -1 --format=%cs), falling back to today when there is no history
 *     (e.g. a brand-new file that is not committed yet).
 */
import fs from 'node:fs';
import { readPostsMeta, readIndexableTags, tagToSlug } from './lib/posts-meta.mjs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ORIGIN = 'https://cnafim-lauf.co.il';
const OUT = 'public/sitemap.xml';
const TODAY = new Date().toISOString().slice(0, 10);

/** Last commit date (YYYY-MM-DD) for a path, or today if unknown. */
function gitDate(file) {
  if (!fs.existsSync(file)) return TODAY;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : TODAY;
  } catch {
    return TODAY;
  }
}

// ── Static routes, in the order they should appear ────────────────────────────
const STATIC_ROUTES = [
  { path: '/',                    source: 'src/app/page.tsx',                     changefreq: 'monthly', priority: '1.0' },
  { path: '/metapel-regashi',     source: 'src/app/metapel-regashi/page.tsx',     changefreq: 'monthly', priority: '0.9' },
  { path: '/avchun-didakti',      source: 'src/app/avchun-didakti/page.tsx',      changefreq: 'monthly', priority: '0.9' },
  { path: '/hadrachat-horim',     source: 'src/app/hadrachat-horim/page.tsx',     changefreq: 'monthly', priority: '0.8' },
  { path: '/hartzaot',            source: 'src/app/hartzaot/page.tsx',            changefreq: 'monthly', priority: '0.8' },
  { path: '/klafim',              source: 'src/app/klafim/page.tsx',              changefreq: 'monthly', priority: '0.8' },
  { path: '/tipul-regashi-bezoom', source: 'src/app/tipul-regashi-bezoom/page.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog',                source: 'src/app/blog/page.tsx',                changefreq: 'weekly',  priority: '0.9' },
  { path: '/methods/cbt',         source: 'src/app/methods/cbt/page.tsx',         changefreq: 'monthly', priority: '0.8' },
  { path: '/methods/emr',         source: 'src/app/methods/emr/page.tsx',         changefreq: 'monthly', priority: '0.8' },
  { path: '/methods/nlp',         source: 'src/app/methods/nlp/page.tsx',         changefreq: 'monthly', priority: '0.8' },
  { path: '/methods/remedial',    source: 'src/app/methods/remedial/page.tsx',    changefreq: 'monthly', priority: '0.8' },
];

const FEATURE_SLUGS = ['personalization', 'safe-space', 'parent-involvement', 'focused-processes', 'discretion'];
const FEATURES_SOURCE = 'src/app/features/[slug]/page.tsx';

const LEGAL_ROUTES = [
  { path: '/accessibility', source: 'src/app/accessibility/page.tsx', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy',       source: 'src/app/privacy/page.tsx',       changefreq: 'yearly', priority: '0.3' },
];

// Long-form guides (post.pillar) carry the site's ranking effort, so they outrank
// ordinary posts. These two predate the pillar flag and keep their standing.
const POST_PRIORITY = {
  'avchun-didakti-madrich-horim': '0.8',
  'eich-livchor-metapel-regashi-layeled': '0.8',
};
const priorityOf = (post) => POST_PRIORITY[post.slug] ?? (post.pillar ? '0.8' : '0.7');

// ── Blog posts ─────────────────────────────────────────────────────────────
// readPostsMeta() keeps src/content/posts/index.ts order, which is the order the
// sitemap has always used.

// ── Build the entry list ──────────────────────────────────────────────────────
const posts = readPostsMeta();

// Each video's watch page carries its <video:video> block. Pages that merely show
// the player are not listed with it: Google indexes a video only from the page
// whose main content it is (see src/lib/videos.ts).
const VIDEOS = JSON.parse(fs.readFileSync('src/content/videos.json', 'utf8'));
const videoEntries = VIDEOS.map((v) => ({
  path: `/videos/${v.slug}`,
  changefreq: 'monthly',
  priority: '0.6',
  lastmod: gitDate(`src/app/videos/${v.slug}/page.tsx`),
  video: v,
}));

// Tag archives that carry enough posts to be worth indexing. The path is
// percent-encoded because Next renders the canonical that way, and a sitemap
// <loc> that differs from the page's own canonical is a mismatch Google reports.
const tagEntries = readIndexableTags(posts).map((t) => ({
  path: '/blog/tag/' + encodeURIComponent(tagToSlug(t.tag)),
  changefreq: 'weekly',
  priority: '0.5',
  lastmod: t.lastmod,
}));

const entries = [
  ...STATIC_ROUTES.map((r) => ({ ...r, lastmod: gitDate(r.source) })),
  ...videoEntries,
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    changefreq: 'monthly',
    priority: priorityOf(p),
    lastmod: p.lastmod,
  })),
  ...FEATURE_SLUGS.map((slug) => ({
    path: `/features/${slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: gitDate(FEATURES_SOURCE),
  })),
  ...tagEntries,
  ...LEGAL_ROUTES.map((r) => ({ ...r, lastmod: gitDate(r.source) })),
];

// ── Guards: fail the build rather than ship a bad sitemap ─────────────────────
for (const e of entries) {
  if (e.path !== '/' && e.path.endsWith('/')) throw new Error(`trailing slash: ${e.path}`);
  if (e.path.startsWith('/blog/tag/') && !tagEntries.includes(e)) {
    throw new Error(`tag archive below the indexing threshold: ${e.path}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.lastmod)) throw new Error(`bad lastmod on ${e.path}: ${e.lastmod}`);
}
const dupes = entries.map((e) => e.path).filter((p, i, a) => a.indexOf(p) !== i);
if (dupes.length) throw new Error(`duplicate URLs: ${dupes.join(', ')}`);

for (const v of VIDEOS) {
  const page = `src/app/videos/${v.slug}/page.tsx`;
  if (!fs.existsSync(page)) throw new Error(`video ${v.slug}: no watch page at ${page}`);
  for (const file of [v.contentPath, v.thumbnailPath]) {
    if (!fs.existsSync(path.join('public', file))) throw new Error(`video ${v.slug}: ${file} is not in public/`);
  }
  if (!Number.isInteger(v.durationSeconds) || v.durationSeconds < 1) {
    throw new Error(`video ${v.slug}: durationSeconds must be a whole number of seconds`);
  }
  if (v.description.length > 2048) throw new Error(`video ${v.slug}: description over Google's 2048-char limit`);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(v.uploadDate)) {
    throw new Error(`video ${v.slug}: uploadDate needs a full W3C datetime with timezone`);
  }
}

const xmlEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const videoXml = (v) => [
  '    <video:video>',
  `      <video:thumbnail_loc>${ORIGIN}${v.thumbnailPath}</video:thumbnail_loc>`,
  `      <video:title>${xmlEscape(v.title)}</video:title>`,
  `      <video:description>${xmlEscape(v.description)}</video:description>`,
  `      <video:content_loc>${ORIGIN}${v.contentPath}</video:content_loc>`,
  `      <video:duration>${v.durationSeconds}</video:duration>`,
  `      <video:publication_date>${v.uploadDate}</video:publication_date>`,
  '      <video:family_friendly>yes</video:family_friendly>',
  '    </video:video>',
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
  ...entries.map((e) =>
    [
      '  <url>',
      `    <loc>${ORIGIN}${e.path === '/' ? '/' : e.path}</loc>`,
      `    <lastmod>${e.lastmod}</lastmod>`,
      `    <changefreq>${e.changefreq}</changefreq>`,
      `    <priority>${e.priority}</priority>`,
      ...(e.video ? videoXml(e.video) : []),
      '  </url>',
    ].join('\n')
  ),
  '</urlset>',
  '',
].join('\n');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, xml, 'utf8');
console.log(`✓ sitemap: ${entries.length} URLs, ${VIDEOS.length} video(s) -> ${OUT}`);
