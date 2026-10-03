import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogListing, {
  blogListingPath,
  buildBlogListingMetadata,
  findBlogCategory,
  parseBlogPageNumber
} from "@/components/BlogListing";

export const revalidate = 60;

type BlogCategoryPagedPageProps = {
  params: Promise<{
    category: string;
    page: string;
  }>;
};

// Paginated listings are rendered on first request and then cached like the other blog pages.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: BlogCategoryPagedPageProps): Promise<Metadata> {
  const { category: slug, page: rawPage } = await params;
  const category = findBlogCategory(slug);
  const page = parseBlogPageNumber(rawPage);

  return category && page ? buildBlogListingMetadata(category.slug, page) : {};
}

export default async function BlogCategoryPagedPage({ params }: BlogCategoryPagedPageProps) {
  const { category: slug, page: rawPage } = await params;
  const category = findBlogCategory(slug);
  const page = parseBlogPageNumber(rawPage);

  if (!category || !page) {
    notFound();
  }

  // Page 1 already has a canonical URL (/blog or /blog/category/[category]).
  if (page === 1) {
    permanentRedirect(blogListingPath(category.slug));
  }

  return <BlogListing categorySlug={category.slug} page={page} />;
}
