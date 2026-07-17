export type BlogPostSummary = {
  id: number;
  title: string;
  slug: string;
  uri: string;
  date: string | null;
  modified: string | null;
  excerpt: string;
  author: string;
  categories: {
    name: string;
    slug: string;
  }[];
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  } | null;
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

export type WordPressPostStatus = "draft" | "publish" | "pending" | "private" | "future";

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
  count?: number;
};

export type WordPressPostResponse = {
  id: number;
  status: string;
  link?: string;
  title?: {
    rendered?: string;
  };
};

type WordPressMediaResponse = {
  id: number;
};

type WordPressConfig = {
  apiBaseUrl: string;
  user: string;
  appPassword: string;
};

type WordPressRenderedField = {
  rendered?: string;
};

type WordPressRestCategory = WordPressCategory & {
  taxonomy?: string;
};

type WordPressRestAuthor = {
  id: number;
  name: string;
};

type WordPressRestMedia = {
  id: number;
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string }>;
  };
};

type WordPressRestPost = {
  id: number;
  slug: string;
  date: string | null;
  modified: string | null;
  title?: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  content?: WordPressRenderedField;
  _embedded?: {
    author?: WordPressRestAuthor[];
    "wp:term"?: WordPressRestCategory[][];
    "wp:featuredmedia"?: WordPressRestMedia[];
  };
};

type WordPressRequestErrorContext = {
  endpoint: string;
  url: string;
  status?: number;
  statusText?: string;
  message: string;
};

type WordPressPublicRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

const envNames = {
  url: ["WP_URL", "NEXT_PUBLIC_WORDPRESS_API_URL"],
  user: ["WP_USER", "WORDPRESS_USER"],
  appPassword: ["WP_APP_PASSWORD", "WORDPRESS_APPLICATION_PASSWORD"]
} as const;

function firstEnvValue(names: readonly string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }

  return undefined;
}

function normalizeWordPressApiBase(rawUrl: string) {
  const url = new URL(rawUrl);
  const trimmedPath = url.pathname.replace(/\/+$/, "");
  const wpApiIndex = trimmedPath.indexOf("/wp-json/wp/v2");

  url.search = "";
  url.hash = "";

  if (trimmedPath.endsWith("/graphql")) {
    url.pathname = `${trimmedPath.slice(0, -"/graphql".length)}/wp-json/wp/v2/`;
    return url.toString();
  }

  if (wpApiIndex >= 0) {
    url.pathname = `${trimmedPath.slice(0, wpApiIndex)}/wp-json/wp/v2/`;
    return url.toString();
  }

  if (trimmedPath.endsWith("/wp-json")) {
    url.pathname = `${trimmedPath}/wp/v2/`;
    return url.toString();
  }

  if (trimmedPath.includes("/wp-json/")) {
    url.pathname = `${trimmedPath.slice(0, trimmedPath.indexOf("/wp-json/"))}/wp-json/wp/v2/`;
    return url.toString();
  }

  url.pathname = `${trimmedPath}/wp-json/wp/v2/`;
  return url.toString();
}

function getWordPressApiBase() {
  const url = firstEnvValue(envNames.url);

  if (!url) {
    throw new Error(`WordPress API URL 환경변수가 누락되었습니다: ${envNames.url.join(" 또는 ")}`);
  }

  return normalizeWordPressApiBase(url);
}

function getWordPressConfig(): WordPressConfig {
  const url = firstEnvValue(envNames.url);
  const user = firstEnvValue(envNames.user);
  const appPassword = firstEnvValue(envNames.appPassword);
  const missing: string[] = [];

  if (!url) {
    missing.push(`${envNames.url[0]} 또는 ${envNames.url[1]}`);
  }

  if (!user) {
    missing.push(`${envNames.user[0]} 또는 ${envNames.user[1]}`);
  }

  if (!appPassword) {
    missing.push(`${envNames.appPassword[0]} 또는 ${envNames.appPassword[1]}`);
  }

  if (missing.length > 0) {
    throw new Error(`WordPress 환경변수가 누락되었습니다: ${missing.join(", ")}`);
  }

  if (!url || !user || !appPassword) {
    throw new Error("WordPress 환경변수 확인 중 알 수 없는 오류가 발생했습니다.");
  }

  return {
    apiBaseUrl: normalizeWordPressApiBase(url),
    user,
    appPassword
  };
}

