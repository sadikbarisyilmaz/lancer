"use client";
import { useParams, usePathname } from "next/navigation";
import { ClientCard } from "./ClientCard";
import { useEffect, useState } from "react";
import { getClient } from "@/app/actions";
import { Client } from "@/lib/types";
import { Loader } from "./Loader";
import { ClientNotes } from "./ClientNotes";

export const ClientDetails = () => {
  const [client, setClient] = useState<Client>();
  const params = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClient(params.id);
      setClient(client);
    };
    fetchClient();
  }, []);

  if (!client) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full justify-center md:gap-2 grid grid-cols-1 md:grid-cols-3">
      <div className="grid grid-cols-1 col-span-1 justify-center gap-2 w-full">
        <ClientCard client={client} />
        <ClientNotes id={client.id} />
      </div>
      <div className="w-full col-span-2 bg-black bg-opacity-30"></div>
    </div>
  );
};
