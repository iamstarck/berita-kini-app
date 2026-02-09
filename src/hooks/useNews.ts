import { newsFetchers } from "@/api/news.registry";
import type { NewsSource } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

export const useNews = (source: NewsSource, category?: string) => {
  const fetcher = newsFetchers[source];

  if (!fetcher) {
    throw new Error(`Unsupported news source: ${source}`);
  }

  return useQuery({
    queryKey: ["news", { source, category }],
    queryFn: () => fetcher(category),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5 * 10,
  });
};
