import { getClients, getTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { Tasks } from "@/components/Tasks";

export default async function Page() {
  const { tasks } = await getTasks();
  const { clients } = await getClients();

  return (
    <div className="h-full flex flex-col">
      <Banner title="Tasks" />
      <div className="p-6 lg:w-full flex flex-col gap-1 lg:pt-20  md:w-full lg:max-w-7xl xl:pt-28 self-center xl:w-[1336px] xl:scale-125 animate-fadeIn">
        <Tasks tasks={tasks} clients={clients} />
      </div>
    </div>
  );
}
