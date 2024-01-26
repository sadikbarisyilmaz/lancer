"use client";
import { Task } from "@/lib/types";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

interface Props {
  tasks: Task[];
}

export const TotalDept = ({ tasks }: Props) => {
  const [debt, setDebt] = useState<number>(0);
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
  }, []);

  return (
    <div className="dark:bg-[#2424247c] w-full flex h-[200px] p-4 rounded-md">
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
        <div>No current Debt</div>
      )}
    </div>
  );
};
