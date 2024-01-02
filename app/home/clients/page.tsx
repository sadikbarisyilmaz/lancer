import { getClients } from "@/app/actions/serverActions";
import { Banner } from "@/components/Banner";
import { columns } from "@/components/ClientsTable/columns";
import { DataTable } from "@/components/ClientsTable/dataTable";

export default async function Page() {
  const { clients } = await getClients();

  return (
    <>
      <Banner title="Clients" />
      <div className="p-4 py-10 justify-center md:w-full  ">
        <div className=" ">
          <DataTable columns={columns} data={clients} />
        </div>
      </div>
    </>
  );
}
