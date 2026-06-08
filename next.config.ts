import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './src/lib/netlify-image-loader.ts',
    // deviceSizes used for srcset generation; covers mobile HiDPI through full desktop
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 512],
  },
};

export default nextConfig;
