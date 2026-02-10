import type { News, NewsSource } from "@/types/news";
import { fetchCnnNews } from "./cnn-news.service";

export type NewsFetcher = (category?: string) => Promise<News[]>;

export const newsFetchers: Record<NewsSource, NewsFetcher> = {
  cnn: fetchCnnNews,
};
