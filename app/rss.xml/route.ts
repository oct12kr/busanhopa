import { getBlogPosts } from "@/lib/wordpress";
import { businessName, siteUrl } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const posts = await getBlogPosts(20);

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${businessName} | 소식 및 가이드</title>
    <link>${siteUrl}</link>
    <description>${businessName}. 해운대 프라이빗 공간과 차분한 서비스. 부산호빠 매니저가 부산 방문 흐름에 맞춰 상담을 안내해드립니다.</description>
    <language>ko</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
  .map((post) => {
    const pubDate = new Date(post.date || new Date()).toUTCString();
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
