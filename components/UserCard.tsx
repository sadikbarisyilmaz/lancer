"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

export const UserCard = () => {
  useEffect(() => {
    getUser();
  }, []);
  const [user, setUser] = useState<any>();
  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session?.user);
    setUser(session?.user);
  };

  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={user?.user_metadata.picture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      <Separator />
    </div>
  );
};
