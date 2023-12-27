"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { createBrowserClient } from "@supabase/ssr";
// import { useRouter } from "next/navigation";

type UserContextType = {
  user: User | null;
  handleSignOut: () => Promise<void>;
  checkUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = async (props: Props) => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const router = useRouter();

  const handleSignOut = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut();
      // router.push("/login");
      console.log(error);
    }
  };

  const checkUser = () => {
    console.log(user);
  };
  const value = {
    user,
    handleSignOut,
    checkUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserContextProvider");
  }

  return context;
};
