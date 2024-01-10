import { Skeleton } from "@/components/ui/skeleton";

export const UserCardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
      <Skeleton className="md:w-12 w-16 md:h-12 h-16  rounded-full" />
      <div className="space-y-1 mt-1 flex flex-col items-center md:items-start">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>
  );
};
