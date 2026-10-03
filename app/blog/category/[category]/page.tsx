import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogListing, {
  blogCategoryConfigs,
  blogListingPath,
  buildBlogListingMetadata,
  defaultBlogCategorySlug,
  findBlogCategory
} from "@/components/BlogListing";

export const revalidate = 60;

type BlogCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return blogCategoryConfigs
    .filter((category) => category.slug !== defaultBlogCategorySlug)
    .map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findBlogCategory(slug);

  return category ? buildBlogListingMetadata(category.slug) : {};
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category: slug } = await params;
  const category = findBlogCategory(slug);

  if (!category) {
    notFound();
  }

  // The default category's first page lives at /blog; keep a single indexable URL for it.
  if (category.slug === defaultBlogCategorySlug) {
    permanentRedirect(blogListingPath(category.slug));
  }

  return <BlogListing categorySlug={category.slug} />;
}
