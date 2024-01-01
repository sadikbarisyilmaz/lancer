import createSupabaseServerClient from "@/lib/supabase/server";
import { Client } from "@/lib/types";

export const getClients = async () => {
  "use server";
  const supabase = await createSupabaseServerClient();
  let { data: clientsList, error } = await supabase.from("clients").select();
  let clients = <Client[]>clientsList;
  return { clients };
};
