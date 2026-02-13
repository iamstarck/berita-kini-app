import type { CategorySlugType } from "@/types/definitions";
import type { NewsSource } from "@/types/news";
import { useQuery } from "@tanstack/react-query";
import { fetchAggregatedNews } from "../utils/aggregator.service";

export const useAggregatedNews = (
  sources: NewsSource[],
  category?: CategorySlugType,
) => {
  return useQuery({
    queryKey: ["aggregated-news", sources.join(","), category ?? "all"],
    queryFn: () => fetchAggregatedNews(sources, category),
    staleTime: 1000 * 60 * 5,
  });
};
