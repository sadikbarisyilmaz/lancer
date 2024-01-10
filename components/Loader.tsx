import icon from "../lib/assets/lance-png.png";
console.log();

export const Loader = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="animate-ping p-1 w-8 h-8 rounded-[12px] shadow-md shadow-foreground/10 bg-white">
        <img src={icon.src} />
      </div>
    </div>
  );
};
