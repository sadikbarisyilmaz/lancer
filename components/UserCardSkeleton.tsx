import { Skeleton } from "@/components/ui/skeleton";

export const UserCardSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-11 h-11 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>
  );
};
