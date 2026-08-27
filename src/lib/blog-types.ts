// Blog content model. Types only - this module must never gain a value import,
// because build scripts import it directly under Node's type-stripping.

export type ContentBlock =
  | { type: 'intro';  text: string }
  /** `id` overrides the auto-generated anchor; set it when reworded text would
   *  otherwise break an anchor someone may have shared. */
  | { type: 'h2';     text: string; id?: string }
  | { type: 'h3';     text: string; id?: string }
  | { type: 'p';      text: string }
  | { type: 'ul';     items: string[] }
  | { type: 'ol';     items: string[] }
  | { type: 'quote';  text: string }
  | { type: 'tip';    text: string }
  /** Scannable summary, placed right after the intro on long guides. */
  | { type: 'takeaways'; title?: string; items: string[] }
  /** Comparison table. `rows[i].length` must equal `head.length`. */
  | { type: 'table'; caption?: string; head: string[]; rows: string[][]; note?: string };

export type FaqItem = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  readingMinutes: number;
  excerpt: string;
  primaryKeyword: string;
  tags: string[];
  content: ContentBlock[];
  /** Marks a long-form guide: held to the >=1600-word bar and given sitemap priority. */
  pillar?: true;
  faq?: FaqItem[];
  /** Authoritative external sources shown under articles that make clinical claims. */
  sources?: { label: string; url: string }[];
};
