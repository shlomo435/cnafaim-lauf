import { SITE_URL, SITE_NAME, OWNER_NAME, OG_IMAGE, SCHEMA_IDS, EMAIL } from '../lib/site';

const AREAS_CITIES = ['נתיבות', 'אופקים', 'שדרות', 'אשקלון', 'באר שבע', 'קריית גת'];
const AREAS_REGIONAL = ['שדות נגב', 'מרחבים', 'מחוז הדרום'];

/**
 * The sitewide JSON-LD entity graph, rendered once from the root layout.
 *
 * One @graph holds the full Organization, Person and WebSite nodes with stable
 * @ids; page-level schemas (Article author, Service provider, Product brand)
 * reference {'@id': ...} instead of re-declaring the entities. Before this the
 * site shipped four disconnected Person nodes with conflicting jobTitles.
 *
 * Organization type is LocalBusiness + ProfessionalService - deliberately NOT
 * MedicalBusiness: the practice offers emotional therapy and remedial teaching,
 * not licensed medical services, and the medical type invites stricter YMYL
 * scrutiny while granting no extra rich-result eligibility.
 */
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': SCHEMA_IDS.organization,
      name: `${SITE_NAME} - מרכז טיפולי-לימודי`,
      description:
        'מרכז רגשי-לימודי בנתיבות - הוראה מתקנת, טיפול רגשי ואבחונים לימודיים לילדים, נערות ונשים. שירות בכל אזור הדרום וגם בזום.',
      url: `${SITE_URL}/`,
      telephone: '+972-50-296-1213',
      email: EMAIL,
      image: OG_IMAGE,
      logo: `${SITE_URL}/logo.jpg`,
      priceRange: '₪₪',
      sameAs: [
        'https://www.facebook.com/profile.php?id=61585099706314',
        'https://www.instagram.com/gehula_alon',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'נתיבות',
        addressRegion: 'דרום',
        addressCountry: 'IL',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 31.4231, longitude: 34.5889 },
      areaServed: [
        ...AREAS_CITIES.map((name) => ({ '@type': 'City', name })),
        ...AREAS_REGIONAL.map((name) => ({ '@type': 'AdministrativeArea', name })),
      ],
      availableLanguage: { '@type': 'Language', name: 'Hebrew' },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      founder: { '@id': SCHEMA_IDS.person },
    },
    {
      '@type': 'Person',
      '@id': SCHEMA_IDS.person,
      name: OWNER_NAME,
      jobTitle: 'מטפלת רגשית ומאבחנת לימודית',
      description:
        'מטפלת רגשית ומאבחנת לימודית, בעלת תואר שני בחינוך ומעל עשרים שנות ניסיון עם ילדים, נערות ונשים.',
      url: `${SITE_URL}/metapel-regashi`,
      image: OG_IMAGE,
      knowsAbout: [
        'CBT טיפול קוגניטיבי-התנהגותי',
        'NLP תכנות נוירו-לשוני',
        'EMR עיבוד רגשי בתנועות עיניים',
        'הוראה מתקנת',
        'אבחון דידקטי',
        'הדרכת הורים',
      ],
      worksFor: { '@id': SCHEMA_IDS.organization },
      telephone: '+972-50-296-1213',
      email: EMAIL,
      sameAs: [
        'https://www.facebook.com/profile.php?id=61585099706314',
        'https://www.instagram.com/gehula_alon',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': SCHEMA_IDS.website,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: `${SITE_NAME} - גאולה אלון`,
      inLanguage: 'he',
      publisher: { '@id': SCHEMA_IDS.organization },
    },
  ],
};

export default function SchemaGraph() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}
