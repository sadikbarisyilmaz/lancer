import { LogoutButton } from "./LogoutButton";
import { UserCard } from "./UserCard";
import { ModeToggle } from "./ui/ModeToggle";
export const Nav = () => {
  return (
    <nav className="w-fit h-screen flex justify-center border-b border-b-foreground/10 ">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <ModeToggle />
        {/* <UserCard /> */}
        <LogoutButton />
      </div>
    </nav>
  );
};
