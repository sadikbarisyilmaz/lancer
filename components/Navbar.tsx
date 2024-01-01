import { NavMenu } from "./NavMenu";
import { UserCard } from "./UserCard";

export const Navbar = async () => {
  return (
    <nav className="w-44 wor h-screen flex flex-col border-r border-r-foreground/10 p-4 gap-2">
      <div className="w-full max-w-4xl h-fit flex flex-col justify-between text-sm">
        <UserCard />
      </div>
      <div>
        <NavMenu />
      </div>
    </nav>
  );
};
