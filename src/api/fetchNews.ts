import type { CategorySlugType } from "@/types/definitions";
import type { NewsSource } from "@/types/news";
import { newsFetchers } from "./news.registry";

export const fetchNews = (source: NewsSource, category?: CategorySlugType) => {
  const fetcher = newsFetchers[source];

  return fetcher(category);
};
