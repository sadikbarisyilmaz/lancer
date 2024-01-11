import { Skeleton } from "@/components/ui/skeleton";

export const UserCardSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2">
      <Skeleton className="lg:w-12 w-16 lg:h-12 h-16  rounded-full" />
      <div className="space-y-1 mt-1 flex flex-col items-center lg:items-start">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>
  );
};
