import { TaskCard } from "@/components/TaskCard";
import { format } from "date-fns";
export const UpcomingTable = () => {
  const today = new Date();

  return (
    <div className="flex justify-center md:p-6 p-4 w-full h-full ">
      <div className="grid sm:grid-cols-2 md:grid-cols-7 w-full ">
        <div className="p-2 order-1 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            Today
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-2 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-3 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2"></div>
        </div>
        <div className="p-2 order-4 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-5 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-6 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-7 ">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(today.setDate(today.getDate() + 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
};
