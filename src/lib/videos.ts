import videos from '../content/videos.json';
import { SCHEMA_IDS, absoluteUrl } from './site';

/**
 * Videos hosted on the site. src/content/videos.json is the single source of
 * truth for the players, the watch pages, their VideoObject and the video
 * sitemap (scripts/generate-sitemap.mjs reads the same file).
 *
 * Google indexes a video only from a watch page: a page whose main purpose is
 * that one video. /methods/emr showed the clip as a 150px strip inside a long
 * article, and Search Console rejected it with "Video is not on a watch page".
 * So each video gets its own page under /videos, and its VideoObject lives there
 * and nowhere else. Other pages may show the player but must not mark it up.
 *
 * The facts in videos.json were read from the file, not assumed:
 *   - 480x480 comes from the mp4 track header, which has no rotation matrix.
 *     The clip is square, not portrait.
 *   - durationSeconds is 5 (video track 5.04s, audio 5.11s).
 *   - uploadDate is the commit time of public/emr_video1.mp4; the mp4 itself
 *     carries no creation date.
 *   - The thumbnail is a frame of the clip. public/emr_live.jpeg is a staged
 *     photo that never appears in it, so it cannot represent the video.
 *   - The transcript is the on-screen text, which is static for the whole clip.
 */
export type Video = (typeof videos)[number];

function findVideo(slug: string): Video {
  const video = videos.find((v) => v.slug === slug);
  if (!video) throw new Error(`videos.json: no video with slug "${slug}"`);
  return video;
}

export const EMR_VIDEO = findVideo('emr-demo');

export const videoWatchPath = (video: Video) => `/videos/${video.slug}`;

/** The on-screen text as plain prose, for VideoObject.transcript. */
export function videoTranscript(video: Video): string {
  return [video.title, ...video.onScreenSections.map((s) => `${s.heading}: ${s.lines.join(' ')}`)].join('\n');
}

/**
 * VideoObject for the watch page only.
 *
 * No embedUrl: the site has no embeddable player, and every response is sent
 * with X-Frame-Options: DENY (netlify.toml), so any URL given there would refuse
 * to load in the iframe Google would put it in. contentUrl is the real file.
 */
export function videoSchema(video: Video) {
  const url = absoluteUrl(videoWatchPath(video));
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${url}#video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: absoluteUrl(video.thumbnailPath),
    uploadDate: video.uploadDate,
    duration: `PT${video.durationSeconds}S`,
    contentUrl: absoluteUrl(video.contentPath),
    encodingFormat: 'video/mp4',
    url,
    inLanguage: 'he',
    isFamilyFriendly: true,
    transcript: videoTranscript(video),
    publisher: { '@id': SCHEMA_IDS.organization },
  };
}
