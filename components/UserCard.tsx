"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { UserCardSkeleton } from "./UserCardSkeleton";
import Link from "next/link";
import { readUserSession } from "@/app/actions";

export const UserCard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setloading] = useState<any>(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await readUserSession();
      if (session) {
        setUser(session.user);
        setloading(false);
      }
    };
    getUser();
  }, []);

  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  const handleSignOut = async () => {
    setloading(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setUser(null);
  };

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
        <Link href="/home/account">
          <Avatar className="lg:w-11 w-16 lg:h-11 h-16 ">
            <AvatarImage
              src={user?.user_metadata.picture}
              alt={user?.user_metadata.full_name}
            />
            <AvatarFallback>
              {user.user_metadata.full_name
                ? user.user_metadata.full_name.charAt(0).toUpperCase()
                : "LR"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="">
          <small className="text-sm break-words font-medium leading-none">
            {user?.user_metadata.full_name}
          </small>
          <p
            onClick={handleSignOut}
            className="text-xs text-muted-foreground cursor-pointer"
          >
            Sign out
          </p>
        </div>
      </div>
      <Separator className="bg-foreground/10" />
    </div>
  );
};
