import { getClients } from "@/app/actions/serverActions";
import { Banner } from "@/components/Banner";
import { columns } from "@/components/ClientsTable/columns";
import { DataTable } from "@/components/ClientsTable/dataTable";
// import { ClientsTable } from "@/components/ClientsTable";
import { Client } from "@/lib/types";

export default async function Page() {
  const { clients } = await getClients("26e653dd-291b-4cfb-8cf0-b03c36ddfb18");

  return (
    <>
      <Banner title="Clients" />
      <div className="p-4 max-w-5xl">
        <DataTable columns={columns} data={clients} />
      </div>
    </>
  );
}
