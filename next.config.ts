import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ielts-maxxx',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;