function getAuthHeader(config: WordPressConfig) {
  return `Basic ${Buffer.from(`${config.user}:${config.appPassword}`).toString("base64")}`;
}

function endpointUrl(apiBaseUrl: string, endpoint: string) {
  return new URL(endpoint, apiBaseUrl).toString();
}

function logWordPressRequestError(context: WordPressRequestErrorContext) {
  console.error("[wordpress] REST request failed", context);
}

async function parseWordPressError(response: Response, endpoint: string) {
  const fallback = `${response.status} ${response.statusText}`.trim();
  const text = await response.text().catch(() => "");

  if (!text) {
    return `WordPress REST API 요청 실패 (${fallback}) - ${endpoint}`;
  }

  try {
    const payload = JSON.parse(text) as { message?: string; code?: string };
    const detail = payload.message ?? payload.code ?? fallback;
    return `WordPress REST API 요청 실패 (${fallback}) - ${endpoint}: ${detail}`;
  } catch {
    return `WordPress REST API 요청 실패 (${fallback}) - ${endpoint}`;
  }
}

async function wordpressRequest<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
  const config = getWordPressConfig();
  const headers = new Headers(init.headers);

  headers.set("Authorization", getAuthHeader(config));

  const response = await fetch(endpointUrl(config.apiBaseUrl, endpoint), {
    ...init,
    headers
  });

  if (!response.ok) {
    const message = await parseWordPressError(response, endpoint);

    logWordPressRequestError({
      endpoint,
      url: endpointUrl(config.apiBaseUrl, endpoint),
      status: response.status,
      statusText: response.statusText,
      message
    });

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

async function wordpressPublicRequest<T>(
  endpoint: string,
  init: WordPressPublicRequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);

  headers.set("Accept", "application/json");

  const requestUrl = endpointUrl(getWordPressApiBase(), endpoint);
  let response: Response;

  try {
    response = await fetch(requestUrl, {
      ...init,
      headers
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    logWordPressRequestError({
      endpoint,
      url: requestUrl,
      message
    });

    throw error;
  }

  if (!response.ok) {
    const message = await parseWordPressError(response, endpoint);

    logWordPressRequestError({
      endpoint,
      url: requestUrl,
      status: response.status,
      statusText: response.statusText,
      message
    });

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

function mimeTypeFor(filename: string) {
  const extension = filename.toLowerCase().split(".").pop();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

function contentDispositionFilename(filename: string) {
  return filename.replace(/["\\\r\n]/g, "_");
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function htmlToText(value = "") {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function clampPerPage(first: number) {
  return Math.max(1, Math.min(Math.floor(first), 100));
}

function postListEndpoint(first: number, extraParams: Record<string, string | number> = {}) {
  const params = new URLSearchParams({
    _embed: "1",
    order: "desc",
    orderby: "date",
    per_page: String(clampPerPage(first))
  });

  for (const [key, value] of Object.entries(extraParams)) {
    params.set(key, String(value));
  }

  return `posts?${params.toString()}`;
}

function getPostCategories(post: WordPressRestPost) {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];

  return terms
    .filter((term) => !term.taxonomy || term.taxonomy === "category")
    .map((term) => ({
      name: htmlToText(term.name),
      slug: term.slug
    }));
}

function getPostFeaturedImage(post: WordPressRestPost) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];

  if (!media) {
    return null;
  }

  const sourceUrl =
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.medium_large?.source_url ??
    media.source_url;

  if (!sourceUrl) {
    return null;
  }

  return {
    sourceUrl,
    altText: htmlToText(media.alt_text ?? post.title?.rendered ?? "")
  };
}

function mapWordPressPost(post: WordPressRestPost, includeContent = false): BlogPost {
  const title = htmlToText(post.title?.rendered ?? "") || "제목 없음";

  return {
    id: post.id,
    title,
    slug: post.slug,
    uri: `/blog/${post.slug}`,
    date: post.date,
    modified: post.modified,
    excerpt: htmlToText(post.excerpt?.rendered ?? ""),
    author: post._embedded?.author?.[0]?.name ?? "부산호빠",
    categories: getPostCategories(post),
    featuredImage: getPostFeaturedImage(post),
    content: includeContent ? post.content?.rendered ?? "" : ""
  };
}

export async function publishPost(
  title: string,
  content: string,
  categoryIds: number[] = [],
  status: WordPressPostStatus = "draft"
): Promise<WordPressPostResponse> {
  const payload: {
    title: string;
    content: string;
    status: WordPressPostStatus;
    categories?: number[];
  } = {
    title,
    content,
    status
  };

  if (categoryIds.length > 0) {
    payload.categories = categoryIds;
  }

  return wordpressRequest<WordPressPostResponse>("posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

export async function uploadImage(filePath: string, filename: string): Promise<number> {
  const { readFile } = await import("node:fs/promises");
  const file = await readFile(filePath);
  const contentType = mimeTypeFor(filename);
  const body = new Blob([new Uint8Array(file)], { type: contentType });
  const media = await wordpressRequest<WordPressMediaResponse>("media", {
    method: "POST",
    headers: {
      "Content-Disposition": `attachment; filename="${contentDispositionFilename(filename)}"`,
      "Content-Type": contentType
    },
    body
  });

  return media.id;
}

export async function getCategories(): Promise<WordPressCategory[]> {
  return wordpressPublicRequest<WordPressCategory[]>("categories?per_page=100", {
    next: { revalidate: 3600 }
  });
}

export async function getBlogPosts(first = 12): Promise<BlogPostSummary[]> {
  const posts = await wordpressPublicRequest<WordPressRestPost[]>(postListEndpoint(first), {
    next: { revalidate: 60 }
  });

  return posts.map((post) => mapWordPressPost(post));
}

export async function getBlogPostsByCategory(
  categorySlug: string,
  first = 18,
  revalidateSeconds = 60
): Promise<BlogPostSummary[]> {
  const encodedSlug = encodeURIComponent(categorySlug);
  const categories = await wordpressPublicRequest<WordPressCategory[]>(
    `categories?slug=${encodedSlug}&per_page=1`,
    {
      next: { revalidate: revalidateSeconds }
    }
  );
  const category = categories[0];

  const posts = category
    ? await wordpressPublicRequest<WordPressRestPost[]>(
        postListEndpoint(first, { categories: category.id }),
        {
          next: { revalidate: revalidateSeconds }
        }
      )
    : await wordpressPublicRequest<WordPressRestPost[]>(
        postListEndpoint(first, { category_name: categorySlug }),
        {
          next: { revalidate: revalidateSeconds }
        }
      );

  return posts.map((post) => mapWordPressPost(post));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await wordpressPublicRequest<WordPressRestPost[]>(
    `posts?slug=${encodeURIComponent(slug)}&_embed=1&per_page=1`,
    {
      next: { revalidate: 300 }
    }
  );
  const post = posts[0];

  return post ? mapWordPressPost(post, true) : null;
}

export async function getBlogPostSlugs(first = 50) {
  const params = new URLSearchParams({
    _fields: "slug,modified",
    order: "desc",
    orderby: "date",
    per_page: String(clampPerPage(first))
  });
  const posts = await wordpressPublicRequest<Pick<WordPressRestPost, "slug" | "modified">[]>(
    `posts?${params.toString()}`,
    {
      next: { revalidate: 300 }
    }
  );

  return posts.map((post) => ({
    slug: post.slug,
    modified: post.modified
  }));
}
