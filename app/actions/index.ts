"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import {
  Client,
  ClientFormData,
  ClientNote,
  Task,
  TaskFormData,
} from "@/lib/types";
import { revalidatePath } from "next/cache";
import { addDays, format } from "date-fns";

export const readUserSession = async () => {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
};
export const updateUserEmail = async (newEmail: string) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (error) {
    console.log(error);
  } else {
    console.log("update email successful");
  }
  return { data };
};
export const updateUserPassword = async (newPassword: string) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.log(error);
  } else {
    console.log("update password successful");
  }
  return { data };
};
export const updateUserFullName = async (newFullName: string) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: newFullName,
    },
  });

  if (error) {
    console.log(error);
  } else {
    console.log("update fullname successful");
  }
  return { data };
};
export const updateUserImage = async (newImage: string) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      avatar_url: newImage,
      picture: newImage,
    },
  });

  if (error) {
    console.log(error);
  } else {
    console.log("update image successful");
  }
  return { data };
};
export const uploadUserImage = async (image: any) => {
  const supabase = await createSupabaseServerClient();
  const avatarFile = image;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload("public/avatar1.png", avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.log(error);
  } else {
    console.log("upload image successful");
  }
  return { data };
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
    console.log("get clients successful");
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
    phone: formData.phone,
    user_id: user?.id,
  });

  if (error) {
    console.log(error);
  } else {
    console.log("delete client successful");
    revalidatePath("/home/clients");
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
export const getTask = async (taskId: number | number[]) => {
  const supabase = await createSupabaseServerClient();
  let { data: tasksList, error } = await supabase
    .from("tasks")
    .select()
    .eq("id", taskId);

  let tasks = <Task[]>tasksList;

  if (error) {
    console.log(error);
  } else {
    console.log("get task successful");
  }
  return tasks[0];
};
export const createNewTask = async (formData: TaskFormData) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      set_date: formData.set_date,
      set_time: formData.set_time,
      title: formData.title,
      about: formData.about,
      fee: Number(formData.fee),
      client_id: Number(formData.client_id),
      user_id: user?.id,
    })
    .select();

  let task = <Task[]>data;
  if (error) {
    console.log(error);
  } else {
    console.log("create task successful");
    revalidatePath("/home/tasks");
  }
};
export const deleteTasks = async (TaskId: number | number[]) => {
  const supabase = await createSupabaseServerClient();
  let { error } = await supabase.from("tasks").delete().eq("id", TaskId);
  console.log(TaskId);

  if (error) {
    console.log("error", error);
  } else {
    console.log("task deleted successfully");
    revalidatePath("/home/tasks");
  }
};
export const updatePaymentStatus = async (
  status: string,
  TaskId: number | number[]
) => {
  const supabase = await createSupabaseServerClient();
  const updatedStatus = status === "Paid" ? "Not Paid" : "Paid";

  let { error } = await supabase
    .from("tasks")
    .update({ payment_status: updatedStatus })
    .eq("id", TaskId);

  if (error) {
    console.log("error", error);
  } else {
    console.log("payment status updated successfully");
    revalidatePath("/home/tasks");
  }
};
export const getWeeklyTasks = async () => {
  const supabase = await createSupabaseServerClient();
  let today = addDays(new Date(), -1);
  let lastDayOfTheWeek = addDays(new Date(), 7);

  const todayUTC = format(
    new Date(today.toISOString().slice(0, -1)),
    "yyyy-MM-dd"
  );

  const lastDayOfTheWeekUTC = format(
    new Date(lastDayOfTheWeek.toISOString().slice(0, -1)),
    "yyyy-MM-dd"
  );

  let { data: tasksList, error } = await supabase
    .from("tasks")
    .select("*,  clients(name, type)")
    .gte("set_date", todayUTC)
    .lt("set_date", lastDayOfTheWeekUTC)
    .order("set_date", { ascending: false });

  let tasks = <Task[]>tasksList;

  if (error) {
    console.log(error);
  } else {
    console.log("get weekly tasks successful");
  }
  return { tasks };
};
