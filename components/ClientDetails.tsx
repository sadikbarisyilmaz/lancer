"use client";
import { ClientCard } from "./ClientCard";
import { Client } from "@/lib/types";
import { ClientNotes } from "./ClientNotes";
import { DataTable } from "./tasks-table/dataTable";
import { columns } from "./tasks-table/columns";
import { CreateTaskForm } from "./forms/CreateTaskForm";
import { format } from "date-fns";

interface Props {
  client: Client;
}

export const ClientDetails = ({ client }: Props) => {
  const refactoredTasks = client.tasks.map((task, i) => {
    return {
      ...task,
      client_name: client.name,
      set_date: format(task.set_date, "EEEE - dd/MM/yyyy"),
    };
  });

  return (
    <div className="w-full  justify-center lg:gap-2 grid grid-cols-1 lg:grid-cols-3">
      <div className="flex flex-col  gap-2 w-full">
        <ClientCard client={client} />
        <ClientNotes id={client.id} />
      </div>
      <div className="w-full lg:py-0 py-2 flex flex-col gap-2 h-4/6 col-span-2">
        <DataTable rows={5} columns={columns} data={refactoredTasks} />
        {client && <CreateTaskForm clients={[client]} />}
      </div>
    </div>
  );
};
