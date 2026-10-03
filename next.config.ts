import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "busanhopa.com",
          },
        ],
        destination: "https://www.busanhopa.com/:path*",
        statusCode: 301,
      },
    ];
  }
};

export default nextConfig;
