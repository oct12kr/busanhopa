const WP_REST_URL = 'https://wordpress-1628102-6481493.cloudwaysapps.com/wp-json/wp/v2';

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

function cleanText(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
}

function normalizeRestPost(post: any): BlogPost {
  const title = cleanText(post.title?.rendered || '');
  const slug = post.slug;
  const excerpt = cleanText(post.excerpt?.rendered || '');
  const content = post.content?.rendered || '';
  
  let author = "건대더블유";
  if (post._embedded?.author?.[0]?.name) {
    author = post._embedded.author[0].name;
  }

  let featuredImage = null;
  if (post._embedded?.['wp:featuredmedia']?.[0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    featuredImage = {
      sourceUrl: media.source_url,
      altText: media.alt_text || title
    };
  }

  let categories: {name: string, slug: string}[] = [];
  if (post._embedded?.['wp:term']) {
    const terms = post._embedded['wp:term'];
    for (const termArray of terms) {
      for (const term of termArray) {
        if (term.taxonomy === 'category') {
          categories.push({
            name: cleanText(term.name),
            slug: term.slug
          });
        }
      }
    }
  }

  return {
    id: post.id,
    title,
    slug,
    uri: `/blog/${slug}`,
    date: post.date,
    modified: post.modified,
    excerpt,
    content,
    author,
    categories,
    featuredImage
  };
}

export async function getBlogPosts(first = 12): Promise<BlogPostSummary[]> {
  try {
    const res = await fetch(`${WP_REST_URL}/posts?_embed=1&per_page=${first}`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const posts = await res.json();
    return posts.map(normalizeRestPost).map(({ content: _content, ...post }) => post);
  } catch (e) {
    console.error("getBlogPosts Error:", e);
    return [];
  }
}

export async function getBlogPostsByCategory(
  categorySlug: string,
  first = 18
): Promise<BlogPostSummary[]> {
  const CATEGORY_MAP: Record<string, number> = {
    'aaa': 2,
    'bbb': 3
  };
  
  const categoryId = CATEGORY_MAP[categorySlug];
  let url = `${WP_REST_URL}/posts?_embed=1&per_page=${first}`;
  
  if (categoryId) {
    url += `&categories=${categoryId}`;
  }

  try {
    const res = await fetch(url, {
      cache: 'no-store'
    });
    if (!res.ok) {
      console.error(`WP REST API Error: ${res.status}`);
      return [];
    }
    const posts = await res.json();
    return posts.map(normalizeRestPost).map(({ content: _content, ...post }) => post);
  } catch (e) {
    console.error("getBlogPostsByCategory Error:", e);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${WP_REST_URL}/posts?_embed=1&slug=${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const posts = await res.json();
    if (posts && posts.length > 0) {
      return normalizeRestPost(posts[0]);
    }
    return null;
  } catch (e) {
    console.error("getBlogPostBySlug Error:", e);
    return null;
  }
}

export async function getBlogPostSlugs(first = 50) {
  const posts = await getBlogPosts(first);
  return posts.map(post => ({
    slug: post.slug,
    modified: post.modified
  }));
}
