import { Banner } from "@/components/Banner";
import { Loader } from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div>
      <Banner title="Client Details" />
      <div className="h-full w-full">
        <Skeleton />
      </div>
    </div>
  );
}
