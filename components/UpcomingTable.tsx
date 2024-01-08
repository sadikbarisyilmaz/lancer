import { TaskCard } from "@/components/TaskCard";
import { format } from "date-fns";
export const UpcomingTable = () => {
  const today = new Date();

  return (
    <div className="flex justify-center md:p-6 p-4 w-full h-full ">
      <div className="grid sm:grid-cols-2 md:grid-cols-7 w-full ">
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Today
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 2), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2"></div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 3), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 4), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 5), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
        <div className="p-2 ">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 6), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
};
