import { C } from '../lib/tokens';
import type { Video } from '../lib/videos';

/**
 * Text alternative for a video: what is on screen, then every line of on-screen
 * text. It sits next to the player because Google judges a watch page partly by
 * the text around the video, and because text baked into video frames is
 * otherwise invisible to screen readers and crawlers alike.
 */
export default function VideoTranscript({ video, as: Heading = 'h2' }: { video: Video; as?: 'h2' | 'h3' }) {
  return (
    <div className="rounded-xl p-5 border text-right" style={{ backgroundColor: C.creamAlt, borderColor: C.border }}>
      <Heading className="font-display text-lg font-medium mb-3" style={{ color: C.textDark }}>
        תמלול הסרטון
      </Heading>
      <p className="text-sm font-light leading-[1.9] mb-4" style={{ color: C.textMid }}>
        {video.visual}
      </p>
      <p className="text-sm font-light mb-1" style={{ color: C.textMid }}>
        הטקסט שמופיע על המסך:
      </p>
      <p className="text-sm font-medium mb-3" style={{ color: C.textDark }}>
        {video.title}
      </p>
      <dl className="space-y-3">
        {video.onScreenSections.map((section) => (
          <div key={section.heading}>
            <dt className="text-sm font-medium" style={{ color: C.textDark }}>
              {section.heading}
            </dt>
            {section.lines.map((line) => (
              <dd key={line} className="text-sm font-light leading-[1.9]" style={{ color: C.textMid }}>
                {line}
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </div>
  );
}
