// Text helpers shared by the blog renderer and the build scripts.
//
// Deliberately dependency-free and value-import-free apart from the type import
// below, so `node` can load it directly under type-stripping.
import type { ContentBlock, FaqItem } from './blog-types';

/** Strips the inline markdown-lite the renderer understands: **bold** and [text](/url). */
export function stripInline(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

/**
 * Anchor id for a heading, derived from its Hebrew text.
 *
 * Hebrew ids are valid HTML5 and browsers show them decoded. Fragments are never
 * sent to the server, so the host's URL normalisation cannot interfere. Text-derived
 * ids beat index-derived ones (`s-1`) because inserting a section mid-article does
 * not silently repoint every anchor below it.
 */
export function headingId(text: string, used: Set<string>, fallbackIndex: number): string {
  const base =
    stripInline(text)
      .normalize('NFC')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase() || 'section-' + fallbackIndex;

  let id = base;
  let n = 2;
  while (used.has(id)) id = base + '-' + n++;
  used.add(id);
  return id;
}

export type Heading = { index: number; id: string; text: string; level: 2 | 3 };

/** Every h2/h3 in order, with a unique anchor id each. */
export function getHeadings(content: ContentBlock[]): Heading[] {
  const used = new Set<string>();
  const out: Heading[] = [];
  content.forEach((block, index) => {
    if (block.type !== 'h2' && block.type !== 'h3') return;
    const id = block.id ?? headingId(block.text, used, index);
    if (block.id) used.add(block.id);
    out.push({ index, id, text: stripInline(block.text), level: block.type === 'h2' ? 2 : 3 });
  });
  return out;
}

/** All authored prose in a post body, markdown-lite removed. */
export function plainText(content: ContentBlock[]): string {
  const parts: string[] = [];
  for (const block of content) {
    switch (block.type) {
      case 'ul':
      case 'ol':
      case 'takeaways':
        parts.push(...block.items);
        break;
      case 'table':
        if (block.caption) parts.push(block.caption);
        parts.push(...block.head, ...block.rows.flat());
        if (block.note) parts.push(block.note);
        break;
      default:
        parts.push(block.text);
    }
  }
  return stripInline(parts.join(' '));
}

/** Words containing at least one Hebrew letter - the honest length of a Hebrew article. */
export function countHebrewWords(text: string): number {
  return text.split(/\s+/).filter((w) => /[\u0590-\u05FF]/.test(w)).length;
}

/**
 * Reading time at roughly 180 Hebrew words per minute, floored at 1.
 *
 * FAQ text counts: it is on the page and readers read it. The word-count gate for
 * pillar articles deliberately does NOT count it - that one measures the body.
 */
export function readingMinutesFor(content: ContentBlock[], faq?: FaqItem[]): number {
  const faqText = (faq ?? []).map((item) => item.q + ' ' + item.a).join(' ');
  const words = countHebrewWords(plainText(content)) + countHebrewWords(faqText);
  return Math.max(1, Math.round(words / 180));
}
