import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostsByCategory, type BlogPostSummary } from "@/lib/wordpress";
import { businessName, siteUrl } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: `블로그 | ${businessName}`,
  description:
    `부산호빠 ${businessName}의 이야기, 방문 가이드, 프라이빗 공간과 VIP 서비스 소식을 전하는 블로그입니다.`,
  alternates: {
    canonical: `${siteUrl}/blog`
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: `블로그 | ${businessName}`,
    description:
      `부산호빠 ${businessName}의 이야기, 방문 가이드, 프라이빗 공간과 VIP 서비스 소식을 전하는 블로그입니다.`,
    images: [
      {
        url: "/images/888.png",
        width: 2400,
        height: 1000,
        alt: `${businessName} 블로그 대표 이미지`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `블로그 | ${businessName}`,
    description:
      `부산호빠 ${businessName}의 이야기, 방문 가이드, 프라이빗 공간과 VIP 서비스 소식을 전하는 블로그입니다.`,
    images: ["/images/888.png"]
  }
};

// TODO: 실제 번호로 교체
const blogPhonePlaceholder = "010-XXXX-XXXX";
const postsPerCategory = 12;

type BlogCategoryConfig = {
  name: "부산호빠" | "수빈실장";
  slug: "busan-hoppa" | "subin-manager";
  lookupSlugs: string[];
  description: string;
};

type BlogCategoryGroup = BlogCategoryConfig & {
  posts: BlogPostSummary[];
};

const blogCategoryConfigs: BlogCategoryConfig[] = [
  {
    name: "부산호빠",
    slug: "busan-hoppa",
    lookupSlugs: ["busan-hoppa", "busanhoppa", "부산호빠", "aaa"],
    description: "부산호빠 이용 안내와 공간, 예약 흐름을 정리한 글입니다."
  },
  {
    name: "수빈실장",
    slug: "subin-manager",
    lookupSlugs: ["subin-manager", "subin", "수빈실장", "bbb"],
    description: "수빈실장이 직접 전하는 방문 팁과 상담 안내입니다."
  }
];

async function fetchPostsByCategory(config: BlogCategoryConfig) {
  for (const slug of config.lookupSlugs) {
    const posts = await getBlogPostsByCategory(slug, postsPerCategory).catch(() => []);

    if (posts.length > 0) {
      return posts;
    }
  }

  return [];
}

async function fetchBlogListingData(): Promise<BlogCategoryGroup[]> {
  const postGroups = await Promise.all(blogCategoryConfigs.map(fetchPostsByCategory));

  return blogCategoryConfigs.map((category, index) => ({
    ...category,
    posts: postGroups[index] ?? []
  }));
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

function BlogPostCard({ post, categoryName }: { post: BlogPostSummary; categoryName: string }) {
  const imageUrl = post.featuredImage?.sourceUrl;
  const imageStyle = imageUrl
    ? { backgroundImage: `url("${imageUrl.replace(/"/g, '\\"')}")` }
    : undefined;

  return (
    <article className="group rounded-[16px] bg-white p-3 shadow-[0_12px_28px_rgba(42,42,36,0.07)] ring-1 ring-[#d8c7a5]/35 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(42,42,36,0.15)]">
      <Link href={`/blog/${post.slug}`} className="grid gap-4 sm:grid-cols-[132px_minmax(0,1fr)]">
        <div
          aria-hidden="true"
          style={imageStyle}
          className="min-h-[132px] overflow-hidden rounded-[12px] bg-[linear-gradient(135deg,#1a1815_0%,#4a3922_52%,#c9a876_100%)] bg-cover bg-center"
        >
          <div className="flex h-full min-h-[132px] items-end bg-gradient-to-t from-black/45 via-transparent to-transparent p-3">
            <span className="rounded-full border border-white/30 bg-black/24 px-2.5 py-1 text-[10px] font-bold text-white/90 backdrop-blur">
              {categoryName}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center px-1 py-1">
          <p className="line-clamp-2 break-keep text-[16px] font-extrabold leading-snug text-[#2a2a24] transition group-hover:text-[#8c6d3f]">
            {post.title}
          </p>
          {post.excerpt ? (
            <p className="mt-3 line-clamp-2 break-keep text-[13px] leading-[1.55] text-[#6b6b60]">
              {post.excerpt}
            </p>
          ) : null}
          <time className="mt-4 block text-[12px] font-semibold text-[#8b806e]">
            {formatDate(post.date)}
          </time>
        </div>
      </Link>
    </article>
  );
}

function CategorySidebar({ groups }: { groups: BlogCategoryGroup[] }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[18px] bg-[linear-gradient(180deg,#141210_0%,#1a1815_100%)] p-6 text-white shadow-[0_24px_54px_rgba(20,18,16,0.2)]">
        <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#c9a876]">
          블로그 안내
        </p>
        <h2 className="font-serif-kr mt-3 break-keep text-[24px] font-bold leading-[1.35]">
          워드프레스 최신글
        </h2>
        <p className="mt-4 break-keep text-[13px] leading-[1.7] text-white/68">
          발행된 글을 카테고리별로 불러와 아래 영역에 차곡차곡 보여드립니다.
        </p>

        <div className="mt-6 space-y-0 border-y border-[#c9a876]/20">
          {groups.map((group) => (
            <a
              key={group.slug}
              href={`#category-${group.slug}`}
              className="flex items-center justify-between border-b border-[#c9a876]/14 py-3 text-sm font-semibold text-white/86 last:border-b-0 hover:text-[#c9a876]"
            >
              <span>{group.name}</span>
              <span className="text-[12px] text-[#c9a876]">{group.posts.length}개</span>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-[#c9a876]/42 bg-[#171410] p-6 text-center text-white shadow-[0_24px_54px_rgba(20,18,16,0.18)]">
        <p className="font-serif-kr break-keep text-[22px] font-semibold leading-[1.45] text-[#c9a876]">
          특별한 하루,
          <br />
          <span className="text-white">부산호빠에서 시작하세요.</span>
        </p>
        <p className="mt-5 font-display text-[24px] font-bold tracking-[0.04em] text-white">
          {blogPhonePlaceholder}
        </p>
        <Link
          href="/#contact"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#c9a876]/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c9a876] hover:text-[#141210]"
        >
          예약하기 →
        </Link>
      </div>
    </aside>
  );
}

function CategoryColumn({
  group,
  bordered = false
}: {
  group: BlogCategoryGroup;
  bordered?: boolean;
}) {
  return (
    <section
      id={`category-${group.slug}`}
      className={`scroll-mt-28 ${bordered ? "lg:border-l lg:border-[#b8996a]/25 lg:pl-8 xl:pl-10" : ""}`}
    >
      <div className="mb-5">
        <h2 className="font-serif-kr flex items-center gap-3 text-[24px] font-bold text-[#2a2a24]">
          <span className="h-8 w-1 rounded-full bg-[#b8996a]" />
          {group.name}
          <span className="text-[15px] font-semibold text-[#8b806e]">({group.posts.length})</span>
        </h2>
        <p className="mt-2 break-keep text-[13px] leading-[1.6] text-[#6b6b60]">
          {group.description}
        </p>
      </div>

      <div className="space-y-4">
        {group.posts.length > 0 ? (
          group.posts.map((post) => (
            <BlogPostCard key={post.id} post={post} categoryName={group.name} />
          ))
        ) : (
          <EmptyPosts categoryName={group.name} />
        )}
      </div>
    </section>
  );
}

function ProfileSidebar() {
  return (
    <aside className="rounded-[18px] bg-[#f3ede3] p-7 text-center text-[#2a2a24] shadow-[0_20px_48px_rgba(91,76,48,0.12)] ring-1 ring-[#d8c7a5]/58 lg:sticky lg:top-24 lg:self-start">
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
    </aside>
  );
}

export default async function BlogPage() {
  const groups = await fetchBlogListingData();

  return (
    <main className="min-h-screen bg-[#f3ede3] text-[#2a2a24]">
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

      <section className="mx-auto grid max-w-[1680px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)_280px] lg:items-start lg:py-16 xl:gap-10">
        <CategorySidebar groups={groups} />

        <section className="min-w-0">
          <div className="mb-8 border-b border-[#c7b48d]/45 pb-5">
            <p className="text-[12px] font-bold tracking-[0.22em] text-[#b8996a]">
              워드프레스 연동 글
            </p>
            <h1 className="font-serif-kr mt-2 text-[28px] font-bold text-[#2a2a24]">
              최신 게시글
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 xl:gap-10">
            {groups.map((group, index) => (
              <CategoryColumn key={group.slug} group={group} bordered={index > 0} />
            ))}
          </div>
        </section>

        <ProfileSidebar />
      </section>
    </main>
  );
}
