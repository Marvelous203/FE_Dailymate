import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['example.com', 'template.canva.com', 'youtube.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
