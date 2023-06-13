/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_PREFIX,
  swcMinify: true,
  experimental: {
    largePageDataBytes: 256 * 20000,
  },
}

module.exports = nextConfig
