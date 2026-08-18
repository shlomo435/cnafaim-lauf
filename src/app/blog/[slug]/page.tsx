import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { C } from '../../../lib/tokens';
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  canonicalUrl,
  formatDate,
  tagToSlug,
  type ContentBlock,
} from '../../../lib/blog';
import { OWNER_NAME } from '../../../lib/site';

// ── Inline parser: **text** → <strong>, [text](url) → <a> ───────────────────
function renderText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: C.textDark, fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link
          key={i}
          href={link[2]}
          className="font-medium hover:opacity-80 transition-opacity"
          style={{ color: C.rose, textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          {link[1]}
        </Link>
      );
    }
    return part;
  });
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
            <li key={i} className="flex items-start gap-3">
              {/* Marker first in DOM so RTL places it at the inline start (right) */}
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: C.rose }}
              />
              <span className="flex-1 text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>
                {renderText(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-3 my-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              {/* Number first in DOM so RTL places it at the inline start (right) */}
              <span
                className="mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold text-white"
                style={{ backgroundColor: C.plum }}
              >
                {i + 1}
              </span>
              <span className="flex-1 text-[1.05rem] font-light leading-[1.8] text-right" style={{ color: C.textMid }}>
                {renderText(item)}
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
        <Link href="/blog" className="text-sm font-medium underline" style={{ color: C.rose }}>
          חזרה לבלוג
        </Link>
      </div>
    );
  }

  const related = getRelatedPosts(slug);

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
      url: 'https://cnafim-lauf.co.il',
    },
    publisher: {
      '@type': 'Organization',
      name: 'כנפיים לעוף - מרכז טיפולי-לימודי',
      url: 'https://cnafim-lauf.co.il',
    },
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(post.slug) },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://cnafim-lauf.co.il/' },
      { '@type': 'ListItem', position: 2, name: 'בלוג', item: 'https://cnafim-lauf.co.il/blog' },
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
            href="/blog"
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
          <Link href="/blog" className="hover:underline" style={{ color: C.rose }}>בלוג</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-5 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}55, ${C.rose})` }}
        />

        {/* Tags - link to their archive so they are navigation, not decoration */}
        <div className="flex flex-wrap gap-2 justify-end mb-5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tagToSlug(tag)}`}
              className="text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 hover:border-[#3949AB] hover:-translate-y-0.5"
              style={{ backgroundColor: C.creamAlt, color: C.textMid, border: `1px solid ${C.border}` }}
            >
              {tag}
            </Link>
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
                הכתבה בהכנה - חזרו בקרוב.
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

        {/* Share - WhatsApp is the main sharing channel in Israel */}
        <section className="mt-12 pt-8 border-t" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-3 justify-end flex-wrap">
            <span className="text-sm font-light" style={{ color: C.textMid }}>שיתוף:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title}\n${canonicalUrl(post.slug)}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="שיתוף הכתבה בוואטסאפ"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              וואטסאפ
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl(post.slug))}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="שיתוף הכתבה בפייסבוק"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#1877F2' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              פייסבוק
            </a>
          </div>
        </section>

        {/* Author - E-E-A-T signal on health-adjacent content */}
        <section className="mt-12 pt-10 border-t" style={{ borderColor: C.border }}>
          <div
            className="rounded-2xl p-6 border flex flex-col sm:flex-row-reverse items-center gap-5 text-center sm:text-right"
            style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${C.border}` }}>
              <Image src="/founder_portrait.jpg" alt={`${OWNER_NAME}, מטפלת רגשית ומאבחנת לימודית`} fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.16em] mb-1" style={{ color: C.rose }}>על הכותבת</p>
              <h2 className="font-display text-xl font-semibold mb-1.5" style={{ color: C.textDark }}>{OWNER_NAME}</h2>
              <p className="text-sm font-light leading-[1.8] mb-3" style={{ color: C.textMid }}>
                מטפלת רגשית ומאבחנת לימודית, בעלת תואר שני בחינוך ומעל עשרים שנות ניסיון עם ילדים,
                נערות ונשים. מלווה משפחות בנתיבות, בכל אזור הדרום וגם בזום.
              </p>
              <Link href="/metapel-regashi" className="text-sm font-medium hover:opacity-80" style={{ color: C.rose }}>
                עוד על גאולה והטיפול ←
              </Link>
            </div>
          </div>
        </section>

        {/* Related articles, chosen by shared tags */}
        {related.length > 0 && (
          <section className="mt-12 pt-10 border-t text-right" style={{ borderColor: C.border }}>
            <h2 className="font-display text-2xl font-medium mb-6" style={{ color: C.textDark, letterSpacing: '-0.02em' }}>
              כתבות נוספות בנושא
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="rounded-xl p-5 border transition-all duration-300 hover:border-[#3949AB] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(57,73,171,0.06)]"
                  style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
                >
                  <div className="font-display text-base font-semibold mb-1.5 leading-snug" style={{ color: C.textDark }}>{r.title}</div>
                  <p className="text-xs font-light leading-[1.7]" style={{ color: C.textLight }}>{r.readingMinutes} דקות קריאה</p>
                  <div className="mt-2 text-sm font-medium" style={{ color: C.rose }}>קראו ←</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Service pages */}
        <section className="mt-12 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-2xl font-medium mb-6"
            style={{ color: C.textDark, letterSpacing: '-0.02em' }}
          >
            מידע נוסף שיכול לעזור
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                href: '/metapel-regashi',
                title: 'מטפלת רגשית בנתיבות והדרום',
                desc: 'טיפול רגשי לילדים, נערות ונשים - בגישה חמה ומותאמת אישית, וגם בזום.',
              },
              {
                href: '/methods/remedial',
                title: 'הוראה מתקנת בנתיבות והדרום',
                desc: 'לקשיי קריאה, כתיבה, שטף וקשב - אבחון ותוכנית עבודה אישית.',
              },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl p-5 border transition-all duration-300 hover:border-[#3949AB] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(57,73,171,0.06)]"
                style={{ backgroundColor: C.creamAlt, borderColor: C.border }}
              >
                <div className="font-display text-lg font-semibold mb-1" style={{ color: C.textDark }}>{l.title}</div>
                <p className="text-sm font-light leading-[1.8]" style={{ color: C.textMid }}>{l.desc}</p>
                <div className="mt-2 text-sm font-medium" style={{ color: C.rose }}>לפרטים ←</div>
              </Link>
            ))}
          </div>
        </section>

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
              href="/blog"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לבלוג
            </Link>
          </div>
        </div>
      </main>

{/* Site footer is rendered by the root layout */}
    </div>
  );
}
