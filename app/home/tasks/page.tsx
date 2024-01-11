import { getClients, getTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { columns } from "@/components/tasks-table/columns";
import { DataTable } from "@/components/tasks-table/dataTable";

export default async function Page() {
  const { tasks } = await getTasks();
  const { clients } = await getClients();
  const refactoredTasks = tasks.map((task, i) => {
    return { ...task, client_name: task["clients"]["name"] };
  });

  return (
    <>
      <Banner title="Tasks" />
      <div className="p-6 lg:w-full flex flex-col gap-1 lg:max-w-7xl animate-fadeIn">
        <DataTable columns={columns} data={refactoredTasks} />
        {clients.length > 0 && <CreateTaskForm clients={clients} />}
      </div>
    </>
  );
}
