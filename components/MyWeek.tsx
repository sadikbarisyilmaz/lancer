"use client";
import { Weekly } from "@/lib/types";
import Loading from "@/app/dashboard/upcoming/loading-component";
import { createRecurringTasks } from "@/lib/helpers";
import { WeeklyCard } from "./WeeklyCard";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Props {
  weeklies: Weekly[];
}
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const MyWeek = ({ weeklies }: Props) => {
  const [today, setToday] = useState<String>("");
  const formattedWeeklyArr: Weekly[] = [];

  useEffect(() => {
    //Converts server time to local time
    const today = format(new Date(), "eeee");
    setToday(today);
    console.log(today);
  }, []);

  if (!today) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center lg:py-6 lg:px-4 p-4 w-full h-full animate-fadeIn">
      <div className="grid h-fit lg:h-full md:grid-cols-2 lg:grid-cols-7 w-full ">
        {days.map((weekDay, i) => {
          if (
            formattedWeeklyArr?.some((weekly) => weekly.week_day === weekDay)
          ) {
            return (
              <div
                key={i}
                className={`p-3 order-1 ${
                  i !== 6 ? "lg:border-r" : ""
                } border-foreground/10 ${
                  today == days[i]
                    ? "shadow-[inset_0px_-16px_83px_-39px_rgb(152,_155,_199)]"
                    : ""
                } `}
              >
                <h4 className="text-center border-b border-foreground/10 pb-4">
                  {days && days[i]}
                </h4>
                <div className="py-3 grid gap-3 px-4 md:px-10 lg:px-0">
                  {formattedWeeklyArr.map((weekly, j) => {
                    return weekly.week_day === weekDay ? (
                      <WeeklyCard key={j} weekly={weekly} />
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
                } border-foreground/10 ${
                  today == days[i]
                    ? "shadow-[inset_0px_-16px_83px_-39px_rgb(152,_155,_199)]"
                    : ""
                } `}
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
