import { Footer } from "./Footer";
import { NavMenu } from "./NavMenu";
import { UserCard } from "./UserCard";
import { ServerSession } from "../types/next-auth";

export const Navbar = async ({ user }: ServerSession) => {
  return (
    <nav className=" w-52 h-screen hidden lg:flex flex-col border-r border-r-foreground/10 p-4 gap-6">
      <div className="w-full max-w-4xl h-fit flex flex-col justify-between text-sm">
        <UserCard user={user} />
      </div>
      <div>
        <NavMenu />
      </div>
      <div className="h-full grid items-end">
        <Footer />
      </div>
    </nav>
  );
};
