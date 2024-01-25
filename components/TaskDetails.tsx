"use client";
import { Task } from "@/lib/types";
import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardTitle } from "./ui/card";
import {
  Banknote,
  Bookmark,
  Calendar,
  Check,
  Clock3,
  Repeat2,
  User,
  X,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { EditTaskForm } from "./forms/EditTaskForm";
import { Button } from "./ui/button";
import { DeleteAlert } from "./DeleteAlert";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteTasks } from "@/app/actions";
import { TaskNotes } from "./TaskNotes";
import { TaskDetailsCard } from "./TaskDetailsCard";

interface Props {
  task: Task;
}

export const TaskDetails = ({ task }: Props) => {
  const [refactoredTask, setRefactoredTask] = useState<Task>();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    deleteTasks(task.id);
    toast({
      title: `Task deleted successfully !`,
    });
    router.push("/home/tasks");
  };
  useEffect(() => {
    const newTask = {
      ...task,
      set_date: format(task.set_date, "EEEE - dd/MM/yyyy"),
    };

    setRefactoredTask({ ...refactoredTask, ...newTask });
  }, []);
  useEffect(() => {
    const newTask = {
      ...task,
      set_date: format(task.set_date, "EEEE - dd/MM/yyyy"),
    };

    setRefactoredTask({ ...refactoredTask, ...newTask });
  }, [task]);

  if (!task) {
    return (
      <div className="mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full animate-fadeIn justify-center lg:gap-2 grid grid-cols-1 lg:grid-cols-3">
      <TaskDetailsCard task={task} />
      <TaskNotes id={task.id} />
    </div>
  );
};
