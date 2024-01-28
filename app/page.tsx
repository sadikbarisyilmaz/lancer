"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { readUserSession } from "./actions";

export default function Page() {
  const [url, setUrl] = useState<string>();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setUrl(window.location.origin);
    checkUser();
  }, []);

  const router = useRouter();

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "USER_UPDATED") {
        console.log("USER UPDATED");
        router.push("/home/upcoming");
      }
    });

    if (session && session.user.user_metadata.full_name === undefined) {
      router.push("/home/account");
    } else if (session) {
      router.push("/home/upcoming");
    } else {
      setloading(false);
    }
  };

  const supabase = createSupabaseBrowserClient();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="h-screen w-full flex items-center justify-center p-6 animate-fadeIn">
      <Card className="grid grid-cols-1 lg:grid-cols-3 gap-2 dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 p-8 shadow-md dark:shadow-slate-700">
        <div className="col-span-2 text-center flex flex-col items-center justify-center">
          <h1 className="scroll-m-20 drop-shadow-2xl px-4 py-8 text-4xl font-extrabold  lg:text-5xl">
            Welcome to Lancer !
          </h1>
          <p className="leading-2 text-foreground/80 text-md max-w-md lg:text-xl">
            "Professional freelancer's customer management system"
          </p>
          <p className="leading-7 text-foreground/80  [&:not(:first-child)]:mt-6">
            Please Login
          </p>
        </div>
        <div className="p-4">
          <Auth
            redirectTo={`${url}/auth/callback`}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            theme="dark"
            view="magic_link"
          />
        </div>
      </Card>
    </div>
  );
}
