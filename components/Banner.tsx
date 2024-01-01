import React from "react";
import { ModeToggle } from "./ui/ModeToggle";

interface BannerProps {
  title: string;
}

export const Banner = ({ title }: BannerProps) => {
  return (
    <div className="w-full text-4xl md:text-6xl p-6 h-1/5 flex flex-col border-b justify-end md:justify-between">
      <div className=" hidden md:flex justify-end">
        <ModeToggle />
      </div>
      {title}
    </div>
  );
};
