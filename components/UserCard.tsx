"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { UserCardSkeleton } from "./UserCardSkeleton";
import Link from "next/link";
import { User } from "@/lib/types";

export const UserCard = (user: User) => {
  const [loading, setloading] = useState<any>(true);

  const router = useRouter();

  if (!user) {
    return (
      <div className="py-1 h-[146px] lg:h-[77px] flex flex-col items-center lg:items-left gap-6">
        <UserCardSkeleton />
        <Separator className="bg-foreground/10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:justify-start justify-center gap-3 flex lg:flex-row flex-col items-center text-center lg:text-left py-2">
        <Link href="/dashboard/account">
          <Avatar className="lg:w-11 w-16 lg:h-11 h-16 ">
            {/* <AvatarImage src={user?.picture} alt={user?.full_name} /> */}
            <AvatarFallback>
              {user.full_name ? user.full_name.charAt(0).toUpperCase() : "LR"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="">
          <small className="text-sm break-words font-medium leading-none">
            {user?.full_name}
          </small>
          {/* <p
            onClick={handleSignOut}
            className="text-xs text-muted-foreground cursor-pointer"
          >
            Sign out
          </p> */}
        </div>
      </div>
      <Separator className="bg-foreground/10" />
    </div>
  );
};
