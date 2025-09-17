import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "backend.pp.stupidrootree.co.kr" }
    ],
  },
  // Skip build-time static generation for pages that require API calls
  trailingSlash: false,
};

export default nextConfig;
