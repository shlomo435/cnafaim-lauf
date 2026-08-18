import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { C } from '../../lib/tokens';
import { absoluteUrl } from '../../lib/site';
import { getPostsSorted, getAllTags, tagToSlug, formatDate, type Post } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'מדריכים וכתבות | כנפיים לעוף',
  description:
    'מדריכים מקצועיים של גאולה אלון על ויסות רגשי, חרדה בילדים, הוראה מתקנת, דימוי עצמי ועוד. קריאה נוחה, בשפה של הורים ונשים.',
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    title: 'מדריכים וכתבות | כנפיים לעוף',
    description: 'מדריכים מקצועיים של גאולה אלון על ויסות רגשי, חרדה בילדים, הוראה מתקנת ועוד.',
    url: absoluteUrl('/blog'),
    type: 'website',
  },
};

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-2xl p-6 md:p-7 border flex flex-col gap-4 transition-all duration-300 hover:border-[#3949AB] hover:shadow-[0_8px_30px_rgba(57,73,171,0.08)] hover:-translate-y-1"
      style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-end">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: C.cream, color: C.textMid, border: `1px solid ${C.border}` }}
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Note: tags here stay plain text - the whole card is already a link, so a
          nested anchor would be invalid HTML. Browsable tags live in the topic
          strip above the grid and on the article pages. */}

      {/* Title */}
      <h2
        className="font-display text-lg md:text-xl font-medium leading-snug text-right"
        style={{ color: C.textDark, letterSpacing: '-0.02em' }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        className="text-sm font-light leading-[1.8] text-right flex-1"
        style={{ color: C.textMid, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}
      >
        {post.excerpt}
      </p>

      {/* Footer row */}
      <div
        className="flex items-center justify-between text-xs pt-3 border-t"
        style={{ borderColor: C.borderLight }}
      >
        <span className="font-medium" style={{ color: C.rose }}>
          קראו עוד ←
        </span>
        <div className="flex items-center gap-2 font-light" style={{ color: C.textLight }}>
          <span>{post.readingMinutes} דקות קריאה</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogArchivePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(255,240,245,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-5xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="כנפיים לעוף"
              width={168}
              height={56}
              className="h-14 w-auto object-contain"
              style={{ maxWidth: 168, mixBlendMode: 'multiply' }}
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-light transition-colors hover:text-[#C01880]"
            style={{ color: C.textMid }}
          >
            ← חזרה לאתר
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14">

        {/* Hero */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] mb-3" style={{ color: C.rose }}>
            מדריכים וכתבות
          </p>
          <h1
            className="font-display text-4xl md:text-5xl font-medium mb-4"
            style={{ color: C.textDark, letterSpacing: '-0.025em' }}
          >
            מידע מקצועי בשפה שמדברת אליכם
          </h1>
          <p
            className="text-[1.05rem] font-light leading-[1.8] max-w-2xl mx-auto"
            style={{ color: C.textMid }}
          >
            כל הכתבות נכתבות על ידי גאולה אלון - מתוך ניסיון של מעל 20 שנה עם ילדים, נערות
            ונשים. לא ז׳רגון. רק מה שעוזר.
          </p>
          <div className="w-16 h-px mt-6 mx-auto" style={{ backgroundColor: C.border }} />
        </div>

        {/* Browse by topic */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-[0.14em] mb-4" style={{ color: C.rose }}>עיון לפי נושא</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {getAllTags().map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/blog/tag/${tagToSlug(tag)}`}
                className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:border-[#3949AB] hover:-translate-y-0.5"
                style={{ backgroundColor: C.creamAlt, color: C.textMid, border: `1px solid ${C.border}` }}
              >
                {tag} ({count})
              </Link>
            ))}
          </div>
        </div>

        {/* Posts grid - newest first */}
        <div className="grid md:grid-cols-2 gap-5">
          {getPostsSorted().map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-14 rounded-2xl p-8 text-center border"
          style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
        >
          <p
            className="text-[1.05rem] font-light leading-[1.8] mb-5"
            style={{ color: C.textMid }}
          >
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
