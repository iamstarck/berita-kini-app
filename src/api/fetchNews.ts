import type { CategorySlugType } from "@/types/definitions";
import type { NewsSource } from "@/types/news";
import { newsFetchers } from "./news.registry";
import { newsSourceConfig } from "@/lib/news.source.config";

export const fetchNews = (source: NewsSource, category?: CategorySlugType) => {
  const config = newsSourceConfig[source];

  if (category && !(category in config.categoryMap)) {
    return Promise.resolve([]);
  }

  const mappedCategory = category ? config.categoryMap[category] : undefined;

  return newsFetchers[source](mappedCategory as CategorySlugType);
};
