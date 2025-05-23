/** @type {import('next').NextConfig} */
// https://nextjs.org/docs/app/api-reference/next-config-js
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
