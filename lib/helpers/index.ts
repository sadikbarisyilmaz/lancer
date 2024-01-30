import { Task } from "@/lib/types";
import { addDays, format } from "date-fns";
import { createRecurringTask } from "@/app/actions";

export const createRecurringTasks = (formattedWeeklyTasks: Task[]) => {
  const recurringTasksThisWeek = formattedWeeklyTasks
    ?.filter((task) => task.frequency !== "Once")
    .filter((task) => new Date(task.set_date) < addDays(new Date(), 6));

  const nextWeekTasks = formattedWeeklyTasks
    ?.filter((task) => task.frequency !== "Once")
    .filter(
      (task) =>
        new Date(task.set_date) > addDays(new Date(), 6) &&
        new Date(task.set_date) < addDays(new Date(), 13)
    );

  const twoWeeksLaterTasks = formattedWeeklyTasks
    ?.filter((task) => task.frequency !== "Once")
    .filter(
      (task) =>
        new Date(task.set_date) > addDays(new Date(), 13) &&
        new Date(task.set_date) < addDays(new Date(), 20)
    );

  recurringTasksThisWeek?.forEach((recurringTask) => {
    if (recurringTask.frequency === "Weekly") {
      const isCreated = nextWeekTasks?.some((nextWeekTask) => {
        if (
          nextWeekTask.title === recurringTask.title &&
          nextWeekTask.client_id === recurringTask.client_id
        ) {
          return (
            format(nextWeekTask.set_date, "MMM/dd/yy") ===
            format(addDays(recurringTask.set_date, 7), "MMM/dd/yy")
          );
        }
      });
      if (!isCreated) {
        const newTask = {
          ...recurringTask,
          set_date: format(addDays(recurringTask.set_date, 7), "MMM/dd/yy"),
        };
        createRecurringTask(newTask);
      }
    } else if (recurringTask.frequency === "Biweekly") {
      const isCreated = twoWeeksLaterTasks?.some((nextWeekTask) => {
        if (
          nextWeekTask.title === recurringTask.title &&
          nextWeekTask.client_id === recurringTask.client_id
        ) {
          return (
            format(nextWeekTask.set_date, "MMM/dd/yy") ===
            format(addDays(recurringTask.set_date, 14), "MMM/dd/yy")
          );
        }
      });
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
