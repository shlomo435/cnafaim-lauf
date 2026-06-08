type ImageLoaderProps = { src: string; width: number; quality?: number };

export default function netlifyImageLoader({ src, width, quality }: ImageLoaderProps) {
  if (process.env.NODE_ENV === 'development') return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 80}&fm=webp`;
}
