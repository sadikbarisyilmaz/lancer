"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "./ui/button";
const links = [
  {
    title: "Upcoming",
    href: "/home",
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
    <div className="grid  gap-2">
      {links.map((link, i) => {
        return (
          <Link href={link.href} passHref>
            <Button
              key={i}
              variant="ghost"
              className="text-center md:text-left w-full"
            >
              {link.title}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
