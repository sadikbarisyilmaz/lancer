import Link from "next/link";
import icon from "../lib/assets/lance-png.png";

export const Footer = () => {
  return (
    <footer className="border-t border-t-foreground/10 pt-3 px-2 md:text-right  w-full flex items-center justify-center md:justify-end gap-1 text-xs">
      <img className="w-4 h-4" src={icon.src} />
      <Link href="https://sadikbarisyilmaz.dev">Lancer - 2024</Link>
    </footer>
  );
};
