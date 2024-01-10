"use client";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/lib/types";
import { addDays, format } from "date-fns";

interface Props {
  weeklyTasks: Task[];
}
export const UpcomingTable = async ({ weeklyTasks }: Props) => {
  /// Needs to be on client side///
  const today = new Date();
  let noTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = [0, 1, 2, 3, 4, 5, 6];
  const weekDays = days.map((day) => addDays(noTime, day));
  /////////////////////////////////

  return (
    <div className="flex justify-center md:p-6 p-4 w-full h-full animate-fadeIn">
      <div className="grid sm:grid-cols-2 md:grid-cols-7 w-full ">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={i}
              className={`p-3 order-1 ${
                i !== 6 ? "md:border-r" : ""
              } border-foreground/10`}
            >
              <h4 className="text-center border-b border-foreground/10 pb-4">
                {i === 0 ? "Today" : format(addDays(today, i), "EEEE")}
              </h4>
              <div className="py-3 grid gap-3 px-4 sm:px-10 md:px-0">
                {weeklyTasks.map(
                  (task, i) =>
                    new Date(task.set_date).toString() ===
                      new Date(weekDay).toString() && (
                      <TaskCard key={i} task={task} />
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
