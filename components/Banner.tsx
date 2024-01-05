import React from "react";
import { ModeToggle } from "./ui/ModeToggle";

interface BannerProps {
  title: string;
}

export const Banner = ({ title }: BannerProps) => {
  return (
    <div className="w-full text-4xl md:text-6xl py-4 px-6 flex flex-col border-b border-b-foreground/10 justify-end md:justify-between">
      <div className="h-full hidden md:flex justify-between md:min-h-[100px]">
        <h1 className="self-end">{title}</h1>
        <div className="h-full hidden md:flex justify-between">
          <ModeToggle />
        </div>
      </div>
      <div className="h-full md:hidden flex">
        <h1 className="self-center">{title}</h1>
      </div>
    </div>
  );
};
