"use client";
import { createBrowserClient } from "@supabase/ssr";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Page() {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  // console.log(window.location.origin);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="grid grid-cols-3 gap-2 p-4 shadow-md shadow-foreground/10">
        <div className="col-span-2  text-center flex flex-col items-center justify-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Lancer
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Please Login</p>
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
