"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Navbar } from "./Navbar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { UserCard } from "./UserCard";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import { MobileNavMenu } from "./MobileNavMenu";

export function MobileNavDrawer() {
  const [open, setOpen] = React.useState(false);
  const mobileCheck = () => {
    if (setOpen !== undefined) {
      setOpen(false);
    }
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-10 h-10 p-0" variant="outline">
          <HamburgerMenuIcon fontSize={22} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <nav className="w-full h-max flex flex-col items-end border-r-foreground/10 p-4 gap-2">
          <div
            onClick={mobileCheck}
            className="w-full h-fit flex flex-col justify-between text-sm"
          >
            <UserCard />
          </div>
          <div className="justify-center w-full">
            <MobileNavMenu setOpen={setOpen} />
          </div>
          <div className="h-full w-full flex justify-center lg:grid  lg:items-end">
            <Footer />
          </div>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
