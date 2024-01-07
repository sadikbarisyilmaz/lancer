"use client";
import { useParams, usePathname } from "next/navigation";
import { ClientCard } from "./ClientCard";
import { useEffect, useState } from "react";
import { getClient } from "@/app/actions";
import { Client, Task } from "@/lib/types";
import { Loader } from "./Loader";
import { ClientNotes } from "./ClientNotes";
import { DataTable } from "./tasks-table/dataTable";
import { columns } from "./tasks-table/columns";
import { CreateTaskForm } from "./forms/CreateTaskForm";

export const ClientDetails = () => {
  const [client, setClient] = useState<Client>();
  const params = useParams();

  const fetchClient = async () => {
    const client = await getClient(params.id);
    setClient(client);
  };
  useEffect(() => {
    fetchClient();
  }, []);

  if (!client) {
    return <Loader />;
  }

  return (
    <div className="w-full h-fit justify-center md:gap-2 grid grid-cols-1 md:grid-cols-3">
      <div className="flex flex-col  gap-2 w-full">
        <ClientCard client={client} />
        <ClientNotes id={client.id} />
      </div>
      <div className="w-full md:py-0 py-2 flex flex-col gap-2 h-4/6 col-span-2">
        <DataTable columns={columns} data={client.tasks} />
        <CreateTaskForm fetchClient={fetchClient} clients={[client]} />
      </div>
    </div>
  );
};
