import React from "react";
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";
import { GoogleAuthButton } from "./GoogleAuthButton";
export const Nav = () => {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-fit">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <DeployButton />
        {isSupabaseConnected && <GoogleAuthButton />}
      </div>
    </nav>
  );
};
