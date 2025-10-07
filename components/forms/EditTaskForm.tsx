"use client";
import { editTask } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useRef, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Popover } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Task } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  title: z.string().min(2).max(30),
  about: z.string(),
  fee: z.string().min(1, { message: "Field Required" }),
  set_date: z.date(),
  set_time: z.coerce.string(),
  frequency: z.string(),
});

interface Props {
  task: Task;
}

export const EditTaskForm = ({ task }: Props) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const timePicker = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      about: "",
      fee: task.fee.toString(),
      // @ts-ignore
      set_date: new Date(task.set_date),
      set_time: task.set_time,
      frequency: task.frequency,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      editTask(values, task.id);
      toast({
        title: `Task edited successfully !`,
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: `${error}`,
      });
    }
  }
  const frequencyArr = ["Once", "Biweekly", "Weekly"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Edit Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="max-w-md overflow-auto p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  defaultValue={task.title}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  defaultValue={task.fee.toString()}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  defaultValue={task.set_time}
                  name="set_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Button
                          ref={timePicker}
                          asChild
                          variant="outline"
                          className=""
                          // @ts-ignore
                          onClick={() => timePicker.current.showPicker()}
                        >
                          <Input
                            className="cursor-pointer"
                            type="time"
                            {...field}
                          />
                        </Button>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  // @ts-ignore
                  defaultValue={new Date(task.set_date)}
                  name="set_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Set Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {frequencyArr?.map((frequency, i) => {
                            return (
                              <SelectItem key={i} value={frequency}>
                                {frequency}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <Button variant="outline" type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
