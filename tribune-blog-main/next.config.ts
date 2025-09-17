import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // config options here /
  reactStrictMode: true,
  output: 'standalone',
 images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "4000",
      pathname: "/media/**"
    },
    {
      protocol: "https",
      hostname: ".stupidrootree.co.kr",
      pathname: "/**"
    },
  ],
},

  // Skip build-time static generation for pages that require API calls
  trailingSlash: false,
};

export default nextConfig;