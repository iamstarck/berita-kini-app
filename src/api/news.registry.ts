import type { News, NewsSource } from "@/types/news";
import { fetchCnnNews } from "./cnn-news.service";
import type { CategorySlugType } from "@/lib/definitions";

export type NewsFetcher = (category?: CategorySlugType) => Promise<News[]>;

export const newsFetchers: Record<NewsSource, NewsFetcher> = {
  cnn: fetchCnnNews,
};
