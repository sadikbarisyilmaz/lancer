export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  hashedPassword: string;

  // Relations
  clients: Client[];
  tasks: Task[];
  weeklies: Weekly[];
  clientNotes: ClientNote[];
}

export interface Client {
  id: string;
  created_at: Date;
  user_id: string;
  name: string;
  type: string;
  email: string;
  phone: number;

  // Relations
  user: User;
  tasks: Task[];
  notes: ClientNote[];
  weeklies: Weekly[];
}

export interface Task {
  id: string;
  created_at: Date;
  set_date: Date;
  set_time: string;
  user_id: string;
  client_id: string;
  title: string;
  about: string;
  fee: number;
  payment_status: string;
  frequency: string;

  // Relations
  user: User;
  client: Client; // singular
  notes: TaskNote[];
}

export interface Weekly {
  id: string;
  created_at: Date;
  user_id: string;
  client_id: string;
  week_day: string;
  set_time: string;
  title: string;
  about: string;
  fee: number;
  payment_status: string;

  // Relations
  user: User;
  client: Client; // singular
}

export interface ClientNote {
  id: string;
  created_at: Date;
  user_id: string;
  content: string;
  client_id?: string; // optional

  // Relations
  user: User;
  client?: Client; // optional
}

export interface TaskNote {
  id: string;
  created_at: Date;
  task_id: string;
  content: string;

  // Relations
  task: Task;
}
