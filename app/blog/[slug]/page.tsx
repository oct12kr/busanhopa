import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/wordpress";
import { businessName, siteUrl } from "@/lib/constants";
import { absoluteAssetUrl, buildMetaDescription, buildMetaTitle, canonicalUrl, defaultSeo } from "@/lib/seo";

export const revalidate = 300;

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

async function findBlogPost(slug: string) {
  return getBlogPostBySlug(slug).catch(() => null);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await findBlogPost(slug);

  if (!post) {
    const fallbackUrl = canonicalUrl(`/blog/${slug}`);
    const fallbackTitle = buildMetaTitle("부산호빠 블로그 글");
    const fallbackDescription = buildMetaDescription({
      fallback: defaultSeo.fallbackDescription
    });
    const fallbackImage = absoluteAssetUrl(defaultSeo.blogImage);

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: {
        canonical: fallbackUrl
      },
      openGraph: {
        type: "article",
        locale: defaultSeo.locale,
        url: fallbackUrl,
        siteName: defaultSeo.siteName,
        title: fallbackTitle,
        description: fallbackDescription,
        images: [
          {
            url: fallbackImage,
            alt: `${businessName} 블로그 대표 이미지`
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: fallbackTitle,
        description: fallbackDescription,
        images: [fallbackImage]
      }
    };
  }

  const pageTitle = buildMetaTitle(post.title);
  const pageDescription = buildMetaDescription({
    description: post.excerpt,
    content: post.content,
    fallback: `${post.title} 본문을 확인해 보세요.`
  });
  const pageUrl = canonicalUrl(`/blog/${post.slug}`);
  const imageUrl = absoluteAssetUrl(post.featuredImage?.sourceUrl, defaultSeo.blogImage);

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      type: "article",
      locale: defaultSeo.locale,
      url: pageUrl,
      siteName: defaultSeo.siteName,
      title: pageTitle,
      description: pageDescription,
      publishedTime: post.date ?? undefined,
      modifiedTime: post.modified ?? undefined,
      images: [
        {
          url: imageUrl,
          alt: post.featuredImage?.altText || post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl]
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

  const pageUrl = canonicalUrl(`/blog/${post.slug}`);
  const pageDescription = buildMetaDescription({
    description: post.excerpt,
    content: post.content,
    fallback: `${post.title} 본문을 확인해 보세요.`
  });
  const imageUrl = absoluteAssetUrl(post.featuredImage?.sourceUrl, defaultSeo.blogImage);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#blogposting`,
    url: pageUrl,
    headline: post.title,
    description: pageDescription,
    datePublished: post.date ?? post.modified ?? undefined,
    dateModified: post.modified ?? post.date ?? undefined,
    author: {
      "@type": "Person",
      name: post.author || businessName
    },
    publisher: {
      "@type": "Organization",
      name: businessName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteAssetUrl("/busanhostbar-icon.svg")
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    },
    image: [imageUrl],
    inLanguage: "ko-KR"
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: businessName,
        item: canonicalUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "블로그",
        item: canonicalUrl("/blog")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl
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
