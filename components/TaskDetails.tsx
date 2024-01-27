"use client";
import { Task } from "@/lib/types";
import { TaskNotes } from "./TaskNotes";
import { TaskDetailsCard } from "./TaskDetailsCard";

interface Props {
  task: Task;
}

export const TaskDetails = ({ task }: Props) => {
  return (
    <div className="w-full animate-fadeIn justify-center lg:gap-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
      <TaskDetailsCard task={task} />
      <TaskNotes id={task.id} />
    </div>
  );
};
