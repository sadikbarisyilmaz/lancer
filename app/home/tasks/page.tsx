import { getClients, getTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { Tasks } from "@/components/Tasks";

export default async function Page() {
  const { tasks } = await getTasks();
  const { clients } = await getClients();

  return (
    <>
      <Banner title="Tasks" />
      <div className="p-6 lg:w-full flex flex-col gap-1 lg:max-w-7xl animate-fadeIn">
        <Tasks tasks={tasks} clients={clients} />
      </div>
    </>
  );
}
