"use client";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

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

export const MobileNavMenu = ({ setOpen }: Props) => {
  const mobileCheck = () => {
    if (setOpen !== undefined) {
      setOpen(false);
    }
  };
  return (
    <div className="grid gap-2">
      {links.map((link, i) => {
        return (
          <Link key={i} href={link.href} passHref>
            <Button
              onClick={mobileCheck}
              variant="ghost"
              className="text-center lg:text-left w-full"
            >
              {link.title}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
