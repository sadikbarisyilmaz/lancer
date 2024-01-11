import { getTasks, getWeeklyTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { UpcomingTable } from "@/components/UpcomingTable";

export default async function Page() {
  const tasks = await getTasks();

  return (
    <div className="h-full flex flex-col  overflow-y-scroll">
      <Banner title="Upcoming" />
      <UpcomingTable tasks={tasks.tasks} />
    </div>
  );
}
