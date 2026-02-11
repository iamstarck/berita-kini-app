import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, NavLink } from "react-router-dom";
import appLogo from "/app-logo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { CATEGORIES } from "@/types/definitions";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/common/mode-toggle";

const HeaderPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex lg:flex-col items-center justify-between py-2 px-8 gap-2 sticky top-0 z-50 bg-background transition-shadow duration-200 ${
        isScrolled ? "drop-shadow-lg/15" : ""
      }`}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={appLogo} alt="logo" />
        <p className="text-2xl font-semibold text-primary leading-5">
          UPDATE BERITA
        </p>
      </Link>

      <NavigationMenu className="gap-2">
        <NavigationMenuList className="gap-2 max-lg:hidden">
          <NavigationMenuItem>
            <NavLink to={"/"}>
              <p className="font-medium">Terbaru</p>
            </NavLink>
          </NavigationMenuItem>
          {CATEGORIES.map((category) => (
            <NavigationMenuItem key={category.label}>
              <NavLink
                to={`/${category.slug}`}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }
              >
                <p className="font-medium text-lg">{category.label}</p>
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild className="lg:hidden z-9999">
            <Button variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent showCloseButton={false} className="w-fit pt-6">
            <Link to="/" className="flex items-center justify-center gap-2">
              <img src={appLogo} alt="logo" />
              <p className="text-xl font-semibold text-primary leading-5">
                UPDATE <br />
                BERITA
              </p>
            </Link>
            <NavigationMenuList className="flex flex-col mt-2 gap-1 px-10">
              <NavigationMenuItem>
                <NavLink to={"/"}>
                  <p className="font-medium">Terbaru</p>
                </NavLink>
              </NavigationMenuItem>
              {CATEGORIES.map((category) => (
                <NavigationMenuItem key={category.label}>
                  <NavLink
                    to={`/${category.slug}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }
                  >
                    <p className="font-medium text-lg">{category.label}</p>
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </SheetContent>
        </Sheet>
      </NavigationMenu>
    </header>
  );
};

export default HeaderPage;
