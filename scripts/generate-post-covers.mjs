/**
 * Renders a branded 1200x630 cover image for every blog post into public/og/.
 *
 *   node scripts/generate-post-covers.mjs          # only missing covers
 *   node scripts/generate-post-covers.mjs --all    # re-render everything
 *
 * Why this is NOT wired into prebuild: it drives a real browser (Edge) to lay
 * out Hebrew RTL text, and the Netlify build image has no browser. Covers are
 * generated here and committed, like public/og-image.jpg before them.
 *
 * Why a browser at all: sharp's SVG renderer does not do Hebrew bidi text or
 * line breaking, and these titles are long Hebrew sentences that have to wrap.
 *
 * Every post shared one og:image, so a link to any article previewed as the
 * site logo and Article.image was the same file on all 22 posts. Each post now
 * has its own card carrying its own title.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { readPostsMeta } from './lib/posts-meta.mjs';

const require = createRequire(path.resolve('package.json'));
const { chromium } = require('playwright-core');
const sharp = require('sharp');

const OUT_DIR = 'public/og';
const WIDTH = 1200;
const HEIGHT = 630;
const ALL = process.argv.includes('--all');

// Brand tokens, kept in step with src/lib/tokens.ts by hand - this script runs
// outside the TypeScript build and cannot import it.
const C = { cream: '#FFF0F5', creamAlt: '#FCE4EF', rose: '#C01880', indigo: '#3949AB', textMid: '#5C4A6E', border: '#F8BBD9' };

const logo = `data:image/jpeg;base64,${fs.readFileSync('public/logo.jpg').toString('base64')}`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Long titles get a smaller face so every card keeps the same visual weight. */
const titleSize = (title) => (title.length <= 40 ? 64 : title.length <= 52 ? 56 : 48);

const template = (post) => `<!doctype html>
<html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  /* The card is its own clipped box and is screenshotted as an element. Putting
     overflow:hidden on <body> instead does NOT clip: the browser propagates a
     body overflow to the viewport, so the decorative circle below widened the
     scroll area and pushed the capture sideways. */
  .card {
    width: ${WIDTH}px; height: ${HEIGHT}px; display: flex; flex-direction: column;
    justify-content: space-between; padding: 64px 72px;
    font-family: Heebo, 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, ${C.cream} 0%, ${C.creamAlt} 100%);
    position: relative; overflow: hidden;
  }
  .edge { position: absolute; top: 0; right: 0; width: 14px; height: 100%;
          background: linear-gradient(to bottom, ${C.rose}, ${C.indigo}); }
  .glow { position: absolute; left: -140px; bottom: -180px; width: 460px; height: 460px;
          border-radius: 50%; background: ${C.border}; opacity: .5; }
  .eyebrow { font-size: 26px; font-weight: 500; letter-spacing: .14em; color: ${C.rose}; }
  h1 { font-size: ${titleSize(post.title)}px; font-weight: 500; line-height: 1.32;
       color: ${C.indigo}; letter-spacing: -0.02em; max-width: 1000px; z-index: 1; }
  .foot { display: flex; align-items: center; justify-content: space-between; z-index: 1; }
  .by { font-size: 28px; font-weight: 400; color: ${C.textMid}; }
  .by b { font-weight: 600; color: ${C.indigo}; }
  img { height: 84px; width: auto; mix-blend-mode: multiply; }
</style></head>
<body>
  <div class="card">
    <div class="edge"></div><div class="glow"></div>
    <div class="eyebrow">${esc(post.tags[0] ?? 'מדריך להורים')}</div>
    <h1>${esc(post.title)}</h1>
    <div class="foot">
      <div class="by"><b>גאולה אלון</b> · מטפלת רגשית ומאבחנת לימודית</div>
      <img src="${logo}" alt="">
    </div>
  </div>
</body></html>`;

const posts = readPostsMeta();
fs.mkdirSync(OUT_DIR, { recursive: true });

const todo = posts.filter((p) => ALL || !fs.existsSync(path.join(OUT_DIR, `${p.slug}.jpg`)));
if (!todo.length) {
  console.log(`✓ covers: all ${posts.length} already present (use --all to re-render)`);
  process.exit(0);
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });

for (const post of todo) {
  await page.setContent(template(post), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.locator('.card').screenshot({ type: 'png' });
  const file = path.join(OUT_DIR, `${post.slug}.jpg`);
  await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(file);
  console.log(`  ${post.slug}.jpg  ${(fs.statSync(file).size / 1024).toFixed(0)}KB`);
}

await browser.close();
console.log(`✓ covers: ${todo.length} rendered -> ${OUT_DIR}/`);
