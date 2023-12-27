"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useUser } from "@/Context/userContext";
export const LogoutButton = () => {
  const { user, handleSignOut, checkUser } = useUser();

  return (
    <div className="flex gap-2">
      <button
        onClick={handleSignOut}
        className="p-2 bg-foreground/10 text-foreground text-center"
      >
        Logout
      </button>
      <button
        onClick={checkUser}
        className="p-2 bg-foreground/10 text-foreground text-center"
      >
        Check User
      </button>
    </div>
  );
};
