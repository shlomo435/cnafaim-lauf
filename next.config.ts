import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Canonical URL form is WITHOUT a trailing slash: Next emits blog.html (not
  // blog/index.html) and Netlify's router then 301s /blog/ -> /blog. This is the
  // source of the trailing-slash redirect Search Console sees - declared here
  // explicitly so it survives upgrades and nobody flips it by accident.
  trailingSlash: false,
  devIndicators: false,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/netlify-image-loader.ts',
    // deviceSizes used for srcset generation; covers mobile HiDPI through full desktop
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 512],
  },
};

export default nextConfig;
