import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  skipTrailingSlashRedirect: true,
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
