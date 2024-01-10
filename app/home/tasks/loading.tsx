import { Banner } from "@/components/Banner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-full w-full flex md:max-w-7xl flex-col">
      <Banner title="Clients" />
      <div className="p-6">
        <div className="dark:bg-[#2424247c] bg-[#ffffffcb] rounded-md md:w-full h-fit  flex flex-col  ">
          <div className="border-b dark:bg-[#2424247c] bg-[#ffffffcb] border-background">
            <Skeleton className="h-[48px]" />
          </div>
          <div className="border-b dark:bg-[#2424247c] bg-[#ffffffcb] border-background">
            <Skeleton className="h-[56px]" />
          </div>
          <div className="border-b dark:bg-[#2424247c] bg-[#ffffffcb] border-background">
            <Skeleton className="h-[56px]" />
          </div>
          <div className="border-b dark:bg-[#2424247c] bg-[#ffffffcb] border-background">
            <Skeleton className="h-[56px]" />
          </div>
          <div className="border-b dark:bg-[#2424247c] bg-[#ffffffcb] border-background">
            <Skeleton className="h-[56px]" />
          </div>
          <div className="border-b dark:bg-[#2424247c] bg-[#ffffffcb] border-background">
            <Skeleton className="h-[56px]" />
          </div>
        </div>
        <div className="flex justify-between gap-1 ">
          <div className="flex items-center py-2 w-[184px]">
            <Skeleton className="w-full dark:bg-[#2424247c] bg-[#ffffffcb] h-full" />
          </div>
          <div className="flex items-center justify-end space-x-2 py-2">
            <div className="h-[40px]  dark:bg-[#2424247c] bg-[#ffffffcb] w-[56px] ">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="h-[40px]  dark:bg-[#2424247c] bg-[#ffffffcb] w-[56px] ">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className=" w-36">
          <Skeleton className="h-[40px]" />
        </div>
      </div>
    </div>
  );
}
