"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { Client, ClientFormData } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const readUserSession = async () => {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
};

export const getClients = async () => {
  const supabase = await createSupabaseServerClient();
  let { data: clientsList, error } = await supabase
    .from("clients")
    .select()
    .order("id", { ascending: false });

  let clients = <Client[]>clientsList;

  if (error) {
    console.log(error);
  } else {
    console.log("get client successful");
  }
  return { clients };
};

export const createNewClient = async (formData: ClientFormData) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("clients").insert({
    name: formData.name,
    type: formData.type,
    email: formData.email,
    // desc: formData.desc,
    phone: formData.phone,
    user_id: user?.id,
  });

  if (error) {
    console.log(error);
  } else {
    console.log("delete client successful");
    revalidatePath("/home");
  }
};
