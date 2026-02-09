import type { News } from "@/types/news";
import { fetchCnnNews } from "./cnn-news.service";

export type NewsFetcher = (category?: string) => Promise<News[]>;

export const newsFetchers: Record<string, NewsFetcher> = {
  cnn: fetchCnnNews,
};
