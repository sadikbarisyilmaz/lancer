"use effect";
import { getClients } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { columns } from "@/components/clients-table/columns";
import { DataTable } from "@/components/clients-table/dataTable";
import { CreateClientForm } from "@/components/forms/CreateClientForm";
import { Client } from "@/lib/types";

interface Props {
  clients: Client[];
}

export const Clients = ({ clients }: Props) => {
  return (
    <>
      <DataTable columns={columns} data={clients} />
      <CreateClientForm />
    </>
  );
};