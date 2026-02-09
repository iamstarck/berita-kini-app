import { axiosInstance } from "@/lib/axios";
import type { CnnNewsResponse } from "@/types/cnn.types";
import type { News } from "@/types/news";

const CNN_NEWS_URL = "https://berita-indo-api-next.vercel.app";
const cnnAxios = axiosInstance(CNN_NEWS_URL);

export const fetchCnnNews = async (category?: string): Promise<News[]> => {
  const endpoint = category ? `/api/cnn-news/${category}` : `/api/cnn-news/`;

  const response = await cnnAxios.get<CnnNewsResponse>(endpoint);

  return response.data.data.map((item) => ({
    id: item.link,
    title: item.title,
    summary: item.contentSnippet,
    url: item.link,
    publishedAt: item.isoDate,
    imageUrl: item.image?.large,
    source: "cnn",
  }));
};
