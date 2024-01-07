import { getClients, getTasks } from "@/app/actions";
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

  return (
    <>
      <Banner title="Tasks" />
      <div className="h-full gap-2 p-10 flex flex-col items-center lg:items-start">
        <DataTable columns={columns} data={refactoredData} />
        <CreateTaskForm clients={clients} />
      </div>
    </>
  );
}
