"use client";
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { columns } from "@/components/tasks-table/columns";
import { DataTable } from "@/components/tasks-table/dataTable";
import { setToLocalTime } from "@/lib/helpers";
import { Client, Task } from "@/lib/types";
import { useEffect, useState } from "react";

interface Props {
  tasks: Task[];
  clients: Client[];
}

export const Tasks = ({ tasks, clients }: Props) => {
  const [refactoredTasks, setRefactoredTasks] = useState<Task[]>([]);
  useEffect(() => {
    const localTimeTasks = setToLocalTime(tasks);
    const clientNameAddedTasks = localTimeTasks.map((task, i) => {
      return {
        ...task,
        client_name: task["clients"]["name"],
      };
    });
    setRefactoredTasks([...refactoredTasks, ...clientNameAddedTasks]);
  }, []);

  // const refactoredTasks = tasks.map((task, i) => {
  //   return {
  //     ...task,
  //     client_name: task["clients"]["name"],
  //     set_date: format(task.set_date, "EEEE - dd/MM/yyyy"),
  //   };
  // });
  console.log(tasks);

  return (
    <>
      <DataTable columns={columns} data={refactoredTasks} />
      {clients.length > 0 && <CreateTaskForm clients={clients} />}
    </>
  );
};
