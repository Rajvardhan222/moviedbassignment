import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.webneel.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'webneel.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
