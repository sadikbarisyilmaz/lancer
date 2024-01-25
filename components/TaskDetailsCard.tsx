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
import { deleteTasks, updatePaymentStatus } from "@/app/actions";
import { Skeleton } from "./ui/skeleton";
interface Props {
  task: Task;
}
export const TaskDetailsCard = ({ task }: Props) => {
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

  if (!task || !refactoredTask) {
    return (
      <Skeleton className="h-[414px] p-6 w-full text-foreground/90 flex flex-col justify-center dark:bg-[#2424247c] bg-[#ffffffcb] rounded-lg dark:bg-opacity-50 bg-opacity-50 gap-4 text-lg "></Skeleton>
    );
  }

  return (
    <Card className="p-6 w-full text-foreground/90 flex flex-col justify-center dark:bg-[#2424247c] bg-[#ffffffcb]  dark:bg-opacity-50 bg-opacity-50 gap-4 text-lg ">
      <span className="flex font-bold items-center gap-3 ">
        <span className=" text-opacity-100 text-orange-300">
          <Bookmark size={40} />
        </span>
        <CardTitle> {task.title}</CardTitle>
      </span>
      <Separator color="#fbbf5d" className=" bg-foreground" />
      <div>
        <div className="p-1 gap-2 flex items-center">
          <span className="text-opacity-60 text-indigo-500">
            <User size={24} />
          </span>
          <p>{task.clients.name}</p>
        </div>
        <div className="p-1 gap-2 flex items-center">
          <span className="text-opacity-60 text-green-700">
            <Calendar size={24} />
          </span>
          <p>{`${refactoredTask?.set_date}`}</p>
        </div>
        {task.set_time && (
          <div className="p-1  gap-2 flex items-center">
            <span className=" text-opacity-60 text-sky-600">
              <Clock3 size={24} />
            </span>
            <p>{task.set_time}</p>
          </div>
        )}
        <div className="p-1  gap-2 flex items-center">
          <span className=" text-opacity-60 text-sky-600">
            <Repeat2 size={24} />
          </span>
          <p>{task.frequency}</p>
        </div>
        <div className="p-1  gap-2 flex items-center">
          <span className=" text-opacity-60 text-green-700">
            <Banknote size={24} />
          </span>
          <p>${task.fee}</p>
        </div>
        <div className=" gap-2 flex justify-between items-center">
          <span
            key={task.payment_status}
            className="p-1 gap-2 flex animate-fadeIn items-center"
          >
            <span
              className={`${
                task.payment_status === "Paid"
                  ? "text-green-400"
                  : "text-red-700"
              }`}
            >
              {task.payment_status === "Paid" ? (
                <Check size={24} />
              ) : (
                <X size={24} />
              )}
            </span>
            <p>{task.payment_status}</p>
          </span>
          <Button
            onClick={() => updatePaymentStatus(task.payment_status, task.id)}
            variant="outline"
            className="self-end bg-background/10"
          >
            Mark as {`${task.payment_status === "Paid" ? "Not Paid" : "Paid"}`}
          </Button>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <EditTaskForm task={task} />
        <Button
          onClick={() => setOpen(true)}
          variant="destructive"
          className="w-full"
        >
          Delete Task
        </Button>
      </div>
      <DeleteAlert open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </Card>
  );
};
