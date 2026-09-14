import type { MetadataRoute } from "next";
import { getBlogPostSlugs } from "@/lib/wordpress";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPostSlugs().catch(() => []);
  const seenUrls = new Set<string>();

  const latestBlogModified = blogPosts.reduce<Date | null>((latest, post) => {
    if (!post.modified) {
      return latest;
    }

    const modifiedDate = new Date(post.modified);

    if (Number.isNaN(modifiedDate.getTime())) {
      return latest;
    }

    return !latest || modifiedDate > latest ? modifiedDate : latest;
  }, null);

  const blogEntries = blogPosts.flatMap((post) => {
    const url = canonicalUrl(`/blog/${post.slug}`);

    if (seenUrls.has(url)) {
      return [];
    }

    seenUrls.add(url);

    const modifiedDate = post.modified ? new Date(post.modified) : null;

    return [
      {
        url,
        ...(modifiedDate && !Number.isNaN(modifiedDate.getTime()) ? { lastModified: modifiedDate } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.7
      }
    ];
  });

  return [
    {
      url: canonicalUrl("/"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: canonicalUrl("/blog"),
      ...(latestBlogModified ? { lastModified: latestBlogModified } : {}),
      changeFrequency: "daily",
      priority: 0.8
    },
    ...blogEntries
  ];
}
