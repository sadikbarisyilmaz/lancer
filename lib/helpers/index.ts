import { Task } from "@/lib/types";
import { addDays, format } from "date-fns";
import { createRecurringTask } from "@/app/actions";

export const createRecurringTasks = (formattedWeeklyTasks: Task[]) => {
  const recurringTasksThisWeek = formattedWeeklyTasks
    ?.filter((task) => task.frequency !== "Once")
    .filter((task) => new Date(task.set_date) < addDays(new Date(), 7));

  const nextWeekTasks = formattedWeeklyTasks
    ?.filter((task) => task.frequency !== "Once")
    .filter(
      (task) =>
        new Date(task.set_date) > addDays(new Date(), 7) &&
        new Date(task.set_date) < addDays(new Date(), 14)
    );
  const twoWeeksLaterTasks = formattedWeeklyTasks
    ?.filter((task) => task.frequency !== "Once")
    .filter(
      (task) =>
        new Date(task.set_date) > addDays(new Date(), 14) &&
        new Date(task.set_date) < addDays(new Date(), 21)
    );
  recurringTasksThisWeek?.forEach((recurringTask) => {
    // console.log("runs");
    if (recurringTask.frequency === "Weekly") {
      const isCreated = nextWeekTasks?.some(
        (nextWeekTask) =>
          format(nextWeekTask.set_date, "MMM/dd/yy") ===
          format(addDays(recurringTask.set_date, 7), "MMM/dd/yy")
      );
      // console.log("nextweekcreated: ", isCreated);
      if (!isCreated) {
        // console.log(recurringTask);
        const newTask = {
          ...recurringTask,
          set_date: format(addDays(recurringTask.set_date, 7), "MMM/dd/yy"),
        };
        createRecurringTask(newTask);
      }
    } else if (recurringTask.frequency === "Biweekly") {
      const isCreated = twoWeeksLaterTasks?.some(
        (twoWeeksLaterTask) =>
          format(twoWeeksLaterTask.set_date, "MMM/dd/yy") ===
          format(addDays(recurringTask.set_date, 14), "MMM/dd/yy")
      );
      // console.log("twoweekslatercreated: ", isCreated);
      if (!isCreated) {
        const newTask = {
          ...recurringTask,
          set_date: format(addDays(recurringTask.set_date, 14), "MMM/dd/yy"),
        };
        createRecurringTask(newTask);
      }
    }
  });
};
