import React from "react";
import { Card } from "./ui/card";
import { Banknote, Bookmark, Check, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { Task } from "@/lib/types";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  return (
    <Card className="px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 gap-3 text-md">
      <h6 className="flex items-center gap-1 ">
        <Bookmark size={20} />
        {task.clients.type}
      </h6>
      <Separator className=" bg-foreground/10" />
      <div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <User size={18} />
          <p>{task.clients.name}</p>
        </div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <Banknote size={18} />
          <p>{task.fee}</p>
        </div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <Check size={18} />
          <p>{task.payment_status}</p>
        </div>
      </div>
    </Card>
  );
};
