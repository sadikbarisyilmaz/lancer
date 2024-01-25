import { getClients } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { columns } from "@/components/clients-table/columns";
import { DataTable } from "@/components/clients-table/dataTable";
import { CreateClientForm } from "@/components/forms/CreateClientForm";
import Loading from "./loading-component";

export default async function Page() {
  const { clients } = await getClients();
  if (!clients) {
    return <Loading />;
  }
  return (
    <div>
      <Banner title="Clients" />
      <div className="p-6 lg:w-full flex flex-col gap-1 animate-fadeIn">
        <div className="xl:max-w-7xl xl:pt-24 flex flex-col md:self-center md:w-full xl:scale-125">
          <DataTable columns={columns} data={clients} />
          <CreateClientForm />
        </div>
      </div>
    </div>
  );
}
