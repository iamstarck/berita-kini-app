import { CATEGORIES, type HomeNewsResult } from "@/lib/definitions";
import { useNews } from "./useNews";
import { useQueries } from "@tanstack/react-query";
import type { News, NewsSource } from "@/types/news";
import { fetchCnnNews } from "@/api/cnn-news.service";

export const useHomeNews = (source: NewsSource): HomeNewsResult => {
  const allNewsQuery = useNews(source);

  const categorySlug = CATEGORIES.map((category) => category.slug);

  const categoryQueries = useQueries({
    queries: categorySlug.map((c) => ({
      queryKey: ["news", source, c],
      queryFn: () => fetchCnnNews(c),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const isLoading =
    allNewsQuery.isLoading || categoryQueries.some((q) => q.isLoading);

  const isError =
    allNewsQuery.isError || categoryQueries.some((q) => q.isError);

  const error =
    allNewsQuery.error || categoryQueries.find((q) => q.error)?.error;

  if (isLoading || isError) {
    return {
      headline: null,
      popular: [],
      recommendations: [],
      isLoading,
      isError,
      error,
    };
  }

  const allNews = allNewsQuery.data ?? [];

  const headline = allNews.find((n) => Boolean(n.imageUrl)) ?? null;

  const popular = allNews.filter((n) => n.id !== headline?.id).slice(0, 10);

  const recommendations: News[] = [];

  categoryQueries.forEach((query) => {
    const items = query.data ?? [];

    if (items.length > 0) {
      if (
        items[0].id !== headline?.id &&
        !popular.some((p) => p.id === items[0].id)
      ) {
        recommendations.push(items[0]);
      }
    }
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
