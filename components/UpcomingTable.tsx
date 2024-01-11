"use client";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/lib/types";
import { addDays, format } from "date-fns";

interface Props {
  weeklyTasks: Task[];
}

export const UpcomingTable = ({ weeklyTasks }: Props) => {
  /// Needs to be on client side///
  const today = new Date();
  let noTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = [0, 1, 2, 3, 4, 5, 6];
  const weekDays = days.map((day) => addDays(noTime, day));

  return (
    <div className="flex justify-center lg:p-6 p-4 w-full h-full animate-fadeIn">
      <div className="grid h-fit lg:h-full md:grid-cols-2 lg:grid-cols-7 w-full ">
        {weekDays.map((weekDay, i) => {
          if (
            weeklyTasks.some(
              (task) =>
                format(task.set_date, "MMM/dd/yy") ===
                format(weekDay, "MMM/dd/yy")
            )
          ) {
            return (
              <div
                key={i}
                className={`p-3 order-1 ${
                  i !== 6 ? "lg:border-r" : ""
                } border-foreground/10`}
              >
                <h4 className="text-center border-b border-foreground/10 pb-4">
                  {i === 0 ? "Today" : format(addDays(today, i), "EEEE")}
                </h4>
                <div className="py-3 grid gap-3 px-4 md:px-10 lg:px-0">
                  {weeklyTasks.map((task, j) => {
                    return format(task.set_date, "MMM/dd/yy") ===
                      format(weekDay, "MMM/dd/yy") ? (
                      <TaskCard key={j} task={task} />
                    ) : null;
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={i}
                className={`p-3 order-1 ${
                  i !== 6 ? "lg:border-r" : ""
                } border-foreground/10 lg:block hidden`}
              >
                <h4 className="text-center border-b border-foreground/10 pb-4">
                  {i === 0 ? "Today" : format(addDays(today, i), "EEEE")}
                </h4>
                <div className="py-3 grid text-center text-foreground/70 gap-3 px-4 md:px-10 lg:px-0 ">
                  <p>No Tasks Set</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
