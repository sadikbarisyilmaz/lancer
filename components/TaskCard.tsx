import React from "react";
import { Card } from "./ui/card";
import { Banknote, Bookmark, Check, Clock3, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { Task } from "@/lib/types";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  return (
    <Card className="px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md">
      <h6 className="flex font-bold items-center gap-1 ">
        <span className=" text-opacity-100 text-orange-300">
          <Bookmark size={24} />
        </span>
        {task.title}
      </h6>
      <Separator color="#fbbf5d" className=" bg-foreground/10" />
      <div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <span className=" text-opacity-60 text-indigo-500">
            <User size={18} />
          </span>
          <p>{task.clients.name}</p>
        </div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <span className=" text-opacity-60 text-green-700">
            <Banknote size={18} />
          </span>
          <p>${task.fee}</p>
        </div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <span className=" text-opacity-60 text-sky-600">
            <Clock3 size={18} />
          </span>
          <p>18:00</p>
        </div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <span
            className={`${
              task.payment_status === "Paid" ? "text-green-400" : "text-red-700"
            }`}
          >
            <Check size={18} />
          </span>
          <p>{task.payment_status}</p>
        </div>
      </div>
    </Card>
  );
};
