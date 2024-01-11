"use client";
import { ClientCard } from "./ClientCard";
import { Client, Task } from "@/lib/types";
import { Loader } from "./Loader";
import { ClientNotes } from "./ClientNotes";
import { DataTable } from "./tasks-table/dataTable";
import { columns } from "./tasks-table/columns";
import { CreateTaskForm } from "./forms/CreateTaskForm";

interface Props {
  client: Client;
}

export const ClientDetails = ({ client }: Props) => {
  if (!client) {
    return <Loader />;
  }

  return (
    <div className="w-full h-fit justify-center lg:gap-2 grid grid-cols-1 lg:grid-cols-3">
      <div className="flex flex-col  gap-2 w-full">
        <ClientCard client={client} />
        <ClientNotes id={client.id} />
      </div>
      <div className="w-full lg:py-0 py-2 flex flex-col gap-2 h-4/6 col-span-2">
        <DataTable columns={columns} data={client.tasks} />
        {client && <CreateTaskForm clients={[client]} />}
      </div>
    </div>
  );
};
