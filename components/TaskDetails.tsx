"use client";
import { Task } from "@/lib/types";
import { Loader } from "./Loader";

interface Props {
  task: Task;
}

export const TaskDetails = ({ task }: Props) => {
  if (!task) {
    return <Loader />;
  }

  return (
    <div className="w-full  justify-center lg:gap-2 grid grid-cols-1 lg:grid-cols-3">
      {task.title}
    </div>
  );
};
