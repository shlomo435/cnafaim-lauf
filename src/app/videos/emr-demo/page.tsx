import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';
import { canonicalMeta, absoluteUrl } from '../../../lib/site';
import { EMR_VIDEO as VIDEO, videoSchema, videoWatchPath } from '../../../lib/videos';
import VideoPlayer from '../../../components/VideoPlayer';
import VideoTranscript from '../../../components/VideoTranscript';
import Breadcrumbs from '../../../components/Breadcrumbs';
import InfoDisclaimer from '../../../components/InfoDisclaimer';

const canonical = canonicalMeta(videoWatchPath(VIDEO));

export const metadata: Metadata = {
  title: `${VIDEO.title} - סרטון | כנפיים לעוף`,
  description: VIDEO.description,
  ...canonical,
  // A share of a watch page should preview the video, not the sitewide OG image.
  openGraph: {
    ...canonical.openGraph,
    type: 'video.other',
    title: VIDEO.title,
    description: VIDEO.description,
    images: [{ url: absoluteUrl(VIDEO.thumbnailPath), width: VIDEO.width, height: VIDEO.height }],
    videos: [{ url: absoluteUrl(VIDEO.contentPath), width: VIDEO.width, height: VIDEO.height, type: 'video/mp4' }],
  },
};

// The clip's watch page: the one page whose main content is the video, and the
// only page that carries its VideoObject. See src/lib/videos.ts for why.
export default function EmrVideoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema(VIDEO)) }} />

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(255,240,245,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-4xl mx-auto px-6 h-[72px] flex items-center justify-between">
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
            href="/methods/emr"
            className="text-sm font-light transition-colors hover:text-[#D81B8C]"
            style={{ color: C.textMid }}
          >
            ← חזרה לטיפול EMR
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Breadcrumbs
          items={[
            { label: 'בית', href: '/' },
            { label: 'שיטות הטיפול', href: '/#methods' },
            { label: 'EMR - עיבוד רגשי בתנועות עיניים', href: '/methods/emr' },
            { label: VIDEO.title },
          ]}
        />

        <p className="text-sm font-semibold tracking-[0.2em] mb-3 text-right" style={{ color: C.rose }}>
          סרטון
        </p>

        <h1
          className="font-display text-3xl md:text-4xl font-light leading-tight tracking-tighter text-right mb-6"
          style={{ color: C.textDark }}
        >
          {VIDEO.title}
        </h1>

        <VideoPlayer video={VIDEO} />

        <p className="text-[1.1rem] font-light leading-[1.9] text-right mt-6 mb-10" style={{ color: C.textMid }}>
          {VIDEO.description}
        </p>

        <VideoTranscript video={VIDEO} />

        <section className="mt-12 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-2xl font-medium mb-5"
            style={{ color: C.textDark, letterSpacing: '-0.02em' }}
          >
            על טיפול EMR
          </h2>
          <p className="text-[1.1rem] font-light leading-[1.9]" style={{ color: C.textMid }}>
            הסרטון שייך לדף{' '}
            <Link
              href="/methods/emr"
              className="font-medium underline hover:opacity-80"
              style={{ color: C.rose, textUnderlineOffset: '3px' }}
            >
              טיפול EMR - עיבוד רגשי בתנועות עיניים
            </Link>
            , שבו מוסבר איך נראה מפגש ובמה EMR שונה מ-EMDR. הסבר מלא על השיטה יש במדריך{' '}
            <Link
              href="/blog/mah-ze-emr"
              className="font-medium underline hover:opacity-80"
              style={{ color: C.rose, textUnderlineOffset: '3px' }}
            >
              מה זה EMR
            </Link>
            .
          </p>

          <div className="mt-8 flex items-center gap-4 justify-end flex-wrap">
            <Link
              href="/#contact"
              className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1"
              style={{ background: C.plum, boxShadow: '0 8px 30px rgba(57,73,171,0.12)' }}
            >
              לתיאום שיחת היכרות
            </Link>
            <Link
              href="/methods/emr"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#3949AB]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לטיפול EMR
            </Link>
          </div>
        </section>

        <InfoDisclaimer />
      </main>
    </div>
  );
}
