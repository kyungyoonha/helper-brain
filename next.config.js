/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "cdn.imweb.me",
      "www.fitpetmall.com",
      "pbs.twimg.com",
      "cdn.crowdpic.net",
      "i.pinimg.com",
    ],
  },
};

module.exports = nextConfig;
