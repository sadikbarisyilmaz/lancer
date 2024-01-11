import { getTask } from "@/app/actions";
import { Banner } from "@/components/Banner";

export default async function Page({ params }: { params: { id: string } }) {
  const { ...task } = await getTask(Number(params.id));

  return (
    <div className="overflow-y-scroll lg:overflow-hidden h-full">
      <Banner title={"Task Details"} />
      <div className="lg:p-6 p-4 h-full w-full animate-fadeIn">
        <div>{task.title}</div>
      </div>
    </div>
  );
}
