import type { News, NewsSource } from "@/types/news";
import { fetchCnnNews } from "./services/cnn-news.service";
import type { CategorySlugType } from "@/types/definitions";
import { fetchRepublikaNews } from "./services/republika-news.service";

export type NewsFetcher = (category?: CategorySlugType) => Promise<News[]>;

export const newsFetchers: Record<NewsSource, NewsFetcher> = {
  cnn: fetchCnnNews,
  republika: fetchRepublikaNews,
};
