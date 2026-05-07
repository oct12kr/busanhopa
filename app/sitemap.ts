import type { MetadataRoute } from "next";

const siteUrl = "https://daejeon-seven-nights-strawberry.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
