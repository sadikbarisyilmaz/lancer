import Link from "next/link";
import { Button } from "./ui/button";
const links = [
  {
    title: "Upcoming",
    href: "/home/upcoming",
  },
  {
    title: "Clients",
    href: "/home/clients",
  },
  {
    title: "Tasks",
    href: "/home/tasks",
  },
];

export const NavMenu = () => {
  return (
    <div className="grid gap-2">
      {links.map((link, i) => {
        return (
          <Link key={i} href={link.href} passHref>
            <Button
              variant="ghost"
              className="justify-start w-full dark:hover:bg-slate-500 hover:bg-white"
            >
              {link.title}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
