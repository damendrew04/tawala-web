/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    // Next.js images are lazy-loaded by default
    // Other valid image config options:
    // domains: ['example.com'],
    // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
    // formats: ['image/webp', 'image/avif'],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig