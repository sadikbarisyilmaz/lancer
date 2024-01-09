import { getWeeklyTasks } from "@/app/actions";
import { TaskCard } from "@/components/TaskCard";
import { addDays, format } from "date-fns";
import { Divide } from "lucide-react";
export const UpcomingTable = async () => {
  const today = new Date();
  let noTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = [0, 1, 2, 3, 4, 5, 6];
  const weekDays = days.map((day) => addDays(noTime, day));
  const weeklyTasks = await getWeeklyTasks();

  return (
    <div className="flex justify-center md:p-6 p-4 w-full h-full ">
      {weeklyTasks.tasks.map((task, i) => {
        return <div>{task.title}-</div>;
      })}

      <div className="grid sm:grid-cols-2 md:grid-cols-7 w-full ">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={i}
              className={`p-2 order-1 ${
                i !== 6 ? "md:border-r" : ""
              } border-foreground/10`}
            >
              <h4 className="text-center border-b border-foreground/10 pb-4">
                {i === 0 ? "Today" : format(addDays(today, i), "EEEE")}
              </h4>
              <div className="py-2 grid gap-2">
                {weeklyTasks.tasks.map(
                  (task, j) =>
                    new Date(task.set_date).toString() ===
                      new Date(weekDay).toString() && (
                      <TaskCard key={j} task={task} />
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
