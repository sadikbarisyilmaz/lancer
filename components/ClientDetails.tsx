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
    <div className="w-full justify-center flex max-w-4xl">
      <div className="grid grid-cols-1 justify-center md:grid-cols-2 w-full">
        <ClientCard client={client} />
        <ClientNotes id={client.id} />
      </div>
      {/* client tasks */}
    </div>
  );
};
