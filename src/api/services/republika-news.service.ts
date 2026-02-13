import { axiosInstance, BASE_URL } from "@/lib/axios";
import { formatLocalDate } from "@/lib/date";
import type { CategorySlugType } from "@/types/definitions";
import type { News } from "@/types/news";
import type {
  RepublikaNewsItem,
  RepublikaNewsResponse,
} from "@/types/sources/republika.types";

const REPUBLIKA_ENDPOINT = "republika-news";
const republikaAxios = axiosInstance(BASE_URL);

export const fetchRepublikaNews = async (
  category?: CategorySlugType,
): Promise<News[]> => {
  const endpoint = category
    ? `${REPUBLIKA_ENDPOINT}/${category}`
    : `${REPUBLIKA_ENDPOINT}`;

  try {
    const response = await republikaAxios.get<RepublikaNewsResponse>(endpoint);
    const items = response.data.data ?? [];

    return items.map((item: RepublikaNewsItem) => ({
      id: item.link,
      title: item.title,
      summary: item.description,
      url: item.link,
      publishedAt: formatLocalDate(item.isoDate),
      imageUrl: item.image.small,
      author: item.creator,
      source: "republika",
    }));
  } catch (error) {
    console.error("FETCH ERROR:", error);

    throw error;
  }
};
