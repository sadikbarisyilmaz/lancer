// import { getWeeklyTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
// import { UpcomingTable } from "@/components/UpcomingTable";
import { signOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
export default async function Page() {
  // const weeklyTasks = await getWeeklyTasks();

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Banner title="Upcoming" />
      {/* <UpcomingTable weeklyTasks={weeklyTasks.tasks} /> */}
      <SignOut />
    </div>
  );
}
