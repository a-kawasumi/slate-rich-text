/** @type {import('next').NextConfig} */

const whitelist = {
  image: ["raw.githubusercontent.com"],
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [...whitelist.image],
  },
};

module.exports = nextConfig;
