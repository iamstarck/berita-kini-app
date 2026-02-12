import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import AppLogo from "@/assets/app-logo.svg?react";
import { Link } from "react-router-dom";
import { MailIcon } from "lucide-react";
import { CATEGORIES } from "@/types/definitions";

const FooterPage = () => {
  return (
    <footer className="flex flex-col justify-between bg-destructive p-8 text-background gap-8">
      <div className="flex max-lg:flex-col justify-between w-full max-lg:gap-8 lg:pr-80">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Link to={"/"} className="flex items-center gap-1">
              <AppLogo className="stroke-background w-8" />
              <p className="text-xl font-semibold">UPDATE BERITA</p>
            </Link>
          </div>

          <p className="font-semibold hover:underline">
            <a href="https://storyset.com/web" target="_blank">
              Web illustrations by Storyset
            </a>
          </p>

          <div className="flex items-center gap-4">
            <a href="https://www.youtube.com" target="_blank">
              <SiYoutube size={28} />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <SiFacebook size={28} />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <SiInstagram size={28} />
            </a>
            <a href="https://x.com" target="_blank">
              <SiX size={28} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-bold">Telusuri</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
            <li>
              <Link to={"/"}>Terbaru</Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.label}>
                <Link to={category.slug}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="font-bold">Hubungi Kami</p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <MailIcon /> info@updateberita.com
            </p>
            <p>Semarang, Indonesia</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-center">
          &copy; 2026 Update Berita. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
