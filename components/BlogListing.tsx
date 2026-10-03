import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneIcon } from "@/components/Icons";
import RelatedPosts from "@/components/RelatedPosts";
import {
  getBlogPostsByCategory,
  getBlogPostTotalByCategory,
  getRelatedBlogPosts,
  type BlogPostPage,
  type BlogPostSummary
} from "@/lib/wordpress";
import { businessName, phoneDisplay, phoneHref, siteUrl } from "@/lib/constants";
import { absoluteAssetUrl, buildMetaDescription, buildMetaTitle, canonicalUrl, defaultSeo } from "@/lib/seo";

// 4 columns x 5 rows on desktop.
export const blogPostsPerPage = 20;

export type BlogCategorySlug = "aaa" | "bbb";

type BlogCategoryConfig = {
  name: "부산호빠" | "해운대호빠";
  slug: BlogCategorySlug;
  description: string;
  metaTitle: string;
  metaDescription: string;
};

type BlogCategoryTotal = BlogCategoryConfig & {
  total: number | null;
};

export const blogCategoryConfigs: BlogCategoryConfig[] = [
  {
    name: "부산호빠",
    slug: "aaa",
    description: "부산호빠 이용 안내와 공간, 예약 흐름을 정리한 글입니다.",
    metaTitle: "부산호빠 블로그 | 해운대 예약 가이드와 방문 팁",
    metaDescription:
      "부산호빠 예약 전 알아두면 좋은 방문 가이드, 해운대 프라이빗 라운지 소식, VIP 서비스 안내를 최신 글로 확인해 보세요."
  },
  {
    name: "해운대호빠",
    slug: "bbb",
    description: "해운대호빠 방문 팁과 상담 안내를 정리한 글입니다.",
    metaTitle: "해운대호빠 블로그 | 방문 팁과 상담 안내",
    metaDescription:
      "해운대호빠 방문 전 알아두면 좋은 이용 팁과 상담 안내, 프라이빗 라운지 소식을 최신 글로 확인해 보세요."
  }
];

// /blog itself is page 1 of this category, so it never gets a second URL.
export const defaultBlogCategorySlug: BlogCategorySlug = "aaa";

const blogListAnchor = "blog-list";

export function findBlogCategory(slug: string) {
  return blogCategoryConfigs.find((category) => category.slug === slug) ?? null;
}

export function parseBlogPageNumber(value: string) {
  return /^[1-9]\d{0,3}$/.test(value) ? Number(value) : null;
}

export function blogListingPath(slug: BlogCategorySlug, page = 1) {
  if (page > 1) {
    return `/blog/category/${slug}/page/${page}`;
  }

  return slug === defaultBlogCategorySlug ? "/blog" : `/blog/category/${slug}`;
}

function isDefaultListing(slug: BlogCategorySlug, page: number) {
  return slug === defaultBlogCategorySlug && page === 1;
}

const blogUrl = canonicalUrl("/blog");
const blogOgImage = absoluteAssetUrl(defaultSeo.blogImage);

export function buildBlogListingMetadata(slug: BlogCategorySlug, page = 1): Metadata {
  const category = findBlogCategory(slug) ?? blogCategoryConfigs[0];
  const pageSuffix = page > 1 ? ` ${page}페이지` : "";
  const [titleHead, ...titleRest] = category.metaTitle.split(" | ");
  const title = buildMetaTitle([`${titleHead}${pageSuffix}`, ...titleRest].join(" | "));
  const description = buildMetaDescription({
    description: page > 1 ? `${category.name} 블로그 ${page}페이지. ${category.metaDescription}` : category.metaDescription
  });
  const url = canonicalUrl(blogListingPath(slug, page));

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      locale: defaultSeo.locale,
      url,
      siteName: defaultSeo.siteName,
      title,
      description,
      images: [
        {
          url: blogOgImage,
          width: 2400,
          height: 1000,
          alt: `${businessName} 블로그 대표 이미지`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blogOgImage]
    }
  };
}

async function fetchPostPage(config: BlogCategoryConfig, page: number): Promise<BlogPostPage> {
  const request = getBlogPostsByCategory(config.slug, {
    page,
    perPage: blogPostsPerPage,
    revalidateSeconds: 60
  });

  // Deeper pages rethrow so a WordPress outage keeps the last good page instead of caching a 404.
  if (page > 1) {
    return request;
  }

  return request.catch((error) => {
    console.error("[blog] Failed to fetch WordPress category posts", {
      categoryName: config.name,
      categorySlug: config.slug,
      message: error instanceof Error ? error.message : String(error)
    });

    return { posts: [], total: 0, totalPages: 0 };
  });
}

