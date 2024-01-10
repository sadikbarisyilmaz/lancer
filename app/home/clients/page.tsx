import { getClients } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { columns } from "@/components/clients-table/columns";
import { DataTable } from "@/components/clients-table/dataTable";
import { CreateClientForm } from "@/components/forms/CreateClientForm";

export default async function Page() {
  const { clients } = await getClients();

  return (
    <>
      <Banner title="Clients" />
      <div className="p-6 md:w-full flex flex-col gap-1 animate-fadeIn">
        <div className="md:max-w-7xl">
          <DataTable columns={columns} data={clients} />
        </div>
        <CreateClientForm />
      </div>
    </>
  );
}
