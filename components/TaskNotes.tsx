"use client";
import { createNewTaskNote, deleteTaskNote, getTaskNotes } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useToast } from "./ui/use-toast";
import { TaskNote } from "@/lib/types";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Calendar, TrashIcon } from "lucide-react";
import { DeleteAlert } from "./DeleteAlert";
import { Skeleton } from "./ui/skeleton";
import { format } from "date-fns";

const formSchema = z.object({
  note: z.string().min(2),
});

export const TaskNotes = ({ id }: { id: string }) => {
  const [notes, setNotes] = useState<TaskNote[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const getNotes = async () => {
    try {
      const taskNotes = await getTaskNotes(id);
      const refactoredtaskNotes = taskNotes.map((note, i) => {
        return {
          ...note,
          created_at: format(note.created_at, "EEEE - dd/MM/yyyy"),
        };
      });
      setNotes(refactoredtaskNotes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  const handleDelete = (noteId: string) => {
    deleteTaskNote(noteId);
    toast({
      title: `Note deleted successfully !`,
    });
    getNotes();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await createNewTaskNote(values, id);
      form.reset();
      toast({
        title: `Note created successfully !`,
      });
      if (data) {
        getNotes();
      }
    } catch (error) {
      toast({
        title: `${error}`,
      });
    }
  }

  if (loading) {
    return (
      <Skeleton className="h-[414px] p-6 w-full text-foreground/90 flex flex-col justify-center dark:bg-[#2424247c] bg-[#ffffffcb] rounded-lg dark:bg-opacity-50 bg-opacity-50 gap-4 text-lg "></Skeleton>
    );
  }

  return (
    <div>
      <Card className="flex flex-col max-h-[384px] lg:max-h-[414px] xl:max-h-[484px] dark:bg-[#2424247c] bg-[#ffffffcb] min-h-[220px] dark:bg-opacity-40 bg-opacity-40 justify-between items-between gap-4 p-4">
        <ul className="overflow-y-scroll h-full py-2 grid gap-2 rounded-md ">
          {notes.length !== 0 ? (
            notes.map((note, i) => {
              return (
                <li
                  className="flex flex-col border-l-8  text-justify dark:border-black/60 dark:bg-foreground/10 border-black/50 bg-white shadow-sm"
                  key={i}
                >
                  <span className="flex justify-between pt-3 pb-1 px-3 ">
                    <p className="flex gap-1 items-center">
                      <Calendar size={18} />
                      {`${note.created_at}`}
                    </p>
                    <TrashIcon
                      size={18}
                      className="cursor-pointer hover:text-red-700 transition-colors "
                      onClick={() => handleDelete(note.id)}
                    />
                  </span>
                  <p className="px-3 py-1">"{note.content}"</p>
                </li>
              );
            })
          ) : (
            <li className="py-1 flex justify-between items-center">
              - No saved notes.
            </li>
          )}
        </ul>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-between"
            >
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </Card>
      <DeleteAlert open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </div>
  );
};
