import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { C } from '../../../lib/tokens';
import {
  getPostBySlug,
  getAllPostSlugs,
  canonicalUrl,
  formatDate,
  type ContentBlock,
} from '../../../lib/blog';

// ── Inline bold parser: **text** → <strong> ────────────────────────────────
function renderText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} style={{ color: C.textDark, fontWeight: 600 }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

// ── Block renderer ─────────────────────────────────────────────────────────
function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'intro':
      return (
        <p className="text-xl font-light leading-relaxed text-right mb-8" style={{ color: C.textMid }}>
          {renderText(block.text)}
        </p>
      );
    case 'h2':
      return (
        <h2
          className="font-display text-2xl font-medium mt-12 mb-5 text-right"
          style={{ color: C.textDark, letterSpacing: '-0.02em' }}
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className="font-display text-xl font-medium mt-8 mb-4 text-right"
          style={{ color: C.textDark }}
        >
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="text-[1.1rem] font-light leading-[1.9] text-right" style={{ color: C.textMid }}>
          {renderText(block.text)}
        </p>
      );
    case 'ul':
      return (
        <ul className="space-y-3 my-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 justify-end">
              <span className="text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>
                {renderText(item)}
              </span>
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: C.rose }}
              />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-3 my-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 justify-end">
              <span className="text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>
                {renderText(item)}
              </span>
              <span
                className="mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold text-white"
                style={{ backgroundColor: C.plum }}
              >
                {i + 1}
              </span>
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote
          className="border-r-4 pr-6 my-8 py-3 text-right"
          style={{ borderColor: C.rose }}
        >
          <p className="text-xl font-light leading-relaxed italic" style={{ color: C.textDark }}>
            {block.text}
          </p>
        </blockquote>
      );
    case 'tip':
      return (
        <div
          className="my-8 rounded-xl p-5 border text-right"
          style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: C.rose }}>
            כדאי לדעת
          </p>
          <p className="text-base font-light leading-[1.9]" style={{ color: C.textMid }}>
            {renderText(block.text)}
          </p>
        </div>
      );
    default:
      return null;
  }
}

// ── Static params ──────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllPostSlugs();
}

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'כנפיים לעוף' };
  return {
    title: `${post.title} | כנפיים לעוף`,
    description: post.description,
    alternates: { canonical: canonicalUrl(post.slug) },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl(post.slug),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified ?? post.date,
      authors: ['גאולה אלון'],
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: C.cream }}
      >
        <p className="text-2xl font-light mb-6" style={{ color: C.textMid }}>
          הכתבה לא נמצאה
        </p>
        <Link href="/blog/" className="text-sm font-medium underline" style={{ color: C.rose }}>
          חזרה לבלוג
        </Link>
      </div>
    );
  }

  // JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Person',
      name: 'גאולה אלון',
      url: 'https://cnafaim-lauf.netlify.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'כנפיים לעוף — מרכז טיפולי-לימודי',
      url: 'https://cnafaim-lauf.netlify.app',
    },
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(post.slug) },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://cnafaim-lauf.netlify.app/' },
      { '@type': 'ListItem', position: 2, name: 'בלוג', item: 'https://cnafaim-lauf.netlify.app/blog/' },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl(post.slug) },
    ],
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(255,240,245,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-3xl mx-auto px-6 h-[72px] flex items-center justify-between">
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
            href="/blog/"
            className="text-sm font-light transition-colors hover:text-[#C01880]"
            style={{ color: C.textMid }}
          >
            ← חזרה לבלוג
          </Link>
        </div>
      </header>

      {/* ARTICLE */}
      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs mb-10 justify-end flex-wrap"
          style={{ color: C.textLight }}
          aria-label="נתיב ניווט"
        >
          <Link href="/" className="hover:underline" style={{ color: C.rose }}>בית</Link>
          <span>/</span>
          <Link href="/blog/" className="hover:underline" style={{ color: C.rose }}>בלוג</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-5 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-end mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ backgroundColor: C.creamAlt, color: C.textMid, border: `1px solid ${C.border}` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* H1 */}
        <h1
          className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tight text-right mb-6"
          style={{ color: C.textDark }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div
          className="flex items-center gap-3 justify-end text-sm mb-12"
          style={{ color: C.textLight }}
        >
          <span>{post.readingMinutes} דקות קריאה</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>גאולה אלון</span>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {post.content.length > 0 ? (
            post.content.map((block, i) => <Block key={i} block={block} />)
          ) : (
            <div
              className="py-16 text-center rounded-xl border"
              style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
            >
              <p className="text-base font-light" style={{ color: C.textLight }}>
                הכתבה בהכנה — חזרו בקרוב.
              </p>
            </div>
          )}
        </div>

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
            <h2
              className="font-display text-2xl font-medium mb-8"
              style={{ color: C.textDark, letterSpacing: '-0.02em' }}
            >
              שאלות נפוצות
            </h2>
            <div className="space-y-5">
              {post.faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
                >
                  <h3 className="font-medium text-base mb-3" style={{ color: C.textDark }}>
                    {item.q}
                  </h3>
                  <p className="text-sm font-light leading-[1.9]" style={{ color: C.textMid }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>
            מעוניינים לשוחח עם גאולה על המצב של הילד שלכם?
          </p>
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <Link
              href="/#contact"
              className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1"
              style={{ background: C.plum, boxShadow: '0 8px 30px rgba(57,73,171,0.12)' }}
            >
              לתיאום שיחת היכרות
            </Link>
            <Link
              href="/blog/"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לבלוג
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="py-10 mt-10"
        style={{ backgroundColor: C.plum, color: 'rgba(255,255,255,0.65)' }}
      >
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-right">
          <Link href="/" aria-label="כנפיים לעוף - דף הבית">
            <Image
              src="/logo.jpg"
              alt="כנפיים לעוף"
              width={144}
              height={48}
              className="h-12 w-auto object-contain"
              style={{ maxWidth: 144, mixBlendMode: 'screen', opacity: 0.85 }}
            />
          </Link>
          <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
            כל הזכויות שמורות &copy; 2025 · כנפיים לעוף | גאולה אלון
          </div>
        </div>
      </footer>
    </div>
  );
}
