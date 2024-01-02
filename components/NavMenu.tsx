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
          <Button
            key={i}
            variant="outline"
            className="text-center md:text-left w-full"
          >
            <Link href={link.href}>{link.title}</Link>
          </Button>
        );
      })}
    </div>
  );
};
