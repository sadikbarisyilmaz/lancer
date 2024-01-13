"use client";
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { columns } from "@/components/tasks-table/columns";
import { DataTable } from "@/components/tasks-table/dataTable";
import { Client, Task } from "@/lib/types";
import { format } from "date-fns";

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
      {clients.length > 0 && <CreateTaskForm clients={clients} />}
    </>
  );
};
