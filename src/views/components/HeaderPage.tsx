import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import appLogo from "/app-logo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { CATEGORIES } from "@/lib/definitions";

const HeaderPage = () => {
  return (
    <div className="flex lg:flex-col items-center justify-between py-4 px-8 gap-2">
      <Link to="/" className="flex items-center gap-2">
        <img src={appLogo} alt="logo" />
        <p className="text-2xl font-semibold text-primary leading-5">
          UPDATE BERITA
        </p>
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="gap-2 max-lg:hidden">
          {CATEGORIES.map((category) => (
            <NavigationMenuItem key={category.label}>
              <NavigationMenuLink asChild>
                <Link
                  to={category.slug}
                  className="hover:bg-transparent hover:text-primary"
                >
                  <p className="font-medium">{category.label}</p>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent showCloseButton={false} className="w-fit">
            <NavigationMenuList className="flex flex-col mt-2 gap-1 px-10">
              {CATEGORIES.map((category) => (
                <NavigationMenuItem key={category.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={category.slug}
                      className="hover:bg-transparent hover:text-primary w-full"
                    >
                      <p className="font-medium">{category.label}</p>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </SheetContent>
        </Sheet>
      </NavigationMenu>
    </div>
  );
};

export default HeaderPage;
