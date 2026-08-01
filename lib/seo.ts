import { businessName, managerName, phoneDisplay, siteUrl } from "@/lib/constants";

const maxTitleLength = 60;
const maxDescriptionLength = 160;
const primarySeoTitle = `${businessName} | 해운대호빠 ${phoneDisplay} ${managerName}`;

export const defaultSeo = {
  siteName: businessName,
  locale: "ko_KR",
  defaultImage: "/images/000.png",
  blogImage: "/images/888.png",
  homeTitle: primarySeoTitle,
  homeDescription:
    "부산호빠 예약 상담, 부산시 해운대구 마린시티2로 33 프라이빗 라운지와 VIP룸 이용 흐름을 수빈실장이 안내합니다.",
  fallbackTitle: primarySeoTitle,
  fallbackDescription:
    "부산호빠 예약 상담과 해운대 프라이빗 라운지, VIP룸 이용 안내를 확인해 보세요."
} as const;

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
    .replace(/&hellip;/g, "...")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function textFromHtml(value = "") {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function cleanText(value = "") {
  return textFromHtml(value).replace(/\s+/g, " ").trim();
}

function truncateText(value: string, maxLength: number) {
  const cleanValue = cleanText(value);

  if (cleanValue.length <= maxLength) {
    return cleanValue;
  }

  return `${cleanValue.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

export function buildMetaTitle(primary: string, suffix = businessName) {
  const cleanPrimary = cleanText(primary) || defaultSeo.fallbackTitle;
  const cleanSuffix = cleanText(suffix);
  const suffixText = cleanSuffix ? ` | ${cleanSuffix}` : "";
  const title = suffixText && !cleanPrimary.includes(cleanSuffix) ? `${cleanPrimary}${suffixText}` : cleanPrimary;

  if (title.length <= maxTitleLength) {
    return title;
  }

  if (!suffixText || cleanPrimary.includes(cleanSuffix)) {
    return truncateText(title, maxTitleLength);
  }

  const primaryLength = Math.max(12, maxTitleLength - suffixText.length - 3);
  return `${cleanPrimary.slice(0, primaryLength).trimEnd()}...${suffixText}`;
}

export function buildMetaDescription({
  description,
  content,
  fallback
}: {
  description?: string | null;
  content?: string | null;
  fallback?: string | null;
} = {}) {
  const candidates = [description, content ? textFromHtml(content) : "", fallback, defaultSeo.fallbackDescription];
  const source = candidates.map((candidate) => cleanText(candidate ?? "")).find(Boolean);

  return truncateText(source ?? defaultSeo.fallbackDescription, maxDescriptionLength);
}

export function normalizeCanonicalPath(path = "/") {
  let pathname = path.trim() || "/";

  if (/^https?:\/\//i.test(pathname)) {
    try {
      pathname = new URL(pathname).pathname;
    } catch {
      pathname = "/";
    }
  }

  pathname = pathname.split(/[?#]/)[0] || "/";

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/{2,}/g, "/");

  if (pathname.length > 1) {
    pathname = pathname.replace(/\/+$/, "");
  }

  return pathname === "/" ? "/" : pathname.toLowerCase();
}

export function canonicalUrl(path = "/") {
  const pathname = normalizeCanonicalPath(path);

  return pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
}

export function absoluteAssetUrl(sourceUrl?: string | null, fallbackPath: string = defaultSeo.defaultImage) {
  const imageUrl = sourceUrl?.trim() || fallbackPath;

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `${siteUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}
