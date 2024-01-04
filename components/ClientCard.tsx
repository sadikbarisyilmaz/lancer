"use client";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Client } from "@/lib/types";
import { deleteClient } from "@/app/actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";

import { useState } from "react";
export function ClientCard({ client }: { client: Client }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = () => {
    deleteClient(client.id.toString());
    toast({
      title: `Client "${client.name}" deleted successfully !`,
    });
    router.push("/home/clients");
  };

  return (
    <Card className="max-w-[360px] dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 grid gap-4 p-4">
      <div className="flex items-center py-4 gap-2">
        <CircleUser size={48} strokeWidth={1} />
        <CardTitle>{client.name}</CardTitle>
      </div>
      <div className="grid p-2 gap-2 w-full">
        <p>Type: {client.type}</p>
        <p>Phone: {client.phone}</p>
        <p>Email: {client.email}</p>
      </div>
      <CardFooter>
        <Button
          onClick={() => setOpen(true)}
          variant="destructive"
          className="w-full"
        >
          Delete Client
        </Button>
      </CardFooter>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
