import { axiosInstance, BASE_URL } from "@/lib/axios";
import type { CategorySlugType } from "@/types/definitions";
import type { CnbcNewsResponse } from "@/types/sources/cnbc.types";
import type { News } from "@/types/news";
import { formatLocalDate } from "@/lib/date";

const CNBC_ENDPOINT = "cnbc-news";
const cnbcAxios = axiosInstance(BASE_URL);

export const fetchCnbcNews = async (
  category?: CategorySlugType,
): Promise<News[]> => {
  const endpoint = category
    ? `${CNBC_ENDPOINT}/${category}`
    : `${CNBC_ENDPOINT}`;

  try {
    const response = await cnbcAxios.get<CnbcNewsResponse>(endpoint);
    const items = response.data.data ?? [];

    return items.map((item) => ({
      id: item.link,
      title: item.title,
      summary: item.contentSnippet,
      url: item.link,
      publishedAt: formatLocalDate(item.isoDate),
      imageUrl: item.image?.large,
      source: "cnbc",
    }));
  } catch (error) {
    console.error("FETCH ERROR:", error);

    throw error;
  }
};
