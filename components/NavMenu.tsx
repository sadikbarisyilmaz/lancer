"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
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
    <NavigationMenu>
      <NavigationMenuList className="flex-col gap-2">
        {links.map((link, i) => {
          return (
            <NavigationMenuItem key={i}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  <p className="w-28">{link.title}</p>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
