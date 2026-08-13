/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/catalago-de-plantas',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
