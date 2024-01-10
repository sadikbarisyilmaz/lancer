"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";

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
    if (session) {
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
      <Card className="grid grid-cols-1 md:grid-cols-3 gap-2 dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 p-8 shadow-md dark:shadow-slate-700">
        <div className="col-span-2 text-center flex flex-col items-center justify-center">
          <h1 className="scroll-m-20 px-4 py-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Lancer
          </h1>
          <p className="leading-3 text-foreground/80 text-md max-w-md lg:text-xl">
            Professional freelancers customer management system
          </p>
          <p className="leading-7 text-foreground/80  [&:not(:first-child)]:mt-6">
            Please Login
          </p>
        </div>
        <div className="p-4">
          <Auth
            redirectTo={`${url}/auth/callback`}
            supabaseClient={supabase}
            view="magic_link"
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            theme="dark"
          />
        </div>
      </Card>
    </div>
  );
}
