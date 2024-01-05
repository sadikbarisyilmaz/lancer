"use client";
import {
  createNewClient,
  createNewClientNote,
  deleteClientNote,
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
import { getClientNotes } from "@/app/actions";
import { ClientNote } from "@/lib/types";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { TrashIcon } from "lucide-react";
import { DeleteAlert } from "./DeleteAlert";

const formSchema = z.object({
  note: z.string().min(2).max(30),
});

export const ClientNotes = ({ id }: { id: number }) => {
  const [clientNotes, setClientNotes] = useState<ClientNote[]>([]);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const getNotes = async () => {
    try {
      const notes = await getClientNotes(id);
      setClientNotes(notes);
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
    deleteClientNote(noteId);
    toast({
      title: `Note deleted successfully !`,
    });
    getNotes();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await createNewClientNote(values, id);
      toast({
        title: `Note created successfully !`,
      });
      if (data) {
        const prev = [...clientNotes, ...data];
        setClientNotes(prev);
      }
    } catch (error) {
      toast({
        title: `${error}`,
      });
    }
  }

  return (
    <div>
      <Card className="flex flex-col  dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 items-between gap-4 p-4">
        <ul className="overflow-y-scroll border p-4 rounded-md border-foreground/10 max-h-[300px]">
          {clientNotes?.map((note, i) => {
            return (
              <li className="py-1 flex justify-between items-center" key={i}>
                - {note.content}
                <TrashIcon
                  size={20}
                  className="cursor-pointer hover:text-red-700 transition-colors "
                  onClick={() => handleDelete(note.id)}
                />
              </li>
            );
          })}
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
                Submit Note
              </Button>
            </form>
          </Form>
        </div>
      </Card>
      <DeleteAlert open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </div>
  );
};
