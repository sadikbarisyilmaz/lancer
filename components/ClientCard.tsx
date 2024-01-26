"use client";
import { FileText, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Client } from "@/lib/types";
import { deleteClient } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { DeleteAlert } from "./DeleteAlert";
import { EditClientForm } from "./forms/EditClientForm";

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
    <Card className=" dark:bg-[#2424247c] bg-[#ffffffcb]  flex justify-between flex-col max-h-fit gap-2 p-6">
      <div className="flex flex-col h-max gap-6">
        <div className="flex items-center gap-2">
          <span className="text-indigo-500 ">
            <User size={48} strokeWidth={1} />
          </span>
          <CardTitle>{client.name}</CardTitle>
        </div>
        <div>
          <div className="p-1 gap-2 flex items-center">
            <span className=" text-opacity-60 text-green-500">
              <FileText size={24} />
            </span>
            <p> {client.type}</p>
          </div>
          <div className="p-1 gap-2 flex items-center">
            <span className=" text-opacity-60 text-amber-400 ">
              <Phone size={24} />
            </span>
            <p> {client.phone}</p>
          </div>
          <div className="p-1 gap-2 flex items-center">
            <span className=" text-opacity-60 text-red-500">
              <Mail size={24} />
            </span>
            <p> {client.email}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <EditClientForm client={client} />
        <Button
          onClick={() => setOpen(true)}
          variant="destructive"
          className="w-full"
        >
          Delete Client
        </Button>
      </div>
      <DeleteAlert open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </Card>
  );
}
