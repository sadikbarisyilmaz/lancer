import { Task } from "@/lib/types";
import { Separator } from "./ui/separator";

interface Props {
  tasks: Task[];
}

export const TotalDept = ({ tasks }: Props) => {
  const debt = tasks
    .filter((task) => task.payment_status !== "Paid")
    .map((task) => task.fee)
    .reduce((a, b) => a + b);
  const unpaidTasks = tasks
    .filter((task) => task.payment_status !== "Paid")
    .map((task) => task.set_date);
  console.log(debt);

  return (
    <div className="bg-background/40 w-full flex h-[200px] p-4 rounded-md">
      <div className="">
        <p className="text-lg">Unpaid Tasks:</p>
        <Separator className="bg-foreground/40" />
        {unpaidTasks.map((date, i) => {
          return <div key={i}>{`- ${date}`}</div>;
        })}
      </div>
      <div className="">
        <p className="text-lg">TotalDept:</p>
        <Separator className="bg-foreground/40" />
        {debt}
      </div>
    </div>
  );
};
