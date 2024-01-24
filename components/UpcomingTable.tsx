"use client";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/lib/types";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import Loading from "@/app/home/upcoming/loading-component";
import { createRecurringTask } from "@/app/actions";
import { createRecurringTasks } from "@/lib/helpers";

interface Props {
  weeklyTasks: Task[];
}

export const UpcomingTable = ({ weeklyTasks }: Props) => {
  const [today, setToday] = useState<Date>();
  const [days, setDays] = useState<string[]>();
  const [weekDays, setWeekdays] = useState<string[]>();
  const [formattedWeeklyTasks, setFormattedWeeklyTasks] = useState<Task[]>();

  useEffect(() => {
    if (formattedWeeklyTasks) createRecurringTasks(formattedWeeklyTasks);
  }, [formattedWeeklyTasks]);

  useEffect(() => {
    //Converts server time to local time
    const today = new Date();
    let noTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const days = [0, 1, 2, 3, 4, 5, 6];
    const dayNames = days.map((day, i) =>
      i === 0 ? "Today" : format(addDays(today, i), "EEEE")
    );
    const weekDays = days.map((day) =>
      format(addDays(noTime, day), "MMM/dd/yy")
    );

    const refactoredTasks = weeklyTasks.map((task, i) => {
      return {
        ...task,
        set_date: format(task.set_date, "MMM/dd/yy"),
      };
    });
    setToday(today);
    setDays(dayNames);
    setWeekdays(weekDays);
    setFormattedWeeklyTasks(refactoredTasks);
    //Converts server time to local time
    // checkRecurringTasksThisWeek();
  }, []);

  if (!weekDays || !today) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center lg:p-6 p-4 w-full h-full animate-fadeIn">
      {formattedWeeklyTasks?.length === 0 && (
        <div className="lg:hidden absolute top-2/4 ">
          <p className=" font-semibold text-lg text-center px-2">
            No upcoming tasks set for this week.
          </p>
        </div>
      )}
      <div className="grid h-fit lg:h-full md:grid-cols-2 lg:grid-cols-7 w-full ">
        {weekDays.map((weekDay, i) => {
          if (formattedWeeklyTasks?.some((task) => task.set_date === weekDay)) {
            return (
              <div
                key={i}
                className={`p-3 order-1 ${
                  i !== 6 ? "lg:border-r" : ""
                } border-foreground/10`}
              >
                <h4 className="text-center border-b border-foreground/10 pb-4">
                  {days && days[i]}
                </h4>
                <div className="py-3 grid gap-3 px-4 md:px-10 lg:px-0">
                  {formattedWeeklyTasks.map((task, j) => {
                    return task.set_date === weekDay ? (
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
                  {days && days[i]}
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
