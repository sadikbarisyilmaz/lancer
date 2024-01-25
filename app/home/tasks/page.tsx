import { getClients, getTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { Tasks } from "@/components/Tasks";

export default async function Page() {
  const { tasks } = await getTasks();
  const { clients } = await getClients();

  return (
    <div>
      <Banner title="Tasks" />
      <div className="p-6 lg:w-full flex flex-col gap-1 animate-fadeIn">
        <div className="lg:max-w-7xl xl:pt-20 lg:pt-16 flex flex-col md:self-center md:w-full  xl:scale-125">
          <Tasks tasks={tasks} clients={clients} />
        </div>
      </div>
    </div>
  );
}
