import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "pub-cd01baa955d3448daf6505f3e316fa38.r2.dev",
      "github.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
