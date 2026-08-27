const BASE_URL = 'https://cnafim-lauf.co.il';

// The content model lives in ./blog-types (types only, so build scripts can import
// it), and each post is its own module under src/content/posts. This file keeps the
// public surface unchanged: every consumer still imports types, allPosts and the
// helpers below from '@/lib/blog'.
export type { ContentBlock, FaqItem, Post } from './blog-types';
import type { Post } from './blog-types';
export { allPosts } from '../content/posts';
import { allPosts } from '../content/posts';

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): { slug: string }[] {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export function canonicalUrl(slug: string): string {
  return `${BASE_URL}/blog/${slug}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Posts newest first - the listing should not depend on array order. */
export function getPostsSorted(): Post[] {
  return [...allPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Every tag used across the blog, with how many posts carry it. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of allPosts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'he'));
}

export function getPostsByTag(tag: string): Post[] {
  return getPostsSorted().filter((p) => p.tags.includes(tag));
}

/**
 * Slug for a tag, and the reverse lookup.
 *
 * Deliberately NOT percent-encoded: generateStaticParams writes one file per
 * slug, so an encoded slug produces a file literally named "%D7%90...html",
 * while the browser decodes the URL before requesting it and asks for the
 * Hebrew filename instead - a 404. Keeping the raw characters makes the two
 * sides agree; the browser encodes on the wire and the host decodes back.
 */
export function tagToSlug(tag: string): string {
  // Lowercase is the single canonical form: the host case-normalises URLs with
  // a 301, so an uppercase slug (/blog/tag/NLP) would make internal links pass
  // through a redirect and leave the canonical pointing at a redirecting URL -
  // Google then discovers both variants as separate duplicate pages.
  return tag.replace(/\s+/g, '-').toLowerCase();
}

export function slugToTag(slug: string): string | undefined {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Already decoded, or not valid percent-encoding - use as-is.
  }
  // Case-insensitive: the display label keeps its original casing (CBT), only
  // the URL form is lowercased.
  const normalised = decoded.replace(/-/g, ' ').toLowerCase();
  return getAllTags().find(({ tag }) => tag.toLowerCase() === normalised)?.tag;
}

export function getAllTagSlugs(): { tag: string }[] {
  // Dedupe by normalised slug so two labels can never mint two pages.
  return [...new Set(getAllTags().map(({ tag }) => tagToSlug(tag)))].map((tag) => ({ tag }));
}

/**
 * Posts most related to the given one, ranked by how many tags they share.
 * Used to end an article with something relevant instead of the same two links.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return getPostsSorted()
    .filter((p) => p.slug !== slug && p.content.length > 0)
    .map((p) => ({ post: p, shared: p.tags.filter((t) => current.tags.includes(t)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((x) => x.post);
}
