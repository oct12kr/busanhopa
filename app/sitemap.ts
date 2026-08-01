import type { MetadataRoute } from "next";
import { getBlogPostSlugs } from "@/lib/wordpress";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPostSlugs().catch(() => []);
  const seenUrls = new Set<string>();

  const blogEntries = blogPosts.flatMap((post) => {
    const url = canonicalUrl(`/blog/${post.slug}`);

    if (seenUrls.has(url)) {
      return [];
    }

    seenUrls.add(url);

    return [
      {
        url,
        lastModified: post.modified ? new Date(post.modified) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7
      }
    ];
  });

  return [
    {
      url: canonicalUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: canonicalUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8
    },
    ...blogEntries
  ];
}
