"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

export const UserCard = () => {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
    } else {
      router.push("/login");
    }
  };

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex  flex-col gap-4">
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
