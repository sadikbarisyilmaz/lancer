"use client";
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
    <div className="flex flex-col dark:bg-[#2424247c] rounded-md bg-[#ffffffcb] p-4">
      <DataTable
        isInClientDetailsPage={false}
        rows={7}
        columns={columns}
        data={refactoredTasks}
        clients={clients}
        client={null}
      />
    </div>
  );
};
