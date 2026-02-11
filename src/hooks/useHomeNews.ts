import { categorySlug, type HomeNewsResult } from "@/types/definitions";
import { useNews } from "./useNews";
import { useQueries } from "@tanstack/react-query";
import type { News, NewsSource } from "@/types/news";
import { fetchNews } from "@/api/fetchNews";

export const useHomeNews = (source: NewsSource): HomeNewsResult => {
  const allNewsQuery = useNews(source);

  const categoryQueries = useQueries({
    queries: categorySlug.map((c) => ({
      queryKey: ["news", source, c],
      queryFn: () => fetchNews(source, c),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5 * 10,
    })),
  });

  const isLoading =
    allNewsQuery.isLoading || categoryQueries.some((q) => q.isLoading);

  const isError = allNewsQuery.isError;

  const error = allNewsQuery.error ?? null;

  if (isLoading) {
    return {
      headline: null,
      popular: [],
      recommendations: [],
      isLoading: true,
      isError: false,
      error: null,
    };
  }

  if (isError) {
    return {
      headline: null,
      popular: [],
      recommendations: [],
      isLoading: false,
      isError: true,
      error,
    };
  }

  const allNews = allNewsQuery.data ?? [];

  const headline = allNews.find((n) => Boolean(n.imageUrl)) ?? null;

  const popular = allNews.filter((n) => n.id !== headline?.id).slice(0, 10);

  const recommendations: News[] = [];

  categoryQueries.forEach((query) => {
    if (!query.isSuccess) return;

    const items = query.data;
    if (!items?.length) return;

    const candidate = items.find(
      (item) =>
        item.id !== headline?.id && !popular.some((p) => p.id === item.id),
    );

    if (candidate) recommendations.push(candidate);
  });

  return {
    headline,
    popular,
    recommendations,
    isLoading: false,
    isError: false,
    error: null,
  };
};
