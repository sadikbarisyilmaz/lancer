"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { UserCardSkeleton } from "./UserCardSkeleton";

export const UserCard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setloading] = useState<any>(true);

  useEffect(() => {
    getUser();
  }, []);

  const router = useRouter();

  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      setloading(false);
    }
  };

  const supabase = createSupabaseBrowserClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="py-2 flex flex-col gap-6">
        <UserCardSkeleton />
        <Separator />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 py-2">
        <Avatar className="w-11 h-11">
          <AvatarImage
            src={user?.user_metadata.picture}
            alt={user?.user_metadata.full_name}
          />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <div>
          <small className="text-sm font-medium leading-none">
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
      <Separator />
    </div>
  );
};
