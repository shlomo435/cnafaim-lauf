// Shared reader for blog post metadata, used by generate-sitemap and generate-llms.
//
// Reads each post module separately instead of scanning one big file with a windowed
// match. That removes the old failure mode where a long description could push
// `date:` out of the search window and silently drop a post from the sitemap: here
// every field is either found or the build throws.
import fs from 'node:fs';

const DIR = 'src/content/posts';
const NL = '\n';
const BACKSLASH = '\\';

const isDate = (v) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(v);

/**
 * Value of a top-level field written plainly on one line, e.g.
 *   date: '2026-01-01',
 * Both quote styles are accepted - a double-quoted value that was silently
 * ignored here would put a stale lastmod in the sitemap with no error.
 */
function plainField(src, name, validate) {
  const line = src.split(NL).find((l) => l.startsWith('  ' + name + ':'));
  if (!line) return undefined;
  const quote = line.includes("'") ? "'" : line.includes('"') ? '"' : null;
  if (!quote) return undefined;
  const value = line.slice(line.indexOf(quote) + 1, line.lastIndexOf(quote));
  return validate && !validate(value) ? undefined : value;
}

/**
 * Value of a top-level field written as a quoted string. The value may sit on the
 * following line and may contain escaped quotes, so it is scanned character by
 * character rather than matched with an escape-heavy regex.
 *
 * Both quote styles are accepted: a Hebrew title containing an apostrophe (כיתה א')
 * is naturally written with double quotes, and reading only single-quoted strings
 * would silently drop that post from the sitemap.
 */
function quotedField(src, name) {
  const lines = src.split(NL);
  const head = lines.findIndex((l) => l.startsWith('  ' + name + ':'));
  if (head === -1) return undefined;
  const joined = lines.slice(head, head + 2).join(' ');

  const afterColon = joined.indexOf(':') + 1;
  let open = -1;
  let quote = '';
  for (let i = afterColon; i < joined.length; i++) {
    if (joined[i] === "'" || joined[i] === '"') {
      open = i;
      quote = joined[i];
      break;
    }
    // Anything other than whitespace before the opening quote means this is not
    // a plain quoted string (an array, an object, a template literal).
    if (joined[i].trim() !== '') return undefined;
  }
  if (open === -1) return undefined;

  let out = '';
  for (let i = open + 1; i < joined.length; i++) {
    const ch = joined[i];
    if (ch === BACKSLASH) {
      out += joined[i + 1] ?? '';
      i++;
      continue;
    }
    if (ch === quote) return out;
    out += ch;
  }
  return undefined;
}

export function readPostsMeta() {
  const index = fs.readFileSync(DIR + '/index.ts', 'utf8');
  const order = [...index.matchAll(/from '[.][/]([A-Za-z0-9-]+)'/g)].map((m) => m[1]);
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
    .map((f) => f.slice(0, -3));

  if (!order.length) throw new Error('posts/index.ts: no post imports found');
  const unregistered = files.filter((f) => !order.includes(f));
  if (unregistered.length) throw new Error('post files missing from index.ts: ' + unregistered.join(', '));
  const ghosts = order.filter((s) => !files.includes(s));
  if (ghosts.length) throw new Error('index.ts imports missing files: ' + ghosts.join(', '));

  return order.map((slug) => {
    const src = fs.readFileSync(DIR + '/' + slug + '.ts', 'utf8');
    const declared = plainField(src, 'slug');
    const date = plainField(src, 'date', isDate);
    const lastModified = plainField(src, 'lastModified', isDate);
    const title = quotedField(src, 'title');
    const description = quotedField(src, 'description');
    const pillar = src.split(NL).some((l) => l.startsWith('  pillar: true'));

    if (declared !== slug) throw new Error(slug + '.ts: slug does not match filename');
    if (!date) throw new Error(slug + '.ts: missing or malformed date');
    if (!title) throw new Error(slug + '.ts: could not read title');
    if (!description) throw new Error(slug + '.ts: could not read description');

    return { slug, title, description, date, lastmod: lastModified ?? date, pillar };
  });
}
