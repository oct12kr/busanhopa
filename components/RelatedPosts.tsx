import Link from "next/link";
import type { BlogPostSummary } from "@/lib/wordpress";

type RelatedPostsTone = "light" | "dark";

const toneClasses: Record<
  RelatedPostsTone,
  { label: string; heading: string; divider: string; card: string; title: string; date: string }
> = {
  // Blog listing: beige page with white cards.
  light: {
    label: "text-[#b8996a]",
    heading: "text-[#2a2a24]",
    divider: "border-[#c7b48d]/45",
    card: "bg-white shadow-[0_12px_28px_rgba(42,42,36,0.07)] ring-1 ring-[#d8c7a5]/35 hover:shadow-[0_24px_52px_rgba(42,42,36,0.15)]",
    title: "text-[#2a2a24] group-hover:text-[#8c6d3f]",
    date: "text-[#8b806e]"
  },
  // Blog post: dark page with gold accents.
  dark: {
    label: "text-[#d9c49a]",
    heading: "text-[#f7efe2]",
    divider: "border-[#d9c49a]/15",
    card: "bg-[#202519]/60 ring-1 ring-[#d9c49a]/20 hover:ring-[#d9c49a]/45",
    title: "text-[#f7efe2] group-hover:text-[#d9c49a]",
    date: "text-[#f7efe2]/60"
  }
};

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

export default function RelatedPosts({
  posts,
  tone = "light"
}: {
  posts: BlogPostSummary[];
  tone?: RelatedPostsTone;
}) {
  if (posts.length === 0) {
    return null;
  }

  const classes = toneClasses[tone];

  return (
    <section aria-labelledby="related-posts-heading" className={`border-t pt-10 ${classes.divider}`}>
      <div className="text-center">
        <p className={`text-[12px] font-bold tracking-[0.22em] ${classes.label}`}>관련 포스팅</p>
        <h2
          id="related-posts-heading"
          className={`font-serif-kr mt-2 text-[24px] font-bold sm:text-[26px] ${classes.heading}`}
        >
          함께 읽어보세요
        </h2>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
        {posts.map((post) => {
          const image = post.featuredImage;
          const date = formatDate(post.date);

          return (
            <li key={post.id} className="min-w-0">
              <article
                className={`group h-full rounded-[14px] transition duration-300 hover:-translate-y-1 ${classes.card}`}
              >
                <Link href={`/blog/${post.slug}`} className="flex h-full gap-3 p-2.5 sm:flex-col">
                  <div className="relative aspect-[4/3] w-[116px] shrink-0 overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,#1a1815_0%,#4a3922_52%,#c9a876_100%)] sm:aspect-[16/10] sm:w-full">
                    {image ? (
                      // Remote WordPress media below the fold: lazy <img> inside a fixed-ratio box (no layout shift).
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image.cardUrl}
                        alt={image.altText}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center px-1 sm:justify-start sm:pb-1">
                    <h3
                      className={`line-clamp-2 break-keep text-[14px] font-bold leading-snug transition ${classes.title}`}
                    >
                      {post.title}
                    </h3>
                    {date ? (
                      <time className={`mt-2 block text-[11px] font-semibold sm:mt-auto sm:pt-3 ${classes.date}`}>
                        {date}
                      </time>
                    ) : null}
                  </div>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
