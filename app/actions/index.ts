"use server";
import { unstable_noStore as noStore } from "next/cache";
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
import { revalidatePath } from "next/cache";
import { addDays, format } from "date-fns";
import { connectToDatabase } from "@/lib/mongoose";
import { getUserModel } from "@/lib/models/User";
import { getClientModel } from "@/lib/models/Client";
import { getTaskModel } from "@/lib/models/Task";
import { getWeeklyModel } from "@/lib/models/Weekly";
import { getClientNoteModel } from "@/lib/models/ClientNote";
import { getTaskNoteModel } from "@/lib/models/TaskNote";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

async function getCurrentUserId() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  await connectToDatabase();
  const User = await getUserModel();
  const user = (await User.findOne({ email }).lean()) as any;
  return user?._id?.toString() ?? null;
}

export const createNewUser = async (
  email: string,
  password: string,
  full_name: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await connectToDatabase();
  const User = await getUserModel();
  const user = await User.create({ email, hashedPassword, full_name });
  return JSON.parse(JSON.stringify(user));
};

// export const getUser = async (email: string) => {
//   await connectToDatabase();
//   const User = await getUserModel();
//   const user = (await User.findOne({ email }).lean()) as any;
//   return user ? { ...user, id: user._id?.toString?.() } : null;
// };

// User profile updates (examples using Prisma)
export const updateUserEmail = async (newEmail: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const User = await getUserModel();
  const user = await User.findByIdAndUpdate(
    userId,
    { email: newEmail },
    { new: true }
  ).lean();
  return { data: JSON.parse(JSON.stringify(user)) };
};

export const updateUserPassword = async (newPassword: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await connectToDatabase();
  const User = await getUserModel();
  const user = await User.findByIdAndUpdate(
    userId,
    { hashedPassword },
    { new: true }
  ).lean();
  return { data: JSON.parse(JSON.stringify(user)) };
};

export const updateUserFullName = async (newFullName: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const User = await getUserModel();
  const user = await User.findByIdAndUpdate(
    userId,
    { full_name: newFullName },
    { new: true }
  ).lean();
  revalidatePath("/dashboard/account");
  return { data: JSON.parse(JSON.stringify(user)) };
};

export const updateUserImage = async (newImage: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const User = await getUserModel();
  const user = await User.findByIdAndUpdate(
    userId,
    { avatar_url: newImage },
    { new: true }
  ).lean();
  return { data: JSON.parse(JSON.stringify(user)) };
};

// Clients
export const getClients = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const ClientModel = await getClientModel();
  const clients = await ClientModel.find({ user_id: userId })
    .sort({ created_at: -1 })
    .lean();
  return {
    clients: JSON.parse(JSON.stringify(clients)) as unknown as Client[],
  };
};

export const createNewClient = async (formData: ClientFormData) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const ClientModel = await getClientModel();
  await ClientModel.create({
    name: formData.name,
    type: formData.type,
    email: formData.email,
    phone: Number(formData.phone),
    user_id: userId,
  });

  revalidatePath("/dashboard/clients");
};

export const getClient = async (clientId: string | string[]) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;
  await connectToDatabase();
  const ClientModel = await getClientModel();
  const TaskModel = await getTaskModel();
  const client = (await ClientModel.findById(id).lean()) as any;
  if (!client) return null as unknown as Client;
  const tasks = await TaskModel.find({ client_id: id }).lean();
  return {
    ...(client as any),
    id: client._id?.toString?.(),
    tasks,
  } as unknown as Client;
};

export const deleteClient = async (clientId: string | string[]) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;
  await connectToDatabase();
  const ClientModel = await getClientModel();
  await ClientModel.findByIdAndDelete(id);

  revalidatePath("/dashboard/clients");
};

// Client Notes
export const getClientNotes = async (clientId: string | string[]) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;
  await connectToDatabase();
  const ClientNoteModel = await getClientNoteModel();
  const notes = await ClientNoteModel.find({ client_id: id })
    .sort({ created_at: -1 })
    .lean();
  return JSON.parse(JSON.stringify(notes)) as unknown as ClientNote[];
};

export const createNewClientNote = async (
  formData: { note: string },
  clientId: string | string[]
) => {
  const id = Array.isArray(clientId) ? clientId[0] : clientId;
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const ClientNoteModel = await getClientNoteModel();
  const note = await ClientNoteModel.create({
    content: formData.note,
    client_id: id,
    user_id: userId,
  });
  return [JSON.parse(JSON.stringify(note))] as unknown as ClientNote[];
};

export const deleteClientNote = async (clientNoteId: string | string[]) => {
  const id = Array.isArray(clientNoteId) ? clientNoteId[0] : clientNoteId;
  await connectToDatabase();
  const ClientNoteModel = await getClientNoteModel();
  await ClientNoteModel.findByIdAndDelete(id);
};

// Tasks
export const getTasks = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const TaskModel = await getTaskModel();
  const ClientModel = await getClientModel();
  const tasks = await TaskModel.find({ user_id: userId })
    .sort({ set_date: -1 })
    .lean();
  const clientMap = new Map<string, string>();
  await Promise.all(
    tasks.map(async (t) => {
      const cid = t.client_id?.toString?.();
      if (cid && !clientMap.has(cid)) {
        const c = await ClientModel.findById(cid).select("name").lean();
        if (c) clientMap.set(cid, (c as any).name);
      }
    })
  );
  const enriched = tasks.map((t) => ({
    ...(t as any),
    id: t._id?.toString?.(),
    clients: { name: clientMap.get(t.client_id?.toString?.() || "") || "" },
  }));
  return { tasks: JSON.parse(JSON.stringify(enriched)) as unknown as Task[] };
};

