import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-t-foreground/10 pt-3 px-2 md:text-right text-center w-full text-xs">
      <Link href="https://sadikbarisyilmaz.dev">&#169; Lancer - 2024</Link>
    </footer>
  );
};
