"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { Client, ClientFormData } from "@/lib/types";

export const getClients = async () => {
  "use server";
  const supabase = await createSupabaseServerClient();
  let { data: clientsList, error } = await supabase.from("clients").select();
  let clients = <Client[]>clientsList;
  return { clients };
};

export const createNewClient = async (formData: ClientFormData) => {
  "use server";
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("clients").insert({
    name: formData.name,
    type: formData.type,
    email: formData.email,
    desc: formData.desc,
    phone: formData.phone,
    user_id: user?.id,
  });
  console.log(data, error);
};
