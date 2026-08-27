// Rebuilds the guides section of public/llms.txt from the post modules.
//
// The list used to be hand-maintained and had already drifted: several entries
// carried titles the posts no longer used. Everything else in llms.txt (business
// facts, service pages, FAQ, citation policy) stays hand-written - only the block
// under the guides heading is generated.
import fs from 'node:fs';
import { readPostsMeta } from './lib/posts-meta.mjs';

const FILE = 'public/llms.txt';
const HEADING = '## מדריכים וכתבות מקצועיות';
const ORIGIN = 'https://cnafim-lauf.co.il';

const src = fs.readFileSync(FILE, 'utf8');
const eol = src.includes('\r\n') ? '\r\n' : '\n';
const lines = src.split(/\r?\n/);

const start = lines.indexOf(HEADING);
if (start === -1) throw new Error(`llms.txt: heading not found: ${HEADING}`);

// The generated block runs to the next top-level heading, or to end of file.
let end = lines.length;
for (let i = start + 1; i < lines.length; i++) {
  if (lines[i].startsWith('## ')) {
    end = i;
    break;
  }
}

// Newest first: that is the order a reader (or a model) benefits from most.
const posts = readPostsMeta().sort((a, b) => (a.lastmod < b.lastmod ? 1 : a.lastmod > b.lastmod ? -1 : 0));

const entries = posts.map((p) => {
  const summary = (p.description || '').replace(/\s+/g, ' ').trim();
  return `- [${p.title}](${ORIGIN}/blog/${p.slug}): ${summary}`;
});

// The archive pointer always closes the section.
entries.push(`- [כל המדריכים והכתבות](${ORIGIN}/blog): ארכיון הבלוג המלא של גאולה אלון.`);

// Preserve any hand-written prose that sat inside the section alongside the list.
const tail = lines
  .slice(start + 1, end)
  .filter((l) => l.trim() && !l.trimStart().startsWith('- ['));

const rebuilt = [
  ...lines.slice(0, start + 1),
  '',
  ...entries,
  ...(tail.length ? ['', ...tail] : []),
  '',
  ...lines.slice(end),
];

const out = rebuilt.join(eol);
if (out !== src) {
  fs.writeFileSync(FILE, out, 'utf8');
  console.log(`✓ llms.txt: ${entries.length} guides refreshed`);
} else {
  console.log(`✓ llms.txt: already current (${entries.length} guides)`);
}
