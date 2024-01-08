import { TaskCard } from "@/components/TaskCard";

export const UpcomingTable = () => {
  return (
    <div className="flex justify-center md:p-6 p-4 w-full h-full  overflow-y-scroll">
      <div className="grid sm:grid-cols-2 md:grid-cols-7 w-full ">
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Today
          </h4>
          <div className="py-2 grid gap-1">
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Tomorrow
          </h4>
          <div className="py-2 grid gap-1">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Tomorrow
          </h4>
          <div className="py-2 grid gap-1"></div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Tomorrow
          </h4>
          <div className="py-2 grid gap-1">
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Tomorrow
          </h4>
          <div className="py-2 grid gap-1">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Tomorrow
          </h4>
          <div className="py-2 grid gap-1">
            <TaskCard />
          </div>
        </div>
        <div className="p-2 ">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Tomorrow
          </h4>
          <div className="py-2 grid gap-1">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
};
