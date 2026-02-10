import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsCard from "../components/NewsCard";
import HeadlineCard from "../components/HeadlineCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="m-8 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-16">
        <HeadlineCard />

        <div className="lg:flex justify-between space-y-8 gap-8">
          <div className="space-y-4 w-full">
            <div className="border-l-4 border-l-primary pl-2">
              <h2 className="text-2xl font-semibold leading-normal tracking-wide">
                Rekomendasi Untuk Anda
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <NewsCard />
            </div>
          </div>

          <Card className="w-full lg:max-w-lg h-fit lg:sticky top-4">
            <CardHeader>
              <CardTitle className="border-l-4 border-l-primary">
                <span className="text-2xl font-semibold leading-normal tracking-wide pl-2">
                  Berita Populer
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ol className="flex flex-col gap-6">
                <a href="" target="_blank">
                  <li className="relative pl-10 before:content-[counter(list-item)] before:counter-increment:list-item before:absolute before:left-0 before:top-0 before:bg-destructive before:text-background before:w-7 before:h-7 before:flex before:items-center before:justify-center before:rounded-full">
                    Konflik Timur Tengah: PBB Serukan Gencatan Senjata Segera
                  </li>
                </a>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
