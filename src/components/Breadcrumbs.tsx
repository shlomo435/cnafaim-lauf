import Link from 'next/link';
import { C } from '../lib/tokens';
import { SITE_URL } from '../lib/site';

export type Crumb = {
  label: string;
  /** Omit on the last (current-page) crumb. */
  href?: string;
};

/**
 * Visible breadcrumb trail + its BreadcrumbList JSON-LD, from one items array,
 * so the markup and the schema can never disagree. Give the final crumb no
 * href - it is the current page.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: item.href === '/' ? `${SITE_URL}/` : `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav
        className="flex items-center gap-2 text-xs mb-8 justify-end flex-wrap"
        style={{ color: C.textLight }}
        aria-label="נתיב ניווט"
      >
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:underline" style={{ color: C.rose }}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </span>
        ))}
      </nav>
    </>
  );
}