export const getTask = async (taskId: string | string[]) => {
  const id = Array.isArray(taskId) ? taskId[0] : taskId;
  await connectToDatabase();
  const TaskModel = await getTaskModel();
  const ClientModel = await getClientModel();
  const task = (await TaskModel.findById(id).lean()) as any;
  if (!task) return null as unknown as Task;
  const client = await ClientModel.findById(task.client_id)
    .select("name")
    .lean();
  return {
    ...(task as any),
    id: task._id?.toString?.(),
    clients: { name: (client as any)?.name || "" },
  } as unknown as Task;
};

export const createNewTask = async (formData: TaskFormData) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const TaskModel = await getTaskModel();
  await TaskModel.create({
    set_date: new Date(formData.set_date),
    set_time: formData.set_time,
    title: formData.title,
    about: formData.about,
    fee: Number(formData.fee),
    client_id: formData.client_id,
    user_id: userId,
    frequency: formData.frequency,
    payment_status: "Not Paid",
  });

  revalidatePath("/dashboard/tasks");
};

export const createRecurringTask = async (task: Task) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const TaskModel = await getTaskModel();
  await TaskModel.create({
    set_date: new Date(task.set_date),
    set_time: task.set_time,
    title: task.title,
    about: task.about,
    fee: Number(task.fee),
    client_id: task.client_id,
    user_id: userId,
    frequency: task.frequency,
    payment_status: task.payment_status || "Not Paid",
  });

  revalidatePath("/dashboard/tasks");
};

export const deleteTasks = async (TaskId: string | string[]) => {
  const id = Array.isArray(TaskId) ? TaskId[0] : TaskId;
  await connectToDatabase();
  const TaskModel = await getTaskModel();
  await TaskModel.findByIdAndDelete(id);

  revalidatePath("/dashboard/tasks");
};

export const updatePaymentStatus = async (
  status: string,
  TaskId: string | string[]
) => {
  const id = Array.isArray(TaskId) ? TaskId[0] : TaskId;
  const updatedStatus = status === "Payment Done" ? "Not Paid" : "Payment Done";
  await connectToDatabase();
  const TaskModel = await getTaskModel();
  await TaskModel.findByIdAndUpdate(id, { payment_status: updatedStatus });

  revalidatePath("/dashboard/tasks");
};

export const editTask = async (
  task: EditTaskFormData,
  TaskId: string | string[]
) => {
  const id = Array.isArray(TaskId) ? TaskId[0] : TaskId;
  await connectToDatabase();
  const TaskModel = await getTaskModel();
  await TaskModel.findByIdAndUpdate(id, {
    title: task.title,
    about: "",
    fee: Number(task.fee),
    set_date: new Date(task.set_date),
    set_time: task.set_time,
    frequency: task.frequency,
  });

  revalidatePath("/dashboard/tasks");
};

// Weekly window (3 weeks)
export const getWeeklyTasks = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  const today = addDays(new Date(), -1);
  const threeWeeksLater = addDays(new Date(), 21);

  await connectToDatabase();
  const TaskModel = await getTaskModel();
  const ClientModel = await getClientModel();
  const tasks = await TaskModel.find({
    user_id: userId,
    set_date: { $gte: new Date(today), $lt: new Date(threeWeeksLater) },
  })
    .sort({ set_date: -1 })
    .lean();
  const clientIds = Array.from(
    new Set(tasks.map((t) => t.client_id?.toString?.()).filter(Boolean))
  );
  const clients = await ClientModel.find({ _id: { $in: clientIds } })
    .select({ name: 1, type: 1 })
    .lean();
  const cmap = new Map(
    clients.map((c: any) => [c._id.toString(), { name: c.name, type: c.type }])
  );
  const enriched = tasks.map((t) => ({
    ...(t as any),
    id: t._id?.toString?.(),
    clients: cmap.get(t.client_id?.toString?.() || "") || {
      name: "",
      type: "",
    },
  }));
  return { tasks: JSON.parse(JSON.stringify(enriched)) as unknown as Task[] };
};

// Task Notes
export const getTaskNotes = async (taskId: string | string[]) => {
  const id = Array.isArray(taskId) ? taskId[0] : taskId;
  await connectToDatabase();
  const TaskNoteModel = await getTaskNoteModel();
  const notes = await TaskNoteModel.find({ task_id: id })
    .sort({ created_at: -1 })
    .lean();
  return JSON.parse(JSON.stringify(notes)) as unknown as TaskNote[];
};

export const deleteTaskNote = async (taskNoteId: string | string[]) => {
  const id = Array.isArray(taskNoteId) ? taskNoteId[0] : taskNoteId;
  await connectToDatabase();
  const TaskNoteModel = await getTaskNoteModel();
  await TaskNoteModel.findByIdAndDelete(id);
};

export const createNewTaskNote = async (
  formData: { note: string },
  taskId: string | string[]
) => {
  const id = Array.isArray(taskId) ? taskId[0] : taskId;
  await connectToDatabase();
  const TaskNoteModel = await getTaskNoteModel();
  const note = await TaskNoteModel.create({
    content: formData.note,
    task_id: id,
  });
  return [JSON.parse(JSON.stringify(note))] as unknown as TaskNote[];
};
