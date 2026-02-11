import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toWordCase } from "@/lib/toWordCase";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbPageProps {
  category?: boolean;
  currentCategory?: string;
}

const CustomBreadCrumb = ({
  category,
  currentCategory,
}: BreadcrumbPageProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={"/"} className="flex items-center gap-1">
              {" "}
              <HomeIcon size={16} />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {category && currentCategory !== undefined && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{toWordCase(currentCategory)}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
