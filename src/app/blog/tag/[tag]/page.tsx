import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { C } from '../../../../lib/tokens';
import { canonicalMeta } from '../../../../lib/site';
import {
  getAllTagSlugs,
  getPostsByTag,
  slugToTag,
  tagToSlug,
  getAllTags,
  formatDate,
  type Post,
} from '../../../../lib/blog';

export function generateStaticParams() {
  return getAllTagSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = slugToTag(tagSlug);
  if (!tag) return { title: 'נושא לא נמצא | כנפיים לעוף' };
  return {
    title: `${tag} - מדריכים וכתבות | כנפיים לעוף`,
    description: `כל המדריכים והכתבות בנושא ${tag}, מאת גאולה אלון - מטפלת רגשית ומאבחנת לימודית.`,
    ...canonicalMeta(`/blog/tag/${tagSlug}`),
    // Tag archives exist for readers, not for search: most hold a single post,
    // so indexing them would add thin, near-duplicate pages. `follow` still lets
    // link equity reach the articles, and they stay out of the sitemap.
    robots: { index: false, follow: true },
  };
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-2xl p-6 border flex flex-col gap-4 transition-all duration-300 hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(57,73,171,0.08)] hover:-translate-y-1"
      style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
    >
      <h2 className="font-display text-lg md:text-xl font-medium leading-snug text-right" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
        {post.title}
      </h2>
      <p
        className="text-sm font-light leading-[1.8] text-right flex-1"
        style={{ color: C.textMid, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}
      >
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ borderColor: C.borderLight }}>
        <span className="font-medium" style={{ color: C.rose }}>קראו עוד ←</span>
        <div className="flex items-center gap-2 font-light" style={{ color: C.textLight }}>
          <span>{post.readingMinutes} דקות קריאה</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function TagArchivePage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const tag = slugToTag(tagSlug);

  if (!tag) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ backgroundColor: C.cream }}>
        <p className="text-2xl font-light mb-6" style={{ color: C.textMid }}>הנושא לא נמצא</p>
        <Link href="/blog" className="text-sm font-medium underline" style={{ color: C.rose }}>חזרה לבלוג</Link>
      </div>
    );
  }

  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'rgba(255,240,245,0.97)', borderColor: C.borderLight }}>
        <div className="max-w-5xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo.jpg" alt="כנפיים לעוף" width={168} height={56} className="h-14 w-auto object-contain" style={{ maxWidth: 168, mixBlendMode: 'multiply' }} priority />
          </Link>
          <Link href="/blog" className="text-sm font-light transition-colors hover:text-[#C01880]" style={{ color: C.textMid }}>
            ← כל הכתבות
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <nav className="flex items-center gap-2 text-xs mb-8 justify-end flex-wrap" style={{ color: C.textLight }} aria-label="נתיב ניווט">
          <Link href="/" className="hover:underline" style={{ color: C.rose }}>בית</Link>
          <span>/</span>
          <Link href="/blog" className="hover:underline" style={{ color: C.rose }}>בלוג</Link>
          <span>/</span>
          <span>{tag}</span>
        </nav>

        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-[0.2em] mb-3" style={{ color: C.rose }}>נושא</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-3" style={{ color: C.textDark, letterSpacing: '-0.025em' }}>
            {tag}
          </h1>
          <p className="text-[1.05rem] font-light" style={{ color: C.textMid }}>
            {posts.length === 1 ? 'כתבה אחת בנושא זה' : `${posts.length} כתבות בנושא זה`}
          </p>
          <div className="w-16 h-px mt-6 mx-auto" style={{ backgroundColor: C.border }} />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* All other topics */}
        <section className="mt-14 pt-10 border-t text-center" style={{ borderColor: C.border }}>
          <h2 className="font-display text-xl font-medium mb-5" style={{ color: C.textDark }}>נושאים נוספים</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags
              .filter((t) => t.tag !== tag)
              .map(({ tag: t, count }) => (
                <Link
                  key={t}
                  href={`/blog/tag/${tagToSlug(t)}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:border-[#3949AB] hover:-translate-y-0.5"
                  style={{ backgroundColor: C.creamAlt, color: C.textMid, border: `1px solid ${C.border}` }}
                >
                  {t} ({count})
                </Link>
              ))}
          </div>
        </section>

        <div className="mt-12 rounded-2xl p-8 text-center border" style={{ backgroundColor: C.creamAlt, borderColor: C.border }}>
          <p className="text-[1.05rem] font-light leading-[1.8] mb-5" style={{ color: C.textMid }}>
            יש לכם שאלה ספציפית שלא מצאתם עליה תשובה? גאולה שמחה לשוחח.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: C.rose, boxShadow: '0 6px 20px rgba(192,24,128,0.22)' }}
          >
            לשיחת היכרות עם גאולה
          </Link>
        </div>
      </main>

      {/* Site footer is rendered by the root layout */}
    </div>
  );
}
