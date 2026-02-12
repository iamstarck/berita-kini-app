import type { CategorySlugType } from "@/types/definitions";
import type { NewsSource } from "@/types/news";

type SourceCategoryMap = Partial<Record<CategorySlugType, string>>;

export const newsSourceConfig: Record<
  NewsSource,
  { categoryMap: SourceCategoryMap }
> = {
  cnn: {
    categoryMap: {
      nasional: "national",
      internasional: "internasional",
      ekonomi: "ekonomi",
      olahraga: "olahraga",
      teknologi: "teknologi",
      hiburan: "hiburan",
      "gaya-hidup": "gaya-hidup",
    },
  },

  republika: {
    categoryMap: {
      nasional: "nusantara",
      internasional: "internasional",
      ekonomi: "ekonomi",
      olahraga: "sepakbola",
    },
  },
};
