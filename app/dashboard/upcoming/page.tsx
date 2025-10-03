// import { getWeeklyTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
// import { UpcomingTable } from "@/components/UpcomingTable";
import { signOut } from "@/auth";

export default async function Page() {
  // const weeklyTasks = await getWeeklyTasks();

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Banner title="Upcoming" />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
      {/* <UpcomingTable weeklyTasks={weeklyTasks.tasks} /> */}
    </div>
  );
}
