import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeadlineCard from "../components/HeadlineCard";
import { useHomeNews } from "@/hooks/useHomeNews";
import { Skeleton } from "@/components/ui/skeleton";
import CustomBreadCrumb from "../components/atoms/CustomBreadCrumb";
import ErrorMessage from "../components/atoms/ErrorMessage";
import NewsGrid from "../components/NewsGrid";
import SectionTitle from "../components/atoms/SectionTitle";

const HomePage = () => {
  const { headline, popular, recommendations, isLoading, isError } =
    useHomeNews(["cnn", "republika"]);

  return (
    <div className="m-8 space-y-8">
      <CustomBreadCrumb />

      <div className="space-y-16">
        <HeadlineCard news={headline} isLoading={isLoading} isError={isError} />

        <div className="lg:flex justify-between space-y-8 gap-8">
          <div className="space-y-4 w-full">
            <SectionTitle title="Rekomendasi untuk Anda" />

            {isError && <ErrorMessage />}

            <NewsGrid
              columns="lg:grid-cols-2"
              isLoading={isLoading}
              skeletonCount={5}
              skeletonHeight="h-135 lg:h-105"
              data={recommendations}
            />
          </div>

          <Card className="w-full lg:max-w-lg h-fit lg:sticky top-28">
            <CardHeader>
              <CardTitle className="border-l-4 border-l-primary">
                <span className="text-2xl font-semibold leading-normal tracking-wide pl-2">
                  Berita Populer
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ol className="flex flex-col gap-6">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 bg-secondary" />
                    ))
                  : popular.map((news) => (
                      <li
                        key={news.id}
                        className="relative pl-10 before:content-[counter(list-item)] before:counter-increment:list-item before:absolute before:left-0 before:top-0 before:bg-destructive before:text-background before:w-7 before:h-7 before:flex before:items-center before:justify-center before:rounded-full"
                      >
                        <a href={news.url} target="_blank">
                          {news.title}
                        </a>
                      </li>
                    ))}

                {isError && <ErrorMessage />}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
