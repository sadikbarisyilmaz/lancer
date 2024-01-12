import React from "react";
import { Card } from "./ui/card";
import { Banknote, Bookmark, Check, Clock3, User, X } from "lucide-react";
import { Separator } from "./ui/separator";
import { Task } from "@/lib/types";
import Link from "next/link";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  return (
    <Link
      className="w-full flex justify-center"
      href={`/home/tasks/${[task.id]}`}
    >
      <Card className="px-3 py-4 w-full text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md hover:-translate-y-1 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl max-w-sm">
        <h6 className="flex text-sm font-bold items-center gap-1 ">
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
          {task.set_time && (
            <div className="p-1 text-xs gap-2 flex items-center">
              <span className=" text-opacity-60 text-sky-600">
                <Clock3 size={18} />
              </span>
              <p>{task.set_time}</p>
            </div>
          )}
          <div className="p-1 text-xs gap-2 flex items-center">
            <span
              className={`${
                task.payment_status === "Paid"
                  ? "text-green-400"
                  : "text-red-700"
              }`}
            >
              {task.payment_status === "Paid" ? (
                <Check size={18} />
              ) : (
                <X size={18} />
              )}
            </span>
            <p>{task.payment_status}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
