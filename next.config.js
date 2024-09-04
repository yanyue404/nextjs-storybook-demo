/** @type {import('next').NextConfig} */
// https://nextjs.org/docs/app/api-reference/next-config-js
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['i.pravatar.cc'],
  },
};

module.exports = nextConfig;
