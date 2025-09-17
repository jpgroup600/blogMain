import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "localhost" }],
  },
  // Skip build-time static generation for pages that require API calls
  trailingSlash: false,
};

export default nextConfig;
