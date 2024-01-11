"use client";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/lib/types";
import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";

interface Props {
  weeklyTasks: Task[];
}
export const UpcomingTable = ({ weeklyTasks }: Props) => {
  /// Needs to be on client side///
  // const [classes, setClasses] = useState({
  //   0: "",
  //   1: "",
  //   2: "",
  //   3: "",
  //   4: "",
  //   5: "",
  //   6: "",
  // });
  // const [isSet, setIsSet] = useState(false);
  const today = new Date();
  let noTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = [0, 1, 2, 3, 4, 5, 6];
  const weekDays = days.map((day) => addDays(noTime, day));
  /////////////////////////////////
  // const columns = {
  //   0: useRef(null),
  //   1: useRef(null),
  //   2: useRef(null),
  //   3: useRef(null),
  //   4: useRef(null),
  //   5: useRef(null),
  //   6: useRef(null),
  // };
  // useEffect(() => {
  //   setIsSet(true);
  // }, []);

  // useEffect(() => {
  //   console.log(columns);
  //   for (const i in columns) {
  //     //@ts-ignore
  //     columns[i].current
  //       ? //@ts-ignore
  //         setClasses({ ...classes, i: "block" })
  //       : "hidden";
  //   }
  //   console.log(classes);
  // }, [isSet]);

  return (
    <div className="flex justify-center lg:p-6 p-4 w-full h-full animate-fadeIn">
      <div className="grid md:grid-cols-2 lg:grid-cols-7 w-full ">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={i}
              className={`p-3 order-1 ${
                i !== 6 ? "lg:border-r" : ""
                //@ts-ignore
              } border-foreground/10`}
            >
              <h4 className="text-center border-b border-foreground/10 pb-4">
                {i === 0 ? "Today" : format(addDays(today, i), "EEEE")}
              </h4>
              <div className="py-3 grid gap-3 px-4 md:px-10 lg:px-0">
                {weeklyTasks.map((task, j) =>
                  format(task.set_date, "EEE MMM/dd/yy") ===
                  format(weekDay, "EEE MMM/dd/yy") ? (
                    // @ts-ignore
                    <span key={j}>
                      <TaskCard task={task} />
                    </span>
                  ) : null
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
