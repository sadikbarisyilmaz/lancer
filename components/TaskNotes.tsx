"use client";
import {
  createNewClient,
  createNewClientNote,
  createNewTaskNote,
  deleteClientNote,
  deleteTaskNote,
  getTaskNotes,
} from "@/app/actions";
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
import { TrashIcon } from "lucide-react";
import { DeleteAlert } from "./DeleteAlert";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  note: z.string().min(2),
});

export const TaskNotes = ({ id }: { id: number }) => {
  const [notes, setNotes] = useState<TaskNote[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const getNotes = async () => {
    try {
      const taskNotes = await getTaskNotes(id);
      setNotes(taskNotes);
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

  const handleDelete = (noteId: number) => {
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
        const prev = [...notes, ...data];
        setNotes(prev);
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
      <Card className="flex flex-col max-h-[284px] xl:max-h-[484px] dark:bg-[#2424247c] bg-[#ffffffcb] min-h-[220px] dark:bg-opacity-40 bg-opacity-40 justify-between items-between gap-4 p-4">
        <ul className="overflow-y-scroll border h-full p-4 rounded-md border-foreground/10">
          {notes.length !== 0 ? (
            notes.map((note, i) => {
              return (
                <li
                  className="py-1 flex justify-between items-center text-justify"
                  key={i}
                >
                  - {note.content}
                  <TrashIcon
                    size={20}
                    className="cursor-pointer hover:text-red-700 transition-colors "
                    onClick={() => handleDelete(note.id)}
                  />
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
