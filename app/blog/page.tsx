import type { Metadata } from "next";
import BlogListing, { buildBlogListingMetadata, defaultBlogCategorySlug } from "@/components/BlogListing";

export const revalidate = 60;

export const metadata: Metadata = buildBlogListingMetadata(defaultBlogCategorySlug);

export default function BlogPage() {
  return <BlogListing categorySlug={defaultBlogCategorySlug} />;
}
