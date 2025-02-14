import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.metmuseum.org',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
