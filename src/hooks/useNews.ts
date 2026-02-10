import { newsFetchers } from "@/api/news.registry";
import type { CategorySlugType } from "@/lib/definitions";
import type { NewsSource } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

export const useNews = (source: NewsSource, category?: CategorySlugType) => {
  const fetcher = newsFetchers[source];

  return useQuery({
    queryKey: ["news", source, category ?? "all"],
    queryFn: () => fetcher(category),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5 * 10,
  });
};
