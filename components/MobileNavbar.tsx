import React from "react";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./ui/ModeToggle";
import { MobileNavDrawer } from "./MobileNavDrawer";

export const MobileNavbar = () => {
  return (
    <div className="w-full flex items-center border-b border-b-foreground/10 fixed justify-between p-4 md:hidden">
      <div className="font-bold border border-foreground/10 py-2 px-3 rounded-md">
        Lancer
      </div>
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <MobileNavDrawer />
        {/* <Button variant="outline">
          <HamburgerMenuIcon />
        </Button> */}
      </div>
    </div>
  );
};
