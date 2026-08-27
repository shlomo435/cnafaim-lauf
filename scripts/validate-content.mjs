// Content quality gate for blog posts. Local-only: it imports the post modules
// directly, which needs Node >= 22.18 type-stripping. Deliberately NOT wired into
// `prebuild`, because this repo does not pin the Netlify build image's Node version.
//
//   npm run check:content              report problems, exit 1 on any error
//   npm run check:content -- --words   also print the word-count table
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { readPostsMeta } from './lib/posts-meta.mjs';

if (!process.features.typescript) {
  console.error('check:content needs Node >= 22.18 (native TypeScript type-stripping).');
  process.exit(1);
}

const DIR = 'src/content/posts';
const PILLAR_MIN_WORDS = 1600;

const errors = [];
const warnings = [];
const fail = (slug, msg) => errors.push(slug + ': ' + msg);
const warn = (slug, msg) => warnings.push(slug + ': ' + msg);

const text = await import(pathToFileURL(path.resolve('src/lib/blog-text.ts')).href);

// Routes an in-body link may point at, besides /blog/<slug> and #fragments.
const ROUTES = new Set([
  '/', '/blog', '/accessibility', '/privacy',
  '/metapel-regashi', '/hadrachat-horim', '/avchun-didakti', '/hartzaot',
  '/klafim', '/tipul-regashi-bezoom',
  '/methods/cbt', '/methods/emr', '/methods/nlp', '/methods/remedial',
  '/features/personalization', '/features/safe-space', '/features/parent-involvement',
  '/features/focused-processes', '/features/discretion',
]);

const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

/** Every string a human authored in a post: block text, list items, table cells, FAQ. */
function authoredStrings(post) {
  const out = [];
  for (const b of post.content) {
    if (b.text) out.push(b.text);
    if (b.items) out.push(...b.items);
    if (b.head) out.push(...b.head);
    if (b.rows) out.push(...b.rows.flat());
    if (b.caption) out.push(b.caption);
    if (b.note) out.push(b.note);
  }
  for (const f of post.faq ?? []) out.push(f.q, f.a);
  return out;
}

// The canonical tag set. Before this was fixed, 28 ad-hoc tags produced 21
// single-post archives and left getRelatedPosts with almost nothing to match on.
// Adding a tag is a deliberate decision: edit this list, do not invent one in a post.
const TAGS = new Set([
  'חרדה',
  'ויסות רגשי',
  'בית ספר ולמידה',
  'אבחון והוראה מתקנת',
  'דימוי עצמי וביטחון',
  'הורות',
  'שיטות טיפול',
  'נשים',
  'נערות',
]);

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
const posts = [];
for (const file of files) {
  const mod = await import(pathToFileURL(path.resolve(DIR, file)).href);
  if (!mod.post) {
    fail(file, 'does not export a `post` const');
    continue;
  }
  posts.push({ file, post: mod.post });
}

const slugs = new Set();
const titles = new Map();
const descriptions = new Map();
const rows = [];

