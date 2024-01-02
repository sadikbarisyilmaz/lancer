import { getClients } from "@/app/actions/serverActions";
import { Banner } from "@/components/Banner";
import { columns } from "@/components/ClientsTable/columns";
import { DataTable } from "@/components/ClientsTable/dataTable";
import { CreateClientForm } from "@/components/forms/CreateClientForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default async function Page() {
  const { clients } = await getClients();

  return (
    <>
      <Banner title="Clients" />
      <div className="p-4 py-10 justify-center md:w-full flex flex-col gap-2 ">
        <div className="">
          <DataTable columns={columns} data={clients} />
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create New Client</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Client</DialogTitle>
                <CreateClientForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
