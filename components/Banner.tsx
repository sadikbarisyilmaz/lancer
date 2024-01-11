import React from "react";
import { ModeToggle } from "./ui/ModeToggle";

interface BannerProps {
  title: string;
}

export const Banner = ({ title }: BannerProps) => {
  return (
    <div className="w-full text-4xl lg:text-6xl py-4 px-6 flex flex-col border-b border-b-foreground/10 justify-end lg:justify-between">
      <div className="h-full hidden lg:flex justify-between lg:min-h-[100px]">
        <h1 className="self-end">{title}</h1>
        <div className="h-full hidden lg:flex justify-between">
          <ModeToggle />
        </div>
      </div>
      <div className="h-full lg:hidden flex md:min-h-[70px]">
        <h1 className="self-center">{title}</h1>
      </div>
    </div>
  );
};
