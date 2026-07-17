import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
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
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
