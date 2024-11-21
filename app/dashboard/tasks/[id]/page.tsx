import { getTask } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { TaskDetails } from "@/components/TaskDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const { ...task } = await getTask(params.id);

  return (
    <div className="overflow-y-scroll lg:overflow-hidden h-full">
      <Banner title={"Task Details"} />
      <div className="lg:p-10 p-4 xl:p-16 h-full w-full animate-fadeIn">
        <TaskDetails task={task} />
      </div>
    </div>
  );
}
