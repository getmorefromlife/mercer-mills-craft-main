import { marked } from "marked";

export interface Post {
  slug: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  bodyHtml: string;
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const data: Record<string, unknown> = {};
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data, content: raw.trim() };
  const lines = match[1].split("\n");
  let currentKey = "";
  for (const line of lines) {
    const arrMatch = line.match(/^\s*-\s*(.+)$/);
    const keyMatch = line.match(/^(\w+):\s*(.+)$/);
    if (arrMatch && currentKey && Array.isArray(data[currentKey])) {
      (data[currentKey] as string[]).push(arrMatch[1].trim());
    } else if (keyMatch) {
      currentKey = keyMatch[1];
      data[currentKey] = keyMatch[2].trim();
    }
  }
  return { data, content: match[2].trim() };
}

const rawPosts = import.meta.glob("/content/posts/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export const posts: Post[] = Object.entries(rawPosts).map(([path, raw]) => {
  const slug = path.replace("/content/posts/", "").replace(/\.md$/, "");
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    date: (data.date as string) || "",
    readTime: (data.readTime as string) || "",
    title: (data.title as string) || "",
    excerpt: content.split("\n\n")[0].replace(/[#*`_~>\[\]()]/g, "").trim(),
    tags: (data.tags as string[]) || [],
    bodyHtml: marked.parse(content) as string,
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const postsBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));
