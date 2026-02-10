import { fetchNews } from "@/api/fetchNews";
import type { CategorySlugType } from "@/lib/definitions";
import type { NewsSource } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

export const useNews = (source: NewsSource, category?: CategorySlugType) => {
  return useQuery({
    queryKey: ["news", source, category ?? "all"],
    queryFn: () => fetchNews(source, category),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5 * 10,
  });
};
