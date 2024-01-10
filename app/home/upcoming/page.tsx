import { getWeeklyTasks } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { Loader } from "@/components/Loader";
import { UpcomingTable } from "@/components/UpcomingTable";
// import Link from "next/link";
// import readUserSession from "../actions";

export default async function Page() {
  // const {
  //   data: { session },
  // } = await readUserSession();

  // if (!session) {
  //   return (
  //     <main className="flex justify-center items-center">
  //       <p>
  //         You are not logged in. Please <Link href="/login">Log In</Link> to
  //         continue.
  //       </p>
  //     </main>
  //   );
  // }
  const weeklyTasks = await getWeeklyTasks();
  // new Date(
  //   task.set_date.getFullYear(),
  //   task.set_date.getMonth(),
  //   task.set_date.getDate()
  // )
  // console.log(weeklyTasks);
  // const refactoredWeeklytasks = weeklyTasks.tasks.map((task, i) => {
  //   return {
  //     ...task,
  //     set_date: new Date(task.set_date.getMonth(), task.set_date.getDate()),
  //   };
  // });
  return (
    <div className="h-full flex flex-col  overflow-y-scroll">
      <Banner title="Upcoming" />
      <UpcomingTable weeklyTasks={weeklyTasks.tasks} />
    </div>
  );
}
