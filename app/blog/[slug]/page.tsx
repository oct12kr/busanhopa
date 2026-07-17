import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/wordpress";
import { businessName, siteUrl } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value: string | null) {
  if (!value) {
    return "날짜 미정";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(value));
}

function buildDescription(excerpt: string, title: string) {
  const description = excerpt || `${title} 본문을 확인해 보세요.`;

  return description.length > 150 ? `${description.slice(0, 147)}...` : description;
}

function absoluteImageUrl(sourceUrl?: string | null) {
  if (!sourceUrl) {
    return undefined;
  }

  if (/^https?:\/\//i.test(sourceUrl)) {
    return sourceUrl;
  }

  return `${siteUrl}${sourceUrl.startsWith("/") ? "" : "/"}${sourceUrl}`;
}

async function findBlogPost(slug: string) {
  return getBlogPostBySlug(slug).catch(() => null);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await findBlogPost(slug);

  if (!post) {
    return {
      title: `블로그 글 | ${businessName}`
    };
  }

  const imageUrl = absoluteImageUrl(post.featuredImage?.sourceUrl);

  return {
    title: `${post.title} | ${businessName}`,
    description: buildDescription(post.excerpt, post.title),
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: buildDescription(post.excerpt, post.title),
      publishedTime: post.date ?? undefined,
      modifiedTime: post.modified ?? undefined,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.featuredImage?.altText || post.title
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${businessName}`,
      description: buildDescription(post.excerpt, post.title),
      images: imageUrl ? [imageUrl] : undefined
    }
  };
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await findBlogPost(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = absoluteImageUrl(post.featuredImage?.sourceUrl);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: buildDescription(post.excerpt, post.title),
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Organization",
      name: businessName,
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: businessName,
      url: siteUrl
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    image: imageUrl
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: businessName,
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "블로그",
        item: `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl
      }
    ]
  };

  return (
    <main className="min-h-screen bg-transparent text-[#f7efe2]">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article>
        <header className="border-b border-[#d9c49a]/12 bg-[#202519]/45 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-5">
            <Link
              href="/blog"
              className="text-sm font-black text-[#aeb995] hover:text-[#d9c49a]"
            >
              블로그 목록
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category.slug}
                  className="rounded-sm border border-[#d9c49a]/40 px-2.5 py-1 text-xs font-black text-[#d9c49a]"
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[#f7efe2]/58">
              <time>{formatDate(post.date)}</time>
              <span>{post.author}</span>
            </div>
            {post.excerpt ? (
              <p className="mt-6 text-lg leading-8 text-[#f7efe2]/74 md:text-xl">
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </main>
  );
}
