"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { useTheme } from "next-themes";

export const LoginForm = () => {
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const { theme } = useTheme();
  const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && session.user.user_metadata.full_name === undefined) {
      router.push("/dashboard/account");
    } else if (session) {
      router.push("/dashboard/upcoming");
    } else {
      setloading(false);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        console.log("SIGNED_IN");
        subscription.unsubscribe();
        router.push("/dashboard/upcoming");
      }
    });
  };

  if (loading) {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center lg:dark:bg-[url('../lib/assets/bg.svg')] lg:bg-[url('../lib/assets/bg-light.svg')] dark:bg-[url('../lib/assets/bg-mobile.svg')] bg-[url('../lib/assets/bg-light-mobile.svg')]  bg-cover">
        <Loader />
      </div>
    );
  }

  return (
    <Auth
      redirectTo={`${URL}/auth/callback`}
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google"]}
      theme={`${theme === "dark" ? "dark" : ""}`}
      view="magic_link"
    />
  );
};
