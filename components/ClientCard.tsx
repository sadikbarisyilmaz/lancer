"use client";
import { CircleUser, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Client } from "@/lib/types";
import { deleteClient } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { DeleteAlert } from "./DeleteAlert";

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
    <Card className=" dark:bg-[#2424247c] bg-[#ffffffcb] flex justify-between flex-col max-h-64 gap-2 p-6">
      <div className="flex flex-col h-max">
        <div className="flex items-center gap-2">
          <CircleUser size={48} strokeWidth={1} />
          <CardTitle>{client.name}</CardTitle>
          {/* <TrashIcon
          size={20}
          className="cursor-pointer hover:text-red-700 transition-colors "
          onClick={() => setOpen(true)}
        /> */}
        </div>
        <div className="p-2 flex flex-col gap-2 justify-center h-full w-full">
          <p>Type: {client.type}</p>
          <p>Phone: {client.phone}</p>
          <p>Email: {client.email}</p>
        </div>
      </div>
      <Button
        onClick={() => setOpen(true)}
        variant="destructive"
        className="w-full"
      >
        Delete Client
      </Button>
      <DeleteAlert open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </Card>
  );
}