async function fetchCategoryTotals(
  active: BlogCategoryConfig,
  activeTotal: number
): Promise<BlogCategoryTotal[]> {
  return Promise.all(
    blogCategoryConfigs.map(async (category) => ({
      ...category,
      total:
        category.slug === active.slug
          ? activeTotal
          : await getBlogPostTotalByCategory(category.slug, 60).catch(() => null)
    }))
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "날짜 미정";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function EmptyPosts({ categoryName }: { categoryName: string }) {
  return (
    <div className="rounded-[16px] border border-dashed border-[#b8996a]/45 bg-white/50 px-5 py-12 text-center">
      <p className="font-serif-kr text-[19px] font-bold text-[#6f613f]">
        등록된 글이 없습니다
      </p>
      <p className="mx-auto mt-3 max-w-[280px] break-keep text-[13px] leading-[1.7] text-[#756f62]">
        워드프레스의 {categoryName} 카테고리에 글을 발행하면 이곳에 자동으로 표시됩니다.
      </p>
    </div>
  );
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${blogUrl}#blog`,
  name: buildMetaTitle(blogCategoryConfigs[0].metaTitle),
  description: buildMetaDescription({ description: blogCategoryConfigs[0].metaDescription }),
  url: blogUrl,
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    name: businessName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteAssetUrl("/busanhostbar-icon.svg")
    }
  }
};

function buildBreadcrumbSchema(category: BlogCategoryConfig, page: number) {
  const items = [
    { name: businessName, item: canonicalUrl("/") },
    { name: "블로그", item: blogUrl }
  ];

  if (!isDefaultListing(category.slug, page)) {
    items.push({
      name: page > 1 ? `${category.name} ${page}페이지` : category.name,
      item: canonicalUrl(blogListingPath(category.slug, page))
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...item
    }))
  };
}

