import React from "react";

interface BannerProps {
  title: string;
}

export const Banner = ({ title }: BannerProps) => {
  return (
    <div className="w-full text-6xl p-6 h-1/5 flex flex-col border-b justify-end">
      {title}
    </div>
  );
};
