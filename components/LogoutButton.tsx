"use client";
import { createBrowserClient } from "@supabase/ssr";

import { useUser } from "@/Context/userContext";
import { Button } from "./ui/button";
import Link from "next/link";
export const LogoutButton = () => {
  const { user, handleSignOut, checkUser } = useUser();

  return (
    <div className="flex gap-2">
      <Button onClick={handleSignOut} variant="outline">
        Logout
      </Button>
      <Button onClick={checkUser} variant="outline">
        Check User
      </Button>
      <Link href={"/login"}>Login Page</Link>
    </div>
  );
};