for (const { file, post } of posts) {
  const s = post.slug;

  if (file !== s + '.ts') fail(s, 'filename ' + file + ' does not match slug');
  if (slugs.has(s)) fail(s, 'duplicate slug');
  slugs.add(s);

  if (titles.has(post.title)) fail(s, 'title duplicates ' + titles.get(post.title));
  titles.set(post.title, s);
  if (descriptions.has(post.description)) fail(s, 'description duplicates ' + descriptions.get(post.description));
  descriptions.set(post.description, s);

  if (post.title.length > 60) fail(s, 'title is ' + post.title.length + ' chars (max 60)');
  if (post.description.length < 100 || post.description.length > 160) {
    warn(s, 'description is ' + post.description.length + ' chars (aim 100-160)');
  }

  // The primary keyword has to appear where it actually counts.
  const kw = post.primaryKeyword.toLowerCase();
  const intro = post.content.find((b) => b.type === 'intro');
  const h2s = post.content.filter((b) => b.type === 'h2');
  const has = (v) => (v || '').toLowerCase().includes(kw);
  if (!has(post.title)) warn(s, 'primaryKeyword missing from title');
  if (!intro || !has(intro.text)) warn(s, 'primaryKeyword missing from intro');
  if (!h2s.some((b) => has(b.text))) warn(s, 'primaryKeyword missing from every h2');

  if (post.lastModified && post.lastModified < post.date) fail(s, 'lastModified precedes date');

  if (!post.tags?.length) fail(s, 'has no tags');
  for (const tag of post.tags ?? []) {
    if (!TAGS.has(tag)) fail(s, `tag "${tag}" is not in the canonical set`);
  }
  if ((post.tags?.length ?? 0) > 4) warn(s, `${post.tags.length} tags (keep it to 4)`);

  const words = text.countHebrewWords(text.plainText(post.content));
  const minutes = text.readingMinutesFor(post.content, post.faq);
  if (post.readingMinutes !== minutes) {
    fail(s, 'readingMinutes is ' + post.readingMinutes + ' but content computes to ' + minutes);
  }

  if (post.pillar) {
    if (words < PILLAR_MIN_WORDS) fail(s, 'pillar post has ' + words + ' words (min ' + PILLAR_MIN_WORDS + ')');
    if (h2s.length < 6) fail(s, 'pillar post has ' + h2s.length + ' h2 headings (min 6)');
    if (!post.faq || post.faq.length < 4) fail(s, 'pillar post needs at least 4 FAQ entries');
    if (!post.content.some((b) => b.type === 'takeaways')) warn(s, 'pillar post has no takeaways block');
  }

  const seen = new Set();
  for (const h of text.getHeadings(post.content)) {
    if (seen.has(h.id)) fail(s, 'duplicate heading id ' + h.id);
    seen.add(h.id);
  }

  for (const b of post.content) {
    if (b.type !== 'table') continue;
    for (const [i, row] of b.rows.entries()) {
      if (row.length !== b.head.length) {
        fail(s, 'table row ' + i + ' has ' + row.length + ' cells but head has ' + b.head.length);
      }
    }
  }

  // A link nested inside bold is swallowed by renderText's single-pass split:
  // the bold alternative matches first, so the reader sees raw markdown and the
  // link never reaches the DOM. The link-target check below cannot see this,
  // because the href is still present in the source string.
  for (const authored of authoredStrings(post)) {
    if (/\*\*[^*]*\]\([^)]*\)[^*]*\*\*/.test(authored)) {
      fail(s, `a [link](/x) nested inside **bold** renders as literal text: ${authored.slice(0, 90)}`);
    }
  }

  // Every in-body link must resolve to a real route or post.
  for (const m of JSON.stringify(post.content).matchAll(LINK_RE)) {
    const href = m[1];
    if (/^(https?:|#|tel:|mailto:)/.test(href)) continue;
    const target = href.split('#')[0];
    if (target.startsWith('/blog/')) {
      if (!files.includes(target.slice('/blog/'.length) + '.ts')) fail(s, 'link to missing post: ' + href);
    } else if (!ROUTES.has(target)) {
      fail(s, 'link to unknown route: ' + href);
    }
  }

  rows.push({ slug: s, words, minutes, pillar: Boolean(post.pillar) });
}

// The regex reader that feeds the sitemap must agree with the real modules; a
// formatting drift that silently changed a sitemap URL would otherwise go unseen.
try {
  const meta = readPostsMeta();
  const bySlug = new Map(posts.map(({ post }) => [post.slug, post]));
  if (meta.length !== posts.length) {
    fail('index.ts', 'sitemap reader sees ' + meta.length + ' posts but ' + posts.length + ' modules exist');
  }
  for (const m of meta) {
    const post = bySlug.get(m.slug);
    if (!post) {
      fail(m.slug, 'sitemap reader saw a slug with no module');
      continue;
    }
    if (m.title !== post.title) fail(m.slug, 'sitemap reader read a different title - check field formatting');
    if (m.description !== post.description) fail(m.slug, 'sitemap reader read a different description - check field formatting');
    if (m.date !== post.date) fail(m.slug, 'sitemap reader read a different date');
    if (m.lastmod !== (post.lastModified || post.date)) fail(m.slug, 'sitemap reader read a different lastmod');
  }
} catch (err) {
  fail('index.ts', 'sitemap reader threw: ' + err.message);
}

if (process.argv.includes('--words')) {
  rows.sort((a, b) => b.words - a.words);
  console.log('\nwords  min  pillar  slug');
  for (const r of rows) {
    console.log(
      String(r.words).padStart(5),
      String(r.minutes).padStart(4),
      r.pillar ? '  yes  ' : '   -   ',
      r.slug
    );
  }
  console.log();
}

for (const w of warnings) console.warn('warn  ' + w);
for (const e of errors) console.error('ERROR ' + e);

if (errors.length) {
  console.error('\ncheck:content failed with ' + errors.length + ' error(s).');
  process.exit(1);
}
console.log('check:content passed: ' + posts.length + ' posts, ' + warnings.length + ' warning(s).');
