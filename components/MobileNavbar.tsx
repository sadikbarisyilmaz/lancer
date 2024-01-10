import { ModeToggle } from "./ui/ModeToggle";
import { MobileNavDrawer } from "./MobileNavDrawer";
import icon from "../lib/assets/lance-png.png";

export const MobileNavbar = () => {
  return (
    <div className="w-full backdrop-blur-lg flex items-center border-b border-b-foreground/10 fixed justify-between p-4 md:hidden">
      <div className="font-bold  gap-1 py-2 px-1 flex items-center rounded-md">
        <img className="w-6 h-6" src={icon.src} /> Lancer
      </div>
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <MobileNavDrawer />
      </div>
    </div>
  );
};
