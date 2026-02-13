import type { News } from "@/types/news";

export const sortNewsByDateDesc = (news: News[]): News[] => {
  return [...news].sort((a, b) => {
    const diff =
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

    if (diff !== 0) return diff;

    return a.source.localeCompare(b.source);
  });
};

export const dedupeNews = (news: News[]): News[] => {
  const seen = new Set<string>();

  return news.filter((item) => {
    const key = item.title.trim().toLowerCase();

    if (seen.has(key)) return false;

    seen.add(key);

    return true;
  });
};
