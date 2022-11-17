/**
 *
 *  @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dummyimage.com",
        pathname: "/**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
