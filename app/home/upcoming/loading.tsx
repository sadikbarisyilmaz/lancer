import { Banner } from "@/components/Banner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col gap-2 ">
      <Banner title="Upcoming" />
      <div className="flex justify-center md:p-6 p-4 w-full h-full ">
        <div className="grid sm:grid-cols-2 md:grid-cols-7 w-full ">
          <div className="p-2 order-1 md:border-r border-foreground/10">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              <Skeleton className="text-center border-b border-foreground/10 pb-4 h-8" />
            </h4>
            <div className="py-2 grid gap-2">
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />
            </div>
          </div>
          <div className="p-2 order-2 md:border-r border-foreground/10">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              <Skeleton className="text-center border-b border-foreground/10 pb-4 h-8" />
            </h4>
            <div className="py-2 grid gap-2">
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />
            </div>
          </div>
          <div className="p-2 order-3 md:border-r border-foreground/10">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              <Skeleton className="text-center border-b border-foreground/10 pb-4 h-8" />
            </h4>
            <div className="py-2 grid gap-2">
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />
            </div>
          </div>
          <div className="p-2 order-4 md:border-r border-foreground/10">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              <Skeleton className="text-center border-b border-foreground/10 pb-4 h-8" />
            </h4>
            <div className="py-2 grid gap-2">
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />{" "}
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />{" "}
            </div>
          </div>
          <div className="p-2 order-5 md:border-r border-foreground/10">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              <Skeleton className="text-center border-b border-foreground/10 pb-4 h-8" />
            </h4>
            <div className="py-2 grid gap-2">
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />{" "}
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />
            </div>
          </div>
          <div className="p-2 order-6 md:border-r border-foreground/10">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              <Skeleton className="text-center border-b border-foreground/10 pb-4 h-8" />
            </h4>
            <div className="py-2 grid gap-2">
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />
            </div>
          </div>
          <div className="p-2 order-7 ">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              <Skeleton className="text-center border-b border-foreground/10 pb-4 h-8" />
            </h4>
            <div className="py-2 grid gap-2">
              <Skeleton className="h-[186px] px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
