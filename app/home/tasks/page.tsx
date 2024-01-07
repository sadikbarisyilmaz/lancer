import { getClient, getClients, getTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { columns } from "@/components/tasks-table/columns";
import { DataTable } from "@/components/tasks-table/dataTable";

export default async function Page() {
  const { tasks } = await getTasks();
  const { clients } = await getClients();
  const refactoredData = tasks.map((task, i) => {
    return { ...task, client_name: task["clients"]["name"] };
  });
  //Ts dummy fix
  const fetchClient = async () => {
    "use server";
    const client = await getClient("234");
  };
  return (
    <>
      <Banner title="Tasks" />
      <div className="p-6 md:w-full flex flex-col gap-2 ">
        <DataTable columns={columns} data={refactoredData} />
        <CreateTaskForm fetchClient={fetchClient} clients={clients} />
      </div>
    </>
  );
}
