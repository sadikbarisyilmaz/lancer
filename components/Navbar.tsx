import { UserCard } from "./UserCard";
// import createSupabaseServerClient from "@/lib/supabase/server";

export const Navbar = async () => {
  // const supabase = createSupabaseServerClient();

  return (
    <nav className=" w-44 h-screen flex flex-col border-r border-r-foreground/10 p-1">
      <div className="w-full max-w-4xl h-fit flex flex-col justify-between p-3 text-sm">
        <UserCard />
      </div>
    </nav>
  );
};