function BlogPostCard({ post, categoryName }: { post: BlogPostSummary; categoryName: string }) {
  const image = post.featuredImage;

  return (
    <article className="group rounded-[16px] bg-white shadow-[0_12px_28px_rgba(42,42,36,0.07)] ring-1 ring-[#d8c7a5]/35 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(42,42,36,0.15)]">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col gap-4 p-3">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-[linear-gradient(135deg,#1a1815_0%,#4a3922_52%,#c9a876_100%)]">
          {image ? (
            // Remote WordPress media: plain lazy <img> keeps off-screen cards out of the initial load.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.cardUrl}
              alt={image.altText}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 via-transparent to-transparent p-3">
            <span className="rounded-full border border-white/30 bg-black/24 px-2.5 py-1 text-[10px] font-bold text-white/90 backdrop-blur">
              {categoryName}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-1 pb-1">
          <p className="line-clamp-2 break-keep text-[16px] font-extrabold leading-snug text-[#2a2a24] transition group-hover:text-[#8c6d3f]">
            {post.title}
          </p>
          {post.excerpt ? (
            <p className="mt-3 line-clamp-2 break-keep text-[13px] leading-[1.55] text-[#6b6b60]">
              {post.excerpt}
            </p>
          ) : null}
          <time className="mt-auto block pt-4 text-[12px] font-semibold text-[#8b806e]">
            {formatDate(post.date)}
          </time>
        </div>
      </Link>
    </article>
  );
}

function CategoryTabs({ activeSlug }: { activeSlug: BlogCategorySlug }) {
  return (
    <nav
      id={blogListAnchor}
      aria-label="블로그 카테고리"
      className="scroll-mt-20 border-b border-[#c7b48d]/45 bg-[#f3ede3]"
    >
      <ul className="mx-auto flex max-w-[1680px] justify-center gap-2 px-5 sm:gap-6 sm:px-8">
        {blogCategoryConfigs.map((category) => {
          const isActive = category.slug === activeSlug;

          return (
            <li key={category.slug} className="-mb-px">
              <Link
                href={`${blogListingPath(category.slug)}#${blogListAnchor}`}
                aria-current={isActive ? "page" : undefined}
                className={`font-serif-kr inline-flex border-b-2 px-5 py-4 text-[17px] font-bold transition sm:px-8 sm:text-[19px] ${
                  isActive
                    ? "border-[#b8996a] text-[#2a2a24]"
                    : "border-transparent text-[#8b806e] hover:text-[#8c6d3f]"
                }`}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function paginationItems(current: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(2, Math.min(current - 1, totalPages - 3));
  const end = Math.min(totalPages - 1, start + 2);
  const items: (number | "gap-start" | "gap-end")[] = [1];

  if (start > 2) {
    items.push("gap-start");
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < totalPages - 1) {
    items.push("gap-end");
  }

  items.push(totalPages);

  return items;
}

const paginationItemClass =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[14px] font-bold transition";
const paginationLinkClass = `${paginationItemClass} border-[#d8c7a5] bg-white text-[#6b6b60] hover:border-[#b8996a] hover:text-[#8c6d3f]`;

function Pagination({
  slug,
  current,
  totalPages
}: {
  slug: BlogCategorySlug;
  current: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const hrefFor = (page: number) => `${blogListingPath(slug, page)}#${blogListAnchor}`;
  const arrows = [
    { label: "이전 페이지", symbol: "<", page: current - 1 },
    { label: "다음 페이지", symbol: ">", page: current + 1 }
  ];
  const renderArrow = ({ label, symbol, page }: (typeof arrows)[number]) =>
    page >= 1 && page <= totalPages ? (
      <Link href={hrefFor(page)} aria-label={label} className={paginationLinkClass}>
        {symbol}
      </Link>
    ) : (
      <span aria-hidden="true" className={`${paginationItemClass} border-[#d8c7a5]/50 text-[#8b806e]/40`}>
        {symbol}
      </span>
    );

  return (
    <nav aria-label="블로그 페이지" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {renderArrow(arrows[0])}
      {paginationItems(current, totalPages).map((item) =>
        typeof item === "string" ? (
          <span key={item} aria-hidden="true" className="px-1 text-[#8b806e]">
            …
          </span>
        ) : item === current ? (
          <span
            key={item}
            aria-current="page"
            className={`${paginationItemClass} border-[#b8996a] bg-[#b8996a] text-white`}
          >
            {item}
          </span>
        ) : (
          <Link key={item} href={hrefFor(item)} className={paginationLinkClass}>
            {item}
          </Link>
        )
      )}
      {renderArrow(arrows[1])}
    </nav>
  );
}

function CategoryGuideCard({
  categories,
  activeSlug
}: {
  categories: BlogCategoryTotal[];
  activeSlug: BlogCategorySlug;
}) {
  return (
    <div className="rounded-[18px] bg-[linear-gradient(180deg,#141210_0%,#1a1815_100%)] p-6 text-white shadow-[0_24px_54px_rgba(20,18,16,0.2)]">
      <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#c9a876]">
        블로그 안내
      </p>
      <h2 className="font-serif-kr mt-3 break-keep text-[24px] font-bold leading-[1.35]">
        워드프레스 최신글
      </h2>
      <p className="mt-4 break-keep text-[13px] leading-[1.7] text-white/68">
        발행된 글을 카테고리별로 불러와 최신순으로 차곡차곡 보여드립니다.
      </p>

      <div className="mt-6 space-y-0 border-y border-[#c9a876]/20">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`${blogListingPath(category.slug)}#${blogListAnchor}`}
            className={`flex items-center justify-between border-b border-[#c9a876]/14 py-3 text-sm font-semibold last:border-b-0 hover:text-[#c9a876] ${
              category.slug === activeSlug ? "text-[#c9a876]" : "text-white/86"
            }`}
          >
            <span>{category.name}</span>
            {category.total !== null ? (
              <span className="text-[12px] text-[#c9a876]">{category.total}개</span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PhoneCard() {
  return (
    <div className="rounded-[18px] border border-[#c9a876]/42 bg-[#171410] p-6 text-center text-white shadow-[0_24px_54px_rgba(20,18,16,0.18)]">
      <p className="font-serif-kr break-keep text-[22px] font-semibold leading-[1.45] text-[#c9a876]">
        특별한 하루,
        <br />
        <span className="text-white">부산호빠에서 시작하세요.</span>
      </p>
      <a
        href={phoneHref}
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#c9a876]/70 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c9a876] hover:text-[#141210]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a876] text-[#141210] transition group-hover:bg-[#141210] group-hover:text-[#c9a876]">
          <PhoneIcon className="h-5 w-5" />
        </span>
        <span className="font-display text-[20px] font-bold tracking-[0.04em]">
          {phoneDisplay}
        </span>
      </a>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="rounded-[18px] bg-[#f3ede3] p-7 text-center text-[#2a2a24] shadow-[0_20px_48px_rgba(91,76,48,0.12)] ring-1 ring-[#d8c7a5]/58 sm:col-span-2 lg:col-span-1">
      <h2 className="font-serif-kr text-[24px] font-bold tracking-[0.04em]">
        수빈실장
      </h2>
      <div className="mx-auto mt-4 flex w-20 items-center justify-center gap-2 text-[#b8996a]">
        <span className="h-px flex-1 bg-current/60" />
        <span className="text-[10px]">◆</span>
        <span className="h-px flex-1 bg-current/60" />
      </div>

      <div className="relative mx-auto mt-7 flex h-[156px] w-[156px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#c9a876] bg-[radial-gradient(circle_at_35%_25%,#f7f3ea_0%,#d4bc89_38%,#2a241a_100%)] shadow-[0_18px_42px_rgba(42,42,36,0.22)]">
        <span className="font-serif-kr text-[18px] font-bold text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
          수빈실장
        </span>
      </div>

      <p className="mx-auto mt-7 max-w-[250px] break-keep text-[14px] leading-[1.78] text-[#5e584d]">
        안녕하세요, 수빈실장입니다.
        <br />
        부산호빠 깐따삐야에서는 특별한 순간들과 진솔한 이야기를 전해드립니다.
        <br />
        고객님들과의 소중한 인연을 항상 감사하게 생각합니다.
      </p>

      <Link
        href="/#guide"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#b8996a] px-5 py-3 text-sm font-bold text-[#7c643e] transition hover:bg-[#b8996a] hover:text-white"
      >
        프로필 더보기 →
      </Link>
    </div>
  );
}

export default async function BlogListing({
  categorySlug,
  page = 1
}: {
  categorySlug: BlogCategorySlug;
  page?: number;
}) {
  const category = findBlogCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const { posts, total, totalPages } = await fetchPostPage(category, page);

  if (page > 1 && posts.length === 0) {
    notFound();
  }

  const [categories, relatedPosts] = await Promise.all([
    fetchCategoryTotals(category, total),
    // Same-category posts that are not already in the grid above, topped up with other categories.
    getRelatedBlogPosts({
      categorySlug: category.slug,
      excludeIds: posts.map((post) => post.id)
    }).catch(() => [])
  ]);

  return (
    <main className="min-h-screen bg-[#f3ede3] text-[#2a2a24]">
      <JsonLd data={blogSchema} />
      <JsonLd data={buildBreadcrumbSchema(category, page)} />
      <section className="relative isolate flex min-h-[390px] items-center justify-center overflow-hidden bg-[#0d0d0d] px-5 pb-16 pt-32 text-center text-white">
        <Image
          src="/images/888.png"
          alt="부산호빠 블로그 다크 라운지 배경"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,168,118,0.16)_0%,transparent_38%),linear-gradient(180deg,rgba(13,13,13,0.18)_0%,rgba(13,13,13,0.72)_100%)]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="font-display text-[16px] italic tracking-[0.08em] text-[#c9a876]">
            Premium Host Bar
          </p>
          <h1 className="font-display mt-4 text-[70px] font-medium uppercase leading-none tracking-[0.16em] text-white sm:text-[88px] lg:text-[104px]">
            Blog
          </h1>
          <p className="mt-5 break-keep text-[17px] font-medium tracking-[0.02em] text-white/90 md:text-[18px]">
            부산호빠의 모든 이야기
          </p>
          <p className="mx-auto mt-7 inline-flex rounded-full border border-[#c9a876]/72 px-6 py-2.5 text-[13px] font-medium text-white/90 backdrop-blur-sm">
            특별한 순간들, 진짜 이야기를 전해드립니다.
          </p>
        </div>
      </section>

      <CategoryTabs activeSlug={category.slug} />

      <section className="mx-auto grid max-w-[1680px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8 lg:py-14 xl:gap-10">
        <section className="min-w-0">
          <div className="mb-8 border-b border-[#c7b48d]/45 pb-5">
            <p className="text-[12px] font-bold tracking-[0.22em] text-[#b8996a]">
              워드프레스 연동 글
            </p>
            <h2 className="font-serif-kr mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[26px] font-bold text-[#2a2a24] sm:text-[28px]">
              <span className="h-8 w-1 rounded-full bg-[#b8996a]" />
              {category.name} 최신 게시글
              <span className="text-[15px] font-semibold text-[#8b806e]">({total})</span>
            </h2>
            <p className="mt-2 break-keep text-[13px] leading-[1.6] text-[#6b6b60]">
              {category.description}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} categoryName={category.name} />
              ))}
            </div>
          ) : (
            <EmptyPosts categoryName={category.name} />
          )}

          <Pagination slug={category.slug} current={page} totalPages={totalPages} />
        </section>

        <aside className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <CategoryGuideCard categories={categories} activeSlug={category.slug} />
          <PhoneCard />
          <ProfileCard />
        </aside>
      </section>

      {relatedPosts.length > 0 ? (
        <div className="mx-auto max-w-[1680px] px-5 pb-14 sm:px-8 lg:pb-20">
          <RelatedPosts posts={relatedPosts} />
        </div>
      ) : null}
    </main>
  );
}
