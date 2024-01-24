"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import {
  Client,
  ClientFormData,
  ClientNote,
  EditTaskFormData,
  Task,
  TaskFormData,
  TaskNote,
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
    revalidatePath("/home/account");
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
    console.log("data: ", data);
  }
  return { data };
};
export const uploadUserImage = async (formData: FormData) => {
  const supabase = await createSupabaseServerClient();
  const avatarFile = formData.get("img") as File;
  console.log(avatarFile.name);
  const fileName = `${Math.random()}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`public/${fileName}`, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.log(error);
  } else {
    console.log("upload image successful");
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(`public/${fileName}`);
    updateUserImage(data.publicUrl);
    await supabase.auth.refreshSession();
  }
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
    .select("*,  clients(name)")
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
      frequency: formData.frequency,
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
export const createRecurringTask = async (task: Task) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      set_date: task.set_date,
      set_time: task.set_time,
      title: task.title,
      about: task.about,
      fee: Number(task.fee),
      client_id: Number(task.client_id),
      user_id: user?.id,
      frequency: task.frequency,
    })
    .select();

  // let task = <Task[]>data;
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
export const editTask = async (
  task: EditTaskFormData,
  TaskId: number | number[]
) => {
  const supabase = await createSupabaseServerClient();
  let { error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      about: "",
      fee: Number(task.fee),
      set_date: task.set_date,
      set_time: task.set_time,
      frequency: task.frequency,
    })
    .eq("id", TaskId);

  if (error) {
    console.log("error", error);
  } else {
    console.log("Task updated successfully");
    revalidatePath("/home/tasks");
  }
};
export const getTasksOfThreeWeeks = async () => {
  const supabase = await createSupabaseServerClient();
  let today = addDays(new Date(), -1);
  let threeWeeksLater = addDays(new Date(), 21);

  const todayUTC = format(
    new Date(today.toISOString().slice(0, -1)),
    "yyyy-MM-dd"
  );

  const threeWeeksLaterUTC = format(
    new Date(threeWeeksLater.toISOString().slice(0, -1)),
    "yyyy-MM-dd"
  );

  let { data: tasksList, error } = await supabase
    .from("tasks")
    .select("*,  clients(name, type)")
    .gte("set_date", todayUTC)
    .lt("set_date", threeWeeksLaterUTC)
    .order("set_date", { ascending: false });

  let tasks = <Task[]>tasksList;

  if (error) {
    console.log(error);
  } else {
    console.log("get weekly tasks successful");
  }
  return { tasks };
};
export const getTaskNotes = async (taskId: number | number[]) => {
  const supabase = await createSupabaseServerClient();

  let { data: notesList, error } = await supabase
    .from("task-notes")
    .select()
    .eq("task_id", taskId);
  let notes = <TaskNote[]>notesList;
  if (error) {
    console.log(error);
  } else {
    console.log("get client note successful");
  }
  return notes;
};
export const deleteTaskNote = async (taskNoteId: number | number[]) => {
  const supabase = await createSupabaseServerClient();
  let { error } = await supabase
    .from("task-notes")
    .delete()
    .eq("id", taskNoteId);

  if (error) {
    console.log("error", error);
  }
};
export const createNewTaskNote = async (
  formData: { note: string },
  taskId: number | number[]
) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("task-notes")
    .insert({
      content: formData.note,
      task_id: taskId,
    })
    .select();
  let note = <TaskNote[]>data;
  if (error) {
    console.log(error);
  } else {
    console.log("Create task note successful");
    return note;
  }
};
