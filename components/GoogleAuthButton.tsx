"use client";
import { Database } from "@/lib/database.types";
import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";

export const GoogleAuthButton = () => {
  const [user, setUser] = useState<Database>();
  const checkUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log(data.session?.user.email);
  };
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleGoogleSignIn = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(error);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <>
      <button
        onClick={handleGoogleSignIn}
        className="p-2 bg-foreground/10 text-foreground text-center"
      >
        Login with Google
      </button>
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
        checkUser
      </button>
    </>
  );
};
