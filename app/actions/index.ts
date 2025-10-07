"use server";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";
import { addDays } from "date-fns";
import { auth } from "@/auth";
import {
  Client,
  ClientFormData,
  ClientNote,
  EditClientFormData,
  Task,
  TaskFormData,
  TaskNote,
  EditTaskFormData,
} from "@/lib/types";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface UpdateUserData {
  email?: string;
  full_name?: string;
}

export const createNewUser = async (
  email: string,
  password: string,
  full_name: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, hashedPassword, full_name },
  });
  return user;
};

export const updateUser = async (data: {
  email?: string;
  full_name?: string;
}) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");
  console.log("updateuser:", data);

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { email: data.email, full_name: data.full_name },
    });
    revalidatePath("/dashboard/account");
    return { data: user };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserPassword = async (newPassword: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { id: userId },
    data: { hashedPassword },
  });

  return { data: user };
};

export const updateUserImage = async (newImage: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.update({
    where: { id: userId },
    data: { avatar_url: newImage },
  });

  return { data: user };
};

export const getClients = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const clients = await prisma.client.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });

  return { clients };
};

export const createNewClient = async (formData: ClientFormData) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await prisma.client.create({
    data: {
      name: formData.name,
      type: formData.type,
      email: formData.email,
      phone: Number(formData.phone),
      user_id: userId,
    },
  });

  revalidatePath("/dashboard/clients");
};

export const getClient = async (clientId: string | string[]) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      tasks: true,
    },
  });

  if (!client) return null;

  return {
    ...client,
    id: client.id,
    tasks: client.tasks,
  };
};

export const deleteClient = async (clientId: string | string[]) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;

  await prisma.client.delete({
    where: { id },
  });

  revalidatePath("/dashboard/clients");
};

export const editClient = async (
  client: EditClientFormData,
  clientId: string | string[]
) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;
  const phone = parseInt(client.phone);
  // Optional: you can validate `data` here before updating
  await prisma.client.update({
    where: { id },
    data: {
      name: client.name,
      email: client.email,
      type: client.type,
      phone: phone,
    },
  });

  revalidatePath("/dashboard/clients");
};

export const getClientNotes = async (clientId: string | string[]) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;

  const notes = await prisma.clientNote.findMany({
    where: { client_id: id },
    orderBy: { created_at: "desc" },
  });

  return notes;
};

export const createNewClientNote = async (
  formData: { note: string },
  clientId: string | string[]
) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const note = await prisma.clientNote.create({
    data: {
      content: formData.note,
      client_id: id,
      user_id: userId,
    },
  });

  return [note];
};

export const deleteClientNote = async (clientNoteId: string | string[]) => {
  const id = Array.isArray(clientNoteId) ? clientNoteId[0] : clientNoteId;

  await prisma.clientNote.delete({
    where: { id },
  });
};

export const getTasks = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const tasks = await prisma.task.findMany({
    where: { user_id: userId },
    orderBy: { set_date: "desc" },
    include: {
      clients: {
        select: { name: true },
      },
    },
  });

  return {
    tasks: tasks.map((task) => ({
      ...task,
      clients: { name: task.clients?.name || "" },
    })),
  };
};

export const getTask = async (taskId: string | string[]) => {
  const id = Array.isArray(taskId) ? taskId[0] : taskId;

  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      clients: {
        select: { name: true },
      },
    },
  });

  if (!task) return null;

  return {
    ...task,
    clients: { name: task.clients?.name || "" },
  };
};

export const createNewTask = async (formData: TaskFormData) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await prisma.task.create({
    data: {
      set_date: new Date(formData.set_date),
      set_time: formData.set_time,
      title: formData.title,
      about: formData.about,
      fee: Number(formData.fee),
      client_id: formData.client_id,
      user_id: userId,
      frequency: formData.frequency,
      payment_status: "Not Paid",
    },
  });

  revalidatePath("/dashboard/tasks");
};

export const createRecurringTask = async (task: Task) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await prisma.task.create({
    data: {
      set_date: new Date(task.set_date),
      set_time: task.set_time,
      title: task.title,
      about: task.about,
      fee: Number(task.fee),
      client_id: task.client_id,
      user_id: userId,
      frequency: task.frequency,
      payment_status: task.payment_status || "Not Paid",
    },
  });

  revalidatePath("/dashboard/tasks");
};

export const deleteTasks = async (TaskId: string | string[]) => {
  const id = Array.isArray(TaskId) ? TaskId[0] : TaskId;

  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/dashboard/tasks");
};

export const updatePaymentStatus = async (
  status: string,
  TaskId: string | string[]
) => {
  const id = Array.isArray(TaskId) ? TaskId[0] : TaskId;
  const newStatus = status === "Payment Done" ? "Not Paid" : "Payment Done";

  await prisma.task.update({
    where: { id },
    data: { payment_status: newStatus },
  });

  revalidatePath("/dashboard/tasks");
};

export const editTask = async (
  task: EditTaskFormData,
  TaskId: string | string[]
) => {
  const id = Array.isArray(TaskId) ? TaskId[0] : TaskId;

  await prisma.task.update({
    where: { id },
    data: {
      title: task.title,
      about: "", // still clearing this field?
      fee: Number(task.fee),
      set_date: new Date(task.set_date),
      set_time: task.set_time,
      frequency: task.frequency,
    },
  });

  revalidatePath("/dashboard/tasks");
};

export const getWeeklyTasks = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const today = addDays(new Date(), -1);
  const threeWeeksLater = addDays(new Date(), 21);

  const tasks = await prisma.task.findMany({
    where: {
      user_id: userId,
      set_date: {
        gte: today,
        lt: threeWeeksLater,
      },
    },
    orderBy: { set_date: "desc" },
    include: {
      clients: {
        select: { name: true, type: true },
      },
    },
  });

  const enriched = tasks.map((t) => ({
    ...t,
    clients: {
      name: t.clients?.name || "",
      type: t.clients?.type || "",
    },
  }));

  return { tasks: enriched };
};

export const getTaskNotes = async (taskId: string | string[]) => {
  const id = Array.isArray(taskId) ? taskId[0] : taskId;

  const notes = await prisma.taskNote.findMany({
    where: { task_id: id },
    orderBy: { created_at: "desc" },
  });

  return notes;
};

export const createNewTaskNote = async (
  formData: { note: string },
  taskId: string | string[]
) => {
  const id = Array.isArray(taskId) ? taskId[0] : taskId;

  const note = await prisma.taskNote.create({
    data: {
      content: formData.note,
      task_id: id,
    },
  });

  return [note];
};

export const deleteTaskNote = async (taskNoteId: string | string[]) => {
  const id = Array.isArray(taskNoteId) ? taskNoteId[0] : taskNoteId;

  await prisma.taskNote.delete({
    where: { id },
  });
};
