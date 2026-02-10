import { axiosInstance, BASE_URL } from "@/lib/axios";
import type { CATEGORIES } from "@/lib/definitions";
import type { CnnNewsResponse } from "@/types/cnn.types";
import type { News } from "@/types/news";

type CategorySlug = (typeof CATEGORIES)[number]["slug"];

const CNN_ENDPOINT = "/cnn-news";
const cnnAxios = axiosInstance(BASE_URL);

export const fetchCnnNews = async (
  category?: CategorySlug,
): Promise<News[]> => {
  const endpoint = category
    ? `${CNN_ENDPOINT}/${category}`
    : `${CNN_ENDPOINT}/`;

  const response = await cnnAxios.get<CnnNewsResponse>(endpoint);
  const items = response.data.data ?? [];

  return items.map((item) => ({
    id: item.link,
    title: item.title,
    summary: item.contentSnippet,
    url: item.link,
    publishedAt: item.isoDate,
    imageUrl: item.image?.large,
    source: "cnn",
  }));
};
