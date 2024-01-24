"use client";
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { columns } from "@/components/tasks-table/columns";
import { DataTable } from "@/components/tasks-table/dataTable";
import { Client, Task } from "@/lib/types";
import { format } from "date-fns";
import { AlertCircle, Divide } from "lucide-react";
import Link from "next/link";

interface Props {
  tasks: Task[];
  clients: Client[];
}

export const Tasks = ({ tasks, clients }: Props) => {
  const refactoredTasks = tasks.map((task, i) => {
    return {
      ...task,
      client_name: task["clients"]["name"],
      set_date: format(task.set_date, "EEEE - dd/MM/yyyy"),
    };
  });

  return (
    <>
      <DataTable columns={columns} data={refactoredTasks} />
      {clients.length > 0 ? (
        <CreateTaskForm clients={clients} />
      ) : (
        <div className="flex items-center py-3 gap-2">
          <AlertCircle />
          <p className="">
            Please create a{" "}
            <Link href={"/home/clients"} className="font-bold">
              client
            </Link>{" "}
            before adding tasks.
          </p>
        </div>
      )}
    </>
  );
};
