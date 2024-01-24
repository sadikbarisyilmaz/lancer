import { Task } from "@/lib/types";
import { addDays, format } from "date-fns";
import { createRecurringTask } from "@/app/actions";

export const setToLocalTime = (tasks: Task[]) =>
  tasks.map((task, i) => {
    return {
      ...task,
      set_date: format(task.set_date, "EEEE - dd/MM/yyyy"),
    };
  });

export const createRecurringTasks = (formattedTasksOfThreeWeeks: Task[]) => {
  const recurringTasksThisWeek = formattedTasksOfThreeWeeks
    ?.filter((task) => task.frequency !== "Once")
    .filter((task) => new Date(task.set_date) < addDays(new Date(), 7));
  const nextWeekTasks = formattedTasksOfThreeWeeks
    ?.filter((task) => task.frequency !== "Once")
    .filter(
      (task) =>
        new Date(task.set_date) > addDays(new Date(), 7) &&
        new Date(task.set_date) < addDays(new Date(), 14)
    );
  const twoWeeksLaterTasks = formattedTasksOfThreeWeeks
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
          format(nextWeekTask.set_date, "EEEE - dd/MM/yyyy") ===
          format(addDays(recurringTask.set_date, 7), "EEEE - dd/MM/yyyy")
      );
      // console.log("nextweekcreated: ", isCreated);
      if (!isCreated) {
        console.log(recurringTask);
        const newTask = {
          ...recurringTask,
          set_date: format(
            addDays(recurringTask.set_date, 7),
            "EEEE - dd/MM/yyyy"
          ),
        };
        createRecurringTask(newTask);
      }
    } else if (recurringTask.frequency === "Biweekly") {
      const isCreated = twoWeeksLaterTasks?.some(
        (twoWeeksLaterTask) =>
          format(twoWeeksLaterTask.set_date, "EEEE - dd/MM/yyyy") ===
          format(addDays(recurringTask.set_date, 14), "EEEE - dd/MM/yyyy")
      );
      // console.log("twoweekslatercreated: ", isCreated);
      if (!isCreated) {
        const newTask = {
          ...recurringTask,
          set_date: format(
            addDays(recurringTask.set_date, 14),
            "EEEE - dd/MM/yyyy"
          ),
        };
        createRecurringTask(newTask);
      }
    }
  });
};
