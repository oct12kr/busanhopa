import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress-1628102-6434425.cloudwaysapps.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "wordpress-1628102-6481493.cloudwaysapps.com",
        pathname: "/**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "hopa.kr",
          },
        ],
        destination: "https://www.hopa.kr/:path*",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
