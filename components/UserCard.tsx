"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { UserCardSkeleton } from "./UserCardSkeleton";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { ServerSession } from "@/types/next-auth";

export function SignOut() {
  return (
    <button className="text-xs text-start" onClick={() => signOut()}>
      Sign Out
    </button>
  );
}

export const UserCard = () => {
  const [loading, setloading] = useState<any>(true);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="py-1 h-[146px] lg:h-[77px] flex flex-col items-center lg:items-left gap-6">
        <UserCardSkeleton />
        <Separator className="bg-foreground/10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:justify-start justify-center gap-3 flex lg:flex-row  md:items-center items-start text-center lg:text-left py-2">
        <Link className="flex " href="/dashboard/account">
          <Avatar className="lg:w-11 w-16 lg:h-11 h-16 ">
            {/* <AvatarImage src={user?.picture} alt={user?.name} /> */}
            <AvatarFallback>
              {session?.user.name
                ? session?.user.name.charAt(0).toUpperCase()
                : "LR"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col gap-1">
          <small className="text-sm break-words font-medium leading-none">
            {session.user?.name}
          </small>
          <SignOut />
        </div>
      </div>
      <Separator className="bg-foreground/10" />
    </div>
  );
};
