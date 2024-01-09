// "use client";
import { getWeeklyTasks } from "@/app/actions";
import { TaskCard } from "@/components/TaskCard";
import { addDays, format } from "date-fns";
export const UpcomingTable = async () => {
  const today = new Date();
  let noTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = [0, 1, 2, 3, 4, 5, 6];
  const weekDays = days.map((day) => addDays(noTime, day));
  const weeklyTasks = await getWeeklyTasks();

  return (
    <div className="flex justify-center md:p-6 p-4 w-full h-full ">
      {/* <div className="grid sm:grid-cols-2 md:grid-cols-7 w-full ">
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
            {format(addDays(today, 1), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-3 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(addDays(today, 2), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2"></div>
        </div>
        <div className="p-2 order-4 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(addDays(today, 3), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-5 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(addDays(today, 4), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-6 md:border-r border-foreground/10">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(addDays(today, 5), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
        <div className="p-2 order-7 ">
          <h4 className="text-center border-b border-foreground/10 pb-4">
            {format(addDays(today, 6), "EEEE")}
          </h4>
          <div className="py-2 grid gap-2">
            <TaskCard />
          </div>
        </div>
      </div> */}

      {weekDays.map((weekDay, i) => {
        return (
          <div key={i} className="p-2 order-1 md:border-r border-foreground/10">
            <h4 className="text-center border-b border-foreground/10 pb-4">
              {i === 0 ? "Today" : format(addDays(today, i), "EEEE")}
            </h4>
            <div className="py-2 grid gap-2">
              {weeklyTasks.tasks.map((task, j) => {
                return (
                  <p key={j}>
                    {new Date(task.set_date).toString() ===
                    new Date(weekDay).toString()
                      ? task.title
                      : ""}
                  </p>
                );
              })}
              {/* <TaskCard /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
