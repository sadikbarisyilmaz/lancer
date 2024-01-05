"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { Client, ClientFormData, ClientNote, Task } from "@/lib/types";
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
    console.log("clients");
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
export const getClient = async (clientId: string | string[]) => {
  const supabase = await createSupabaseServerClient();
  let { data: clientsList, error } = await supabase
    .from("clients")
    .select("*, tasks(*)")
    .eq("id", clientId);

  let client = <Client[]>clientsList;

  if (error) {
    console.log("error", error);
  } else {
    console.log("get client successful");
  }
  return client[0];
};
export const deleteClient = async (clientId: string | string[]) => {
  const supabase = await createSupabaseServerClient();
  let { error } = await supabase.from("clients").delete().eq("id", clientId);

  if (error) {
    console.log("error", error);
  }
};
export const getClientNotes = async (clientId: number | number[]) => {
  const supabase = await createSupabaseServerClient();

  let { data: notesList, error } = await supabase
    .from("client-notes")
    .select()
    .eq("client_id", clientId);
  let notes = <ClientNote[]>notesList;
  if (error) {
    console.log(error);
  } else {
    console.log("get client note successful");
  }
  return notes;
};
export const createNewClientNote = async (
  formData: { note: string },
  clientId: number | number[]
) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("client-notes")
    .insert({
      content: formData.note,
      client_id: clientId,
    })
    .select();
  let note = <ClientNote[]>data;
  if (error) {
    console.log(error);
  } else {
    console.log("delete client successful");
    // revalidatePath('/home/clients/12')
    return note;
  }
};
export const deleteClientNote = async (clientNoteId: number | number[]) => {
  const supabase = await createSupabaseServerClient();
  let { error } = await supabase
    .from("client-notes")
    .delete()
    .eq("id", clientNoteId);

  if (error) {
    console.log("error", error);
  }
};
export const getTasks = async () => {
  const supabase = await createSupabaseServerClient();
  let { data: tasksList, error } = await supabase
    .from("tasks")
    .select("*,  clients(name)")
    .order("set_date", { ascending: false });

  let tasks = <Task[]>tasksList;

  if (error) {
    console.log(error);
  } else {
    console.log("get task successful");
  }
  return { tasks };
};
