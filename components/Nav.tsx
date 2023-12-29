import { UserCard } from "./UserCard";
import { ModeToggle } from "./ui/ModeToggle";
import createSupabaseServerClient from "@/lib/supabase/server";
import Link from "next/link";

export const Nav = async () => {
  const supabase = createSupabaseServerClient();

  return (
    <nav className="w-fit h-screen flex border-r border-r-foreground/10 ">
      <div className="w-full max-w-4xl h-fit flex flex-col justify-between p-3 text-sm">
        {/* <ModeToggle /> */}
        <UserCard />
        <Link href={"/"}>Login Page</Link>
      </div>
    </nav>
  );
};
