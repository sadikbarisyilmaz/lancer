"use client";
import { Task } from "@/lib/types";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  tasks: Task[];
}

export const TotalDept = ({ tasks }: Props) => {
  const [debt, setDebt] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const unpaidTasks = tasks
    .filter((task) => task.payment_status !== "Paid")
    .map((task) => task.set_date);
  useEffect(() => {
    if (unpaidTasks.length > 0) {
      const debt = tasks
        .filter((task) => task.payment_status !== "Paid")
        .map((task) => task.fee)
        .reduce((a, b) => a + b);
      setDebt(debt);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Skeleton className="h-[457px] rounded-md p-6 w-full text-foreground/90 flex flex-col justify-center dark:bg-[#2424247c] bg-[#ffffffcb] dark:bg-opacity-50 bg-opacity-50 gap-4 text-lg"></Skeleton>
    );
  }
  return (
    <div className="dark:bg-[#2424247c] bg-[#ffffffcb] border w-full flex h-[168px] xl:h-[754px] p-4 rounded-md">
      <div className="overflow-y-scroll w-full flex gap-6">
        {debt > 0 ? (
          <>
            <div className="">
              <p className="text-lg">Unpaid Tasks:</p>
              <Separator className="bg-foreground/40" />
              {unpaidTasks.map((date, i) => {
                return <div key={i}>{`- ${date}`}</div>;
              })}
            </div>
            <div className="">
              <p className="text-lg">TotalDept:</p>
              <Separator className="bg-foreground/40" />
              {debt}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>No current Debt !</p>
          </div>
        )}
      </div>
    </div>
  );
};
