import { C } from '../lib/tokens';
import type { Video } from '../lib/videos';

/**
 * The site's <video> player, sized from the file's real dimensions so it
 * reserves its box before any media loads. Without width/height the element
 * falls back to the browser default 300x150, which is what Googlebot rendered
 * on /methods/emr: a 150px strip nobody would take for the page's video.
 *
 * Height is capped at 70vh through max-width, because width drives height via
 * aspect-ratio. Capping max-height directly would break the ratio instead.
 */
export default function VideoPlayer({ video }: { video: Video }) {
  return (
    <div
      className="w-full mx-auto rounded-2xl overflow-hidden border"
      style={{
        aspectRatio: `${video.width} / ${video.height}`,
        maxWidth: `min(100%, calc(70vh * ${video.width / video.height}))`,
        borderColor: C.border,
        boxShadow: '0 8px 30px rgba(57,73,171,0.07)',
      }}
    >
      <video
        controls
        preload="metadata"
        playsInline
        poster={video.thumbnailPath}
        width={video.width}
        height={video.height}
        className="block w-full h-full object-contain"
        src={video.contentPath}
        aria-label={video.title}
      >
        הדפדפן שלך אינו תומך בתג הווידאו.
      </video>
    </div>
  );
}
