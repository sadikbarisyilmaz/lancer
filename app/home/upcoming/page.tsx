import { getTasks, getTasksOfThreeWeeks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { UpcomingTable } from "@/components/UpcomingTable";

export default async function Page() {
  const tasksOfThreeWeeks = await getTasksOfThreeWeeks();

  return (
    <div className="h-full flex flex-col  overflow-y-scroll">
      <Banner title="Upcoming" />
      <UpcomingTable tasksOfThreeWeeks={tasksOfThreeWeeks.tasks} />
    </div>
  );
}
