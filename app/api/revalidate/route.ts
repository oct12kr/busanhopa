import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const supportedCategorySlugs = new Set(["aaa", "bbb"]);

type RevalidatePayload = {
  slug?: unknown;
  category?: unknown;
  categories?: unknown;
};

function normalizeCategories(payload: RevalidatePayload | null) {
  const rawCategories = payload?.categories ?? payload?.category;
  const values = Array.isArray(rawCategories) ? rawCategories : [rawCategories];

  return values.filter((value): value is string => typeof value === "string");
}

export async function POST(req: NextRequest) {
  const configuredSecret = process.env.REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { revalidated: false, message: "Revalidation secret is not configured" },
      { status: 500 }
    );
  }

  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== configuredSecret) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as RevalidatePayload | null;
  const revalidatedPaths = new Set<string>();

  revalidatePath("/blog", "page");
  revalidatedPaths.add("/blog");

  if (typeof body?.slug === "string" && body.slug.trim()) {
    const slug = body.slug.trim();

    revalidatePath(`/blog/${slug}`, "page");
    revalidatedPaths.add(`/blog/${slug}`);
  }

  const categories = normalizeCategories(body);
  const hasSupportedCategory = categories.some((category) => supportedCategorySlugs.has(category));

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    categories: hasSupportedCategory ? categories.filter((category) => supportedCategorySlugs.has(category)) : [],
    paths: Array.from(revalidatedPaths)
  });
}
