import { fetchNews } from "@/api/fetchNews";
import type { CategorySlugType } from "@/types/definitions";
import type { News, NewsSource } from "@/types/news";
import { dedupeNews, sortNewsByDateDesc } from "./news.utils";

export const fetchAggregatedNews = async (
  sources: NewsSource[],
  category?: CategorySlugType,
): Promise<News[]> => {
  const results = await Promise.allSettled(
    sources.map((source) => fetchNews(source, category)),
  );

  const fulfilled = results
    .filter(
      (r): r is PromiseFulfilledResult<News[]> => r.status === "fulfilled",
    )
    .flatMap((r) => r.value);

  const deduped = dedupeNews(fulfilled);

  return sortNewsByDateDesc(deduped);
};
