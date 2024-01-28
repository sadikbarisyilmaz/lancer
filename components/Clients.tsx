"use effect";
import { columns } from "@/components/clients-table/columns";
import { DataTable } from "@/components/clients-table/dataTable";
import { Client } from "@/lib/types";

interface Props {
  clients: Client[];
}

export const Clients = ({ clients }: Props) => {
  return (
    <div className="flex flex-col dark:bg-[#2424247c] rounded-md bg-[#ffffffcb] p-4">
      <DataTable columns={columns} data={clients} />
    </div>
  );
};
