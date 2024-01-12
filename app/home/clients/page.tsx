import { getClients } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { columns } from "@/components/clients-table/columns";
import { DataTable } from "@/components/clients-table/dataTable";
import { CreateClientForm } from "@/components/forms/CreateClientForm";

export default async function Page() {
  const { clients } = await getClients();

  return (
    <div>
      <Banner title="Clients" />
      <div className="p-6 lg:w-full flex flex-col gap-1 animate-fadeIn">
        <div className="lg:max-w-7xl xl:pt-20 xl:self-center xl:w-[1336px]">
          <DataTable columns={columns} data={clients} />
          <CreateClientForm />
        </div>
      </div>
    </div>
  );
}
